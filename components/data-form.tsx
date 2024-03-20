"use client";
import { InsertSnippet } from "@/db/drizzle/schema";
import Link from "next/link";
import { useState } from "react";

const languages = ["java", "cpp", "c", "python"];

function DataForm() {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("java");
  const [stdin, setStdin] = useState("");
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(false);

  const addSnippet = async (data: InsertSnippet) => {
    await fetch("/api/addsnippet", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };
  const handleSubmission = async () => {
    const data = {
      srccode: code,
      name,
      language,
      stdin,
    };
    await addSnippet(data);
    // await addSnippet(data);
  };

  return (
    <div className="min-h-screen flex flex-col place-content-center justify-center items-center bg-sky-200 p-6 relative">
      <form
        action={handleSubmission}
        className="bg-zinc-100/50 h-full w-full flex flex-col gap-4 max-w-lg mx-auto px-8 py-8 rounded-xl shadow-xl"
      >
        <h1 className="text-center font-bold text-2xl  capitalize">
          👩‍💻 Code Snippets
        </h1>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="text-zinc-500 text-xs px-0.5 font-medium"
          >
            name
          </label>
          <input
            className="px-4 py-3 rounded-lg  border-2 border-zinc-300"
            name="name"
            type="text"
            placeholder="john doe"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <ul className="flex flex-col gap-1 relative">
          <li
            className="text-zinc-500 text-xs px-0.5 font-medium"
            id="dropdown-lang"
          >
            Language
          </li>
          <li
            className={`px-4 py-3 rounded-lg   disabled:bg-white text-left cursor-pointer bg-white capitalize border-2 flex items-center justify-between ${
              open ? "border-black" : " border-zinc-300"
            }`}
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            onKeyDown={() => {
              setOpen((prev) => !prev);
            }}
            role="button"
            aria-labelledby="dropdown-lang"
            tabIndex={0}
          >
            <span>{language}</span>
            <svg
              className={`duration-500 scale-110 ${open ? "rotate-180 " : ""}`}
              width="10"
              height="5"
              viewBox="0 0 10 5"
              fillRule="evenodd"
            >
              <path d="M10 0L5 5 0 0z"></path>
            </svg>
          </li>
          {open && (
            <ul
              className="absolute w-full top-full my-2 rounded-lg bg-white border-zinc-300 border-2 shadow-lg px-2 py-2 "
              aria-expanded={open}
            >
              {languages.map((lang, i) => (
                <li
                  className={`px-4 py-3 rounded-lg w-full capitalize hover:text-purple-800 hover:bg-purple-200/90 font-medium  cursor-pointer ${
                    lang === language
                      ? "text-purple-700 bg-purple-100"
                      : "bg-white text-zinc-600"
                  }`}
                  tabIndex={0}
                  onClick={() => {
                    setLanguage(lang);
                    setOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      setLanguage(lang);
                      setOpen(false);
                    } else if (e.keyCode === 27) {
                      setOpen(false);
                    }
                  }}
                  key={lang}
                >
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </ul>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="stdin"
            className="text-zinc-500 text-xs px-0.5 font-medium"
          >
            Input
          </label>
          <input
            className="px-4 py-3 rounded-lg  border-2 border-zinc-300"
            type="text"
            placeholder="stdin"
            name="stdin"
            onChange={(e) => setStdin(e.target.value)}
            value={stdin}
            required
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label
            htmlFor="code"
            className="text-zinc-500 text-xs px-0.5 font-medium"
          >
            Code
          </label>
          <textarea
            name="code"
            placeholder="sourcecode"
            className="px-4 py-3 rounded-lg border-2 border-zinc-300 max-h-80"
            onChange={(e) => setCode(e.target.value)}
            value={code}
            maxLength={65500}
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-2 items-center justify-center gap-4">
          <Link
            href={"/"}
            className="w-full h-full py-2 px-4 bg-zinc-100/75 border-2 border-black/35 text-lg font-semibold rounded-lg mx-auto whitespace-nowrap flex justify-center items-center"
          >
            <span className="relative -left-2">👈 Home</span>
          </Link>
          <button
            type="submit"
            className="bg-zinc-100 text-black border-2 border-zinc-500 font-semibold text-lg px-6 py-3 rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default DataForm;
