import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { HiExternalLink } from "react-icons/hi";

import { createClient } from "@/utils/supabase/server";

import PageWrapper from "../components/PageWrapper";

async function TrailsPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <PageWrapper title="Trasy" isReturn>
      <main className="animate-in w-full flex justify-center">
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://zimowisko.samorzad.p.lodz.pl/trasy.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Link do mapki</h2>
            <a
              className="link link-info flex"
              href="https://zimowisko.samorzad.p.lodz.pl/trasy.jpg"
            >
              <HiExternalLink /> Mapa Tras
            </a>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}

export default TrailsPage;
