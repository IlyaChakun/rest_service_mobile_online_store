import React from 'react';
import { Spin } from 'antd';
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";

export default function LoadingIndicator(props) {
    const antIcon = <LoadingOutlined />;
    return (
        <Spin indicator={antIcon} style = {{display: 'block', textAlign: 'center', marginTop: 30}} />
    );
}