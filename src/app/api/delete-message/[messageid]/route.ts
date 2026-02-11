import UserModel from '@/model/user.model';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import { User } from 'next-auth';
import { Message } from '@/model/user.model';
import { NextRequest } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/option';
import mongoose from 'mongoose';




export async function DELETE(
  request: Request,
  context: { params: Promise<{ messageid: string }> }
) {
  const { messageid } = await context.params;

  const messageId = new mongoose.Types.ObjectId(messageid);

  await dbConnect();

  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { message: "Message not found", success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Message deleted", success: true },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Error deleting message", success: false },
      { status: 500 }
    );
  }
}
