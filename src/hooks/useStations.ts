import axios from "axios";
import { useEffect, useState } from "react";
import { ResponseData, Station } from "../types/types";

const api = axios.create({
  baseURL: `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_BIKE_API_KEY}/json/bikeList`,
});

const useStations = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const promises = [
      api.get<ResponseData>("/1/1000/1"),
      api.get<ResponseData>("/1001/2000/1"),
    ];

    (async () => {
      setLoading(true);

      const responses = await Promise.all(promises);

      const tempStations: Station[] = [];

      responses.forEach((res) => {
        console.log(res.data);
        tempStations.push(...res.data.getStationListHist.row);
      });

      setStations(tempStations);

      setLoading(false);
    })();
  }, []);

  return { stations, loading };
};

export default useStations;
