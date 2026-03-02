import type { ChangeEvent } from "react";

export type SelectedMedia = {
  id: string;
  file: File;
  previewUrl: string;
  mediaType: "image" | "video";
};

type MediaPickerProps = {
  items: SelectedMedia[];
  onAddFiles: (files: File[]) => void;
  onRemove: (id: string) => void;
  maxFiles: number;
  disabled?: boolean;
};

export default function MediaPicker({
  items,
  onAddFiles,
  onRemove,
  maxFiles,
  disabled = false,
}: MediaPickerProps) {
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) {
      onAddFiles(files);
    }
    e.currentTarget.value = "";
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-stone-500">
        <span>Media</span>
        <span>
          {items.length} / {maxFiles}
        </span>
      </div>

      <label className="flex items-center justify-center gap-2 border border-dashed border-stone-300 rounded-lg px-4 py-6 cursor-pointer bg-white hover:bg-stone-50 transition-colors dark:bg-[#2A2724] dark:border-stone-700 dark:hover:bg-stone-800">
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />
        <span className="text-sm text-stone-600 dark:text-stone-300">
          Add images or videos
        </span>
      </label>

      {items.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative rounded-lg border border-stone-200 bg-white overflow-hidden dark:bg-[#2A2724] dark:border-stone-700"
            >
              {item.mediaType === "image" ? (
                <img
                  src={item.previewUrl}
                  alt={item.file.name}
                  className="h-32 w-full object-cover"
                />
              ) : (
                <video
                  src={item.previewUrl}
                  className="h-32 w-full object-cover"
                  muted
                  playsInline
                />
              )}
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="absolute top-2 right-2 bg-black/70 text-white text-xs rounded-full px-2 py-1 hover:bg-black/80"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
