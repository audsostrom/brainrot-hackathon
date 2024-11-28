import Link from 'next/link';
import {LoginForm} from "@/components/login-form/LoginForm";

export default function Login() {
	return (
		<div className={'flex flex-col gap-3 items-center'}>
			<LoginForm />

			<div className="inline-flex items-center justify-center w-full">
				<hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
				<span
					className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">or</span>
			</div>

			<Link href={'/register'}>
				<button type="button"
						className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 max-w-3xl">
					Create an Account
				</button>
			</Link>
		</div>
);
}
