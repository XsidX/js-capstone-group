import fetchMock from 'fetch-mock';
import { commentsCount } from '../modules/comments.js';

describe('commentsCount()', () => {
  it('should return the number of comments', async () => {
    const itemId = 43608;
    fetchMock.get(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Mzl3jcVUaVosQ0f1Xoys/comments?item_id=${itemId}`,
      {
        data: [
          {
            item_id: 1,
            username: 'test',
            comment: 'test',
          },
        ],
      }
    );

    const data = await commentsCount(itemId);
    expect(data).equal(1);
  });
});
