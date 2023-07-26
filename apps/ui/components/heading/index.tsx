import { ReactNode } from 'react';
import cn from 'classnames';

interface Props {
  children?: ReactNode;
  className?: string;
  tag: 'h1' | 'h2' | 'h3';
}

const Heading = ({ children, className, tag }: Props) => {
  const tagClasses = {
    h1: 'text-2xl text-slate-200',
    h2: 'uppercase text-3xl text-slate-400',
    h3: 'text-xl text-slate-600',
    h4: 'uppercase text-slate-400 text-slate-600',
  };
  const Cmp = tag;
  return <Cmp className={cn(tagClasses[tag], className)}>{children}</Cmp>;
};

export default Heading;
