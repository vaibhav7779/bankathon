import { FC } from "react";

import { Box, Typography } from "@subzero/polar";

import { IBadgeProps } from "./Badge.type";

import styles from "./Badge.module.scss";

const Badge: FC<IBadgeProps> = ({ title }) => {
  return (
    <Box className={styles.badgeMain} border>
      <Typography component={"p"} type="body-sm" variant="secondary">
        {title}
      </Typography>
    </Box>
  );
};

export default Badge;
