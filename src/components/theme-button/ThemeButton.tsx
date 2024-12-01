'use client';

import {useTheme} from "next-themes";
import {Button} from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import {useEffect, useState} from "react";

export default function ThemeButton() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }
    return (
        <>
            { (theme === 'dark') ? (<Button onClick={() => {
                setTheme('light')
            }}> <SunIcon /> </Button>) : (<Button onClick={() => {
                setTheme('dark')
            }}> <MoonIcon /> </Button>) }
        </>
    )
}