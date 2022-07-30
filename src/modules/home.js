import { getAnime, getLikes } from './API.js';

const section = document.querySelector('.content');

const homePage = async () => {
  const data = await getAnime();
  const likesData = await getLikes();
  data.forEach((anime) => {
    const likes = likesData.find((like) => like.item_id === anime.mal_id) || [];
    const like = likes.likes || 0;
    section.innerHTML += `
        <div class="item">
          <div class="img-container">
          <img src='${anime.images.jpg.large_image_url}' alt='${anime.title} image '>
          </div>
          <div class='item-contents'>
          <div class='texts-container'>
          <p class="anim-title">${anime.title.split(' ')[0]}</p>
          <button class="btn-likes"><i class="fa fa-heart" data-likeid='${
  anime.mal_id
}'></i><span>${like} Likes</span></button>
          </div>
          <div class='btn-action-wrapper'>
          <button type="button" class="btn-action btn-cm" data-cm_popup='${
  anime.mal_id
}'><i class="fa-solid fa-message"></i>Comment</button>
          <button type="button" class="btn-action btn-rs" data-reserve_popup='${anime.mal_id}'>Get Ticket</button>
          </div>
          </div>
        </div>`;
  });

  document.querySelector('#main-title').textContent = `Top ${data.length} Animes`;
};

export default homePage;
