import { getAnime, getReservations } from './API.js';

const reservationsPopup = async (animeId) => {
  const animeData = await getAnime();
  const anime = animeData.find((anime) => anime.mal_id === animeId);

  const reservationsData = await getReservations(animeId);
  const reserves = !reservationsData.error ? reservationsData : [];
  const reservesCount = reserves.length;
  console.log(reserves, 'the reservation data');

  const content = document.querySelector('#content');
  const reservationForm = `
    <section id="comments-popup" class="popup-wrapper">
      <div class="popup-container">
        <img src="${anime.images.jpg.large_image_url}" alt="" />
        <div class="desc-container">
          <h2>${anime.title}</h2>
          <ul>
            <li>English translation: ${anime.title_english}</li>
            <li>Episodes: ${anime.episodes}</li>
            <li>Source: ${anime.source}</li>
            <li>IMDB score: ${anime.score}</li>
          </ul>
        </div>
        <section class="reactions-wrapper">
          <div class="comments-container">
          <h3>Reservations ${reservesCount}</h4>
          <ul>
            ${reserves
    .map(
      ({ date_start: dateStart, username, date_end: dateEnd }) => `
              <li> ${dateStart}-${dateEnd} by ${username}:</li>
            `,
    )
    .join('')}
          </ul>
        </div>
        <form class="reservation-form" action="/" data-animeid=${animeId}>
          <h3>Add a comment</h3>
          <input type="text" id="name" class="name" placeholder="Your name" required />
          <input type="text" id="start" class="start" placeholder="Start date" required />
          <input type="text" id="end" class="end" placeholder="End date" required />
          <button class="btn-submit" type="submit">Reserve</button>
        </form>
        <button class="btn-close">
          x
        </button>
        </section>
      </div>
    </section>
  `;

  content.insertAdjacentHTML('beforeend', reservationForm);
};

export default reservationsPopup;
