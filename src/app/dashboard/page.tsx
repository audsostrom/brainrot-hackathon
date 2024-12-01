import {getCoursesWithAuthorMeta} from "../db";
import {auth} from "@/app/auth";
import {Avatar, Box, Card, Container, Flex, Heading, Inset, Link, Text} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { createFile, getCoursesWithGuides } from "../db";
import { auth } from "../auth";

interface User {
	_id: string;
	name: string;
	email: string;
	picture: string;
	createdAt: string;
	updatedAt: string;
 }

 interface CourseWithAuthorMeta {
	_id: string;
	title: string;
	description: string;
	guideIds: string[];
	thumbnail: string;
	 author: User;
	createdAt: string;
	updatedAt: string;
 }

/** Dashboard where people click on guides */
export default async function Dashboard() {
	const session = await auth();
	const courses: CourseWithAuthorMeta[] = await getCoursesWithAuthorMeta();

	const premiumCourses = [
		{
			_id: 'string',
			title: 'Diddy\'s Party',
			thumbnail: 'string',
			author: {
				name: 'Diddler',
				email: 'string',
				picture: 'https://assets.teenvogue.com/photos/662a56d60382705629dbb8d1/master/pass/GettyImages-1684346270.jpg',
			},
		}
	];

	return (
		<>
			<Box as={'div'} width={'100%'} style={{
				backgroundColor: '#f2f5fa',
			}}>
				<Container className={'py-12'}>
					<Heading as="h1" size={'8'}>Courses</Heading>
					<Text>Wassup, {session?.user?.name}</Text>
				</Container>
			</Box>
			<Container className={'py-12'}>
				<Heading as={'h2'} className={'mb-8'}>Standard</Heading>
				<Flex>
					{courses.map((course) => (
						<Box asChild={true} key={course._id}>
							<Link href={`/course/${course._id}`}>
								<Card size={'4'} className={'no-underline text-slate-900 	shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-100'}>
									<Inset clip="padding-box" side="top" >
										<Image
											src={`/images/${course.thumbnail}`}
											alt="nerd"
											width={200}
											height={200}
											style={{
												display: "block",
												objectFit: "cover",
												width: "100%",
												height: 200,
											}}
										/>
									</Inset>

									<Flex gap="3" align={'center'} className={'my-3'}>
										<Avatar
											src={`${course.author?.picture}`}
											size={'2'}
											fallback="A"
											className={'border'}
											radius={'full'}
										/>
										<Text size={'2'}>{course.author?.name}</Text>
									</Flex>

									<Heading as={'h3'} className={'font-bold'}>{course.title}</Heading>

									<Text as={'p'} className={'mt-20 text-gray-400'}>Course</Text>
								</Card>
							</Link>
						</Box>
					))}
				</Flex>

				<Heading as={'h2'} className={'mt-10 mb-8'}>Premium Content 🥵🌶️</Heading>
				<Flex>
					{premiumCourses.map((course) => (
						<Box asChild={true} key={course._id}>
							<Link href={`/course/${course._id}`}>
								<Card size={'4'} className={'no-underline text-slate-900 	shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-100'}>
									<Inset clip="padding-box" side="top" >
										<Image
											src={`/images/${course.thumbnail}`}
											alt="nerd"
											width={200}
											height={200}
											style={{
												display: "block",
												objectFit: "cover",
												width: "100%",
												height: 200,
											}}
										/>
									</Inset>

									<Flex gap="3" align={'center'} className={'my-3'}>
										<Avatar
											src={`${course.author?.picture}`}
											size={'2'}
											fallback="A"
											className={'border'}
											radius={'full'}
										/>
										<Text size={'2'}>{course.author?.name}</Text>
									</Flex>

									<Heading as={'h3'} className={'font-bold'}>{course.title}</Heading>

									<Text as={'p'} className={'mt-20 text-gray-400'}>Course</Text>
								</Card>
							</Link>
						</Box>
					))}
				</Flex>
			</Container>
		</>
	);
}