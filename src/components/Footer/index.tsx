import { Typography } from '@subzero/polar';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footerMain}>
      <Typography className={styles.footerMain_text} type="body-sm">
        Axis Securities Limited, <br /> © 1999-2022, All rights reserved, built with in ❤️ India
      </Typography>
    </div>
  );
};

export default Footer;
