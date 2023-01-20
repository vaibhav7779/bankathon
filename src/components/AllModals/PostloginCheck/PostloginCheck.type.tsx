import { ButtonProps } from '../Confirm/Confirm.type';

export interface IPostloginCheckProps {
  heading?: string;
  descriptionList?: string[];
  userDetails?: { contactNumber: string; mail: string };
  secondaryButtonProps?: ButtonProps;
  primaryButtonProps?: ButtonProps;
}
