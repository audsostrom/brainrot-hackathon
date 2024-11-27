'use client';

import {useFormStatus} from 'react-dom';

/**
 * @param {*} children - Whatever components or elements need to
 * be rendered inside of this component
 * @return {*} – A button for submitting form status (used in login pages)
 */
export function SubmitButton({children}: any) {
	const {pending} = useFormStatus();

	return (
		<button
			type={pending ? 'button' : 'submit'}
			aria-disabled={pending}
		>
			{!pending && children}
			{pending && (
				<div>Loading</div>
			)}
		</button>
	);
}