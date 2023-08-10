import Header from '@ui/components/header';

import Content from '@ui/components/content';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@ui/lib/auth';
import { redirect } from 'next/navigation';

async function getData() {
  const session = (await getServerSession(authOptions)) as Session;
  return { session };
}

export default async function Index() {
  const { session } = await getData();
  if (session) {
    redirect('/f/');
  }

  return (
    <div>
      <Header showAuthButtons />
      <Content>
        <h1 className="text-6xl text-white">Welcome 👋</h1>
      </Content>
    </div>
  );
}
