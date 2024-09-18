import usePosts from "@hooks/usePosts";
import FormPost from "../../components/Form";
import { useTranslation } from "react-i18next";
import { API_POST } from "@api/constant";
import MainLayout from "@layout/MainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const UpdatePost = () => {
  const { loading, error, fetchPosts } = usePosts();
  console.log(error);

  const onFinish = (value: any) => {
    fetchPosts(API_POST.POST, "PUT", value);
  };

  const { t } = useTranslation();

  return (
    <>
      <MainLayout>
        <FormPost
          formName={t("posts.title_edit")}
          loading={loading}
          onFinish={onFinish}
        />
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

export default UpdatePost;
