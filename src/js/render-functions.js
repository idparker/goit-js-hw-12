// render-functions.js
import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loaderContainer = document.querySelector('.loader');
let lightbox = new SimpleLightbox('.gallery a');

export function renderImages(images) {
  const imageHTML = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        downloads,
        comments,
        views,
      }) => {
        return `<li class="gallery-item">
              <a href="${largeImageURL}" class="gallery-link"><img class="gallery-img" src="${webformatURL}" alt="${tags}" data-source="${largeImageURL}" title="${tags}" /></a>
              <div class="activity">
              <h3>Likes<p class="activity-item">${likes}</p></h3>
              <h3>Views<p class="activity-item">${views}</p></h3>
              <h3>Comments<p class="activity-item">${comments}</p></h3>
              <h3>Downloads<p class="activity-item">${downloads}</p></div></h3>
          </li>`;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', imageHTML);

  lightbox.refresh();
  loaderContainer.style.display = 'none';
}

export function showErrorToast(message) {
  iziToast.error({
    title: 'Ошибка',
    message,
    position: 'topRight',
  });
  loaderContainer.style.display = 'none';
}

export function showEmptyMessage() {
  gallery.innerHTML =
    '<p class="empty-message">По вашему запросу не найдено ни одного изображения. Попробуйте еще раз!</p>';
  showErrorToast('Error.');
  loaderContainer.style.display = 'none';
}
