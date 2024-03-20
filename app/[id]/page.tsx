import { getSnippetById } from "@/assignment-project/actions/getSnippetById";
import { SelectSnippet } from "@/db/drizzle/schema";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

async function Snippet({ params }: { params: { id: number } }) {
  const item: SelectSnippet = (await getSnippetById(params.id)).data[0];

  return (
    <div className="bg-sky-200 flex justify-center items-center min-h-screen w-full px-8 py-4">
      <div className="border-2 border-black/50 w-full h-full rounded-lg space-y-2 py-4 px-4 bg-green-50/50 max-w-7xl">
        <div className="flex justify-between items-center">
          <h3 className="w-min py-3 px-6 bg-white/75 border-2 border-black/50 text-xl font-bold rounded-xl whitespace-nowrap">
            <span className="text-black/75 font-semibold pr-4">By :</span>
            {item.name}
          </h3>
          <h3 className="uppercase w-min py-3 px-6 bg-white/75 border-2 border-black/50 text-xl font-bold rounded-xl whitespace-nowrap">
            <span>{item.language}</span>
          </h3>
        </div>
        <div className="border-2 border-black/50 px-4 py-2 bg-white/75 rounded-lg">
          <h3 className=" w-min text-lg font-semibold rounded-lg whitespace-nowrap pt-4 pb-2">
            Code :
          </h3>
          <SyntaxHighlighter language="javascript" style={vs}>
            {item.srccode}
          </SyntaxHighlighter>
        </div>
        <div className="border-2 border-black/50 px-4 py-6 bg-white/75 rounded-lg">
          <h3 className=" w-min text-lg font-semibold rounded-lg whitespace-nowrap">
            Input :
          </h3>
          <span className="pl-3 break-words">{item.stdin}</span>
        </div>
        <div className="border-2 border-black/50 px-4 py-6 bg-white/75 rounded-lg">
          <h3 className=" w-min text-lg font-semibold rounded-lg whitespace-nowrap">
            Result :
          </h3>
          <span className="pl-3 break-words">{"res is not available"}</span>
        </div>
      </div>
    </div>
  );
}

export default Snippet;
