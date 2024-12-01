'use client';

import { useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {getCourseWithGuides} from "@/app/db";
import {Avatar, Box, Button, Container, Flex, Heading, Link, Text} from "@radix-ui/themes";
import Image from "next/image";

interface Course {
    _id: string;
    title: string;
    description: string;
    guides: Guide[];
    thumbnail: string;
    author: User;
}

interface Guide {
    _id: string;
    courseId: string;
    description: string;
    title: string;
    
}

interface User {
    _id: string;
    name: string;
    email: string;
    picture: string;
    createdAt: string;
    updatedAt: string;
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Course() {
    const params = useParams();
    const router = useRouter()
    const courseId = params.id as string;
    const [course, setCourse] = useState<Course>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await getCourseWithGuides(courseId);
                if (!response) {
                    router.push('/404');
                }

                setCourse(response);
                await sleep(1000);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };
        fetchCourse();
    }, []);

    if (loading) {
        return (
            <Container className={'py-24'}>
                <Flex direction={'column'} align={'center'} justify={'center'} gap={'4'} className={'py-36'}>
                    <Heading>Wait</Heading>
                    <Image src={'/images/wait.webp'} alt={'wait'} className={'rounded-full'} width={200} height={200}/>
                </Flex>
            </Container>
        );
    }

    return (
        <>
            {(!loading && course) && (
                <>
                <Box className={'py-12'} style={{
                    backgroundColor: '#f2f5fa',
                }}>
                    <Container>
                        <Heading as={'h1'} size={'8'}>{course.title}</Heading>
                        <Box>
                            <Text as={'p'} size={'2'} className={'mt-4 mb-1'}>Brought you by</Text>
                            <Flex align={'center'} className={'mb-8'}>
                                <Avatar
                                    src={`${course.author.picture}`}
                                    size={'3'}
                                    fallback="A"
                                    className={'border'}
                                    radius={'full'}
                                />
                                <Text as={'p'} size={'2'} className={'ml-4'}>{course?.author?.name}</Text>
                            </Flex>
                        </Box>
                        <Text as={'p'}>{course?.description}</Text>
                    </Container>
                </Box>
                <Container className={'py-12'}>
                    <Heading as={'h2'} className={'mt-10'}>Guides</Heading>
                    <Box className={'border-2 border-slate-600 rounded mt-6'}>
                        {course?.guides.map((guide, index) => (
                            <Flex justify={'between'} align={'center'} key={guide._id} className={'border-b-2 last:border-0 border-slate-600 px-4 py-8'}>
                                <Box>
                                    <Heading as={'h3'} size={'5'} className={'font-bold'}>{guide.title}</Heading>
                                    <Text as={'p'} size={'2'} className={'text-slate-500'}>Course {index+1} of {course?.guides.length}</Text>
                                </Box>
                                <Button asChild={true}>
                                    <Link href={`/guide/${courseId}/${guide._id}`}>
                                        <Text>Read Guide</Text>
                                    </Link>
                                </Button>
                            </Flex>
                        ))}
                    </Box>
                </Container>
                </>
            )}
        </>
  );
}