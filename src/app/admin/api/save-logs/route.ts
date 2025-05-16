// app/api/save-logs/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "@/lib/prisma";
import { activity_type } from "@prisma/client";
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { activity, title, type } = body;

    if (!activity) {
      return NextResponse.json({ error: "Activity is required" }, { status: 400 });
    }

    if (!type || !Object.values(activity_type).includes(type)) {
      return NextResponse.json({ error: "Valid activity type is required" }, { status: 400 });
    }

    const newLog = await prisma.activity_logs.create({
      data: {
        user_id: parseInt(session.user.id),
        name: session.user.name || '',
        activity: title ? `${activity}: "${title}"` : activity,
        activity_type: type,
        user_agent: req.headers.get('user-agent') || '',
        ip_address: req.headers.get('x-forwarded-for') || '',
        status: 'success',
        librarian: {
          connect: {
            employee_id: parseInt(session.user.id)
          }
        }
      } as any,
    });

    return NextResponse.json(newLog, { status: 201 });
  } catch (err) {
    console.error("[LOGGING_ERROR]", err);
    return NextResponse.json(
      { error: "Failed to save activity log." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
