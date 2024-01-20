"use client";

import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className={styles.container}>
      {!session ? (
        <>
          <p>Not signed in</p>
          <br />
          <button onClick={() => signIn()}>Sign In</button>
        </>
      ) : (
        <main className={styles.main}>
          <h1 className={styles.title}>My Blog</h1>
          <div className={styles.row}>
            <div className={styles.blogCard}>
              {/* <Image
                src={session.user.image}
                alt="blog1"
                width={300}
                height={200}
              /> */}
              <div className={styles.blogCardContent}>
                <h2>{session.user.name}</h2>
                <p>
                  Gmail: {session.user.email}
                </p>
                <button onClick={() => signOut()}>Sign Out</button>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
