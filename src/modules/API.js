/* eslint-disable camelcase */
const BASE_URL_ANIME = 'https://api.jikan.moe/v4/top/anime';
const Base_URL_INVOLVEMENT = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const APP_ID = 'Mzl3jcVUaVosQ0f1Xoys';

const getAnime = async () => {
  const url = `${BASE_URL_ANIME}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data.slice(0, 24);
};

const postComment = async (comment) => {
  const response = await fetch(`${Base_URL_INVOLVEMENT}/apps/${APP_ID}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  const data = await response.text();
  return data;
};

const getComments = async (commentId) => {
  const response = await fetch(`${Base_URL_INVOLVEMENT}/apps/${APP_ID}/comments?item_id=${commentId}`);
  const data = await response.text();
  return JSON.parse(data);
};

const addLikes = async (like) => {
  const response = await fetch(`${Base_URL_INVOLVEMENT}/apps/${APP_ID}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(like),
  });
  const data = await response.text();
  return data;
};

const getLikes = async () => {
  const response = await fetch(`${Base_URL_INVOLVEMENT}/apps/${APP_ID}/likes`);
  const data = await response.text();
  return JSON.parse(data);
};

const createReservation = async (reserveBody) => {
  const response = await fetch(`${Base_URL_INVOLVEMENT}/apps/${APP_ID}/reservations`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(reserveBody),
  });
  const data = await response.text();
  return data;
};

const getReservations = async (animeId) => {
  const response = await fetch(`${Base_URL_INVOLVEMENT}/apps/${APP_ID}/reservations?item_id=${animeId}`);
  const data = await response.text();
  return JSON.parse(data);
};

export {
  getAnime, postComment, getComments, addLikes, getLikes, createReservation, getReservations,
};
