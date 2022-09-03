import React from 'react';
import {Row, Col} from 'antd';
import {Bar} from '@ant-design/plots';

const VisitorCountryChart = ({data}) => {
  const config = {
    data: data,
    xField: 'value',
    yField: 'country',
    seriesField: 'country',
    legend: {
      position: 'top-left',
    },
  };
  return (
    <Row gutter={[0, 24]} className='chart-container'>
      <Col span={24}>
        <Row justify='space-between'>
          <h3>Visitors Countries</h3>
        </Row>
      </Col>
      <Col span={24} style={{height: '300px'}}>
        <Bar {...config} />
      </Col>
    </Row>
  );
};

export default VisitorCountryChart;
