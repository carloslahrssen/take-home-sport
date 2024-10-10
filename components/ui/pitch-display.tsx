/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from "react";
import { Separator } from "./separator";
import { IPitch } from "@/types";

const twoDecimal = new Intl.NumberFormat("en-In", {
  maximumFractionDigits: 2,
});

// In case we extend this beyond just relevant pitch data
interface PitchDataDisplayProps extends IPitch {}

const PitchDataDisplay: React.FC<PitchDataDisplayProps> = ({
  pitch_type,
  velocity,
  spin_rate,
  batter_name,
  batter_stance,
  is_swing,
  is_contact,
  play_result,
}) => {
  return (
    <div className="flex p-4">
      <div className="p-4 space-y-2 ">
        <div className="text-lg font-bold">Pitch Information</div>

        <Separator className="my-2" />

        <div className="flex justify-between">
          <span className="font-medium">Pitch Type:</span>
          <span>{pitch_type}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Velocity:</span>
          <span>
            {twoDecimal.format(velocity)} <span className="font-thin">mph</span>
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Spin:</span>
          <span>{twoDecimal.format(spin_rate)} rpm</span>
        </div>
      </div>
      <div className="p-4 space-y-2 ">
        <div className="text-lg font-bold">Batter Information</div>

        <Separator className="my-2" />

        <div className="flex justify-between">
          <span className="font-medium">Batter Name:</span>
          <span>{batter_name}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Stance:</span>
          <span>{batter_stance}</span>
        </div>

        <Separator className="my-2" />

        <div className="flex justify-between">
          <span className="font-medium">Swing:</span>
          <span>{is_swing ? "Yes" : "No"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Contact:</span>
          <span>{is_contact ? "Yes" : "No"}</span>
        </div>

        <Separator className="my-2" />

        <div className="flex justify-between">
          <span className="font-medium">Play Result:</span>
          <span>{play_result}</span>
        </div>
      </div>
    </div>
  );
};

export { PitchDataDisplay };
