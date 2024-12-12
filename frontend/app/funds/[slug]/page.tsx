"use client"; 

import Barchart from "@/components/Barchart";
import Slider from "@/components/Slider";
import LineChart, { DataPoint } from "@/components/line_chart_modular";
import { FundDataPoint, fetchTestData } from "@/lib/api";
import { use, useEffect, useState } from "react";
import Select from 'react-select';

const processDataForLineChart = (data: FundDataPoint[]) => {
  return data.map(d => ({
    time: d.reporting_date,
    holdings: d.value,
    stock: d.name_of_issuer
  })).sort((a, b) => a.time < b.time ? 1 : -1) as DataPoint[];
};

const processDataForBarChart = (data: FundDataPoint[]) => {
  return data.map(d => ({
    holdingAmount: d.value,
    stock: d.name_of_issuer,
    time: d.reporting_date
  }));
};

const getQuarters = (quarters: string[], indices: number[]) => {
  switch (indices.length) {
    case 0:
      return [];
    case 1:
      return [quarters[indices[0]]];
    default:
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

  const [quarters, setQuarters] = useState([] as string[]);
  const quarterState = useState([0]);
  const quarterRangeState = useState([0, 0]);
  const companies = [...new Set(data.map(d => d.name_of_issuer))].map((c: string) => ({value: c, label: c}));
  const [companyFilter, setCompanyFilter] = useState(companies.slice(0, 10).map(v => v.value));

  useEffect(() => {
    fetchTestData()
      .then(({data, quarters: q}) => {
        setData(data);
        setLoading(false);
        setQuarters(q);
        quarterState[1]([q.length - 1]);
        quarterRangeState[1]([0, q.length - 1]);
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
        <div style={{ width: "70%", margin: "auto" }}>
          <Select
            isMulti
            name="stocks"
            options={companies}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={v => { setCompanyFilter(v.map(c => c.value)); }}
          />
        </div>
        <div style={{ width: "50%", display: "inline-block" }}>
          <div style={{ width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "50px" }}>
            <Slider quarters={quarters}
              state={quarterState} range={false} />
          </div>
          <h2>Holdings during {getQuarters(quarters, quarterState[0])[0]}</h2>
          <Barchart
            width={0.45} height={400} companies={companyFilter}
            data={processDataForBarChart(data)} quarter={getQuarters(quarters, quarterState[0])[0]}
          />
        </div>
        <div style={{ width: "50%", display: "inline-block" }}>
          <div style={{ width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "50px" }}>
            <Slider quarters={quarters}
              state={quarterRangeState} range={true} />
          </div>
          <h2>Trend of holding between {
            getQuarters(quarters, quarterRangeState[0]).filter((_, i, a) => i == 0 || i == a.length - 1).join(" and ")
          }</h2>
          <LineChart
            width={0.45} height={400} groupKey="stock" companies={companyFilter}
            data={processDataForLineChart(data)} quarters={getQuarters(quarters, quarterRangeState[0])}
          />
        </div>
      </div>
    </div>
  );
}
