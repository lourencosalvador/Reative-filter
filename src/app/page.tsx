import Image from "next/image";
import { FilterCompos } from "./_components/filter-comps";

export default function Home() {
  return (
    <main className="h-screen flex justify-center py-[70px] text-xl text-slate-100 ">
      <FilterCompos />
    </main>
  );
}
