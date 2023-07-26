import cn from 'classnames';
import { HTMLAttributes, useEffect } from 'react';

const Overlay = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  useEffect(() => {
    // Locks the body so that scrolling can't hapen on the background elements
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div
      className={cn(
        className,
        'fixed backdrop-blur-md top-0 right-0 bottom-0 left-0 cursor-pointer z-50'
      )}
      {...props}
    />
  );
};

export default Overlay;
