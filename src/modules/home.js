import { getAnime, getLikes } from './API.js';

const section = document.querySelector('#content');

const homePage = async () => {
  const data = await getAnime();
  const likesData = await getLikes();
  let numLike = 0;
  data.forEach((anime) => {
    console.log(anime);
    likesData.find((like) => {
      if (like.item_id === anime.mal_id) {
        numLike = like.likes;
      }
      return numLike;
    });
    section.innerHTML += `
        <div class="item">
          <div class="img-container">
          <img src='${anime.images.jpg.large_image_url}' alt='${anime.title} image '>
          </div>
          <div class='item-contents'>
          <div class='texts-container'>
          <p>${anime.title}</p>
          <i class="fa fa-heart" data-likeid='${anime.mal_id}'></i>
          <span>${numLike} Likes</span>
          </div>
          <div class='btns'>
          <button type="button" class="btn btn-cm btn-lg" data-cm_popup='${anime.mal_id}'>Comment</button>
          <button type="button" class="btn btn-rs btn-lg" data-reserve_popup='${anime.mal_id}'>Reservation</button>
          </div>
          </div>
        </div>`;
  });
};

export default homePage;
