export interface MatchedSubstring {
  length: number;
  offset: number;
}

export interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text: string;
}

export interface LocationSuggestion {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Array<{ offset: number; value: string }>;
  types: string[];
}

export type LocationSuggestionsResponse = LocationSuggestion[];

export type VehicaleFareTS = {
  auto: number;
  car: number;
  motorcycle: number;
};

export type VehicleAndFareTS = {
  vehicleName: string;
  vehicleImage: string;
  alternameName: string;
  pickup: string;
  destination: string;
  fare: number;
};
