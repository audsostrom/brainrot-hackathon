import { getCoursesWithGuides } from "../db";

/** Dashboard where people click on guides */
export default async function Dashboard() {
	const guides = await getCoursesWithGuides();
	console.log(guides)
	return (
      <div>Heyyyy</div>
	);
}