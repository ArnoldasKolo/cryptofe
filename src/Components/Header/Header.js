/* eslint-disable @next/next/no-img-element */
import React from "react";

import {CiBitcoin} from "react-icons/ci"
import Image from "next/image";
import styles from "./Header.module.scss"
import Link from "next/link";

const Header = () => {
  return (
    <>
      <div>
        <div class="navbar bg-$teal-200">
          <div class="container-fluid">
            <Link className={styles.logo} href="/">
              <CiBitcoin className={styles.logoImg}/>
              CryptoView
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
