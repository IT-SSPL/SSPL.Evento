import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import PageWrapper from "../components/PageWrapper";

async function SchedulePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  let { data: days } = await supabase.from("days").select("*");

  let { data: scheduleEntries } = await supabase.from("schedules").select("*");

  return (
    <PageWrapper title="Harmonogram" isReturn>
      <main className="animate-in w-full flex flex-col">
        {days &&
          days.map((day) => (
            <div className="block w-full mb-4">
              <div className="collapse bg-info">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  {day.name}
                </div>
                <div className="collapse-content">
                  {scheduleEntries &&
                    scheduleEntries
                      .filter((entry) => entry.day === day.name)
                      .map((entry) => (
                        <div className="flex justify-between">
                          <p>{entry.time}</p>
                          <p>{entry.name}</p>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          ))}
      </main>
    </PageWrapper>
  );
}

export default SchedulePage;
