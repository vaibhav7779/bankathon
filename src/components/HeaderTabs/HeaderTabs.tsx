import { FC, useState } from "react";

import styles from "./HeaderTabs.module.scss";
import { headerTabs, tabRoutes } from "./HeaderTabs.contants";
import className from "classnames";
import { useNavigate } from "react-router-dom";

const HeaderTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (tabId: number) => {
    setSelectedTab(tabId);
    navigate(tabRoutes[tabId]);
  };

  return (
    <div className={styles.tabContainer}>
      {headerTabs.map((tab) => (
        <div
          className={
            selectedTab === tab.id
              ? className(
                  styles.tabContainer_tabSelected,
                  styles.tabContainer_tabs
                )
              : styles.tabContainer_tabs
          }
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default HeaderTabs;
