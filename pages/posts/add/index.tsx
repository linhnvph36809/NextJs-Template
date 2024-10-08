import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import { API_POST } from '@api/constant';

import usePosts from '@hooks/usePosts';

import MainLayout from '@layout/MainLayout';

import FormPost from '../components/Form';

const AddPost = () => {
  const { loading, error, fetchPosts } = usePosts();

  console.log(error);

  const onFinish = (value: any) => {
    fetchPosts(API_POST.POST, 'POST', value);
  };

  const { t } = useTranslation();

  return (
    <>
      <MainLayout>
        <FormPost formName={t('posts.title_add')} loading={loading} onFinish={onFinish} />
      </MainLayout>
    </>
  );
};

export async function getStaticProps(context: { locale?: string }) {
  const locale = context.locale || 'en';
  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
    },
  };
}

export default AddPost;
