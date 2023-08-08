import db from '@/lib/db';
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const {
      name,
      image
    } = body;
    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const updateUser = await db.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        image,
        name
      }
    });

    return NextResponse.json(updateUser);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}