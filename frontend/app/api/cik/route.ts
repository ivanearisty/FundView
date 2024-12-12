import { NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET() {
    try {
      const ciks = await db.query('SELECT DISTINCT CIK FROM SUBMISSION');
      return NextResponse.json(ciks);
    } catch (error) {   
      console.error('Error fetching CIKs:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  