/* eslint-disable camelcase */
import commentsPopup from './modules/comments.js';
import { addLikes, postComment } from './modules/API.js';
import homePage from './modules/home.js';

import './styles/comments.css';
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
});

// Event: Open comments popup
content.addEventListener('click', (e) => {
  const clicked = e.target.closest('.btn-cm');
  if (!clicked) return;
  const animeId = +clicked.dataset.cm_popup;
  commentsPopup(animeId);
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
});

// Event: Close comments/reservations popup
content.addEventListener('click', (e) => {
  const clicked = e.target.closest('.btn-close');
  if (!clicked) return;

  const commentsPopup = document.querySelector('#comments-popup');
  commentsPopup.remove();
});
