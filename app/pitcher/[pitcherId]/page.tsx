import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { PitchPlot } from "../../../components/ui/pitch-plot";
import { PlayerProfile } from "../../../components/players/profile";
import type { IPitch, IPitcherInfo } from "../../../types";
import { DataTable } from "@/components/players/pitches-table/table";
import { columns } from "@/components/players/pitches-table/columns";
/**
 *
 * If you would like to display the pitcher's image, you can use the image hosted at
 * https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/{pitcherId}/headshot/silo/current
 *
 */
export default async function Page({
  params,
}: {
  params: { pitcherId: string };
}) {
  const { pitcherId } = params;
  const { pitcherInfo } = await getPitcherInfo(pitcherId);
  const { pitches } = await getPitches(pitcherId);

  return (
    <div className="flex flex-col">
      <div className="max-w-fit flex-row">
        <Card>
          <CardHeader>
            <div className="flex flex-col justify-between mx-auto">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 mx-auto">
                <Image
                  src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${pitcherId}/headshot/silo/current`}
                  alt={`pitcher ${pitcherInfo.name}`}
                  height={75}
                  width={75}
                />
              </div>
              <div>
                <CardTitle>{pitcherInfo.name}</CardTitle>
                <CardDescription>
                  {pitcherInfo.organization_name}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <PlayerProfile pitcherInfo={pitcherInfo} />
          </CardContent>
        </Card>
        <PitchPlot className="w-64" pitches={pitches} />
      </div>
      <div>{/* <DataTable columns={columns} data={pitches} /> */}</div>
    </div>
  );
}

async function getPitcherInfo(
  pitcherId: string
): Promise<{ pitcherInfo: IPitcherInfo }> {
  const res = await fetch(
    `https://mia-api.vercel.app/api/pitcher-info?pitcherId=${pitcherId}`
  );

  if (!res.ok) {
    throw new Error("Unable to fetch pitcher information");
  }

  return await res.json();
}

async function getPitches(
  pitcherId: string
): Promise<{ pitches: Array<IPitch> }> {
  const res = await fetch(
    `https://mia-api.vercel.app/api/pitches?pitcherId=${pitcherId}`
  );

  if (!res.ok) {
    throw new Error("Unable to fetch pitches");
  }

  return await res.json();
}
