import { FC } from 'react';

import { Box, Button, Typography } from '@subzero/polar';

import { IPostloginCheckProps } from './PostloginCheck.type';

import styles from './PostloginCheck.module.scss';

export const PostloginCheck: FC<IPostloginCheckProps> = ({
  heading,
  descriptionList = [],
  userDetails,
  secondaryButtonProps,
  primaryButtonProps,
}) => {
  return (
    <>
      <div className={styles.postlogin_container}>
        <Typography component={'p'} type="hl" className={styles.postlogin_heading} align="center">
          {heading}
        </Typography>
        <div className={styles.postlogin_textContainer}>
          {descriptionList.map((text, index) => (
            <Typography
              key={index}
              component={'p'}
              type="body-m"
              className={`${styles.postlogin_subDesc} ${
                index !== 0 ? styles.postlogin_subText : ''
              }`}
              align="center"
              variant="secondary"
            >
              {text}
            </Typography>
          ))}
        </div>
        <Box className={styles.postlogin_MobiletextContainer} variant="secondary">
          {descriptionList.map((text, index) => (
            <Typography
              key={index}
              component={'p'}
              type="body-m"
              className={`${styles.postlogin_subDesc} ${
                index !== 0 ? styles.postlogin_subText : ''
              }`}
              align="center"
              variant="secondary"
            >
              {text}
            </Typography>
          ))}
        </Box>
        {userDetails && (
          <div className={styles.postlogin_userDetailsContainer}>
            <div>
              <Typography type="metaData" align="center" variant="secondary">
                Contact number
              </Typography>
              <Typography
                type="body-sm"
                align="center"
                className={styles.postlogin_userDetailsInputContact}
              >
                {userDetails.contactNumber}
              </Typography>
            </div>
            <div>
              <Typography type="metaData" align="center" variant="secondary">
                Email ID
              </Typography>
              <Typography
                type="body-sm"
                className={styles.postlogin_userDetailsInputEmail}
                align="center"
              >
                {userDetails.mail}
              </Typography>
            </div>
          </div>
        )}
        <div className={styles.postlogin_actionContainer}>
          {secondaryButtonProps && (
            <Button
              classes={{ btnRoot: styles.postlogin_actionSecondary }}
              onClick={secondaryButtonProps.onClick}
              btnBg="secondary"
            >
              {secondaryButtonProps?.label}
            </Button>
          )}
          {primaryButtonProps && (
            <Button
              classes={{ btnRoot: styles.postlogin_actionPrimary }}
              onClick={primaryButtonProps.onClick}
            >
              {primaryButtonProps?.label}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
