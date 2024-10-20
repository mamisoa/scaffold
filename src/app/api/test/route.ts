import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'  // Assuming prisma is exported from a local module

export async function GET() {
  try {
    // Fetch all records from the accounts table
    const account = await prisma.account.findMany();

    // Return the records in the response
    return NextResponse.json(account);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching accounts:', error);
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 });
  }
}
