import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/user.model";
import { messageSchema } from "@/schemas/messageSchema";

export async function POST(request:Request){
    await dbConnect();

    const {username,content} = await request.json();

    try{
        const user = await UserModel.findOne({username}).exec();

        if(!user){
            return Response.json(
                {success:false,message:'user not found'},
                {status:404}
            );
            
        }
        if(!user.isAcceptingMessages){
            return Response.json(
                {success:false,message:'user is not accepting messages'},
                {status:403}
            );
        }

        const newMessage = {content, createdAt: new Date()};
        user.messages.push(newMessage as Message);
        await user.save();
        
        return Response.json(
            {success:true,message:'message sent successfully'},
            {status:200}
        );
    }catch(error){
        console.error("error in adding message in message array ",error);
        return Response.json(
            {succss:false,message:'internal server error'},
            {status:500}
        )
    }
}

