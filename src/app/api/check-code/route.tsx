// import { auth } from "@/app/auth";
import { HfInference } from "@huggingface/inference";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // const session = await auth();
    const { updatedFiles } = body;

    const client = new HfInference(`${process.env.HUGGINGFACE_KEY}`);

    const chatCompletion = await client.chatCompletion({
      model: 'Qwen/Qwen2.5-Coder-32B-Instruct',
      messages: [
        {
          role: 'user',
          content: `Is the following provided to lines of code: \n${updatedFiles.join('\n')}. If it, write Yes. If not, respond No.`,
        },
      ],
      max_tokens: 500,
    });

    return Response.json({ response: chatCompletion.choices[0].message.content ?? ''});
  } catch (error) {
    console.error("Error handling POST request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}