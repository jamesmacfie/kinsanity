import { ReactNode } from 'react';
import styles from './styles.module.css';

interface Props {
  children: ReactNode;
}

const Content = ({ children }: Props) => {
  return (
    <div
      className={`${styles.container} mt-negativeHeader pt-header min-h-screen`}
    >
      <div className="p-4 mx-auto h-body max-w-7xl sm:px-6 lg:px-8 ">
        {children}
      </div>
    </div>
  );
};

export default Content;
