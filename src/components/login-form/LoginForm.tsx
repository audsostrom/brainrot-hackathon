'use client';

import Form from "next/form";
import {useActionState} from "react";
import {useFormStatus} from "react-dom";
import Alert from "@/components/alert/Alert";
import {login} from "@/lib/actions";
import {Button} from "@radix-ui/themes";

const initialState = {
	errors: [],
}

/**
 * Form field for entering email and password
 */
export function LoginForm() {
	const [state, formAction] = useActionState(login, initialState);
	const { pending } = useFormStatus();

	return (
		<Form action={formAction} className="max-w-sm w-full mx-auto">
			{(state?.errors.length !== 0) &&
				<Alert type={'error'}>
					<span>Please fix the following:</span>
					<ul className={'list-disc'}>
						{state.errors.map((m, i) => (<li key={i}>{m}</li>))}
					</ul>
				</Alert>
			}

			<div className="mb-4">
				<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
					email
				</label>
				<input
					type="email"
					id="email"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="maruchan@zucc.edu"
					required
					name={'email'}
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
					password</label>
				<input type="password" id="password"
					   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					   required
					   name={'password'}
				/>
			</div>
			<div className="flex items-start mb-4">
				<div className="flex items-center h-5">
					<input id="remember" type="checkbox" value=""
						   className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
						   required/>
				</div>
				<label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
					Remember me
				</label>
			</div>
			<Button
				disabled={pending}
				type="submit"
				>
				Login
			</Button>
		</Form>
	);
}