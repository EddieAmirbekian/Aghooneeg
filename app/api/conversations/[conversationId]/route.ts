import db from '@/lib/db';
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { pusherServer } from '@/lib/pusher';

interface Params {
  conversationId?: string;
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const existingConversation = await db.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    });

    if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const deletedConversation = await db.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id]
        }
      }
    });

    existingConversation.users.forEach(user => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:remove", existingConversation);
      }
    })

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}