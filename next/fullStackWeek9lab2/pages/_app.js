import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

/*return (
  <GlobalContextProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </GlobalContextProvider>
);*/
