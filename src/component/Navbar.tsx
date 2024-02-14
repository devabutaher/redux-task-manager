import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src="/images/logo.svg" alt="logo" width={200} height={200} />
        </Link>
        <div className="flex-1 max-w-xs search-field group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="search-icon group-focus-within:text-blue-500"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search Task"
            className="search-input"
            id="lws-searchTask"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
