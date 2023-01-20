import { ROUTES } from "constants/routes";

export const DASHBOARD_FORM_STATE = {
  STUDENT_NAME: "STUDENT_NAME",
  UNIVERSITY_NAME: "UNIVERSITY_NAME",
  MOBILE_NUMBER: "MOBILE_NUMBER",
  EMAIL: "EMAIL",
  UPLOAD_PIC: "UPLOAD_PIC",
};

export const DASHBOARD_FORM_PAGES = {
  DASHBOARD: {
    [DASHBOARD_FORM_STATE.STUDENT_NAME]: {
      heading: "WELCOME TO CLUB-Z!",
      subHeading: "Please help us with your name",
      primaryTextField: {
        text: "First Name",
        placeholder: "Enter your first name",
      },
      secondaryTextField: {
        text: "Last Name",
        placeholder: "Enter your last name",
      },
      primaryButtonProps: {
        text: "That's me!",
        state: DASHBOARD_FORM_STATE.UNIVERSITY_NAME,
      },
    },
    [DASHBOARD_FORM_STATE.UNIVERSITY_NAME]: {
      heading: "UNLOCK YOUR INVITE!",
      subHeading: "Which university are you enrolled in?",
      primaryTextField: {
        text: "University Name",
        placeholder: "Search for your university",
      },
      primaryButtonProps: {
        text: "Let's go!",
        state: DASHBOARD_FORM_STATE.MOBILE_NUMBER,
      },
    },
    [DASHBOARD_FORM_STATE.MOBILE_NUMBER]: {
      heading: "ADD YOUR CONTACT DETAILS",
      subHeading: "Enter your mobile number",
      primaryTextField: {
        text: "Mobile Number",
        placeholder: "+91 Enter your mobile number",
      },
      primaryButtonProps: {
        text: "Verify my number",
        state: DASHBOARD_FORM_STATE.EMAIL,
      },
    },
    [DASHBOARD_FORM_STATE.EMAIL]: {
      heading: "ADD YOUR CONTACT DETAILS",
      subHeading: "Enter your email ID",
      primaryTextField: {
        text: "Email ID",
        placeholder: "example@xyz.com",
      },
      primaryButtonProps: {
        text: "That's me!",
        state: DASHBOARD_FORM_STATE.UPLOAD_PIC,
      },
    },
    [DASHBOARD_FORM_STATE.UPLOAD_PIC]: {
      heading: "WE NEED ‘EM DOCS",
      subHeading: "Upload a picture of your college ID",
      primaryButtonProps: {
        text: "That's me!",
        path: ROUTES.GRATIFICATION,
      },
    },
  },
};
