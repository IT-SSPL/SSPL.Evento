import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { Tables } from "@/types/supabase.types";
import { compressImage } from "@/utils/compressImage";
import { createClient } from "@/utils/supabase/client";
import { z } from "zod";

// TODO: if data no change, do not update

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
  const university = formData.get("university") as string;

  const userData = {
    name: name === "" ? null : name,
    surname: surname === "" ? null : surname,
    phone: phone === "" ? null : phone,
    room: room === "" ? null : room,
    facebook: facebook === "" ? null : facebook,
    description: description === "" ? null : description,
    university: university === "" ? null : university,
  };

  // validate data
  const nameSchema = z.string().min(1).max(30);
  const surnameSchema = z.string().min(1).max(30);
  const phoneSchema = z.nullable(z.string().length(9));
  const facebookSchema = z.nullable(z.string().max(30));
  const descriptionSchema = z.nullable(z.string().max(200));

  try {
    nameSchema.parse(userData.name);
    surnameSchema.parse(userData.surname);
    phoneSchema.parse(userData.phone);
    facebookSchema.parse(userData.facebook);
    descriptionSchema.parse(userData.description);
  } catch (error) {
    return redirect(`/profile/${user.id}?message=Niepoprawne dane`);
  }

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
      name: userData.name,
      surname: userData.surname,
      phone: userData.phone,
      room: userData.room,
      facebook_nickname: userData.facebook,
      description: userData.description,
      image_path: image_path || user.image_path,
      university: userData.university,
    })
    .eq("id", user?.id!);

  if (error) {
    return redirect(
      `/profile/${user.id}?message=Wystąpił błąd podczas aktualizacji profilu`
    );
  }

  return redirect(`/profile/${user.id}?success=Profil zaktualizowany`);
};
