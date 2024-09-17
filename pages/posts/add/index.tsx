import usePosts from "@hooks/usePosts";
import FormPost from "../components/Form";
import { useTranslation } from "react-i18next";
import { API_POST } from "@api/constant";
import MainLayout from "@layout/MainLayout";

const AddPost = () => {
  const { loading, error, fetchPosts } = usePosts();

  console.log(error);

  const onFinish = (value: any) => {
    fetchPosts(API_POST.POST, "POST", value);
  };

  const { t } = useTranslation();

  return (
    <>
      <MainLayout>
        <FormPost
          formName={t("posts.title_add")}
          loading={loading}
          onFinish={onFinish}
        />
      </MainLayout>
    </>
  );
};

export default AddPost;
