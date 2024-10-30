// app/stock/page.tsx
export default function StockOverview() {
    return (
      <div>
        <h1>Market Overview</h1>
        <p>Get insights into the latest market trends, top gainers, and losers.</p>
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
  