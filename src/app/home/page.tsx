import Link from 'next/link';

/** Landing page */
export default async function Home() {
	return (
      <Link href="/login">
         <button>Sign in</button>
      </Link>
	);
}