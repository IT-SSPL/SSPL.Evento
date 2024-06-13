import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { createClient } from "@/utils/supabase/client";
import { compressImage } from "@/utils/compressImage";

// TODO: if data no change, do not update

export const uploadImage = async (formData: FormData, taskId: string, userId: string) => {
  const supabase = createClient();

  const image = formData.get("image") as File;

  // compress image
  const uploadCompressedImage = async (image: File) => {
    const compress_image = await compressImage(image);

    if (!compress_image) return;

    const { data, error } = await supabase.storage.from("bingo-image").upload(`${userId}/task-${taskId}-${uuidv4()}.webp`, compress_image, {
      cacheControl: "3600",
      contentType: "image/webp",
    });

    if (error) {
      return redirect(`/bingo/${taskId}?message=Wystąpił błąd`);
    }

    return data?.path;
  };

  const image_path = await uploadCompressedImage(image);

  const { error } = await supabase.from("bingo_upload_refs").insert({
    tasks_id: taskId,
    user_id: userId,
    file_path: image_path,
  });

  if (error) {
    return redirect(`/bingo/${taskId}?message=Wystąpił błąd`);
  }

  return redirect(`/bingo/${taskId}`);
};
