'use client';
import { useState } from 'react';

export default function GeminiChat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const askGemini = async () => {
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: "user",
            parts: [{ text: input }]
          }]
        })
      });
      
      const data = await res.json();
      setResponse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      setResponse("حدث خطأ: " + error.message);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gemini Chat</h1>
      
      <textarea
        className="w-full p-2 border rounded mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="اكتب سؤالك هنا..."
      />
      
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={askGemini}
      >
        إرسال
      </button>
      
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">الإجابة:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
