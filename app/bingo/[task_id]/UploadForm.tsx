"use client";

import { uploadImage } from "./uploadImage";

// TODO: rewrite to use client side

export const UploadForm = ({ taskId, userId }: { taskId: string; userId: string }) => {
  return (
    <form
      action={async (e) => {
        await uploadImage(e, taskId, userId);
      }}
    >
      <div className="py-4">
        <input type="file" className="ml-2 file-input file-input-ghost w-full h-8" name="image" accept="image/*" />
      </div>

      <div className="form-control my-8">
        <button className="btn btn-primary">Zapisz</button>
      </div>
    </form>
  );
};
