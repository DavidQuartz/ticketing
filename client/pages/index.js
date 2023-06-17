import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);

  let data = {};
  try {
    const response = await client.get('/api/users/currentuser');
    data = response.data;
  } catch (error) {
    console.error('Error fetching current user', error.message);
    // Add more robust error handling here if needed
  }
  return data;
};

export default LandingPage;
