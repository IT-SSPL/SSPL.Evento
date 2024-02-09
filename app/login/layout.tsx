export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="w-full flex justify-center items-center border-b border-b-foreground/10 h-12">
        <h1 className="font-bold text-xl">TripApp</h1>
      </div>

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
    </div>
  );
}
