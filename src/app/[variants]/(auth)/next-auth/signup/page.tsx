import { notFound } from 'next/navigation';

import { BRANDING_NAME } from '@/const/branding';
import { authEnv } from '@/envs/auth';
import { metadataModule } from '@/server/metadata';
import { translation } from '@/server/translation';
import { DynamicLayoutProps } from '@/types/next';
import { RouteVariants } from '@/utils/server/routeVariants';

import SignupBox from './SignupBox';

export const generateMetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props);
  const { t } = await translation('auth', locale);
  return metadataModule.generate({
    description: t('signup.subtitle'),
    title: t('signup.title', { applicationName: BRANDING_NAME }),
    url: '/next-auth/signup',
  });
};

const Page = () => {
  if (!authEnv.NEXT_PUBLIC_ENABLE_NEXT_AUTH) return notFound();

  return <SignupBox />;
};

Page.displayName = 'SignUp';

export default Page;
