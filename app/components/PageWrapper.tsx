import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function PageWrapper({
  children,
  title,
  isReturn,
}: {
  children: React.ReactNode;
  title: string;
  isReturn?: boolean;
}) {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center">
      <header className="w-full relative flex justify-center items-center border-b border-b-foreground/10 h-12 dark:b[200 50% 3%]">
        {isReturn && (
          <Link
            href="/"
            className="absolute left-2 text-3xl btn btn-sm btn-info btn-outline"
          >
            <IoIosArrowRoundBack />
          </Link>
        )}
        <h1 className="font-bold text-xl">{title}</h1>
      </header>
      <div className="px-4 sm:px-10 md:px-20 lg:px-24 w-full flex flex-1 mt-8 mb-12">
        {children}
      </div>
    </div>
  );
}
