import { getCourseData, getGuide } from "@/app/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const course = await getCourseData(id ?? '');
  console.log(course)
	return Response.json({ response: course});
}