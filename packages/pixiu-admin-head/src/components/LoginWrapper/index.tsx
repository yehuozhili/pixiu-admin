import { Redirect } from 'ice';

const LoginWrapper = (WrappedComponent) => {
  const LoginWrappedPage = (props) => {
    const isLogin = true; // 替换成业务逻辑
    const location = props.location.pathname;
    if (isLogin) {
      if (location === '/login') {
        return <Redirect to="/" />;
      } else {
        return <WrappedComponent {...props} />;
      }
    } else {
      return <Redirect to="/login" />;
    }
  };
  return LoginWrappedPage;
};

export default LoginWrapper;
