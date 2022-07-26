/* eslint-disable camelcase */
import commentsPop from './modules/comments.js';
import { postComment } from './modules/API.js';

import './styles/comments.css';

window.addEventListener('load', 'home');

const content = document.querySelector('#content');

// Event: Open comments popup
content.addEventListener('click', (e) => {
  const clicked = e.target.closest('.btn-comments');
  if (!clicked) return;
  const animeId = +clicked.dataset.popup;
  commentsPop(animeId);
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
});

// Event: Close comments/reservations popup
content.addEventListener('click', (e) => {
  const clicked = e.target.closest('.btn-close');
  if (!clicked) return;

  const commentsPopup = document.querySelector('#comments-popup');
  commentsPopup.remove();
});
