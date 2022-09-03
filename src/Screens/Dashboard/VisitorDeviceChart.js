import React from 'react';
import {Row, Col} from 'antd';
import {Pie} from '@ant-design/plots';

const VisitorDeviceChart = ({data}) => {
  const config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'device',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({percent}) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <Row gutter={[0, 24]} className='chart-container'>
      <Col span={24}>
        <h3>Visitors Devices</h3>
      </Col>
      <Col span={24} style={{height: '300px'}}>
        <Pie {...config} />
      </Col>
    </Row>
  );
};

export default VisitorDeviceChart;
