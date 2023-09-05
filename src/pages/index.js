import Header from "@/Components/Header/Header";
import React from "react";
import { useEffect } from "react";
import styles from "../styles/Home.module.scss";
import crypto from "../Images/crypto.png";
import Image from "next/image";
import Link from "next/link";
const index = () => {
  return (
    <>
      <Header />
      <div className={styles.heroWrapper}>
        <div className={styles.heroTextWrapper}>
          <h1 className="fs-1 text-light">Fastest Way to Follow Crypto market</h1>
          <p className="fs-4 text-light">Discover crypto statistics in one place</p>
          <div className={styles.buttonWrapper}>
            <Link href="/Register">
              {" "}
              <button type="button" class="btn btn-primary w-25  btn-sm">
                Register
              </button>
            </Link>
            <Link href="/Login">
              {" "}
              <button type="button" class="btn btn-primary w-25 btn-sm ">
                Login
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.imgWrapper}>
          <Image className={styles.img} src={crypto} alt="crypto" />
        </div>
      </div>
    </>
  );
};

export default index;
