'use client';

import {logout} from "@/lib/actions";
import { Button } from "@radix-ui/themes";

export default function SignOut() {
    return (
        <Button onClick={() => logout()}
        >
            Logout
        </Button>
    );
}