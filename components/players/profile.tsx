"use client";

import Image from "next/image";
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
      <div> {pitcherInfo.pitcher_position}</div>
      <div> | </div>
      <div> Throws: {pitcherInfo.pitcher_stance}</div>
      <div> | </div>
      <div> Age: {playerAge} </div>
    </div>
  );
}
