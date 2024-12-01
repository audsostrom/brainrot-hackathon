import Link from "next/link";
import {auth} from "@/app/auth";
import SignOut from "@/components/sign-out/SignOut";
import ThemeButton from "@/components/theme-button/ThemeButton";
import {Box, Flex} from "@radix-ui/themes";

export default async function Navbar() {
    const session = await auth();

    return (
        <nav
            className="dark:bg-gray-900 w-full">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Audrey&#39;s Property</span>
                </Link>

                <Flex gap={'3'} justify={'center'} align={'center'} className="md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <ThemeButton />

                    {session?.user ? (
                        <SignOut />
                        ) : (
                        <Link href={'/login'}>
                            <button type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Login
                            </button>
                        </Link>
                    )}
                </Flex>
                <Box className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                     id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href="#"
                               aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                </Box>
            </div>
        </nav>
    );
}