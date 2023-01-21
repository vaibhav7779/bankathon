import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@subzero/polar/build/components";
import Avatar from "src/assets/Avatar.svg";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import Camera, { FACING_MODES } from 'react-html5-camera-photo'


import styles from "./Dashboard.module.scss";
import { icons } from "assets";
import {
  DASHBOARD_FORM_PAGES,
  DASHBOARD_FORM_STATE,
} from "./Dashboard.constants";
import { useNavigate } from "react-router";



const Dashboard = () => {
  const queryParams = window.location.href.split('?');
  const dashboardValue = queryParams[1]==="success" ? DASHBOARD_FORM_STATE.UPLOAD_SUCCESS : DASHBOARD_FORM_STATE.STUDENT_NAME
  const [pageState, setPageState] = useState(dashboardValue);
  const navigate = useNavigate();

  const handlePageState = (state: any) => {
    state?.primaryButtonProps.state
      ? setPageState(state?.primaryButtonProps?.state)
      : navigate(state?.primaryButtonProps?.path);
  };

  const handleUpload = () => {
    navigate("/upload")
  }

  return (
    <div className={styles.dashboardMain}>
      <div className={styles.dashboardMain_top} />
      <img className={styles.dashboardMain_avatar} src={icons.Avatar} />
      <div className={styles.dashboardMain_bottom}>
        <div className={styles.dashboardMain_bottom_main}>
          <Typography
            className={styles.dashboardMain_bottom_main_headerText}
            type="hsm"
          >
            {DASHBOARD_FORM_PAGES.DASHBOARD[pageState].heading}
          </Typography>
          <Typography
            className={styles.dashboardMain_bottom_main_headerSubText}
            type="hsm"
          >
            {DASHBOARD_FORM_PAGES.DASHBOARD[pageState].subHeading}
          </Typography>
        </div>
        <div className={styles.dashboardMain_bottom_fields}>
          {DASHBOARD_FORM_PAGES.DASHBOARD[pageState].primaryTextField && (
            <div>
              <Typography
                className={styles.dashboardMain_bottom_fields}
                type="hxs"
              >
                {
                  DASHBOARD_FORM_PAGES.DASHBOARD[pageState].primaryTextField
                    ?.text
                }
              </Typography>
              <TextField
                className={styles.width}
                placeholder={
                  DASHBOARD_FORM_PAGES.DASHBOARD[pageState].primaryTextField
                    ?.placeholder
                }
              />
            </div>
          )}
          {DASHBOARD_FORM_PAGES.DASHBOARD[pageState].secondaryTextField && (
            <div>
              <Typography
                className={styles.dashboardMain_bottom_fields}
                type="hxs"
              >
                {
                  DASHBOARD_FORM_PAGES.DASHBOARD[pageState].secondaryTextField
                    ?.text
                }
              </Typography>
              <TextField
                className={styles.width}
                placeholder={
                  DASHBOARD_FORM_PAGES.DASHBOARD[pageState].secondaryTextField
                    ?.placeholder
                }
              />
            </div>
          )}
          {pageState === DASHBOARD_FORM_STATE.UPLOAD_PIC && (
            <div className={styles.dashboardMain_bottom_main_uploadBox}>
              <img src={icons.Camera} />
              <div onClick={(e) => handleUpload()}>CLICK AN IMAGE OR UPLOAD</div>
            </div>
          )}
          {pageState === DASHBOARD_FORM_STATE.UPLOAD_SUCCESS && (
            <div className={styles.dashboardMain_bottom_main_success}>
              <img src={icons.Camera} />
              <div onClick={(e) => handleUpload()}>collegeidproof.jpeg</div>
              <img src={icons.Cross} />
            </div>
          )}
          <Button
            className={styles.buttonWidth}
            onClick={() =>
              handlePageState(DASHBOARD_FORM_PAGES.DASHBOARD[pageState])
            }
          >
            {DASHBOARD_FORM_PAGES.DASHBOARD[pageState].primaryButtonProps.text}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
