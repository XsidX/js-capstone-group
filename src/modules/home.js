import { getAnime, getLikes } from './API.js';

const section = document.querySelector('#content');

const homePage = async () => {
  const data = await getAnime();
  const likesData = await getLikes();
  let numLike = 0;
  data.forEach((anime) => {
    likesData.find((like) => {
      if (like.item_id === anime.mal_id) {
        numLike = like.likes;
      }
      return numLike;
    });
    section.innerHTML += `
        <div class="item">
          <div class="img-container">
          <img src='${anime.images.jpg.image_url}' alt='${anime.title} image '>
          </div>
          <h6>${anime.title}</h6> 
          <h6><i class="fa fa-heart" data-likeid='${anime.mal_id}'></i>${numLike} Likes</h6>
          <br>
          <button type="button" class="btn btn-info btn-cm" data-cm_popup='${anime.mal_id}'>Comment</button>
          <button type="button" class="btn btn-success btn-rs" data-reserve_popup='${anime.mal_id}'>Reservation</button>
        </div>`;
  });
};

export default homePage;
