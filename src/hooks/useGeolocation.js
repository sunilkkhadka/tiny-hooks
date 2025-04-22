import { useEffect, useState } from "react";

export const useGeolocation = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    const success = (pos) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      });
      setError(null);
      setLoading(false);
    };

    const failure = (err) => {
      setError(err.message);
      setLoading(false);
    };

    const watcher = navigator.geolocation.watchPosition(success, failure);

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return { position, error, loading };
};
