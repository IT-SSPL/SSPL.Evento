import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import PageWrapper from "../components/PageWrapper";
import CustomIcon from "../components/CustomIcon";

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
    <PageWrapper
      title={
        <>
          <CustomIcon name="crewModuleIcon" className="mr-2" />
          Harmonogram
        </>
      }
      hasSidebar
    >
      <main className="animate-in w-full flex flex-col">
        {days &&
          days.map((day, i) => (
            <div className="block w-full mb-4" key={i}>
              <div className="collapse bg-info">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  <div className="flex items-center">
                    <CustomIcon name={`${day.name}DayIcon`} className="mr-2" />
                    {day.display_name}
                  </div>
                </div>
                <div className="collapse-content">
                  {scheduleEntries &&
                    scheduleEntries
                      .filter((entry) => entry.day === day.display_name)
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
