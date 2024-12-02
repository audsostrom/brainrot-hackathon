import Link from "next/link";
import { auth } from "@/app/auth";
import SignOut from "@/components/sign-out/SignOut";
import ThemeButton from "@/components/theme-button/ThemeButton";
import { Button, Flex } from "@radix-ui/themes";
import { HomeIcon } from "lucide-react";

export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="dark:bg-gray-900 w-full shadow-md">
            <div className="flex justify-between flex-wrap p-4">
                <Link href={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white">
                        Fizz
                        <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text">
                            Bruzz
                        </span>
                        &nbsp;&#x1F41D;
                    </span>
                </Link>

                <Flex gap={'3'} justify={'end'} align={'center'} className="md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link href="/dashboard">
                        <HomeIcon className="text-white mr-2" />
                    </Link>
                    <ThemeButton />

                    {session?.user ? (
                        <SignOut />
                    ) : (
                        <Link href={'/login'}>
                            <Button>Login</Button>
                        </Link>
                    )}
                </Flex>
            </div>
        </nav>
    );
}
