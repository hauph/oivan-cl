import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import HomePageBody from 'app/components/HomePageBody/HomePageBody';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <HomePageBody />
    </>
  );
}
