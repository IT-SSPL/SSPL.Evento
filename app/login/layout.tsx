import ContentWithNav from "@/components/ContentWithNav";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return (
    <ContentWithNav title="TripApp">
      <main className="animate-in flex-1 flex flex-col items-center justify-center relative">
        {children}
      </main>

      <footer className="w-full border-t border-t-foreground/10 pb-5 pt-3 flex justify-center text-center text-xs fixed bottom-0 bg-background left-0 max-h-12">
        <p>
          Powered by{" "}
          <a
            href="https://samorzad.p.lodz.pl/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            MW & KS (Komisja ds. IT SSPŁ)
          </a>
        </p>
      </footer>
    </ContentWithNav>
  );
}
