// app/api/save-user/route.ts
import { saveInformation } from "../../actions/saveInformation"; // Adjust path if needed

export async function POST(req: Request) {
  try {
    const formData = await req.json(); // Now this includes everything (including role)
    await saveInformation(formData);  // Just one param now
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}

