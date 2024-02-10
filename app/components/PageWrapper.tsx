import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function PageWrapper({
  children,
  title,
  isReturn,
  returnPath = "/",
}: {
  children: React.ReactNode;
  title: string | React.ReactNode;
  isReturn?: boolean;
  returnPath?: string;
}) {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center">
      <header className="w-full fixed top-0 left-0 flex justify-center items-center bg-background border-b border-b-foreground/10 h-12 z-10">
        {isReturn && (
          <Link
            href={returnPath}
            className="absolute left-2 text-3xl btn btn-sm btn-info btn-outline"
          >
            <IoIosArrowRoundBack />
          </Link>
        )}
        <h1 className="font-bold text-xl flex items-center">{title}</h1>
      </header>
      <div className="px-4 sm:px-10 md:px-20 lg:px-24 w-full flex flex-1 mt-20 mb-12">
        {children}
      </div>
    </div>
  );
}
