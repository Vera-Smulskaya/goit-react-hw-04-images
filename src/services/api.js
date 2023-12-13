import axios from 'axios';
import Notiflix from 'notiflix';

const KEY = '39479425-6a3db35f3651c21ffc7f636b4';

export async function fetchPhoto(searchPhoto, page) {
  const searchParams = new URLSearchParams({
    key: KEY,
    q: searchPhoto,
    page: page,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const response = await axios(`https://pixabay.com/api/?${searchParams}`);

  if (response.status === 404) {
    Notiflix.Notify.failure('Sorry, some error occured.');
    return Promise.reject();
  }
  return response;
}
