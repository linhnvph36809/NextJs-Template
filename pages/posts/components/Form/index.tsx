"use client";
import { Button, Form, Input } from "antd";
import Loading from "../loading/pages";
import { useTranslation } from "react-i18next";

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
            <Form.Item label={<label>{t("form.title")}</label>} name="Name ">
              <Input className="h-[40px]" />
            </Form.Item>
            <Form.Item label={<label>{t("form.description")}</label>} name="Name ">
              <Input className="h-[40px]" />
            </Form.Item>
            <Form.Item label={<label>{t("form.tags")}</label>} name="Name ">
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

export default FormPost;
