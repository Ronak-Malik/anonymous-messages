
//CORE LOGIC FOR VERIFYING CODE =
//*db connect
  //username code ko server tk bejna 
  //fhir username ko decode krna hai
  //fhir user ko db me dundna hai {username: decode krke jo bhi aya }
  //fhir agr user nhi mila tho message bej dena hai or status 
  //check if the code is correct and not expired ( strict check krna ha user.verifycode ko code se )
  //agr shai hai tho user ko verify dikha dena ha or save kr lena hai user ko await user.save()
  //then write else condition
  
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        { message: "User not found" },
        { status: 400 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        { success: true, message: "User is verified successfully" },
        { status: 200 }
      );
    } else if (!isCodeValid) {
      return Response.json(
        { success: false, message: "Your code is not valid" },
        { status: 400 }
      );
    } else {
      return Response.json(
        { success: false, message: "Your code is expired" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    return Response.json(
      { success: false, message: "Error verifying user" },
      { status: 500 }
    );
  }
}
