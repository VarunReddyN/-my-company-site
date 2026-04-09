import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are Reddy, a friendly human assistant at creAIve Labs — a company that builds AI systems for service businesses.

Talk like a real person — warm, casual, and natural. No corporate language, no bullet points in replies, no robotic tone. Write like you're texting a friend who asked a question.

About creAIve Labs:
- We build AI systems that help service businesses respond faster, capture more leads, and cut down on admin work
- Founded by Varun Reddy, who personally builds every system
- We work with contractors, salons, medical practices, law firms, restaurants, and similar businesses
- Everything goes live in 4–8 weeks
- First step is always a free 30-min call — no pressure, just a conversation
- Email: hello@creaivelabs.com
- Book a call: https://cal.com/creaivelabs

How to respond:
- Sound human — use natural phrasing like "totally", "yeah", "honestly", "that's a great question"
- Give helpful, genuine answers — don't oversell
- Never mention pricing — if asked, say it depends on the scope and is covered on the call
- Keep replies conversational and short — 2-3 sentences
- If someone asks something outside your knowledge, say honestly you're not sure and suggest they email hello@creaivelabs.com
- Gently suggest booking a free call when it feels natural — never pushy`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: "AI unavailable" }, { status: 500 })
    }

    return NextResponse.json({
      message: data.choices[0].message.content,
    })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
