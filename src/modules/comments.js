import { getAnime, getComments } from './API.js';

const commentsPopup = async (animeId) => {
  const animeData = await getAnime();
  const anime = animeData.find((anime) => anime.mal_id === animeId);

  const commentsData = await getComments(animeId);
  const comments = !commentsData.error ? commentsData : [];
  const commentsCount = comments.length;

  const content = document.querySelector('#content');
  const commentsPopup = `
    <section id="comments-popup" class="popup-wrapper">
      <div class="popup-container">
        <img class="cm-img" src="${anime.images.jpg.large_image_url}" alt="" />
        <div class="cm-info">
          <div class="desc-container cm-desc">
          <h2>${anime.title}</h2>
          <div class="tags">
            <span>${anime.episodes} episodes</span>
            <span>${anime.source}</span>
            <span>IMDb ${anime.score}</span>
          </div>
        </div>
        <div class="reactions-wrapper">
          <div class="reactions-container">
          <h3>View ${commentsCount} previous comments</h4>
          <ul>
            ${comments
              .map(
                ({ creation_date: created, username, comment }) => `
              <li class="comment">
              <div>
                <span class="cm-date">${username}</span>
                <span class="cm-user">${created}</span>
              </div>
              <p>${comment}</p>
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
        <form class="comments-form" action="/" data-animeid=${animeId}>
          <input type="text" id="name" class="name" placeholder="Your name" required />
          <textarea id="textarea" cols="30" rows="6" placeholder="Write a comment..." required></textarea>
          <button class="btn-submit" type="submit">Comment</button>
        </form>
        <button class="btn-close">
          <i class="fa-solid fa-xmark"></i>
        </button>
        </div>
        </div>
        
      </div>
    </section>
  `;

  content.insertAdjacentHTML('beforeend', commentsPopup);
};

const commentsCount = async (animeId) => {
  const commentsData = await getComments(animeId);
  const comments = !commentsData.error ? commentsData : [];
  const commentsCount = comments.length;
  return commentsCount;
};

export { commentsPopup, commentsCount };
