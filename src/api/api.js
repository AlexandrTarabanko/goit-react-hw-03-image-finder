import axios from 'axios';

const API_KEY = '37959415-953918101693cd2d2e9775c47';

export async function getImages(query, page = 1) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
