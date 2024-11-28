import { getGuide } from "@/app/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const guide = await getGuide(id ?? '');
	return Response.json({ response: guide});
}
