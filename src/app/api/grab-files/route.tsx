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
   // brainrot-hackathon/public/guides/base/app/favicon.ico
   const fileContents = await Promise.all(
      baseProjectFiles.map(async (filePath) => {
        const url = `http://localhost:3000/guides/base/${filePath}`;
        console.log(
         'filepatj', url
      )
        const response = await fetch(url);
        const text = await response.text();
        return { file: filePath, content: text };
      })
    );

	return Response.json({ response: fileContents});
}
