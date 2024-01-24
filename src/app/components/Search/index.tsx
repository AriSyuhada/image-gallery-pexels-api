'use client';
import { useState, FormEvent, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function Search () {
  const pathname = usePathname();
  const [query, setQuery] = useState(pathname.split('/').length > 2 ? pathname.split('/')[2] : '');
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/results/${query}`);
  }

  useEffect(() => {
    setQuery(pathname.split('/').length > 2 ? pathname.split('/')[2] : '');
  }, [pathname])

  return (
    <form className="flex flex-row justify-between items-center bg-white dark:bg-gray-900 py-2 px-4 w-fit sm:w-80 text-xl rounded-xl text-black dark:text-white" onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search..." 
        className="bg-transparent" 
      />
      <FaSearch size={16} className="text-opacity-60 text-black dark:text-opacity-60 dark:text-white"/>
    </form>
  );
}