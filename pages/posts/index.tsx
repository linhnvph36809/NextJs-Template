import { Table } from 'antd';
import { columns } from './column';
import usePosts from '@hooks/usePosts';
import { useEffect } from 'react';
import Loading from './components/loading/pages';
import { API_POST } from '@api/constant';
import MainLayout from '@layout/MainLayout';

const ListPost = () => {
  const { data, loading, error, fetchPosts } = usePosts();

  useEffect(() => {
    fetchPosts(API_POST.POST, 'GET');
  }, []);

  return (
    <>
      <MainLayout>
        <section>
          <h1 className='my-4 text-[40px] font-medium'>List Post</h1>;
          <div>
            <Table columns={columns} dataSource={data?.posts} />
          </div>
        </section>
        <Loading loading={loading} />
      </MainLayout>
    </>
  );
};

export default ListPost;
