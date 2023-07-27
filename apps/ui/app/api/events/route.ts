import Prisma, { prisma } from '@db';
import { authOptions } from '@ui/lib/auth';
import { Session, getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

interface NewEvent {
  name: string;
  description?: string;
  type: Prisma.EventType;
  startAt: Date;
  endAt?: Date;
}

export async function POST(req: Request) {
  try {
    const session = (await getServerSession(authOptions)) as Session;
    const data = (await req.json()) as NewEvent;

    const event = await prisma.events.create({
      data: {
        ...data,
        createdByUserId: (session.user as any).id,
        eventUsers: {
          create: {
            userId: (session.user as any).id,
          },
        },
      },
    });

    return NextResponse.json({
      event,
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
