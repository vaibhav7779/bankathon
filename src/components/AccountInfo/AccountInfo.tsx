import { FC, useState } from "react";

import styles from "./AccountInfo.module.scss";

const AccountInfo = () => {
  return (
    <div className={styles.accountInfoContainer}>
      <div className={styles.accountInfoContainer_funds}>
        Funds : ₹ 88,88,88,888.88
      </div>
    </div>
  );
};

export default AccountInfo;
