import { SessionProvider } from 'next-auth/react'; 
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from '../Redux/store/store'; // Import your Redux store

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}> 
      <Provider store={store}> {/* Wrap with Provider */}
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;