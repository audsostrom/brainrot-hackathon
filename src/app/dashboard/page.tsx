import {getCoursesWithAuthorMeta} from "../db";
import {Avatar, Box, Card, Container, Flex, Grid, Heading, Inset, Link, Text} from "@radix-ui/themes";
import Image from "next/image";
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
			_id: 'https://www.fbi.gov/',
			title: 'Diddy\'s Party',
			thumbnail: 'diddy.webp',
			author: {
				name: 'Diddler',
				email: 'string',
				picture: 'diddy-mugshot.jpg',
			},
		},
		{
			_id: 'https://www.lapdonline.org/contact-us/',
			title: 'Getting Away with Murder',
			thumbnail: 'oj-simp-cover.webp',
			author: {
				name: 'OJ Simpson',
				email: 'string',
				picture: 'og-simp-avatar.jpg',
			},
		},
		{
			_id: 'https://www.justice.gov/opa/pr/samuel-bankman-fried-sentenced-25-years-his-orchestration-multiple-fraudulent-schemes',
			title: 'How to Become a Millionaire',
			thumbnail: 'sam-bankman-cover.jpg',
			author: {
				name: 'Sam Bankman',
				email: 'string',
				picture: 'sam-bankman-profile.webp',
			},
		},
		{
			_id: 'https://open.spotify.com/album/0hvT3yIEysuuvkK73vgdcW',
			title: 'How to be the Best in the Rap Game',
			thumbnail: 'drake-cover-2.jpg',
			author: {
				name: 'Drake',
				email: 'string',
				picture: 'drake-profile.webp',
			},
		},
		{
			_id: 'https://wpengine.com/',
			title: 'How to Control Your Ego',
			thumbnail: 'matt-cover-1.webp',
			author: {
				name: 'Matt Mullenweg',
				email: 'string',
				picture: 'matt-mullenweg.png',
			},
		},
		{
			_id: 'https://www.google.com/search?q=amazon+toxic+work+culture',
			title: 'Making a Safe Work Environment',
			thumbnail: 'amazon-cover.jpg',
			author: {
				name: 'Jeff Bezos',
				email: 'string',
				picture: 'jeff-profile.webp',
			},
		}
	];

	return (
		<>
			<Box minWidth={'300px'} as={'div'} width={'100%'} style={{
				backgroundColor: '#f2f5fa',
			}}>
				<Container className={'py-12'}>
					<Heading as="h1" size={'8'}>Courses</Heading>
					<Text>Wassup, {session?.user?.name}</Text>
				</Container>
			</Box>
			<Container className={'py-12'}>
				<Heading as={'h2'} className={'mb-8'}>Standard</Heading>
				<Grid columns={'3'} gap={'2'}>
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
				</Grid>

				<Heading as={'h2'} className={'mt-10 mb-8'}>Exclusive Content 🥵🌶️</Heading>
				<Grid columns={'3'} gap={'3'}>
					{premiumCourses.map((course) => (
						<Box minWidth={'300px'} asChild={true} key={course._id}>
							<Link href={`${course._id}`} target={'_blank'}>
								<Card size={'4'} className={'no-underline text-slate-900 shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-100'}>
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
											src={`/images/${course.author?.picture}`}
											size={'3'}
											fallback="A"
											className={'border'}
											radius={'full'}
										/>
										<Text size={'3'}>{course.author?.name}</Text>
									</Flex>

									<Heading as={'h3'} className={'font-bold'}>{course.title}</Heading>

									<Text as={'p'} className={'mt-20 text-gray-400'}>Course</Text>
								</Card>
							</Link>
						</Box>
					))}
				</Grid>
			</Container>
		</>
	);
}