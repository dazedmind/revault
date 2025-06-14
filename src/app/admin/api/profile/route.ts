import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // install with `npm install jose`
import { prisma } from "@/lib/prisma"; // adjust based on your setup
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    const payload: any = jwt.verify(token, SECRET_KEY);
    // console.log("JWT Payload:", payload);

    const userNumber = Number(payload.userNumber); // <- FIXED
    let user;

    if (payload.role === "ADMIN") {
      user = await prisma.librarian.findFirst({
        where: { employee_id: userNumber },
        include: { users: true },
      });

      if (user) {
        user = {
          ...user,
          employee_id: user.employee_id.toString(),
          users: {
            ...user.users,
            user_id: user.users.user_id.toString(),
            name: user.users.first_name + " " + user.users.last_name,
          },
        };
      }
    } else if (payload.role === "ADMIN_ASSISTANT") {
      user = await prisma.librarian.findFirst({
        where: { employee_id: userNumber },
        include: { users: true },
      });

      if (user) {
        user = {
          ...user,
          employee_id: user.employee_id.toString(),
          users: {
            ...user.users,
            user_id: user.users.user_id.toString(),
            name: user.users.first_name + " " + user.users.last_name,
          },
        };
      }
    } else if (payload.role === "LIBRARIAN") {
      user = await prisma.librarian.findFirst({
        where: { employee_id: userNumber },
        include: { users: true },
      });

      if (user) {
        user = {
          ...user,
          employee_id: user.employee_id.toString(),
          users: {
            ...user.users,
            user_id: user.users.user_id.toString(),
            name: user.users.first_name + " " + user.users.last_name,
          },
        };
      }
    } else {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.role = payload.role; // set role to pass on to the front-end

    return NextResponse.json(user);
  } catch (err) {
    console.error("Error verifying token:", err);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 403 },
    );
  }
}
