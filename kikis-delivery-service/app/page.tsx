import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
    <div>
      <h1>Kiki's Delivery Service</h1>
      <p>Fast, reliable deliveries across the city.</p>
    </div>
      </main>
    </div>
  );
}
