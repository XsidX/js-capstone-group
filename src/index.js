/* eslint-disable camelcase */
// eslint-disable-next-line import/no-cycle
import commentsPopup from './modules/comments.js';
import { addLikes, postComment, createReservation } from './modules/API.js';
import homePage from './modules/home.js';

import './styles/comments.css';
import './styles/home.css';
import reservationsPopup from './modules/reservations.js';
import { mobileMenu } from './modules/mobile.js';

const hamburger = document.querySelector('.hamburger');

window.addEventListener('load', homePage);

hamburger.addEventListener('click', (e) => {
  e.preventDefault();
  mobileMenu();
});

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

// Event: Open reservations popup
content.addEventListener('click', (e) => {
  const clicked = e.target.closest('.btn-rs');
  if (!clicked) return;
  const animeId = +clicked.dataset.reserve_popup;
  reservationsPopup(animeId);
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

content.addEventListener('submit', (e) => {
  e.preventDefault();
  const submit = e.target.closest('.reservation-form');
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
});

// Event: Close comments/reservations popup
content.addEventListener('click', (e) => {
  const clicked = e.target.closest('.btn-close');
  if (!clicked) return;

  const commentsPopup = document.querySelector('#comments-popup');
  commentsPopup.remove();
});
