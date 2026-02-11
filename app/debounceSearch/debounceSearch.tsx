"use client";

import { FC, useState, Dispatch, SetStateAction, useEffect } from "react";
import { Comment } from "./comments";

interface SearchProps {
  setComments: Dispatch<SetStateAction<Comment[]>>;
}

const SearchComponent: FC<SearchProps> = ({ setComments }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const data = await fetch(`http://localhost:3000/api/comments/${value}`);
      const res: Comment[] = await data.json();
      setComments(res);
    }, 1100);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  const typeSearchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setValue(value);
  };

  return (
    <input
      onInput={typeSearchHandler}
      type="text"
      placeholder="Search to do's..."
      value={value}
    />
  );
};

export default SearchComponent;
