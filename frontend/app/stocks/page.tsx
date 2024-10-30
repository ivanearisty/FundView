'use client';

import { useEffect, useState } from "react";
import { fetchHelloData } from "../../lib/api";

export default function StockOverview() {
  
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchHelloData();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Market Overview</h1>
      {data ? <h1>{data}</h1> : <p>Loading data...</p>}
      <p>
        Get insights into the latest market trends, top gainers, and losers.
      </p>
      <div>
        <h2>Top Gainers</h2>
        <ul>
          <li>Stock A - +5%</li>
          <li>Stock B - +3%</li>
        </ul>
        <h2>Top Losers</h2>
        <ul>
          <li>Stock X - -4%</li>
          <li>Stock Y - -2%</li>
        </ul>
      </div>
    </div>
  );
}
