import { FC } from "react";

import { Typography } from "@subzero/polar";

import styles from "./Success.module.scss";

type SuccessType = { title: string; subDescription?: string };

export const Success: FC<SuccessType> = ({
  title,
  subDescription = "Please do not close this window while we redirect you to the login page",
}) => {
  return (
    <>
      <div className={styles.success_container}>
        <Typography
          component={"p"}
          type="hl"
          className={styles.success_text}
          align="center"
        >
          {title}
        </Typography>
        <Typography
          type="body-sm"
          className={styles.success_subText}
          align="center"
        >
          {subDescription}
        </Typography>
      </div>
    </>
  );
};
