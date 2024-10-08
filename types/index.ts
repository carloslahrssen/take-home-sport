export interface IPitcher {
  id: string;
  name: string;
  pitcher_stance: "R" | "L";
  pitcher_position: "SP" | "RP";
  pitcher_birth_date: string;
  organization_name: string;
  organization_abbreviation: string;
}

export interface IPitcherInfo {
  id: string;
  name: string;
  pitcher_stance: PitcherStance;
  pitcher_position: PitcherPosition;
  pitcher_birth_date: string;
  organization_name: string;
  organization_abbreviation: string;
}

export interface IPitch {
  pitch_id: string;
  pitcher_id: string;
  batter_name: string;
  batter_stance: "R" | "L" | "S";
  batter_position:
    | "1B"
    | "2B"
    | "3B"
    | "C"
    | "CF"
    | "LF"
    | "RF"
    | "SS"
    | "RP"
    | "SP";
  batter_birth_date: string;
  is_swing: boolean;
  is_contact: boolean;
  is_in_play: boolean;
  is_strike: boolean;
  play_result: string;
  pitch_type: PitchType;
  velocity: number;
  spin_rate: number;
  release_location_x: number;
  release_location_y: number;
  release_location_z: number;
  location_x: number;
  location_z: number;
}

// These two types can be extended for other stances and positions
type PitcherStance = "R" | "L";

type PitcherPosition = "SP" | "RP";

/**
 * SLIDER | FOUR SEAM FASTBALL | CHANGEUP | SINKER |
 */
type PitchType = "SL" | "FF" | "CH" | "SI";
