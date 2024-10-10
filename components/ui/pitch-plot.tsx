"use client";

import React, { useCallback, useState } from "react";
import { cn } from "../../lib/utils";
import { IPitch } from "@/types";
import { PitchDataDisplay } from "./pitch-display";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";

type PitchPlotProps = {
  pitches: IPitch[];
};

const PitchPlot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & PitchPlotProps
>(({ className, pitches, ...props }, ref) => {
  const [currentPitchPosition, setCurrentPitchPosition] = useState({
    x: 0,
    y: 0,
    content: null,
  });

  const height = 5;
  const width = 4;
  const baseballDiameter = 2.9 / 12;

  const strikeZone = {
    left: ((17 / 2) * -1) / 12,
    width: 17 / 12,
    top: 43 / 12,
    height: 25 / 12,
  };

  const outerStrikeZone = {
    left: strikeZone.left - baseballDiameter,
    width: strikeZone.width + baseballDiameter * 2,
    top: strikeZone.top + baseballDiameter,
    height: strikeZone.height + baseballDiameter * 2,
  };

  const pitchColor = useCallback((pitch: IPitch) => {
    switch (pitch.pitch_type) {
      case "CH":
        return "green";
      case "FF":
        return "red";
      case "SI":
        return "orange";
      case "SL":
        return "blue";
      default:
        return "black";
    }
  }, []);

  const openPopover = (p: IPitch) => {
    setCurrentPitchPosition({
      // @ts-ignore
      content: p,
    });
  };

  return (
    <div className="flex mx-auto my-4 justify-center gap-10 sm:min-w-[1080px] flex-col sm:flex-row">
      <div ref={ref} className={cn(className, "relative")} {...props}>
        <svg
          className="border border-border rounded-lg"
          viewBox={`${(width / 2) * -1} 0 ${width} ${height}`}
        >
          {pitches.map((p) => (
            <circle
              key={p.pitch_id}
              className="hover:cursor-pointer"
              cx={p.location_x}
              cy={height - p.location_z}
              strokeWidth={0.025}
              // fillOpacity={
              //   popoverPosition.content?.pitch_id === p.pitch_id ? 1 : 0.4
              // }
              opacity={
                currentPitchPosition.content?.pitch_id === p.pitch_id ? 1 : 0.4
              }
              fill={pitchColor(p)}
              r={baseballDiameter / 2}
              onClick={() => openPopover(p)}
            />
          ))}
          <rect
            x={strikeZone.left}
            y={height - strikeZone.top}
            width={strikeZone.width}
            height={strikeZone.height}
            fill="transparent"
            stroke="black"
            strokeWidth={0.3 / 12}
            className="pointer-events-none"
          />
          <rect
            x={outerStrikeZone.left}
            y={height - outerStrikeZone.top}
            width={outerStrikeZone.width}
            height={outerStrikeZone.height}
            fill="transparent"
            stroke="black"
            strokeWidth={0.15 / 12}
            strokeDasharray={".1 .1"}
            className="pointer-events-none"
          />
        </svg>
        <div className="flex justify-between">
          <span className="text-sm italic">Pitcher perspective</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm italic hover:cursor-pointer">
                  Legend ⓘ
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex-col">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-red-500 inline-block mr-2"></span>
                      Changeup (CH)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2"></span>
                      Fastball (FF)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block mr-2"></span>
                      Sinker (SI)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-blue-500 inline-block mr-2"></span>
                      Slider (SL)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-black inline-block mr-2"></span>
                      {/* There are a few pitches that need to be added but didn't have the chance to document */}
                      Unknown
                    </li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {/* This is set for desktop, ideally in mobile it'd be best to open a dialog to make that the main frame of focus, with another pitch plot of the singular pitch to remind the location */}
      <div className=" bg-slate-100 rounded-lg max-w-lg">
        {currentPitchPosition.content ? (
          <PitchDataDisplay
            pitch_type={currentPitchPosition.content.pitch_type}
            velocity={currentPitchPosition.content.velocity}
            spin_rate={currentPitchPosition.content.spin_rate}
            batter_name={currentPitchPosition.content.batter_name}
            batter_stance={currentPitchPosition.content.batter_stance}
            is_swing={currentPitchPosition.content.is_swing}
            is_contact={currentPitchPosition.content.is_contact}
            play_result={currentPitchPosition.content.play_result}
          />
        ) : (
          <div className="min-w-72 text-center">
            <p className="text-center py-4"> Select any pitch to view data </p>
          </div>
        )}
      </div>
    </div>
  );
});

PitchPlot.displayName = "PitchPlot";

export { PitchPlot };
export type { PitchPlotProps };
