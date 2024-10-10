import PitcherList from "@/components/players/pitchers/pitcher-list";
import { IPitcher } from "@/types";
import Link from "next/link";

export default async function Home() {
  const pitchers = await getPitchers();

  return (
    <div>
      <div>
        <p className="font-black text-xl pb-2"> Pitchers </p>
        <PitcherList pitchers={pitchers.pitchers} />
      </div>
      <div className="mt-4">
        <Link href="/pitcher/676974" className="underline ">
          Link to a pitcher&apos;s page (original link to max meyer)
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
