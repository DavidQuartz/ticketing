import request from 'supertest';
import { app } from '../../app';
import { signin, generateObjectId } from '../../test/helper';

describe('Show Tickets route', () => {
  it('returns a 404 if the ticket is not found', async () => {
    const id = generateObjectId(); // generate valid ObjectId
    await request(app).get(`/api/tickets/${id}`).send().expect(404);
  });

  it('returns a ticket if the ticket is found', async () => {
    const title = 'test';
    const price = '20';
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', signin())
      .send({
        title,
        price,
      })
      .expect(201);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.ticket.id}`)
      .send()
      .expect(200);
    expect(ticketResponse.body.ticket.title).toEqual(title);
    expect(ticketResponse.body.ticket.price).toEqual(price);
  });
});
