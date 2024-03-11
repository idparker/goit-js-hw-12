let currentPage = 1;

export async function fetchImages(query) {
  const API_KEY = '42796479-140a0b0d57e5aafe2bfea6b1d';
  const BASE_URL = 'https://pixabay.com/api/';
  const IMAGE_TYPE = 'photo';
  const ORIENTATION = 'horizontal';
  const SAFESEARCH = 'true';
  const PER_PAGE = 15;

  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFESEARCH}&page=${currentPage}&per_page=${PER_PAGE}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  const data = await response.json();
  const images = data.hits;
  const totalHits = data.totalHits;

  if (!Array.isArray(images) || images.length === 0) {
    throw new Error('No images found');
  }

  currentPage++;

  return { images, totalHits };
}
