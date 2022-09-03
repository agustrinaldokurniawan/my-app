import {DashboardFilled, ReadFilled} from '@ant-design/icons';

import Article from '../Screens/Article';
import ManageArticle from '../Screens/Article/ManageArticle';
import Dashboard from '../Screens/Dashboard';
import NotFound from '../Screens/NotFound';
import DetailArticle from '../Screens/Article/DetailArticle';

export const paths = [
  {
    path: '/',
    element: Dashboard,
    menu: true,
    icon: DashboardFilled,
    label: 'Dashboard',
    position: '1',
  },
  {
    path: '/article',
    element: Article,
    menu: true,
    icon: ReadFilled,
    label: 'Article',
    position: '2',
  },
  {
    path: '/create-article',
    element: ManageArticle,
  },
  {
    path: '/edit-article/:id',
    element: ManageArticle,
  },
  {
    path: '/article/:id',
    element: DetailArticle,
  },
  {
    path: '*',
    element: NotFound,
  },
];
