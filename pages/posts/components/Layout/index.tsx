import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

import useAuth from '@hooks/useAuth';



export default function Layout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState<string>('');
  const { onLogout } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(getCookie('username') as string);
  }, []);

  return (
    <div>
      <section>
        <header className='w-[1000px] mx-auto py-3'>
          <div className='flex justify-end items-center gap-x-6'>
            <div className='flex items-center gap-x-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
              <div>{isClient}</div>
            </div>
            <div className='hover:opacity-70 hover:cursor-pointer' onClick={() => onLogout()}>
              {t('header.logout')}
            </div>
          </div>
        </header>
        <div className='w-[1000px] mx-auto'>{children}</div>
      </section>
    </div>
  );
}

export async function getStaticProps(context: { locale?: string }) {
  const locale = context.locale || 'en';
  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
    },
  };
}
