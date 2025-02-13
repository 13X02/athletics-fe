import axios from 'axios';

const NEWS_API_KEY = ''; 
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

export const fetchEventNews = async (query) => {
    try {
        const response = await axios.get(NEWS_API_URL, {
            params: {
                q: query,
                apiKey: NEWS_API_KEY,
                language: 'en',
                sortBy: 'relevancy', 
                pageSize: 6 
            }
        });
        console.log(response)
        return response.data.articles;

    } catch (error) {
        console.error('Error fetching news:', error);
        return []
    }
};
