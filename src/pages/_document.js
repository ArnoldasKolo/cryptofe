import { Html, Head, Main, NextScript } from "next/document";
import Footer from "../Components/Footer/footer"
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body class="bg-dark ">
        <Main />
        <NextScript />
        <Footer/>
      </body>
    </Html>
  );
}
