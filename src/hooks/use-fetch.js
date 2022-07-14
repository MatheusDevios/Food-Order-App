import { useCallback, useState, useEffect } from "react";

const useFetch = (url) => {
  const [fetchedData, setFetchedData] = useState({
    data: [],
    isLoading: true,
    error: false,
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      //   console.log(response);
      if (!response.ok) {
        throw new Error("Error fetching data.");
      }

      const data = await response.json();
      //   console.log(data);

      if (data) {
        setFetchedData({
          data: data,
          isLoading: false,
          error: false,
        });
      }
    } catch (err) {
      console.log(err);
      setFetchedData({
        data: [],
        isLoading: false,
        error: true,
      });
    }
    // console.log(fetchedData);
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  const { data, isLoading, error } = fetchedData;
  return { data, isLoading, error };
};

export default useFetch;
