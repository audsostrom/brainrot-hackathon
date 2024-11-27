import Link from 'next/link';
import { Form } from '@/components/form/form';
import {redirect} from 'next/navigation';
import {createUser, getUser} from '../db';
import { SubmitButton } from '@/components/submit-button/submit-button';

/**
 * @return {*} – Renders the Register page.
 */
export default function Register() {
	/**
	 * The function `register` checks if a user already exists
	 * based on the provided email, creates a new
	 * user if not, and then redirects to the login page.
	 * @param {Object} formData - Contains user input data
	 */
	async function register(formData: any) {
		'use server';
		const email = formData.get('email');
		const password = formData.get('password');
		const user = await getUser(email);
		console.log('mu user', user);

		if (user) {
			console.log('User already exists');
		} else {
			await createUser(email, password);
			redirect('/login');
		}
	}

	return (
		<div>
			<div>
				<div>
          Create Your Account
					<div>
						{'Already have an account? '}
						<Link href="/login">
              Sign in
						</Link>
					</div>
				</div>
				<Form action={register}>
					<div>
						<SubmitButton>Sign Up</SubmitButton>
					</div>
				</Form>
			</div>
		</div>
	);
}