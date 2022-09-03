import React, {useEffect} from 'react';
import MyLayout from '../../Components/MyLayout';
import {Row, Col, Button} from 'antd';
import {author} from '../../Dummy/data';
import {useDispatch, useSelector} from 'react-redux';
import {setArticleById} from '../../Reducers/article';
import {useParams, useNavigate} from 'react-router-dom';
import {ArrowLeftOutlined} from '@ant-design/icons';

import './style.scss';

const DetailArticle = () => {
  const detail = useSelector((state) => state.article.detailArticle);
  const articles = useSelector((state) => state.article.articles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    if (!articles.length) {
      navigate('../article', {replace: true});
    } else if (id) {
      dispatch(setArticleById({data: {id: Number(id)}}));
    }
  }, []);

  const getName = (userId) => {
    const user = author.find((e) => e.id === userId);
    return user && user.name;
  };

  return (
    <MyLayout>
      <Row className='container detail'>
        <Col span={24} style={{marginBottom: 30}}>
          <h2>Detail Article</h2>
        </Col>
        <Col span={24}>
          <h1>{detail && detail.title}</h1>
          <small>{detail && getName(detail.userId)}</small>
          <p>{detail && detail.body}</p>
        </Col>
        <Col span={24}>
          <Button
            onClick={() => navigate('../article', {replace: true})}
            icon={<ArrowLeftOutlined />}
          >
            Back to list articles
          </Button>
        </Col>
      </Row>
    </MyLayout>
  );
};

export default DetailArticle;
