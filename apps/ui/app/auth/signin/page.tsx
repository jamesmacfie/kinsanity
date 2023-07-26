import { SignInForm } from './components/form';
import { ReactComponent as Hexagon } from '@ui/svgs/hexagon.svg';

export const metadata = {
  title: 'Sign In',
};

export default async function SignIn(context: any) {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col px-8 py-4 border rounded-lg absolute-center border-slate-300/10">
        <Hexagon className="w-12 h-12 mb-4 place-self-center" />
        <SignInForm />
      </div>
    </div>
  );
}
