/**
 * v0 by Vercel.
 * @see https://v0.dev/t/sxrUuhObRwI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import {Box, Container, Grid, Heading, Section, Text} from "@radix-ui/themes";
import Image from "next/image";

export default function Page() {
    const logos = ['att', 'google', 'meta', 'microsoft'];

    return (
        <main>
            <Section className="w-full py-12 md:py-24 lg:py-32 px-6">
                <Container>
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <Image
                            src={"/images/cover.jpg"}
                            width="550"
                            height="550"
                            alt="Hero"
                            className="mx-auto grayscale aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                        />
                        <div className="flex flex-col justify-center space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    The complete platform to keep your money up
                                </h1>
                                <Text as={'p'} className="my-4 max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Give your team the education that they deserve. With thousands of courses,
                                    you can elevate your mind. Get ya money up not ya funny up.
                                </Text>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link
                                    href="/login"
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                    prefetch={false}
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href="#"
                                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                                    prefetch={false}
                                >
                                    Contact Sales
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
            <Section className="w-full py-12 px-6">
                <Container>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className={'mb-8'}>
                            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                                New Courses Every Week
                            </div>
                            <Heading as={'h2'} className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Maxxing Learning Stats.</Heading>
                            <Text as={'p'} className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                The platform for rapid big brain progress. Let your team focus on catching up with the latest.
                                Trust us, we know what we&#39;re doing, unlike Coursera.
                            </Text>
                        </div>
                    </div>
                    <div
                        className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">Infinite knowledge</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Become the smartest person in the room with our infinite knowledge.
                            </p>
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">Better than Neuralink</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Don&#39;t let Elon Musk control your brain. Use our platform instead.
                            </p>
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">Edging to learn</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                The only platform that will make you want to learn more 24/7.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>
            <Section className="w-full px-6 py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                <Container className="grid items-center justify-center gap-4 px-4 text-center md:px-6">
                    <Box className="space-y-3">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Trusted and Backed by America&#39;s Most Trusted Companies
                        </h2>
                        <Text as={'p'} className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            If you can trust them with your personal data, you can trust us with your business.
                        </Text>
                    </Box>
                    <Grid columns={'4'}>
                        {logos.map((logo) => (
                            <Image
                                key={logo}
                                src={`/images/logos/${logo}-logo.png`}
                                width="200"
                                height="100"
                                alt={logo}
                                className="mx-auto grayscale opacity-85	"
                                objectFit={'contain'}
                            />
                        ))}
                    </Grid>
                </Container>
            </Section>
        </main>
    )
}
