'use server';

import {signOut, signIn} from "@/app/auth";
import { redirect } from 'next/navigation'
import {z} from "zod";

export async function logout() {
    await signOut({redirect: true, redirectTo: '/'});
}

const schema = z.object({
    email: z.string({
        invalid_type_error: 'Invalid Email',
    }).email(),
    password: z.string({
        invalid_type_error: 'Invalid Password',
    }).min(8),
});

export async function login(prevState: any, formData: FormData) {
    const validatedFields = schema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.issues.map(issue => issue.message),
        }
    }

    const password = formData.get('password') as string;
    const email = formData.get('email') as string;

    const user = await signIn('credentials', {
        email,
        password,
        redirect: false,
    }).then().catch((e) => {
        console.log(e);
        return null;
    })

    if (user) {
        redirect('/dashboard');
    } else {
        return {
            errors: ['Invalid email or password'],
        }
    }
}