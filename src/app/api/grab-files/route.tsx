import fs from 'fs/promises';
import path from 'path';
import { getGuideFiles, getUserGuide, createUserGuide, getCourse } from "@/app/db";
import { auth } from '@/app/auth';

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    const guideId = searchParams.get('guideId');


    if (!courseId || !guideId) {
      return new Response("Missing courseId or guideId", { status: 400 });
    }

    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Check if user guide exists
    const course = await getCourse(courseId)
    const userGuide = await getUserGuide(userId, courseId);

    let userFiles: { file: string; content: string;}[] = [];
    if (userGuide) {
      userFiles = userGuide.files.map((file: { fileName: string; fileContent: string; }) => ({
        file: file.fileName,
        content: file.fileContent
      }));
    } else {
      // No user guide found, create one with files from getGuideFiles
      const guideFiles = await getGuideFiles(guideId);
      userFiles = guideFiles.map(guide => ({
        file: guide.name,
        content: guide.content
      }));
      const completedArray = course.guideIds.reduce((map: { [x: string]: boolean; }, guideId: string) => {
        map[guideId] = false; // Initialize all guideId as incomplete (false)
        return map;
      }, {});

      // Create new UserGuide
      await createUserGuide({
        courseId,
        userId,
        completed: completedArray,
        files: userFiles.map(file => ({
          fileName: file.file,
          fileContent: file.content
        })),
      });
    }

    const listOfFiles = new Set(userFiles.map((file) => file.file));

    // Add base files not in user guide
    const baseFileContents = await Promise.all(
      baseProjectFiles.map(async (filePath) => {
        if (!listOfFiles.has(filePath)) {
          try {
            const fileContent = await fs.readFile(
              path.join(process.cwd(), 'public', 'guides', 'base', filePath),
              'utf8'
            );
            return { file: filePath, content: fileContent };
          } catch (error) {
            console.error(`Error reading file ${filePath}:`, error);
            return null;
          }
        } else {
          return null;
        }
      })
    );

    const fileContents = [
      ...userFiles,
      ...baseFileContents.filter((content) => content !== null),
    ];

    return Response.json({ files: fileContents, completed: userGuide ? userGuide.completed : false });
  } catch (error) {
    console.error("Error in GET endpoint:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}