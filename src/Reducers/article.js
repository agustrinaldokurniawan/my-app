import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  articles: [],
  detailArticle: {},
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload.data;
    },
    updateArticles: (state, action) => {
      const dataIndex = state.articles.findIndex(
        (e) => e.id === action.payload.data.id
      );
      if (dataIndex > -1) {
        state.articles[dataIndex] = action.payload.data;
      }
    },
    setArticle: (state, action) => {
      state.detailArticle = action.payload.data;
    },
    addArticle: (state, action) => {
      state.articles.push(action.payload.data);
    },
    deleteArticle: (state, action) => {
      const dataIndex = state.articles.findIndex(
        (e) => e.id === action.payload.data.id
      );
      if (dataIndex > -1) {
        state.articles.splice(dataIndex, 1);
      }
    },
    setArticleById: (state, action) => {
      const dataIndex = state.articles.findIndex(
        (e) => e.id === action.payload.data.id
      );
      if (dataIndex > -1) {
        state.detailArticle = state.articles[dataIndex];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setArticleById,
  setArticles,
  setArticle,
  updateArticles,
  addArticle,
  deleteArticle,
} = articleSlice.actions;

export default articleSlice.reducer;
