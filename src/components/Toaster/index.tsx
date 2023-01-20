import { FC } from 'react';

import { Toaster } from '@subzero/polar';

import { IToasterProps } from './Toaster.type';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { toaster } from 'storeFeature/Toaster';

import styles from './Toaster.module.scss';

const ToasterMessage: FC<IToasterProps> = () => {
  const ToasterMsg = useAppSelector((state) => state.toast.toaster.message);
  const dispatch = useAppDispatch();

  const emptyToastMessage = () => {
    dispatch(toaster({ message: '' }));
  };

  return (
    <>
      <Toaster
        classes={{ container: styles.container }}
        message={ToasterMsg}
        showToast={ToasterMsg !== '' && (ToasterMsg as unknown as boolean)}
        autoDelete
        onClose={emptyToastMessage}
        autoDeleteTime={3000}
        position="top-center"
      />
    </>
  );
};

export default ToasterMessage;
