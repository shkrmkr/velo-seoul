export interface ResponseData {
  getStationListHist: RentBikeStatus;
}

export interface RentBikeStatus {
  list_total_count: number;
  RESULT: RESULT;
  row: Station[];
}

export interface Station {
  rackTotCnt: string;
  stationName: string;
  parkingBikeTotCnt: string;
  shared: string;
  stationLatitude: string;
  stationLongitude: string;
  stationId: string;
}

export interface RESULT {
  CODE: string;
  MESSAGE: string;
}

export interface GeoJsonPoint {
  type: "Feature";
  properties: {
    cluster: boolean;
    stationId: string;
    stationName: string;
    availableBikeCount: number;
    rackCount: number;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}
