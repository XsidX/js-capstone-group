/* eslint-disable camelcase */
// eslint-disable-next-line import/no-cycle
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import { commentsPopup, commentsCount } from './modules/comments.js';
import { addLikes, postComment, createReservation } from './modules/API.js';
import { homePage } from './modules/home.js';
import { reservationsPopup } from './modules/reservations.js';

import './styles/popup.css';
import './styles/home.css';

window.addEventListener('load', homePage);

const content = document.querySelector('#content');

// Event for like
content.addEventListener('click', (e) => {
  const clicked = e.target.closest('.fa-heart');
  if (!clicked) return;
  const animeId = +clicked.dataset.likeid;
  const likes = {
    item_id: animeId,
  };
  addLikes(likes);
  const numLike = clicked.nextElementSibling.innerText.match(/\d+/g);
  clicked.nextElementSibling.textContent = `${+numLike + 1} Likes`;
});

// Event: Open comments popup
content.addEventListener('click', (e) => {
  const clicked = e.target.closest('.btn-cm');
  if (!clicked) return;
  const animeId = +clicked.dataset.cm_popup;
  commentsPopup(animeId);
  document.querySelector('body').classList.add('no-scroll');
});

// Event: Open reservations popup
content.addEventListener('click', (e) => {
  const clicked = e.target.closest('.btn-rs');
  if (!clicked) return;
  const animeId = +clicked.dataset.reserve_popup;
  reservationsPopup(animeId);
  document.querySelector('body').classList.add('no-scroll');
});

// Event: Post comment
content.addEventListener('submit', (e) => {
  e.preventDefault();
  const submit = e.target.closest('.comments-form');
  if (!submit) return;

  const item_id = submit.dataset.animeid;
  const username = document.querySelector('#name').value;
  const comment = document.querySelector('#textarea').value;

  const commentBody = {
    item_id,
    username,
    comment,
  };

  postComment(commentBody);
  document.querySelector('#name').value = '';
  document.querySelector('#textarea').value = '';

  const addCommentHere = submit.previousElementSibling.lastElementChild;
  const commentsCount = addCommentHere.childElementCount;

  const commentHTML = `
    <li class="comment">
      <div>
        <span class="cm-date">${username}</span>
        <span class="cm-user">now</span>
      </div>
      <p>${comment}</p>
    </li>
  `;

  addCommentHere.innerHTML += commentHTML;

  const addCommentsCountHere = submit.previousElementSibling.firstElementChild;
  addCommentsCountHere.textContent = `View ${commentsCount + 1} previous comments`;
});

content.addEventListener('submit', (e) => {
  e.preventDefault();
  const submit = e.target.closest('#rs-form');
  if (!submit) return;

  const item_id = submit.dataset.animeid;
  const username = document.querySelector('#name').value;
  const date_start = document.querySelector('#start').value;
  const date_end = document.querySelector('#end').value;
  const reserveBody = {
    item_id,
    username,
    date_start,
    date_end,
  };
  createReservation(reserveBody);
  document.querySelector('#name').value = '';
  document.querySelector('#start').value = '';
  document.querySelector('#end').value = '';

  const addReserveHere = submit.previousElementSibling.lastElementChild;
  const reservesCount = addReserveHere.childElementCount - 1;

  const reserveHTML = `
    <tr>
      <td>${username}</td>
      <td>${date_start}</td>
      <td>${date_end}</td>
    </tr>
  `;

  addReserveHere.innerHTML += reserveHTML;

  const addReservesCountHere = submit.previousElementSibling.firstElementChild;
  addReservesCountHere.textContent = `View ${reservesCount + 1} previous reservations`;
});

// Event: Close comments/reservations popup
content.addEventListener('click', (e) => {
  const clicked = e.target.closest('.btn-close');
  if (!clicked) return;

  const commentsPopup = document.querySelector('#comments-popup');
  commentsPopup.remove();
  document.querySelector('body').classList.remove('no-scroll');
});

const count = async () => {
  const res = await commentsCount(43608);
  // const data = await res.json();
  console.log(res);
};

count();
