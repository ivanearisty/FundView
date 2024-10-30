import Link from 'next/link';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        <li><Link href="/stocks">Stocks</Link></li>
        <li><Link href="/industries">Industries</Link></li>
        <li><Link href="/funds">Funds</Link></li>
      </ul>
    </div>
  );
}