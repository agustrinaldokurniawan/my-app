import React, {useEffect, useRef, useState} from 'react';
import MyLayout from '../../Components/MyLayout';
import {Row, Col, Form, Input, Select, Button, Modal} from 'antd';
import {author as dummyAuthor} from '../../Dummy/data';
import {useSelector, useDispatch} from 'react-redux';
import {updateArticles, addArticle} from '../../Reducers/article';
import axios from 'axios';
import {api} from './api';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import './style.scss';

const {TextArea} = Input;

const ManageArticle = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({title: '', body: '', userId: ''});
  const [isCreate, setIsCreate] = useState(true);

  const articles = useSelector((state) => state.article.articles);
  const detailArticle = useSelector((state) => state.article.detailArticle);
  const dispatch = useDispatch();
  const {id} = useParams();
  const formRef = useRef(null);
  const [canUpdate, setCanUpdate] = useState(false);

  useEffect(() => {
    if (!articles.length) {
      fetchArticles();
    }

    if (id) {
      fetchArticles(id);
    }

    if (window.location.pathname === '/create-article') {
      setIsCreate(true);
    } else {
      setIsCreate(false);
    }
  }, []);

  useEffect(() => {
    if (detailArticle && formData) {
      if (detailArticle.id === formData.id) {
        if (JSON.stringify(detailArticle) === JSON.stringify(formData)) {
          setCanUpdate(false);
        } else {
          setCanUpdate(true);
        }
      }
    }
  }, [formData, detailArticle]);

  const fetchArticles = async (id) => {
    //cant use this, because api didnt update data on the server, better to use redux for updated data
    // const response = await axios
    //   .get(id ? `${api.default}/${id}` : api.default)
    //   .then((e) => {
    //     return id ? e.data : e.data.reverse(); // simulare order by latest date
    //   });

    setFormData(detailArticle);
    formRef.current.setFieldsValue({
      title: detailArticle.title,
      body: detailArticle.body,
      userId: detailArticle.userId,
    });
  };

  const [modal, contextHolder] = Modal.useModal();

  const onFinish = () => {
    modal.confirm({
      title: isCreate ? 'Create Article' : 'Update Article',
      content: <p>Are you sure want to publish this article?</p>,
      onOk: () => {
        submitForm();
      },
    });
  };

  const submitForm = async () => {
    const url = isCreate ? `${api.default}` : `${api.default}/${formData.id}`;
    const payload = {
      title: formData.title,
      body: formData.body,
      userId: formData.userId,
    };
    const response = await axios[isCreate ? 'post' : 'put'](
      url,
      isCreate ? {...payload, id: articles.length + 1} : {...payload}
    ).then((response) => {
      return response.data;
    });

    if (isCreate) {
      dispatch(addArticle({data: response}));
    } else {
      dispatch(updateArticles({data: response}));
    }

    navigate('../article', {
      replace: true,
      state: {
        message: isCreate ? 'Article Published!' : 'Article Updated!',
        type: 'info',
      },
    });
  };
  const onFinishFailed = () => {};

  const onChange = (e, key) => {
    setFormData((prev) => ({
      ...prev,
      [key]: key === 'userId' ? e : e.target.value,
    }));
  };

  return (
    <MyLayout>
      <Row className='container'>
        {contextHolder}
        <Col span={24} style={{marginBottom: 30}}>
          <h1>New Article</h1>
        </Col>
        <Col span={24}>
          <Form
            ref={formRef}
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            key={formData}
          >
            <Form.Item
              label='Title'
              name='title'
              rules={[
                {
                  required: true,
                  message: 'Please input article title!',
                },
              ]}
            >
              <Input type={'text'} onChange={(e) => onChange(e, 'title')} />
            </Form.Item>

            <Form.Item
              label='Body'
              name='body'
              rules={[
                {
                  required: true,
                  message: 'Please input article body!',
                },
              ]}
            >
              <TextArea rows={10} onChange={(e) => onChange(e, 'body')} />
            </Form.Item>

            <Form.Item
              label='Author'
              name='userId'
              rules={[
                {
                  required: true,
                  message: 'Please input article body!',
                },
              ]}
            >
              <Select onChange={(e) => onChange(e, 'userId')}>
                {dummyAuthor.length &&
                  dummyAuthor.map((item, key) => (
                    <Select.Option key={key} value={item.id}>
                      {item.id} - {item.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Row gutter={[10, 10]}>
              <Col>
                <Button
                  type='primary'
                  htmlType='submit'
                  disabled={id && !canUpdate}
                >
                  Submit
                </Button>
              </Col>
              <Col>
                <Button
                  type='danger'
                  onClick={() => {
                    navigate('../article', {replace: true});
                  }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </MyLayout>
  );
};

export default ManageArticle;
