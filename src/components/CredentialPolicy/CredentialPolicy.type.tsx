export type primaryValidation = {
  text: string;
  regex?: boolean;
};

export interface IPasswordValidatorProps {
  title: string;
  validationList: primaryValidation[];
}
