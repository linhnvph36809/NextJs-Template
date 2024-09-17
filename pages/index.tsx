import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AppLayout from '@layout/AppLayout';


const HomePage = () => {
  return <div>Home</div>;
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <>{page}</>
    </AppLayout>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
      // Will be passed to the page component as props
    },  
  };
}

export default HomePage;
