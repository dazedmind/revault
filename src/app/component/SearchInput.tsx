"use client";

import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface iDefault {
  defaultValue: string | null;
}

export const SearchInput = ({ defaultValue }: iDefault) => {
  // initiate the router from next/navigation

  const router = useRouter();

  // We need to grab the current search parameters and use it as default value for the search input

  const [inputValue, setValue] = useState(defaultValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setValue(inputValue);
  };

  // If the user clicks enter on the keyboard, the input value should be submitted for search

  // We are now routing the search results to another page but still on the same page

  const handleSearch = () => {
    if (inputValue) return router.push(`/?q=${inputValue}`);

    if (!inputValue) return router.push("/");
  };

  const handleKeyPress = (event: { key: any }) => {
    if (event.key === "Enter") return handleSearch();
  };

  return (
    <div className="search__input border-[1px] font-[family-name:'Inter'] border-solid border-neutral-500 w-auto flex flex-row items-center text-sm rounded-[12px]">
      <input
        type="text"
        id="inputId"
        placeholder="Search paper"
        value={inputValue ?? ""}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        className="bg-[transparent] outline-none border-none w-72 p-3 "
      />
      <label htmlFor="inputId" className="p-3">
        <FaMagnifyingGlass />
      </label>
    </div>
  );
};
