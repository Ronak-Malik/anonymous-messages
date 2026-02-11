import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Mystery Message Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    // 1. CRITICAL FIX: Check for API errors returned by Resend
    // If 'error' exists, the email was NOT sent.
    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, message: error.message };
    }

    // 2. If no error, then it was successful
    return { success: true, message: 'Verification email sent successfully' };

  } catch (emailError) {
    // This catch block only handles network connection crashes
    console.error('Network/Unexpected Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email' };
  }
}