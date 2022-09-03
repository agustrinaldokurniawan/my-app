import React, {useEffect, useState} from 'react';
import MyLayout from '../../Components/MyLayout';
import {Card, Row, Col, Skeleton, Button} from 'antd';
import {TeamOutlined, ReadOutlined, FileTextOutlined} from '@ant-design/icons';
import './styles.scss';
import CountUp from 'react-countup';

import {
  visitors as dummyVisitors,
  viewers as dummyViewers,
  visitorCountry as dummyVisitorCountry,
  visitorDevices as dummyVisitorsDevices,
} from '../../Dummy/data';

import VisitorChart from './VisitorChart';
import VisitorCountryChart from './VisitorCountryChart';
import VisitorDeviceChart from './VisitorDeviceChart';
import axios from 'axios';
import {api} from './api.';
import {useSelector, useDispatch} from 'react-redux';
import {setArticles} from '../../Reducers/article';
import {ArticleList} from '../../Components/Articles';

import {Link} from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState();
  const articles = useSelector((state) => state.article.articles);
  const dispatch = useDispatch();

  const stats = [
    {
      label: 'Visitors',
      data: 'dummyVisitors',
      icon: TeamOutlined,
      backgroundColor: '#FFDBA4',
    },

    {
      label: 'Viewers',
      data: 'dummyViewers',
      icon: ReadOutlined,
      backgroundColor: '#B7D3DF',
    },
  ];

  useEffect(() => {
    if (!articles.length) {
      fetchArticles();
    }

    if (!data) {
      setTimeout(() => {
        setData({
          dummyVisitors,
          dummyViewers,
          dummyVisitorCountry,
          dummyVisitorsDevices,
        });
      }, 1000); //simulate delay when fetch data from api
    }
  }, []);

  const fetchArticles = async () => {
    const response = await axios.get(api.list).then((e) => {
      return e.data.reverse(); // simulare order by latest date
    });
    dispatch(setArticles({data: response}));
  };

  return (
    <MyLayout>
      <Row gutter={[16, 16]}>
        {stats.map((item, key) => (
          <Col key={key} xs={{span: 24}} md={{span: 12}} lg={{span: 6}}>
            <Card bordered={false} style={{borderRadius: 20}}>
              <Row gutter={20}>
                <Col
                  span={8}
                  className='col-stat col-stat-icon'
                  style={{backgroundColor: item.backgroundColor}}
                >
                  {React.createElement(item.icon, {className: 'icon'})}
                </Col>
                <Col span={14} className='col-stat col-stat-text'>
                  <Row>
                    <Col span={24}>
                      <h2>
                        {data && data[item.data] ? (
                          <CountUp end={data[item.data].total} duration={1} />
                        ) : (
                          <Skeleton.Input />
                        )}
                      </h2>
                    </Col>
                    <Col span={24}>
                      <p>{item.label}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}

        <Col xs={{span: 24}} md={{span: 12}} lg={{span: 6}}>
          <Card bordered={false} style={{borderRadius: 10}}>
            <Row gutter={20}>
              <Col
                span={8}
                className='col-stat col-stat-icon'
                style={{backgroundColor: '#B7E5DD'}}
              >
                <FileTextOutlined className='icon' />
              </Col>
              <Col span={14} className='col-stat col-stat-text'>
                <Row>
                  <Col span={24}>
                    <h2>
                      {articles ? (
                        <CountUp end={articles.length} duration={1} />
                      ) : (
                        <Skeleton.Input />
                      )}
                    </h2>
                  </Col>
                  <Col span={24}>
                    <p>Articles</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{marginTop: 20}}>
        <Col md={{span: 24}} lg={{span: 12}}>
          {data && data.dummyVisitors ? (
            <VisitorChart data={dummyVisitors.data} />
          ) : (
            <Skeleton active className='chart-container' />
          )}
        </Col>

        <Col md={{span: 24}} lg={{span: 12}}>
          {data && data.dummyVisitorCountry ? (
            <VisitorCountryChart data={dummyVisitorCountry} />
          ) : (
            <Skeleton active className='chart-container' />
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{marginTop: 20}}>
        <Col sm={{span: 24}} md={8}>
          {data && data.dummyVisitorsDevices ? (
            <VisitorDeviceChart data={dummyVisitorsDevices} />
          ) : (
            <Skeleton active className='chart-container' />
          )}
        </Col>
        <Col sm={{span: 24}} md={16}>
          <Row gutter={[0, 16]} className='table-container'>
            <Col span={24}>
              <Row justify='space-between'>
                <Col>
                  <h3>Latest Articles</h3>
                </Col>
                <Col>
                  <Link to='/article'>
                    <Button>Show More</Button>
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              {articles.length ? <ArticleList type={'small'} /> : ''}
            </Col>
          </Row>
        </Col>
      </Row>
    </MyLayout>
  );
};

export default Dashboard;
