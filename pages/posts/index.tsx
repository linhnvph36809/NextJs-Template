import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Table = dynamic(() => import('antd/es/table'), { ssr: false });
import { columns } from './column';
import usePosts from '@hooks/usePosts';
import Loading from './components/loading/pages';
import { API_POST } from '@api/constant';
import MainLayout from '@layout/MainLayout';

const ListPost = () => {
  const { data, loading, error, fetchPosts } = usePosts();
  const { t } = useTranslation();

  useEffect(() => {
    fetchPosts(API_POST.POST, 'GET');
  }, []);

  return (
    <>
      <MainLayout>
        <section>
          <h1 className='my-4 text-[40px] font-medium'>{t("posts.title_list")}</h1>
          <div>
            <Table columns={columns} dataSource={data?.posts} />
          </div>
        </section>
        <Loading loading={loading} />
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


export default ListPost;
