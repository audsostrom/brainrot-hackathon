import { auth } from "@/app/auth";
import { getCourseData, getGuide, updateUserGuide } from "@/app/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await auth();
    const { courseId, updatedFiles } = body;

    if (!courseId || !updatedFiles) {
      return new Response(JSON.stringify({ error: "Missing required parameters" }), {
        status: 400,
      });
    }

    const updatedGuide = await updateUserGuide(session?.user?.id ?? '', courseId, updatedFiles);
    return new Response(JSON.stringify({ response: updatedGuide }), { status: 200 });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}