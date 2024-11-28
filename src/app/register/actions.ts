'use server';

import { redirect } from 'next/navigation'
import {createUser, getUser} from "@/app/db";
import {z} from "zod";

const schema = z.object({
    email: z.string({
        invalid_type_error: 'Invalid Email',
    }).email(),
    password: z.string({
        invalid_type_error: 'Invalid Password',
    }).min(8),
    'repeat-password': z.string({
        invalid_type_error: 'Invalid Repeat Password',
    }).min(8),
    name: z.string({
        invalid_type_error: 'Invalid Name',
    }),
}).refine(data => data.password === data['repeat-password'], {
    message: 'Passwords do not match',
    path: ['repeatPassword']
});

export async function register(prevState: any, formData: FormData) {
    const validatedFields = schema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        'repeat-password': formData.get('repeat-password'),
        name: formData.get('name'),
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.issues.map(issue => issue.message),
        }
    }

    const password = formData.get('password') as string;
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const user = await getUser(email);

    if (user) {
        return {
            errors: ['User already exists']
        }
    } else {
        await createUser(email, password, name);
        redirect('/login');
    }
}