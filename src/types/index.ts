import { LazyQueryExecFunction, OperationVariables } from "@apollo/client";

export type TicketType = {
  zones: string[];
  price: number;
  id: string;
  fareId: string;
  currency: string;
  __typename: string;
};

export type mapHookProps = {
  mapLoaded: boolean;
  mapContainerRef: React.RefObject<HTMLDivElement>;
  mapRef: React.RefObject<Map<string, any>>;
  coordinates: any[];
  markers: any[];
  removeMarkersAndCoordinates: () => void;
  filter: any;
  openFilterMenu: boolean;
  handleFilter: () => void;
  setCoordinates: (coordinates: any[]) => void;
  setMarkers: (markers: any[]) => void;
  setFilter: (filter: any) => void;
  setOpenFilterMenu: (openFilterMenu: boolean) => void;
  addRoute: (route: any) => void;
};

export type getRoutesQueryProps = {
  getRoutesQuery: LazyQueryExecFunction<any, OperationVariables>;
  routesData: any; //!TODO: fix type
  routesLoading: boolean;
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
