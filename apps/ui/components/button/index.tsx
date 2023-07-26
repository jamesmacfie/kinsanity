import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

type ButtonType = 'primary' | 'outline' | 'text';
type ButtonSize = 'small' | 'default';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  displayType?: ButtonType;
  size?: ButtonSize;
}

const Button = ({
  displayType,
  className,
  loading,
  children,
  size = 'default',
  ...props
}: Props) => {
  const defaultClasses = cn(
    'px-4 py-1 text-white rounded-full border-0 text-sm',
    {
      'px-6 py-2': size === 'default',
      'px-4 py-1': size === 'small',
    }
  );

  let classes;
  if (displayType == 'text') {
    classes = cn(
      className,
      defaultClasses,
      'bg-transparent hover:underline hover:text-slate-200'
    );
  } else if (displayType == 'outline') {
    classes = cn(
      className,
      defaultClasses,
      'bg-transparent border border-white hover:border-text-slate-200 hover:text-text-slate-200'
    );
  } else {
    // Fallback to primary style
    classes = cn(
      className,
      defaultClasses,
      'text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl'
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
