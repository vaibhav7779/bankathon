import { useNavigate } from "react-router";

import { Button, Typography } from "@subzero/polar";

import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.error_Container}>
      <Typography
        align="center"
        type="hm"
        component={"div"}
        className={styles.error_Heading}
      >
        Something Went Wrong!
      </Typography>
      <Typography
        type="body-l"
        align="center"
        component={"div"}
        className={styles.error_Description}
      >
        We are facing technical difficulties at the moment. Please try again
        later.
      </Typography>
      <Button variant="textButton">Go to Login Page</Button>
    </div>
  );
};

export default ErrorPage;
