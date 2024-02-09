import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";

export default function Header({
  title,
  isReturn,
}: {
  title: string;
  isReturn?: boolean;
}) {
  return (
    <header className="w-full relative flex justify-center items-center border-b border-b-foreground/10 h-12">
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
  );
}
