import { prisma } from '@db';
import Header from '@ui/components/header';

import Content from '@ui/components/content';

async function getData() {
  const users = await prisma.users.findMany();
  return { users };
}

export default async function Index() {
  const x = await getData();
  return (
    <div>
      <Header showAuthButtons />
      <Content>
        <h1 className="text-6xl text-white">Welcome 👋</h1>
      </Content>
    </div>
  );
}
