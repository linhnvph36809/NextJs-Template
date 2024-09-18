import { useTranslation } from 'next-i18next';

const AppLayout = ({ children }: any) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div className='flex gap-x-2'>
        <button className='text-sm' onClick={() => changeLanguage('en')}>
          English
        </button>
        <button className='text-sm' onClick={() => changeLanguage('vi')}>
          Tiếng Việt
        </button>
      </div>
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
