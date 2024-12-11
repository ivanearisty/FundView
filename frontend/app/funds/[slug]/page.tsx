"use client"; 

import SingleSlider from "@/components/SingleSlider";
import Scatterplot, { DataPoint } from "@/components/line_chart_modular";
import { FundDataPoint, fetchTestData } from "@/lib/api";
import { use, useEffect, useState } from "react";

const processDataForScatterplot = (data: FundDataPoint[]) => {
  return data.map(d => ({
    time: d.reporting_date,
    holdings: d.value,
    stock: d.name_of_issuer
  })).sort((a, b) => a.time < b.time ? 1 : -1) as DataPoint[];
};

const getQuarters = (quarters: string[], indices: number[]) => {
  switch (indices.length) {
    case 0:
      return [];
    case 1:
      return [quarters[indices[0]]];
      return quarters.slice(indices[0], indices[1] + 1);
  }
};

export default function FundDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = use(params).slug;

  const [data, setData] = useState([] as FundDataPoint[]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestData()
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, []);
  
  if (isLoading) return (
    <p>Loading...</p>
  )
  if (!data) return (
    <p>No data!!!</p>
  )
  return (
    <div>
      <h1>Fund Details for {slug}</h1>
      <p>View detailed information about fund {slug}.</p>
      <div style={{ width: "100%" }}>
        <div style={{ width: "50%", display: "inline-block" }}>
          <div style={{ width: "70%", height: "100px", marginLeft: "auto", marginRight: "auto", marginTop: "50px" }}>
            <SingleSlider quarters={[...new Set(data.map(d => dateToQuarter(d.reporting_date)))]} />
          </div>
        </div>
        <div style={{ width: "50%", display: "inline-block" }}>
          <Scatterplot
            width={0.45} height={400} title="Sample text" groupKey="stock"
            data={processDataForScatterplot(data)}
          />
        </div>
      </div>
    </div>
  );
}
