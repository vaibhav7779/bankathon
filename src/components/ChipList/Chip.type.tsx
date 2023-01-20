export type chipList = {
  text: string;
};

export interface IChipListProps {
  title: string;
  chipList: chipList[];
  selectedValue: (value: string) => void;
}
