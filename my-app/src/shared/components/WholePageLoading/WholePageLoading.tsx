import { Spin } from 'antd';
import { memo } from 'react';

const WholePageLoading = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <Spin />
  </div>
);

export default memo(WholePageLoading);
