import { getAnime, getLikes } from './API.js';

const section = document.querySelector('.content');

const homePage = async () => {
  const data = await getAnime();
  const likesData = await getLikes();
  data.forEach((anime) => {
    const likes = likesData.find((like) => like.item_id === anime.mal_id) || [];
    section.innerHTML += `<div class="item">
        <div class="img-container">
         <img src='${anime.images.jpg.image_url}' alt='${anime.title} image '>
        </div>
        <h6>${anime.title}</h6> 
        <h6><i class="fa fa-heart" data-likeid='${anime.mal_id}'></i> ${likes.likes || 0} Likes</h6>
        <br>
        <button class="btn btn-info btn-cm" data-cm_popup='${anime.mal_id}'>Comments</button>
        <button class="btn btn-success">Reservations</button>
      </div>`;
  });
};

export default homePage;
