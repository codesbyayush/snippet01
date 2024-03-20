import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getAllSnippets } from "@/assignment-project/actions/getAllSnippets";
import { SelectSnippet } from "@/db/drizzle/schema";

async function DataTable() {
  const apidata = await getAllSnippets();
  const data = apidata.data as unknown as SelectSnippet[];
  return (
    <div className=" bg-sky-200 min-h-screen w-full px-8 py-12 flex items-center justify-between">
      <div className="space-y-4 max-w-7xl mx-auto">
        <div className="relative">
          <h1 className="w-min py-3 px-6 bg-white/75 border-2 border-black/50 text-xl font-bold rounded-xl mx-auto whitespace-nowrap">
            Submitted snippets
          </h1>
          <Link
            href={`/addsnippet`}
            className="absolute top-1/2 right-0 -translate-y-1/2 w-min py-2 px-4 bg-black/50 text-white border-2 border-black/50 text-lg font-bold rounded-xl mx-auto whitespace-nowrap"
          >
            <button>+ Snippet</button>
          </Link>
        </div>
        <div className="rounded-lg overflow-hidden border-2 border-black/20">
          <div className="bg-zinc-200 w-full grid grid-cols-6 px-8 py-3  border-2 border-b-gray-300 text-lg font-semibold">
            <div className="col-span-3 sm:grid sm:grid-cols-3 hidden items-center justify-center gap-4">
              <h3 className="">Username</h3>
              <h3>Language</h3>
              <h3>Input</h3>
            </div>
            <h3 className="sm:hidden">Details</h3>
            <h3 className="col-span-3 text-right">Code</h3>
          </div>
          {data &&
            data.map((item) => {
              return (
                <Link href={`/${item.id}`}>
                  <div className="bg-white  font-medium w-full grid grid-cols-6 px-8 border-2 border-b-gray-300 py-3 items-center cursor-pointer">
                    <div className="col-span-3 grid sm:grid-cols-3 ">
                      <p>{item.name}</p>
                      <p className="capitalize bg-emerald-100 text-emerald-700 px-3 py-2 w-min rounded">
                        {item.language}
                      </p>
                      <p>{item.stdin}</p>
                    </div>
                    <div className="text-right col-span-3 pl-3">
                      {/* <textarea className="resize-none" maxLength={100} readOnly> */}
                      <SyntaxHighlighter language={item.language} style={vs}>
                        {item.srccode?.substring(0, 200)}
                      </SyntaxHighlighter>
                      {/* {item.code.substring(0, 101)} */}
                      {/* </textarea> */}
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default DataTable;
