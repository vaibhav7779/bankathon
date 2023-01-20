import { FC } from 'react';

import { Button, Typography } from '@subzero/polar';

import { IConfirmProps } from './Confirm.type';

import styles from './Confirm.module.scss';

const Confirm: FC<IConfirmProps> = ({
  heading,
  secondaryButtonProps,
  primaryButtonProps,
  showTextButton = false,
}) => {
  return (
    <>
      <div className={styles.confirm_container}>
        <Typography type="hm" className={styles.confirm_heading} align="center">
          {heading}
        </Typography>
        <div className={styles.confirm_actionContainerDesktop}>
          <Button
            onClick={secondaryButtonProps?.onClick}
            classes={{ btnRoot: styles.confirm_actionSecondary }}
            variant={showTextButton ? 'textButton' : 'default'}
            btnBg="secondary"
          >
            {secondaryButtonProps?.label}
          </Button>
          <Button
            onClick={primaryButtonProps?.onClick}
            variant={showTextButton ? 'textButton' : 'default'}
            classes={{ btnRoot: styles.confirm_actionPrimary }}
          >
            {primaryButtonProps?.label}
          </Button>
        </div>
        <div className={styles.confirm_actionContainerMobile}>
          <Button variant="textButton" onClick={secondaryButtonProps?.onClick}>
            {secondaryButtonProps?.label}
          </Button>
          <Button onClick={primaryButtonProps?.onClick} variant="textButton">
            {primaryButtonProps?.label}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Confirm;
