import { ReactComponent as Hexagon } from '../../svgs/hexagon.svg';
import { getServerSession } from 'next-auth';
import { authOptions } from '../..//lib/auth';
import Button from '../button';
import Link from 'next/link';

interface Props {
  showAuthButtons?: boolean;
}

const Header = async ({ showAuthButtons }: Props) => {
  const session = await getServerSession(authOptions);

  return (
    <header className="py-4 mx-4 bg-transparent border-b h-header border-slate-300/10 lg:px-8 lg:mx-0">
      <div className="flex items-center justify-between">
        <Hexagon className="mr-16 text-slate-400" />
        {showAuthButtons &&
          (session ? (
            <Button displayType="text" size="small">
              <Link href="/auth/signout">Logout</Link>
            </Button>
          ) : (
            <div className="flex">
              <Button displayType="text" size="small">
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button displayType="primary" size="small">
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          ))}
      </div>
    </header>
  );
};

export default Header;
