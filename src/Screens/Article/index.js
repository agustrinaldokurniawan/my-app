import React, {useEffect} from 'react';
import MyLayout from '../../Components/MyLayout';
import {Row, Col, Button, message} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {setArticles} from '../../Reducers/article';
import {ArticleList} from '../../Components/Articles';
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import {api} from './api';

const Article = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const articles = useSelector((state) => state.article.articles);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!articles.length) {
      fetchArticles();
    }
    if (
      location &&
      location.state &&
      location.state.message &&
      location.state.type
    ) {
      messageApi.open({
        type: location.state.type,
        content: <p>{location.state.message}</p>,
        duration: 1,
      });
      window.history.replaceState({}, document.title);
    }
  }, []);

  const fetchArticles = async () => {
    const response = await axios.get(api.default).then((e) => {
      return e.data.reverse(); // simulare order by latest date
    });
    dispatch(setArticles({data: response}));
  };
  return (
    <MyLayout>
      <Row gutter={[0, 16]} className='table-container'>
        {contextHolder}
        <Col span={24}>
          <Row justify='space-between'>
            <Col>
              <h3>Articles</h3>
            </Col>
            <Col>
              <Link to={'/create-article'}>
                <Button>Add Articles</Button>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col span={24}>{articles.length ? <ArticleList /> : ''}</Col>
      </Row>
    </MyLayout>
  );
};

export default Article;
