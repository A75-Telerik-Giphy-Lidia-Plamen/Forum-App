import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormFields } from "../../../schemas/editProfile.schema";
import { editProfileStyles as s } from "./EditProfileForm.styles";

type Props = {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
  avatarUrl?: string;
  initials: string;
  isUploading: boolean;
  onPickFile: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
};

export default function EditProfileFormFields({
  register,
  errors,
  avatarUrl,
  initials,
  isUploading,
  onPickFile,
  onFileChange,
  fileInputRef,
}: Props) {
  return (
    <>
      <div className={s.avatarContainer}>
        <div className={s.avatarCircle}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className={s.avatarImg} />
          ) : (
            <span className={s.initials}>{initials}</span>
          )}
        </div>

        <button
          type="button"
          onClick={onPickFile}
          disabled={isUploading}
          className={s.uploadBtn}
        >
          {isUploading ? "Uploading..." : "Upload Photo"}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
        />
      </div>

      <div>
        <label className={s.label}>First Name</label>
        <input {...register("first_name")} className={s.input} />
        {errors.first_name && (
          <p className={s.error}>{errors.first_name.message}</p>
        )}
      </div>

      <div>
        <label className={s.label}>Last Name</label>
        <input {...register("last_name")} className={s.input} />
        {errors.last_name && (
          <p className={s.error}>{errors.last_name.message}</p>
        )}
      </div>

      <div>
        <label className={s.label}>Bio</label>
        <textarea {...register("bio")} rows={4} className={s.textarea} />
      </div>
    </>
  );
}