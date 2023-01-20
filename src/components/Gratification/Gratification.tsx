import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@subzero/polar/build/components";

import { useAppDispatch, useAppSelector } from "hooks/useRedux";

import styles from "./Gratification.module.scss";
import { icons } from "assets";

import { useNavigate } from "react-router";

const avatar = [
  {
    src: icons.AvatarOne,
    id: 1,
  },
  {
    src: icons.AvatarTwo,
    id: 2,
  },
  {
    src: icons.AvatarThree,
    id: 3,
  },
  {
    src: icons.AvatarFive,
    id: 4,
  },
  {
    src: icons.AvatarSix,
    id: 5,
  },
  {
    src: icons.AvatarSeven,
    id: 6,
  },
  {
    src: icons.AvatarEight,
    id: 7,
  },
  {
    src: icons.AvatarNine,
    id: 8,
  },
  {
    src: icons.AvatarTen,
    id: 9,
  },
];

const Gratification = () => {
  const [ava, selectedAva] = useState(0);
  const navigate = useNavigate();

  return (
    <div className={styles.gratificationMain}>
      <Typography className={styles.gratificationMain_header}>
        Choose your avatar
      </Typography>
      <Typography className={styles.gratificationMain_subHeader}>
        Rep yourself in a cool fashion!
      </Typography>

      <div className={styles.gratificationMain_avatarSelection}>
        {avatar.map((item, index) => (
          <div
            key={index}
            className={
              ava === index
                ? styles.gratificationMain_avatarSelection_selected
                : styles.gratificationMain_avatarSelection_unselected
            }
            onClick={() => selectedAva(index)}
          >
            <img src={item.src} />
            {ava === index && (
              <img
                className={
                  styles.gratificationMain_avatarSelection_selected_check
                }
                src={icons.AvatarSelected}
              />
            )}
          </div>
        ))}
      </div>
      <Typography className={styles.gratificationMain_press}>
        PRESS & HOLD TO ACTIVATE
      </Typography>
      <img src={icons.Circle} />
    </div>
  );
};

export default Gratification;
