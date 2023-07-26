import Content from '@ui/components/content';
import Header from '@ui/components/header';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default async function Protected({ children }: Props) {
  return (
    <>
      <Header showAuthButtons />
      <Content>{children}</Content>
    </>
  );
}
