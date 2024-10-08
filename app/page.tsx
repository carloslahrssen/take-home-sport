import { columns } from "@/components/players/pitchers-table/columns";
import { DataTable } from "@/components/players/pitchers-table/data-table";
import { IPitcher } from "@/types";
import Link from "next/link";

export default async function Home() {
  // const pitchers = await getPitchers();

  return (
    <div>
      <div>
        <h1 className="font-black"> Pitchers </h1>
        {/* <DataTable columns={columns} data={pitchers.pitchers} /> */}
      </div>
      <div className="mt-4">
        <Link href="/pitcher/676974" className="underline ">
          Link to a pitcher&apos;s page
        </Link>
      </div>
    </div>
  );
}

async function getPitchers(): Promise<{ pitchers: Array<IPitcher> }> {
  const res = await fetch("https://mia-api.vercel.app/api/pitchers");

  if (!res.ok) {
    throw new Error("Could not get list of pitchers");
  }

  return res.json();
}
