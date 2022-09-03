import React, {useState} from 'react';
import {Row, Col, Select} from 'antd';
import {Line} from '@ant-design/plots';
const {Option} = Select;

const VisitorChart = ({data}) => {
  const [range, setRange] = useState(7);

  const config = {
    data: range === data.length ? data : data.slice(-range),
    padding: 'auto',
    xField: 'date',
    yField: 'visitor',
    xAxis: {
      tickCount: 7,
    },
    yAxis: {
      tickCount: 3,
    },
    smooth: true,
  };
  return (
    <Row gutter={[0, 24]} className='chart-container'>
      <Col span={24}>
        <Row justify='space-between'>
          <Col>
            <h3>Visitors</h3>
          </Col>
          <Col>
            <Select
              defaultValue='Last 7 Days'
              style={{width: 120}}
              onChange={(e) => setRange(e)}
            >
              <Option value={7}>Last 7 Days</Option>
              <Option value={14}>Last 14 Days</Option>
              <Option value={30}>Last 30 Days</Option>
              <Option value={data.length}>All Time</Option>
            </Select>
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{height: '300px'}}>
        <Line {...config} />
      </Col>
    </Row>
  );
};

export default VisitorChart;
