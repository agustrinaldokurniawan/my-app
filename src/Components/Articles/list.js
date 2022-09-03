import React from 'react';
import {Space, Table, Button, Modal, message} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {setArticle, deleteArticle} from '../../Reducers/article';
import {Link} from 'react-router-dom';

import {author} from '../../Dummy/data';

const List = ({type, styles}) => {
  const dispatch = useDispatch();
  const [modal, contextHolder] = Modal.useModal();
  const [messageApi, contextHolderMessage] = message.useMessage();
  const [page, setPage] = React.useState(1);

  const onDelete = (record) => {
    modal.confirm({
      title: 'Delete Article',
      content: <p>Are you sure want to delete this article?</p>,
      onOk: () => {
        dispatch(deleteArticle({data: {id: record.id}}));

        messageApi.open({
          type: 'info',
          content: <p>Articel Deleted Succesfully</p>,
          duration: 1,
        });
      },
    });
  };

  const articles = useSelector((state) => state.article.articles);
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      small: true,
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: 'Author',
      dataIndex: 'userId',
      key: 'userId',
      render: (userId) => <p>{getAuthorName(userId)}</p>,
      filters: author.map((item) => {
        return {text: item.name, value: item.id};
      }),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (id, record) => record.userId === id,
      width: '30%',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      small: true,
      key: 'title',
      render: (text, record) =>
        type === 'small' ? (
          text
        ) : (
          <Link to={`/article/${record.id}`}>{text}</Link>
        ),
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Link
            onClick={() => {
              dispatch(setArticle({data: record}));
            }}
            to={`/edit-article/${record.id}`}
          >
            Edit
          </Link>
          <Button onClick={() => onDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const getAuthorName = (userId) => {
    const user = author.find((e) => e.id === userId);

    return user.name ? user.name : userId;
  };

  return (
    <>
      {contextHolder}
      {contextHolderMessage}
      <Table
        style={styles}
        columns={type === 'small' ? columns.filter((e) => e.small) : columns}
        dataSource={type === 'small' ? articles.slice(0, 7) : articles}
        size={type === 'small' && 'small'}
        pagination={{
          onChange: (current) => setPage(current),
          position: ['none', type !== 'small' ? 'bottomRight' : 'none'],
        }}
        scroll={{x: 760}}
      />
    </>
  );
};

export default List;
