export const runtime = 'edge'; // لتحسين الأداء

export async function POST(request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "API Key غير مضبوط" },
      { status: 500 }
    );
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  try {
    const { messages } = await request.json();
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: messages })
    });

    const data = await response.json();
    return Response.json(data);
    
  } catch (error) {
    return Response.json(
      { error: "فشل في الاتصال بـ Gemini API: " + error.message },
      { status: 500 }
    );
  }
}
