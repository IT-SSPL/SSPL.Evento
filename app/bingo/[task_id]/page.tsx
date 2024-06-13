import { cookies } from "next/headers";
import { PiWarning } from "react-icons/pi";
import { PiCheckCircle } from "react-icons/pi";
import Image from "next/image";

import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import ContentWithNav from "@/components/ContentWithNav";
import { createClient } from "@/utils/supabase/server";
import { UploadForm } from "./UploadForm";

// Please optimize this page
// It's not the best way to fetch all images and then filter them

const BingoTaskPage = async ({ params, searchParams }: { params: { task_id: string }; searchParams: { message: string } }) => {
  const supabase = createClient(cookies());
  const { task_id } = params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userRole } = await supabase.from("users").select("role").eq("id", user?.id!).single();
  const canSeeAllImages = userRole && (userRole.role === "kadra" || userRole.role === "IT");

  // Fetch task details
  const { data: taskDetails } = await supabase.from("bingo_tasks").select("id, name, description").eq("id", task_id).single();

  if (!taskDetails) {
    return <div className="animate-in flex-1 grid w-full min-h-screen place-content-center">Nie znaleziono zadania</div>;
  }

  if (canSeeAllImages) {
    // Fetch all images for the task
    const { data: allTask } = await supabase.from("bingo_upload_refs").select("file_path, user_id").eq("tasks_id", task_id);

    // Fetch all users emails
    const { data: allUsers } = await supabase.from("users").select("id, email");

    // Map user_id to email
    const allTaskDetails = allTask?.map((task) => {
      const user = allUsers?.find((user) => user.id === task.user_id);

      return {
        file_path: task.file_path,
        email: user?.email,
      };
    });

    return (
      <ContentWithNav title="" hasSidebar>
        <main className="animate-in flex-1 flex flex-col w-full">
          <h1 className="font-bold text-2xl">{capitalizeFirstLetter(taskDetails.name)}</h1>
          <p className="py-2 px-1">{capitalizeFirstLetter(taskDetails.description)}</p>

          <div className="divider m-0.5" />
          {allTaskDetails && allTaskDetails.length > 0 && (
            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {allTaskDetails.map((task) => (
                <div key={task.file_path} className="relative w-full h-48">
                  <Image width={200} height={200} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL as string}/storage/v1/object/public/bingo-image/${task.file_path}`} alt="Bingo task picture" className="w-full rounded-xl" />
                  <div className="absolute top-0 right-0 p-2 bg-white bg-opacity-50 rounded-bl-xl">
                    <PiCheckCircle className="text-green-500 text-2xl" />
                  </div>
                  <p className="p-2 text-xs">{task.email}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </ContentWithNav>
    );
  } else {
    // Check if user has already uploaded the image
    const { data: taskDone } = await supabase.from("bingo_upload_refs").select("file_path").eq("tasks_id", task_id).eq("user_id", user?.id!).single();

    return (
      <ContentWithNav title="" hasSidebar>
        <main className="animate-in flex-1 flex flex-col w-full">
          {searchParams.message && (
            <p className="alert w-full mb-4 max-w-sm self-center text-sm gap-1 p-2">
              <PiWarning className="text-xl" />
              {searchParams.message}
            </p>
          )}

          <h1 className="font-bold text-2xl">{capitalizeFirstLetter(taskDetails.name)}</h1>
          <p className="py-2 px-1">{capitalizeFirstLetter(taskDetails.description)}</p>

          <div className="divider m-0.5" />
          {taskDone !== null ? (
            <>
              <div className="alert w-full mb-4 max-w-sm self-center text-sm gap-1 p-2">Zadanie zostało już wykonane</div>
              <Image width={200} height={200} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL as string}/storage/v1/object/public/bingo-image/${taskDone.file_path}`} alt="Bingo task picture" className="w-full rounded-xl" />
            </>
          ) : (
            user && <UploadForm taskId={taskDetails.id} userId={user.id} />
          )}
        </main>
      </ContentWithNav>
    );
  }
};

export default BingoTaskPage;
