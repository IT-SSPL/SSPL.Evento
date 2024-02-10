import PageWrapper from "../components/PageWrapper";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper title="TripApp">
      <main className="animate-in flex-1 flex flex-col items-center justify-center relative">
        {children}
      </main>

      <footer className="w-full border-t border-t-foreground/10 pb-5 pt-3 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://samorzad.p.lodz.pl/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Komisja ds. IT SSPŁ
          </a>
        </p>
      </footer>
    </PageWrapper>
  );
}
