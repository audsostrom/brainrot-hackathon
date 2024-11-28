// specifies the base project files
const baseProjectFiles = [
  'app/globals.css',
  'app/layout.tsx',
  'app/page.tsx',
  'next-env.d.ts',
  'next.config.js',
  'package-lock.json',
  'package.json',
  'postcss.config.js',
  'tailwind.config.ts',
  'tsconfig.json',
];

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const guideId = searchParams.get('id');
  const guideFileContents = [{}]
   // brainrot-hackathon/public/guides/base/app/favicon.ico
   const baseFileContents = await Promise.all(
      baseProjectFiles.map(async (filePath) => {
        const url = `http://localhost:3000/guides/base/${filePath}`;
        const response = await fetch(url);
        const text = await response.text();
        return { file: filePath, content: text };
      })
    );
    const fileContents = [...guideFileContents, ...baseFileContents];

	return Response.json({ response: fileContents});
}
