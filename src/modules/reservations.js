import { getAnime, getReservations } from './API.js';
import placeholder from '../assets/img/placeholder.jpg';

const reservationsPopup = async (animeId) => {
  const animeData = await getAnime();
  const anime = animeData.find((anime) => anime.mal_id === animeId);

  const reservationsData = await getReservations(animeId);
  const reserves = !reservationsData.error ? reservationsData : [];
  const reservesCount = reserves.length;

  const synopsis = anime.synopsis
    .split(/[.!?]+\s/)
    .filter(Boolean)
    .slice(0, 4)
    .join(' ');

  const content = document.querySelector('#content');
  const rsPopup = `
    <section id='comments-popup' class='popup-wrapper'>
      <div class='popup-container'>
        <img class="rs-img" src='${anime.trailer.images.small_image_url || placeholder}' alt='' />
        <div class="rs-info">
        <div class='desc-container rs-desc'>
          <h2>${anime.title}</h2>
          <h5>${anime.title_japanese}</h5>
          <div class='synopsis'>
          <p>${synopsis}.</p>
          </div>
        </div>
        <div class='reactions-wrapper'>
          <div class='reactions-container rs-reactions'>
          <h3>View reservations (${reservesCount})</h4>
          <table>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
            ${reserves
    .map(
      ({ date_start: dateStart, username, date_end: dateEnd }) => `
              <tr>
                <td>${username}</td>
                <td>${dateStart}</td>
                <td>${dateEnd}</td>
              </tr>
            `,
    )
    .join('')}
          </table>
        </div>
        <form id="rs-form" class='rs-form' action='/' data-animeid=${animeId}>
          <h3>Reserve your ticket</h3>
          <input type='text' id='name' class='name' placeholder='Your name' required />
          <input type='text' id='start' class='start' placeholder='Start date' required />
          <input type='text' id='end' class='end' placeholder='End date' required /><br>
          <button class='btn-submit' type='submit'>Reserve</button>
        </form>
        <button class='btn-close'>
          <i class="fa-solid fa-xmark"></i>
        </button>
        </div>
        </div>
        </div>
      </div>
    </section>
  `;

  content.insertAdjacentHTML('beforeend', rsPopup);
};

export default reservationsPopup;
