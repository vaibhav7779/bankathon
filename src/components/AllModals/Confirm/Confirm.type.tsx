export type ButtonProps = { label: string; onClick?: () => void };

export interface IConfirmProps {
  heading?: string;
  secondaryButtonProps?: ButtonProps;
  primaryButtonProps?: ButtonProps;
  showTextButton?: boolean;
}
