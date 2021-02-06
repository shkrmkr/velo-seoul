import React, { useRef, useState } from "react";
import GoogleMap from "google-map-react";
import LocationMarker from "./LocationMarker";
import StationInfo from "./StationInfo";
import { GeoJsonPoint, Station } from "../types/types";
import useSupercluster from "use-supercluster";
import ClusterMarker from "./ClusterMarker";

interface Props {
  center?: {
    lat: number;
    lng: number;
  };
  zoomLevel?: number;
  stations: Station[];
}

const defaultProps: Partial<Props> = {
  center: {
    lat: 37.5663,
    lng: 126.9779,
  },
  zoomLevel: 10,
};

const Map: React.FC<Props> = ({ center, zoomLevel, stations }) => {
  const mapRef = useRef();
  const [zoom, setZoom] = useState(16);
  const [bounds, setBounds] = useState<Number[] | null>(null);
  const [stationInfo, setStationInfo] = useState<any>(null);

  const points = stations.map<GeoJsonPoint>((station) => ({
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
  }));

  const { clusters } = useSupercluster<GeoJsonPoint>({
    points,
    bounds,
    zoom,
    options: { radius: 100, maxZoom: 20 },
  });

  return (
    <div className="map">
      <GoogleMap
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY! }}
        defaultCenter={center}
        defaultZoom={zoomLevel}
        yesIWantToUseGoogleMapApiInternals
        options={{ fullscreenControl: false }}
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

Map.defaultProps = defaultProps;

export default Map;
