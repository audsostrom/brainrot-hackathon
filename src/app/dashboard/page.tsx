import Link from "next/link";
import { getCoursesWithGuides } from "../db";
import {auth} from "@/app/auth";
import {Box, Container, Heading, Text} from "@radix-ui/themes";

interface Guide {
	_id: string;
	courseId: string;
	title: string;
	description: string;
	content: string;
	createdAt: string;
	updatedAt: string;
 }

 interface CourseWithGuides {
	_id: string;
	title: string;
	description: string;
	guideIds: string[];
	guides: Guide[];
	createdAt: string;
	updatedAt: string;
 }

/** Dashboard where people click on guides */
export default async function Dashboard() {
	const session = await auth();
	const courses: CourseWithGuides[] = await getCoursesWithGuides();

	return (	
		<>
			<Box as={'div'} width={'100%'} style={{
				backgroundColor: '#f2f5fa',
			}}>
				<Container className={'py-12'}>
					<Heading as="h1">Courses</Heading>
					<Text>Wassup, {session?.user?.name}</Text>
				</Container>
			</Box>
			<Container className={'py-12'}>
				<ul>
					{courses.map((course) => (
						<li key={course._id}>
							<h2>{course.title}</h2>
							<ul>
								{course.guides.map((guide) => (
									<li key={guide._id}>
										<Link href={`/guide/${course._id}/${guide._id}`}>
											<strong>{guide.title}</strong>
										</Link>
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</Container>
		</>
	);
}