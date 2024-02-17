import { Tables } from "@/types/supabase.types";
import { compressImage } from "@/utils/compressImage";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const updateProfileData = async (
  formData: FormData,
  user: Tables<"users">
) => {
  const supabase = createClient();

  const name = formData.get("name") as string;
  const surname = formData.get("surname") as string;
  const phone = formData.get("phone") as string;
  const room = formData.get("room") as string;
  const facebook = formData.get("facebook") as string;
  const image = formData.get("image") as File;
  const description = formData.get("description") as string;

  // compress image
  const uploadCompressedImage = async (image: File) => {
    const compress_image = await compressImage(image);

    if (!compress_image) return;

    const { data, error } = await supabase.storage
      .from("profile-icons")
      .upload(`${user?.id}/profile-${uuidv4()}.webp`, compress_image, {
        cacheControl: "3600",
        contentType: "image/webp",
      });
    return data?.path;
  };

  const image_path = await uploadCompressedImage(image);

  const { error } = await supabase
    .from("users")
    .update({
      name,
      surname,
      phone,
      room,
      facebook_nickname: facebook,
      description,
      image_path: image_path || user.image_path,
    })
    .eq("id", user?.id!);

  if (error) {
    return redirect(`/profile/${user.id}?message=Try again later`);
  }
};
