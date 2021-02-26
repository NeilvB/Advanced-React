import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import NProgress from 'nprogress';
import Page from '../components/Page';

import '../components/styles/nprogress.css';
import withData from '../lib/withData';

// Listen to Next JS (?) Router events and trigger the progress bar accordingly
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  // this is required for integration with Apollo
  // withData adds a getInitialProps to every component
  // I think this is a way to write this in one place
  // rather than having to add getInitialProps to every
  // component by hand.
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps.query = ctx.query;

  return { pageProps };
};

export default withData(MyApp);
