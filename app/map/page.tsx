import { HiExternalLink } from "react-icons/hi";
import { TbArrowsMoveHorizontal } from "react-icons/tb";

import CustomIcon from "@/components/CustomIcon";
import ContentWithNav from "@/components/ContentWithNav";

async function MapPage() {
  return (
    <ContentWithNav
      title={
        <>
          <CustomIcon name="mapModuleIcon" className="mr-2" />
          Mapa
        </>
      }
      hasSidebar
    >
      <main className="animate-in w-full flex justify-center overflow-y-hidden overflow-x-scroll" id="scrollable">
        <figure className="w-[65rem] h-auto absolute left-0 top-0 translate-x-[-32.5%]" id="image">
          <img src="/images/waszeta-mapka.webp" className="w-full h-full" alt="Waszeta maps" />
        </figure>
      </main>
      <div className="fixed bottom-4 left-1/2 translate-x-[-50%]">
        <TbArrowsMoveHorizontal className="text-4xl text-gray-300 animate-bounce-horizontal" />
      </div>
    </ContentWithNav>
  );
}

export default MapPage;
