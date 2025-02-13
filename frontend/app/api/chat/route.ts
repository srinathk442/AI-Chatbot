import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Call OpenAI API
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await res.json();
    return NextResponse.json({ reply: data.choices[0]?.message?.content || "No response" });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ reply: "Error fetching AI response" }, { status: 500 });
  }
}
