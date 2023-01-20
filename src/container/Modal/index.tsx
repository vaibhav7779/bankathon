import { FC } from 'react';
import ReactDom from 'react-dom';

import { Modal as SzModal } from '@subzero/polar';

import { IModalProps } from './Modal.type';

const Modal: FC<IModalProps> = ({ children, ...props }) => {
  return ReactDom.createPortal(
    <>
      <SzModal {...props}>{children}</SzModal>
    </>,
    document.getElementById('root-portal') as HTMLElement
  );
};

export default Modal;
