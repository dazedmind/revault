// app/api/save-user/route.ts
import { saveInformation } from "../../actions/saveInformation"; // Adjust path if needed

export async function POST(req: Request) {
  try {
    const body = await req.formData(); // Send formData from client later
    await saveInformation(body);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
