"use client";

import { IPitch, IPitcher } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IPitch>[] = [
  {
    header: "Pitch Info",
    columns: [
      {
        accessorKey: "pitch_type",
        header: "Pitch Type",
      },
      {
        accessorKey: "velocity",
        header: "Velo",
      },
      {
        accessorKey: "spin_rate",
        header: "Spin",
      },
    ],
  },
  {
    header: "Batter Info",
    columns: [
      {
        accessorKey: "batter_name",
        header: "Batter Name",
      },
      {
        accessorKey: "batter_stance",
        header: "Batter Stance",
      },
      {
        accessorKey: "batter_position",
        header: "Batter Position",
      },
    ],
  },
];

// ● Batter name
// ● Batter stance
// ● Pitch type
// ● Pitch velocity
// ● Pitch spin rate
// ● Horizontal release point
// ● Vertical release point
// ● If the pitch was swung at
// ● If the batter made contact with the pitch
// ● If the pitch was hit in play

// pitch_id: string;
// pitcher_id: string;
// batter_name: string;
// batter_stance: "R" | "L" | "S";
// batter_position:
//   | "1B"
//   | "2B"
//   | "3B"
//   | "C"
//   | "CF"
//   | "LF"
//   | "RF"
//   | "SS"
//   | "RP"
//   | "SP";
// batter_birth_date: string;
// is_swing: boolean;
// is_contact: boolean;
// is_in_play: boolean;
// is_strike: boolean;
// play_result: string;
// pitch_type: PitchType;
// velocity: number;
// spin_rate: number;
// release_location_x: number;
// release_location_y: number;
// release_location_z: number;
// location_x: number;
// location_z: number;
