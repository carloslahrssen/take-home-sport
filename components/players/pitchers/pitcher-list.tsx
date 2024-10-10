"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "../../ui/card";
import { IPitcher } from "@/types";
import Image from "next/image";

const pitchers = [
  { id: "1", name: "John Doe", description: "Fastball Specialist" },
  { id: "2", name: "Jane Smith", description: "Curveball Master" },
  { id: "3", name: "Mike Johnson", description: "Slider Expert" },
];

export function PitcherList({ pitchers }: { pitchers: Array<IPitcher> }) {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/pitcher/${id}`);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      {pitchers?.map((pitcher) => (
        <Card
          key={pitcher.id}
          onClick={() => handleClick(pitcher.id)}
          className="cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <CardHeader>
            <div className="w-16 h-16 rounded-full overflow-hidden border-2">
              <Image
                src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${pitcher.id}/headshot/silo/current`}
                alt={`pitcher ${pitcher.name}`}
                height={75}
                width={75}
              />
            </div>
            <CardTitle>{pitcher.name}</CardTitle>
            <CardDescription>{pitcher.pitcher_position}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export default PitcherList;
