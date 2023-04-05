import styles from '@/styles/Home.module.css';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>HiRopes</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>HiRopes Home Page</main>
    </>
  );
};

export default Home;
