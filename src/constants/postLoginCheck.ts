export const POST_LOGIN_CHECK: { [key: number | string]: object } = {
  1034: {
    heading: 'Account closed',
    descriptionList: ['Your account has been closed. To trade with us please open a new account'],
    primaryButtonProps: { label: 'Open account' },
  },
  1035: {
    heading: 'Where have you been?',
    descriptionList: [
      'Your account has been dormant for 12 months. Please do an OTP verification before you start trading again.',
    ],
  },
  // 1038,1040,1043,1044
  1036: {
    heading: 'Account deactivated',
    descriptionList: [
      'Your account has been deactivated for safety purpose. A customer executive will get in touch with you to activate your account.',
      'Thank you for your patience.',
    ],
    userDetails: { contactNumber: '022-40508080  |  022-61480808', mail: 'helpdesk@axisdirect.in' },
  },
  1037: {
    heading: 'Bank Deactivated',
    descriptionList: [
      'Your bank has been deactivated due to incomplete details. Please update your details for a better trading experience.',
    ],
    secondaryButtonProps: { label: 'Skip' },
    primaryButtonProps: { label: 'Update Details' },
  },
  1039: {
    heading: 'Incomplete KYC',
    descriptionList: [
      'You need to register your KYC details to continue your trading journey with us',
    ],
  },
  //1042
  1041: {
    heading: 'Incomplete UCC',
    descriptionList: [
      'You have not added your UCC (Unique Client Code) details. Please update your details for a better trading experience.',
    ],
  },
  1045: {
    heading: 'Where have you been?',
    descriptionList: [
      'Your account has been dormant for 24 months. Please update and verify your details before you start trading again.',
    ],
    secondaryButtonProps: { label: 'Skip' },
    primaryButtonProps: { label: 'Update now' },
  },
};
