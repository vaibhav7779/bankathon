import { useEffect, useState } from 'react';

import { Modal } from '@subzero/polar';

import { PostloginCheck } from 'Components/AllModals/PostloginCheck';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { POST_LOGIN_CHECK } from 'constants/postLoginCheck';
import { customerSupport } from 'storeFeature/Login/Login.utils';
import { removePostLoginError } from 'storeFeature/Login';

export const ModalFlow = () => {
  const { code } = useAppSelector((state) => state.login.postLoginError);
  const dispatch = useAppDispatch();
  const [modal1, setModal1] = useState(false);

  const [errorCode, setErrorCode] = useState(code);

  useEffect(() => {
    if (code === 1038 || code === 1040 || code === 1043 || code === 1044) {
      setErrorCode(1036);
    } else if (code === 1042) {
      setErrorCode(1041);
    } else {
      setErrorCode(code);
    }
    setModal1(true);
  }, [code]);

  const handlePostLogin = () => {
    if (errorCode === 1034) {
      return {
        primaryButtonProps: {
          label: 'Open Account',
          onClick: () => setModal1(false),
        },
      };
    } else if (errorCode === 1036) {
      return {
        primaryButtonProps: {
          label: 'Request a call',
          onClick: async () => {
            await dispatch(customerSupport());
            setModal1(false);
            dispatch(removePostLoginError());
          },
        },
      };
    } else if (errorCode === 1037) {
      return {
        primaryButtonProps: {
          label: 'Update Details',
          onClick: () => setErrorCode(1036),
        },
      };
    } else if (errorCode === 1035 || errorCode === 1045 || errorCode === 1041) {
      return {
        primaryButtonProps: {
          label: 'Update now',
          onClick: () => setModal1(false),
        },
      };
    } else if (errorCode === 1039) {
      return {
        primaryButtonProps: {
          label: 'Register KYC',
          onClick: () => {
            setErrorCode(1036);
          },
        },
      };
    }
  };

  return (
    <>
      {errorCode !== 0 && (
        <Modal open={modal1} onClose={() => setModal1(false)} stagger>
          <PostloginCheck
            {...POST_LOGIN_CHECK[errorCode]}
            {...handlePostLogin()}
            secondaryButtonProps={{
              label: 'Skip',
              onClick: () => {
                setModal1(false), dispatch(removePostLoginError());
              },
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default ModalFlow;
