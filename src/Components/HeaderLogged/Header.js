/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

import { CiBitcoin } from "react-icons/ci";

import styles from "./Styles.module.scss";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiBitcoin } from "react-icons/bi";
import Cookies from 'js-cookie';
const MENU_LIST = [
  {
    icon: BiBitcoin, // Use the icon component directly
    text: "Log out",
    href: "/",
  },
];

const MobNav = (props) => {
  const handleLogout = () => {
    Cookies.remove('UserToken'); 
  };
  return (
    <div className={`${props.active ? styles.menuOpen : styles.menuClosed}`}>
      <ul className={styles.itemList}>
        {MENU_LIST.map((item) => (
          <li onClick={handleLogout}  className={styles.item} key={item.text}>
            <Link className={styles.itemLink} href={item.href}>
              {<item.icon className={styles.itemIcon} />}{" "}
              {/* Render the icon */}
              <p className={styles.itemText}>{item.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};




const Header = () => {
  const [active, setActive] = useState(false);
  return (
    <>
      <div>
        <nav class="navbar bg-$teal-200">
          <div>
            <div class="navbar bg-$teal-200">
              <div class="container-fluid">
                <Link className={styles.logo} href="/Main">
                  <CiBitcoin className={styles.logoImg} />
                  CryptoView
                </Link>
              </div>
            </div>
          </div>
          <div>
            <button
              className={styles.burgerButton}
              onClick={() => {
                setActive((prevState) => !prevState);
              }}
            >
              <GiHamburgerMenu className={styles.burgerIcon} />
            </button>
          </div>
        </nav>
        <div className={styles.openWrapper}>
          <MobNav active={active} />
        </div>
      </div>
    </>
  );
};

export default Header;
