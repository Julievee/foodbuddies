import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Register',
  description: 'Placeholder for Register page.',
  icons: {
    shortcut: '/icon.svg',
  },
};

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function RegisterPage(props: Props) {
  const sessionTokenCookie = cookies().get('sessionToken');
  console.log(sessionTokenCookie);

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (session) {
    redirect('/');
  }
  return <RegisterForm returnTo={props.searchParams.returnTo} />;
}
