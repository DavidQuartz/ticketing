import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);

  let data = {};
  try {
    const response = await client.get('/api/users/currentuser');
    data = response.data;
  } catch (error) {
    console.error('Error fetching current user', error.message);
    // Add more robust error handling here if needed
  }

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    try {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    } catch (error) {
      console.error('Error fetching page props', error.message);
      // Add more robust error handling here if needed
    }
  }

  return { pageProps, ...data };
};

export default AppComponent;
