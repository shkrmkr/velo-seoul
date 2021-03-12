import GoogleMap from "google-map-react";
import React, { useMemo, useRef, useState } from "react";
import useSupercluster from "use-supercluster";
import { Coord, GeoJsonPoint, Station } from "../types/types";
import { ClusterMarker } from "./ClusterMarker";
import { LocationMarker } from "./LocationMarker";
import { StationInfo } from "./StationInfo";

interface Props {
  center: Coord | undefined;
  zoomLevel: number | undefined;
  stations: Station[];
}

export const Map: React.FC<Props> = ({ center, zoomLevel, stations }) => {
  const mapRef = useRef();
  const [zoom, setZoom] = useState(zoomLevel || 12);
  const [bounds, setBounds] = useState<Number[] | null>(null);
  const [stationInfo, setStationInfo] = useState<any>(null);

  const points = useMemo(
    () =>
      stations.map<GeoJsonPoint>((station) => ({
        type: "Feature",
        properties: {
          cluster: false,
          stationId: station.stationId,
          stationName: station.stationName,
          availableBikeCount: parseInt(station.parkingBikeTotCnt),
          rackCount: parseInt(station.rackTotCnt),
        },
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(station.stationLongitude),
            parseFloat(station.stationLatitude),
          ],
        },
      })),
    [stations]
  );

  const { clusters } = useSupercluster<GeoJsonPoint>({
    points,
    bounds,
    zoom,
    options: { radius: 200, maxZoom: 14 },
  });

  return (
    <div className="map">
      <GoogleMap
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY! }}
        // 서울시청
        defaultCenter={{
          lat: 37.566789,
          lng: 126.97842,
        }}
        defaultZoom={12}
        yesIWantToUseGoogleMapApiInternals
        options={{ fullscreenControl: false, gestureHandling: "greedy" }}
        center={center}
        zoom={zoom}
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
          setStationInfo(null);
        }}
      >
        {clusters.map((cluster) => {
          const [lng, lat] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;

          if (isCluster) {
            return (
              <ClusterMarker
                lat={lat}
                lng={lng}
                key={cluster.id}
                pointCount={pointCount}
              />
            );
          }

          return (
            <LocationMarker
              key={cluster.properties.stationId}
              lat={lat}
              lng={lng}
              availableBikeCount={cluster.properties.availableBikeCount}
              onClick={() => {
                setStationInfo({
                  stationName: cluster.properties.stationName,
                  availableBikeCount: cluster.properties.availableBikeCount,
                  rackCount: cluster.properties.rackCount,
                });
              }}
            />
          );
        })}
      </GoogleMap>
      {stationInfo && (
        <StationInfo
          stationInfo={stationInfo}
          onClose={() => setStationInfo(null)}
        />
      )}
    </div>
  );
};
