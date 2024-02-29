import CustomIcon from "@/components/CustomIcon";
import ContentWithNav from "@/components/ContentWithNav";
import { TinderSwaps } from "./TinderSwaps";

async function TrailsPage() {
  return (
    <ContentWithNav
      title={
        <>
          <CustomIcon name="crewModuleIcon" className="mr-2" />
          Tinder
        </>
      }
      hasSidebar
    >
      <main className="animate-in w-full flex flex-col justify-center overflow-hidden">
        <TinderSwaps />
      </main>
    </ContentWithNav>
  );
}

export default TrailsPage;
