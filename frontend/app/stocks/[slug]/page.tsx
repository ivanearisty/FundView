// import { useEffect, useState } from "react";
// import { fetchHelloData } from "../../../lib/api";
// import * as d3 from 'd3'

export default async function StockDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <div>
      <h1>Stock Details for {slug}</h1>
      <p>View detailed information about stock {slug}.</p>
      <div>
        <h2>Price</h2>
        <p>$2500 (example)</p>
        <h2>Performance</h2>
        <p>Up 1.5% today</p>
        <h2>Company Info</h2>
        <p>Details about the company, recent news, and more.</p>
      </div>
    </div>
  );
}
