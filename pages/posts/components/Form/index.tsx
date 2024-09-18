import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import { Button, Form, Input } from 'antd/lib';

import Loading from '../loading/pages';


const FormPost = ({
  formName,
  loading,
  onFinish,
  initialValues,
}: {
  formName: string;
  loading: boolean;
  onFinish: (value: any) => void;
  initialValues?: any;
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Loading loading={loading} />
      <section>
        <h1 className="my-4 text-[40px] font-medium">{formName}</h1>
        <div>
          <Form
            name="form-post"
            onFinish={onFinish}
            layout="vertical"
            initialValues={initialValues}
          >
            <Form.Item label={t("form.title")} name="name">
              <Input className="h-[40px]" />
            </Form.Item>
            <Form.Item label={t("form.description")} name="description">
              <Input className="h-[40px]" />
            </Form.Item>
            <Form.Item label={t("form.tags")} name="tags">
              <Input className="h-[40px]" />
            </Form.Item>
            <Form.Item className="text-end">
              <Button
                type="primary"
                className="w-[150px] h-[40px] text-base"
                htmlType="submit"
              >
                {t("form.btn")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
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

export default FormPost;
