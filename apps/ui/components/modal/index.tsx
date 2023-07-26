import React, { ReactNode } from 'react';
import styles from './styles.module.css';
import Overlay from '../overlay';

interface Props {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: Props) => {
  return (
    <>
      <Overlay onClick={onClose} />
      <div
        className={`bg-slate-800 absolute-center cursor-default rounded shadow z-50 p-6 ${styles.container}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
