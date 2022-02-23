import { useEffect } from 'react';
import BasicLayout from '../BasicLayout';

export default function FrameworkLayout(props: {
  children: React.ReactNode;
  pathname: string;
  appLeave: { path: string };
  appEnter: { path: string };
}) {
  const { pathname, children, appLeave, appEnter } = props;
  const Layout = BasicLayout;
  useEffect(() => {
    console.log('== app leave ==', appLeave);
  }, [appLeave]);

  useEffect(() => {
    console.log('== app enter ==', appEnter);
  }, [appEnter]);
  console.log(pathname);
  return <Layout>{children}</Layout>;
}
