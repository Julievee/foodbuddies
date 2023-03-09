import './global.scss';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import styles from './layout.module.scss';

export const metadata = {
  title: {
    default: 'foodbuddies',
    template: '%s | foodbuddies',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
};

type Props = {
  children: React.ReactNode;
};
export const dynamic = 'force-dynamic';

export default async function RootLayout(props: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <html lang="en">
      <head />
      <body>
        <header className={styles.header}>
          <nav>
            <div>
              <Link href="/">Home</Link>
              <div className={styles.auth}>
                <Link href="/logout" prefetch={false}>
                  logout
                </Link>
                <Link href="/register">register</Link>
                <Link href="/login">login</Link>
                {user && user.username}
              </div>
            </div>
          </nav>
        </header>
        {props.children}
        <footer className={styles.footer}>© copyright foodbuddies 2023</footer>
      </body>
    </html>
  );
}
