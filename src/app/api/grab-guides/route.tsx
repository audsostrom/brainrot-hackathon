import { getCourseData } from "@/app/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const course = await getCourseData(id ?? '');
	return Response.json({ response: course});
}
