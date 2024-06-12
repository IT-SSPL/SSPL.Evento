import { cookies } from "next/headers";
// import Image from "next/image";

import { createClient } from "@/utils/supabase/server";
import ContentWithNav from "@/components/ContentWithNav";
import CustomIcon from "@/components/CustomIcon";

async function SchedulePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: days } = await supabase.from("days").select("*").order("id");

  const { data: scheduleEntries } = await supabase
    .from("schedules")
    .select("*");

  return (
    <ContentWithNav
      title={
        <>
          <CustomIcon name="crewModuleIcon" className="mr-2" />
          Harmonogram
        </>
      }
      hasSidebar
    >
      <main className="animate-in flex flex-col w-screen -mx-2 sm:-mx-8 md:-mx-16 lg:-mx-24">
        {days &&
          days.map((day, i) => (
            <div className="block w-full mb-4" key={i}>
              <div className="collapse bg-primary">
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
                      .sort((a, b) => a.element_number! - b.element_number!)
                      .map((entry, i) => (
                        <div
                          className="grid grid-cols-2 items-baseline"
                          key={i}
                        >
                          <p className="font-bold">{entry.time}</p>
                          <p className="text-end text-sm">{entry.name}</p>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          ))}
        {/* <Image
          src="/images/schedule.jpg"
          alt="Schedule image"
          width={600}
          height={1000}
          className="w-full rounded-lg shadow-lg"
        /> */}
      </main>
    </ContentWithNav>
  );
}

export default SchedulePage;
