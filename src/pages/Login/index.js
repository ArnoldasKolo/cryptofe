/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import styles from "./styles.module.scss";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/Components/Header/Header";
import axios from "axios";
import Cookies from 'js-cookie';

const index = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [inputFail, setInputFail] = useState(false);
  const [badData, setBadData] = useState("");

  const logUser = async () => {
    try {
      const response = await axios.post(
        "https://cryptobe.adaptable.app/logIn",
        {
          email: email,
          password: password,
        }
      );
      console.log("response", response);
      Cookies.set('UserToken', response.data.token)

      if (response.status === 200) {
        router.push("/Main");
      }
    } catch (err) {

      setBadData(err.response.data.response);
      console.log(badData);
      if (err) {
        setInputFail(true);
      }
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div>
          <div className={styles.section1}>
            <h3 className={styles.registerHeader}>Log In</h3>
            <div className={styles.form}>
              <input
                className={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button onClick={logUser} className={styles.button}>Submit</button>
              <span className="text-white ">Dont have an account?</span>
              <Link href="/Register">Register</Link>
              {inputFail ? <p className={styles.inputFail}>{badData}</p> : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;