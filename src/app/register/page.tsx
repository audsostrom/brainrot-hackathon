'use client'

import RegisterForm from "@/components/register-login/RegisterForm";
import {Button, Container, Flex, Link} from "@radix-ui/themes";

export default function Register() {

	return (
		<Container className={'py-12'}>
			<Flex direction={'column'} gap={'5'} align={'center'}>
				<RegisterForm />

				<div className="inline-flex items-center justify-center w-full">
					<hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
					<span
						className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">or</span>
				</div>

				<Link href={'/login'}>
					<Button type="button" variant={'outline'}>
						Login
					</Button>
				</Link>
			</Flex>
		</Container>
	);
}