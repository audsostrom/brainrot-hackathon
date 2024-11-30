'use client';

import { useActionState } from 'react';
import { useFormStatus} from 'react-dom'
import Form from "next/form";
import {register} from "@/app/register/actions";
import Alert from "@/components/alert/Alert";

const initialState = {
    errors: [],
}

export default function RegisterForm() {
    const [state, formAction] = useActionState(register, initialState);
    const { pending } = useFormStatus();

    return (
        <Form
            action={formAction}
            className="max-w-sm mx-auto"
        >
            {(state?.errors.length !== 0) &&
                <Alert type={'error'}>
                    <span>Please fix the following:</span>
                    <ul className={'list-disc'}>
                        {state.errors.map((m, i) => (<li key={i}>{m}</li>))}
                    </ul>
                </Alert>
            }

            <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                </label>
                <input type="email" id="email" name={'email'}
                       className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="mzhang@chungus.gov" required/>
            </div>

            <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your name
                </label>
                <input type="text" id="name" name={'name'}
                       className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="Mark Zuccburger" required/>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your password
                </label>
                <input type="password" id="password"
                       className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       name={'password'}
                       required/>
            </div>

            <div className="mb-4">
                <label htmlFor="repeat-password"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Repeat password
                </label>
                <input type="password" id="repeat-password"
                       className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       name={'repeat-password'}
                       required/>
            </div>

            <div className="flex items-start mb-4">
                <div className="flex items-center h-5">
                    <input id="terms" type="checkbox" value=""
                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                           required
                           name={'terms'}
                    />
                </div>
                <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500"> terms and
                    conditions</a>
                </label>
            </div>

            <div className="flex items-start mb-4">
                <div className="flex items-center h-5">
                    <input id="bozos" name={'bozos'} type="checkbox" value=""
                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                           required/>
                </div>
                <label htmlFor="bozos" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    I am not affiliated with WP Engine in any way, financially or otherwise.
                </label>
            </div>

            <button type="submit"
                    disabled={pending}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Register new account
            </button>
        </Form>
    );

}