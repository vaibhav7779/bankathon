/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { FC } from 'react';

import { Typography } from '@subzero/polar';

import { IChipListProps } from './Chip.type';

import styles from './Chip.module.scss';

const ChipList: FC<IChipListProps> = ({ title, chipList, selectedValue }) => {
  return (
    <div className={styles.chipMain}>
      <Typography component={'p'} type="body-sm" variant="secondary">
        {title}
      </Typography>
      <div className={styles.chipMain_chipList}>
        {chipList?.map((item, index) => (
          <div
            className={styles.chipMain_chipList_chips}
            key={index}
            onClick={() => selectedValue(item.text)}
          >
            <Typography
              component={'p'}
              type="body-sm"
              className={styles.chipMain_chipList_chipsText}
            >
              {item.text}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChipList;
