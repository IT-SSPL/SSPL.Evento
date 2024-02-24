import { HiExternalLink } from "react-icons/hi";

import CustomIcon from "@/components/CustomIcon";
import ContentWithNav from "@/components/ContentWithNav";

async function TrailsPage() {
  return (
    <ContentWithNav
      title={
        <>
          <CustomIcon name="crewModuleIcon" className="mr-2" />
          Trasy
        </>
      }
      hasSidebar
    >
      <main className="animate-in w-full flex justify-center">
        <div className="card bg-base-100 shadow-xl max-h-fit">
          <figure>
            <img
              src="https://zimowisko.samorzad.p.lodz.pl/trasy.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Link do mapki</h2>
            <a
              className="link link-primary flex"
              href="https://zimowisko.samorzad.p.lodz.pl/trasy.jpg"
            >
              <HiExternalLink /> Mapa Tras
            </a>
          </div>
        </div>
      </main>
    </ContentWithNav>
  );
}

export default TrailsPage;
