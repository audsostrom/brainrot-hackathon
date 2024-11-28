import Link from 'next/link';
import { createGuide } from '../db';

/** Landing page */
export default async function Home() {
      await createGuide();
	return (
      <Link href="/login">
         <button>Sign in</button>
      </Link>
	);
}