import DataTable from "@/components/ui/data-table";

export default function Home() {
  return (
      <div className="bg-[rgb(223,229,242)]">
        <div className="w-full items-center justify-center z-[15]
        border-2 mb-5 border-border dark:border-darkBorder bg-white
        bg-[radial-gradient(#80808080_1px,transparent_1px)]
        px-10 py-20 shadow-light [background-size:16px_16px] m750:px-5 m750:py-10">
            <DataTable/>
        </div>
      </div>
  );
}
