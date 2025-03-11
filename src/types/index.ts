export type TicketType = {
  zones: string[];
  price: number;
  id: string;
  fareId: string;
  currency: string;
  __typename: string;
};

export type AlertType = {
  id: string;
  __typename: string;
  alertCause: string;
  alertDescriptionText: string;
  alertEffect: string;
  alertHash: number;
  alertHeaderText: string;
  alertSeverityLevel: string;
  alertUrl: string;
  effectiveEndDate: number;
  effectiveStartDate: number;
  feed: string;
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
