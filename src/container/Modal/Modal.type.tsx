import { ReactNode } from 'react';
import { IModalProps as SzModalProps } from '@subzero/polar';

export interface IModalProps extends SzModalProps {
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
}
