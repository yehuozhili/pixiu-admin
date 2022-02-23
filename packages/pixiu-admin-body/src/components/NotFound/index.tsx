import { Button, Result } from 'antd';
import { history } from 'ice';

const Greeting = () => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="该页面不存在"
        extra={
          <Button
            type="primary"
            onClick={() => {
              history?.push('/page');
            }}
          >
            回首页
          </Button>
        }
      />
    </div>
  );
};

export default Greeting;
