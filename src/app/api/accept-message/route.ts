import UserModel from "@/model/user.model";
import { authOptions } from "../auth/[...nextauth]/option";
import NextAuth, { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import {User} from 'next-auth';

export async function POST(request:Request){
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user:User = session?.user ;
    if(!session || !session.user){
        return Response.json(
            {success:false,message:'not authenticated'},
            {status:401}
        );
    }

    const userId =  user._id;
    const {acceptMessages} = await request.json();

    try{
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessages: acceptMessages },
            { new: true }
        );

        if(!updatedUser){
            return Response.json(
                {success:false,message:'unable to find user to update message acceptance status '},
                {status:404}
            );
        }
        return Response.json(
            {success:true,message:'message acceptance status updated '},
            {status:200}
        );
    }catch(error){
        console.error('Error updating message acceptance status:', error);
        return Response.json(
            {success:false,message:'error updating message acceptance status'},
            {status:500}
        );
    }
    
}

export async function GET(request:Request){
    await dbConnect();


    const session = await getServerSession(authOptions);
    const user = session?.user;

    if(!session || !session.user){
        return Response.json(
            {success:false,message:'user is not authenticated'},
            {status:401}
        );
    }
    try{
        const foundUser = await UserModel.findById(user._id);
        if(!foundUser){
            return Response.json(
                {success:false,message:'user notfound'},
                {status:404}
            );
        }
        return Response.json(
            {
                success:true,
                isAcceptingMessages:foundUser.isAcceptingMessages,
            },
            {
                status:200
            }
        );
    }catch(error){{
        console.error('Error retrieving message acceptance status:', error);
    return Response.json(
      { success: false, message: 'Error retrieving message acceptance status' },
      { status: 500 }
    );
    }}
}