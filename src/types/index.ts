export type TicketType = {
  zones: string[];
  price: number;
  id: string;
  fareId: string;
  currency: string;
  __typename: string;
};

export enum Modes {
  BUS = "BUS",
  TRAM = "TRAM",
  RAIL = "RAIL",
  SUBWAY = "SUBWAY",
  FERRY = "FERRY",
  NONE = "NONE",
  WALK = "WALK",
}

export enum ModesTranslation {
  BUS = "BUS",
  TRAM = "TRAM",
  RAIL = "TRAIN",
  SUBWAY = "METRO",
  FERRY = "FERRY",
  WALK = "WALKING",
  NONE = "NONE",
}
