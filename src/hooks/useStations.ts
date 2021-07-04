import { useEffect, useState } from "react";
import { Station } from "../types/types";

export const useStations = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetch("/.netlify/functions/token-hider");
        const data = await res.json();
        setStations(data.rentBikeStatus.row);
        if (!res.ok) {
          throw new Error(
            "서울 공공 데이터 API에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요."
          );
        }
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    })();
  }, []);

  return { stations, loading, error };
};
