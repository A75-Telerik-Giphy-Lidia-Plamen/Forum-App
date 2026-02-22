import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "../../schemas/editProfile.schema";
import { updateUserProfile } from "../../services/user.service";
import type { Profile } from "../../types/Profile";
import type { FormFields } from "../../schemas/editProfile.schema";
import { useNavigate } from "react-router-dom";
import { useRef, useState, type RefObject } from "react";
import { uploadFileToS3 } from "../../services/S3PhotoUpload.service";
import EditProfileFormFields from "./EditProfileFormFields";
import { editProfileStyles as s } from "./EditProfileForm.styles";

type Props = {
  profile: Profile;
  onCancel: () => void;
};

export default function EditProfileForm({ profile, onCancel }: Props) {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      first_name: profile.first_name ?? "",
      last_name: profile.last_name ?? "",
      bio: profile.bio ?? "",
      avatar_url: profile.avatar_url ?? "",
    },
  });

  const avatarUrl = watch("avatar_url");

  const initials =
    `${profile.first_name?.[0] ?? ""}${profile.last_name?.[0] ?? ""}`.toUpperCase() ||
    profile.username?.slice(0, 2).toUpperCase();

  async function handlePickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const imageUrl = await uploadFileToS3(file, { folder: "avatars" });

      setValue("avatar_url", imageUrl, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function onSubmit(data: FormFields) {
    await updateUserProfile({
      ...data,
      bio: data.bio || null,
      avatar_url: data.avatar_url ?? null,
    });

    navigate(`/profile/${profile.id}`);
  }

  return (
    <div className={s.wrapper}>
      <button
        type="button"
        onClick={() => navigate(`/profile/${profile.id}`)}
        className={s.backBtn}
      >
        Go Back
      </button>

      <h1 className={s.title}>Edit Profile</h1>
      <p>Update your personal information.</p>

      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <EditProfileFormFields
          register={register}
          errors={errors}
          avatarUrl={avatarUrl ?? undefined}
          initials={initials}
          isUploading={isUploading}
          onPickFile={() => fileInputRef.current?.click()}
          onFileChange={handlePickFile}
          fileInputRef={fileInputRef as RefObject<HTMLInputElement>}
        />

        <div className={s.buttonsRow}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={s.saveBtn}
          >
            Save
          </button>

          <button
            type="button"
            onClick={onCancel}
            className={s.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}