import Link from 'next/link';
import { Form } from '@/components/form/form';
import { signIn } from '../auth';
import { SubmitButton } from '@/components/submit-button/submit-button';
import {redirect} from 'next/navigation';

/**
 * @return {*} – Renders the Login Page
 */
export default function Login() {
	return (
		<div>
			<div>
				<div>
          Login to Your Account
					<div>
						{'Don\'t have an account? '}
						<Link href="/register">
							Sign up
						</Link>
					</div>
				</div>
				<Form
					action={async (formData: any) => {
						'use server';
						const response = await signIn('credentials', {
							redirect: false,
							email: formData.get('email'),
							password: formData.get('password'),
						}).then().catch(() =>
							redirect(`/login`)
						);
						if (response) {
							redirect(`/dashboard`);
						}
					}}
				>
					<div>
						<SubmitButton>Sign in</SubmitButton>
					</div>
				</Form>
			</div>
		</div>
	);
}