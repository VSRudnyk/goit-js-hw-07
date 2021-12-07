import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryItemMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryImageClick);

function createGalleryItemMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    />
            </a>
        </div>
        `;
    })
    .join('');
}

function onGalleryImageClick(e) {
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  e.preventDefault();

  openModalWindow(e);
}

function openModalWindow(e) {
  window.addEventListener('keydown', closeModalWindow);
  const instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}" width="800" height="600" alt="${e.target.alt}">
`);

  instance.show();
  function closeModalWindow(e) {
    const ESC_KEY_CODE = 'Escape';
    if (e.code === ESC_KEY_CODE) {
      instance.close();
      window.removeEventListener('keydown', closeModalWindow);
    }
  }
}
