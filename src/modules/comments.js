import { getAnime, getComments } from './API.js';

const commentsPopup = async (animeId) => {
  const animeData = await getAnime();
  const anime = animeData.find((anime) => anime.mal_id === animeId);

  const commentsData = await getComments(animeId);
  const comments = !commentsData.error ? commentsData : [];

  const content = document.querySelector('#content');
  const commentsPopup = `
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
          <h3>Comments (2)</h4>
          <ul>
            ${comments
    .map(
      ({ creation_date: created, username, comment }) => `
              <li> ${created} ${username}: ${comment}</li>
            `,
    )
    .join('')}
          </ul>
        </div>
        <form class="comments-form" action="/" data-animeid=${animeId}>
          <h3>Add a comment</h3>
          <input type="text" id="name" class="name" placeholder="Your name" required />
          <textarea name="" id="textarea" cols="30" rows="5" placeholder="Your insights"></textarea>
          <button class="btn-submit" type="submit">Comment</button>
        </form>
        <button class="btn-close">
          x
        </button>
        </section>
      </div>
    </section>
  `;

  content.insertAdjacentHTML('beforeend', commentsPopup);
};

export default commentsPopup;
