import { getComments, getAnime, getReservations } from '../modules/API.js';

describe('animeCount()', () => {
  it('should return the number of comments', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: [
          {
            comment: 'This is nice!',
            creation_date: '2021-01-10',
            username: 'John',
          },
          {
            comment: 'Great content!',
            creation_date: '2021-02-10',
            username: 'Jane',
          },
        ],
      }),
    );
    const animes = await getAnime();
    expect(animes.length).toEqual(2);
  });
});

describe('commentsCount()', () => {
  it('should return the number of comments', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: [
          {
            comment: 'This is nice!',
            creation_date: '2021-01-10',
            username: 'John',
          },
          {
            comment: 'Great content!',
            creation_date: '2021-02-10',
            username: 'Jane',
          },
        ],
      }),
    );
    const comments = await getComments(43608);
    expect(comments.data.length).toEqual(2);
  });
});

describe('reservationsCount()', () => {
  it('should return the number of comments', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: [
          {
            username: 'John',
            date_start: '2020-12-17',
            date_end: '2020-12-18',
          },
          {
            username: 'Jane',
            date_start: '2021-1-12',
            date_end: '2021-1-17',
          },
        ],
      }),
    );
    const reservations = await getReservations(43608);
    expect(reservations.data.length).toEqual(2);
  });
});
