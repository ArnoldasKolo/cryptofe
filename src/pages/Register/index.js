/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import styles from "./styles.module.scss";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/Components/Header/Header";
import axios from "axios";

const index = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [inputFail, setInputFail] = useState(false);
  const [badData, setBadData] = useState("");

  const createUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/signUp",
        {
          email: email,
          password: password,
        }
      );
      console.log("response", response);

      if (response.status === 200) {
        router.push("/login");
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
            <h3 className={styles.registerHeader}>Register</h3>
            <div className={styles.form}>
              <input
                className={styles.input}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
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
              <p className={styles.passInfo}>Must have at least one number</p>
              <button onClick={createUser} className={styles.button}>Submit</button>
              <span className="text-white ">Already a member?</span>
              <Link href="/Login">Login</Link>
              {inputFail ? <p className={styles.inputFail}>{badData}</p> : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
