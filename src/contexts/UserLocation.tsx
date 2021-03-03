import { createContext, useContext, useEffect, useState } from "react";
import { Coord } from "../types/types";

const UserLocationContext = createContext<{
  userLocation: Coord | undefined;
  error: string | null;
}>({
  userLocation: undefined,
  error: null,
});

export const useUserLocation = () => useContext(UserLocationContext);

export const UserLocationProvider: React.FC = ({ children }) => {
  // userLocation은 기본으로 서울시청
  // 유저가 geoLocation api 사용 권한을 거부하거나 오류가 발생한다면 지도의 중심을 서울시청으로 사용하기 위함
  const [userLocation, setUserLocation] = useState<Coord | undefined>(
    undefined
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeouts = [] as number[];

    const watchId = navigator.geolocation.watchPosition(
      // success callback
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      // error callback
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("permission denied, fallback to default location");
            timeouts.push(window.setTimeout(() => setError(null), 3000));
            break;
          case err.POSITION_UNAVAILABLE:
          case err.TIMEOUT:
            setError("cannot use position, please try again later");
            timeouts.push(window.setTimeout(() => setError(null), 3000));
            break;
          default:
            break;
        }
      }
    );

    // clear watcher and timeouts on destoy
    return () => {
      navigator.geolocation.clearWatch(watchId);
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  return (
    <UserLocationContext.Provider value={{ userLocation, error }}>
      {children}
    </UserLocationContext.Provider>
  );
};
