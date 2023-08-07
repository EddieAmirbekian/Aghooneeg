import db from '@/lib/db';
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface Params {
  conversationId?: string;
};

export async function POST(req: Request, { params }: { params: Params }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        messages: {
          include: {
            seen: true
          }
        },
        users: true
      }
    });

    if (!conversation) {
      return new NextResponse('Invalid id', { status: 400 });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updatedMessage = await db.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      }
    });

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}