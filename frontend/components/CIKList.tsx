import { db } from "@/lib/database";
import { RowDataPacket } from "mysql2";

async function getCIKs() {
  const ciks = await db.query('SELECT DISTINCT CIK FROM SUBMISSION');
  console.log(ciks);
  return ciks as CIKRow[];
}

export default async function DashboardPage() {
  const ciks = await getCIKs();

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>CIKs:</h2>
      <ul>
        {ciks.map((cik) => (
          <li key={cik.CIK}>{cik.CIK}</li>
        ))}
      </ul>
    </div>
  );
}

interface CIKRow extends RowDataPacket {
    CIK: string;
  }
  