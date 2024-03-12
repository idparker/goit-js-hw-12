import { fetchImages } from './js/pixabay-api.js';
import { renderImages, showErrorToast } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('input');
const form = document.querySelector('form');
const loaderContainer = document.querySelector('.loader-container');
const loadMoreButton = document.querySelector('.load-more-btn');
const loadMoreLoader = document.querySelector('.load-more-loader');
let currentPage = 1;
let searchQuery = '';
let lightbox = new SimpleLightbox('.gallery a');

function getCardHeight() {
  const firstImage = document.querySelector('.gallery-item');
  if (firstImage) {
    const { height } = firstImage.getBoundingClientRect();
    return height;
  }
  return 0;
}

function getImages(event) {
  event.preventDefault();

  const QUERY = searchInput.value.trim();

  if (QUERY.length === 0) {
    showErrorToast('Please enter a search term before searching for images.');
    return;
  }

  if (searchQuery !== QUERY) {
    gallery.innerHTML = '';
    loadMoreButton.style.display = 'none';
    currentPage = 1;
  }

  searchQuery = QUERY;

  loaderContainer.style.display = 'block';

  fetchImages(searchQuery, currentPage)
    .then(data => {
      const { images, totalHits } = data;

      // Проверка наличия изображений
      if (images.length === 0) {
        throw new Error('No images found');
      }

      // Ваш остальной код без проверки наличия изображений
      renderImages(images);

      if (images.length >= 15 && currentPage * 15 < totalHits) {
        loadMoreButton.style.display = 'block';
      } else {
        loadMoreButton.style.display = 'none';
        showErrorToast('Извините, но вы достигли конца результатов поиска.');
      }
    })
    .catch(error => {
      console.error('Ошибка при получении изображений:', error);
      showErrorToast(
        'Не удалось получить изображения. Пожалуйста, попробуйте позже.'
      );
    })
    .finally(() => {
      loaderContainer.style.display = 'none';
    });
}

function loadMoreImages() {
  loaderContainer.style.display = 'block';
  loadMoreLoader.style.display = 'block';

  currentPage++;

  fetchImages(searchQuery, currentPage)
    .then(data => {
      const { images, totalHits } = data;

      if (images.length > 0) {
        renderImages(images);

        if (currentPage * 15 >= totalHits) {
          loadMoreButton.style.display = 'none';
          showErrorToast(
            "We're sorry, but you've reached the end of search results."
          );
        } else {
          smoothScroll(getCardHeight() * 3);
        }
      } else {
        loadMoreButton.style.display = 'none';
        showErrorToast(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => {
      console.error('Error fetching more images:', error);
      showErrorToast('Failed to fetch more images. Please try again later.');
    })
    .finally(() => {
      loaderContainer.style.display = 'none';
      loadMoreLoader.style.display = 'none';
    });
}

function smoothScroll(distance) {
  window.scrollBy({
    top: distance,
    behavior: 'smooth',
  });
}

form.addEventListener('submit', getImages);
loadMoreButton.addEventListener('click', loadMoreImages);
