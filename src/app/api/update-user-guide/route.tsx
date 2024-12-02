import { auth } from "@/app/auth";
import {getUserGuide, updateUserGuide} from "@/app/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await auth();
    const { courseId, updatedFiles, guideId } = body;

    if (!courseId || !updatedFiles || !guideId) {
      return new Response(JSON.stringify({ error: "Missing required parameters" }), {
        status: 400,
      });
    }

    const { completed } = await getUserGuide(session?.user?.id ?? '', courseId);
    completed[0][guideId] = true;

    const updatedGuide = await updateUserGuide(session?.user?.id ?? '', courseId, completed, updatedFiles);
    return new Response(JSON.stringify({ response: updatedGuide }), { status: 200 });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}