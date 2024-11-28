import Link from "next/link";
import { createFile, getCoursesWithGuides } from "../db";

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
	const courses: CourseWithGuides[] = await getCoursesWithGuides();
	console.log(courses);
	return (
			<div>
			  <h1>Courses</h1>
			  <ul>
				 {courses.map((course) => (
					<li key={course._id}>
					  <h2>{course.title}</h2>
					  <ul>
						 {course.guides.map((guide) => (
							<li key={guide._id}>
								<Link href={`guide/${course._id}/${guide._id}`}>
									<strong>{guide.title}</strong>
								</Link>
							</li>
						 ))}
					  </ul>
					</li>
				 ))}
			  </ul>
			</div>
	);
}