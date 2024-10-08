"use client";

import React, { SVGProps, useCallback } from "react";
import { cn } from "../../lib/utils";
import { IPitch } from "@/types";

/**
 * PitchPlotProps
 * This structure is the minimum data structure representing the props for this component
 * that is required to implement all functionality in the prompt.
 *
 * Feel free to augment the type of PitchPlotProps if that would improve your implementation.
 */
type PitchPlotProps = {
  pitches: IPitch[];
};

const PitchPlot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & PitchPlotProps
>(({ className, pitches, ...props }, ref) => {
  // height and width are in feet
  const height = 5;
  const width = 4;

  const baseballDiameter = 2.9 / 12;

  // the coordinate dimensions of the solid-line strike zone
  const strikeZone = {
    left: ((17 / 2) * -1) / 12,
    width: 17 / 12,
    top: 43 / 12,
    height: 25 / 12,
  };
  // the coordinate dimensions of the dotted-line strike zone
  // this strike zone represents the width of one baseball outside of the true strike zone
  const outerStrikeZone = {
    left: strikeZone.left - baseballDiameter,
    width: strikeZone.width + baseballDiameter * 2,
    top: strikeZone.top + baseballDiameter,
    height: strikeZone.height + baseballDiameter * 2,
  };

  const pitchColor = useCallback(
    (pitch: IPitch) => {
      switch (pitch.pitch_type) {
        case "CH":
          return "red";
        case "FF":
          return "green";
        case "SI":
          return "yellow";
        case "SL":
          return "blue";
        default:
          return "black";
          break;
      }
    },
    [pitches]
  );

  // positive x-coordinates are towards first base and negative x-coordinates are towards third base
  return (
    <div ref={ref} className={cn(className)} {...props}>
      <svg
        className="border border-border rounded-lg"
        viewBox={`${(width / 2) * -1} 0 ${width} ${height}`}
      >
        {pitches.map((p) => {
          return (
            <circle
              key={p.pitch_id}
              cx={p.location_x}
              cy={height - p.location_z}
              strokeWidth={0.025}
              fillOpacity={0.5}
              fill={pitchColor(p)}
              r={baseballDiameter / 2}
              // onClick={() => (onPitchClick ? onPitchClick(p) : undefined)}
            />
          );
        })}
        <rect
          x={strikeZone.left}
          y={height - strikeZone.top}
          width={strikeZone.width}
          height={strikeZone.height}
          fill="transparent"
          stroke="black"
          strokeWidth={0.3 / 12}
          className="pointer-events-none"
        ></rect>
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
        ></rect>
      </svg>
      <span className="text-xs italic">Pitcher perspective</span>
    </div>
  );
});
PitchPlot.displayName = "PitchPlot";

export { PitchPlot };

export type { PitchPlotProps };
