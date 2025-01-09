import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  articles: [],
  filteredArticles: [],
  statuss: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filters: {
    author: '',
    startDate: '',
    endDate: '',
    searchQuery: '',
  },
  lastFetched: null,
};

// Helper function to validate article
const isValidArticle = (article) => {
  if (!article || typeof article !== 'object') return false;
  
  // Check for required fields
  const requiredFields = ['title', 'description', 'url'];
  const hasRequiredFields = requiredFields.every(field => 
    article[field] && typeof article[field] === 'string' && article[field].trim() !== ''
  );
  
  if (!hasRequiredFields) return false;

  // Check for [Removed] content
  const removedContent = ['[Removed]', '[removed]', '[deleted]'];
  const hasRemovedContent = removedContent.some(text => 
    article.title.includes(text) || 
    article.description.includes(text) || 
    (article.content && article.content.includes(text))
  );

  return !hasRemovedContent;
};

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Check if we've fetched recently (within last 5 minutes)
      const lastFetched = getState().news.lastFetched;
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      
      if (lastFetched && lastFetched > fiveMinutesAgo) {
        return null; // Skip fetching if data is recent
      }

      const response = await axios.get(
        'https://newsapi.org/v2/everything', 
        {
          params: {
            q: 'technology',
            apiKey: 'd0b084ab84fc4c3ab87dad1707bb0e63',
            pageSize: 100, // Ensure we get a good number of articles
          },
          timeout: 10000, // 10 second timeout
        }
      );

      if (!response.data || !Array.isArray(response.data.articles)) {
        throw new Error('Invalid response format from API');
      }

      // Filter and clean the articles
      const validArticles = response.data.articles
        .filter(isValidArticle)
        .map(article => ({
          ...article,
          title: article.title.trim(),
          description: article.description.trim(),
          author: article.author || 'Unknown Author',
          publishedAt: article.publishedAt || new Date().toISOString(),
        }));

      if (validArticles.length === 0) {
        throw new Error('No valid articles found');
      }

      return validArticles;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle specific Axios errors
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return rejectWithValue(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          // The request was made but no response was received
          return rejectWithValue('Network error: Could not connect to the server');
        } else {
          // Something happened in setting up the request
          return rejectWithValue(`Request error: ${error.message}`);
        }
      }
      return rejectWithValue(error.message || 'An unexpected error occurred');
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      if (key in state.filters) {
        state.filters[key] = value;
      }
    },
    setFilteredArticles: (state, action) => {
      state.filteredArticles = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredArticles = state.articles;
    },
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        if (action.payload === null) {
          // Data was recent, no need to update
          return;
        }
        state.status = 'succeeded';
        state.articles = action.payload;
        state.filteredArticles = action.payload;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch news';
      });
  },
});

// Selectors
export const selectAllArticles = (state) => state.news.articles;
export const selectFilteredArticles = (state) => state.news.filteredArticles;
export const selectNewsStatus = (state) => state.news.status;
export const selectNewsError = (state) => state.news.error;
export const selectFilters = (state) => state.news.filters;

export const { setFilter, setFilteredArticles, clearFilters, resetError } = newsSlice.actions;
export default newsSlice.reducer;