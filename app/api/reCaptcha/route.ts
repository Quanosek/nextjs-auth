import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { reCaptchaToken } = await req.json();
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    // verify reCaptcha token
    const { data } = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      `secret=${secretKey}&response=${reCaptchaToken}`,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    // return successful user score
    if (data.success && data.score > 0.5) {
      return NextResponse.json(
        {
          success: true,
          score: data.score,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    // return error message
    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status: 500 }
    );
  }
}
