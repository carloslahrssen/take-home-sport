"use client";

import type { IPitcherInfo } from "@/types";
import { useMemo } from "react";

export interface ProfileProps {
  pitcherInfo: IPitcherInfo;
}

export function PlayerProfile({ pitcherInfo }: ProfileProps) {
  const playerAge = useMemo(() => {
    const birthDate = new Date(pitcherInfo.pitcher_birth_date);
    const today = new Date();

    let years = new Date().getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      years--;
    }

    return years;
  }, [pitcherInfo.pitcher_birth_date]);

  return (
    <div className="flex flex-row gap-2 mx-auto justify-center">
      <p className="font-light text-slate-800">
        Position: {pitcherInfo.pitcher_position}
      </p>
      <span className="text-slate-600 "> | </span>
      <p className="font-light text-slate-800">
        {" "}
        Throws: {pitcherInfo.pitcher_stance}
      </p>
      <span className="text-slate-600"> | </span>
      <p className="font-light text-slate-800"> Age: {playerAge} </p>
    </div>
  );
}
