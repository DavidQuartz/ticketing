import request from 'supertest';
import { app } from '../../app';
import { createTicket, generateObjectId, signin } from '../../test/helper';

describe('update ticket tests', () => {
  it('returns a 404 if the provided id does not exist', async () => {
    const id = generateObjectId();
    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', signin())
      .send({ title: 'New test', price: 20 })
      .expect(404);
  });
  it('returns a 401 if the user is not authenticated', async () => {
    const id = generateObjectId();
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({ title: 'New test' })
      .expect(401);
  });
  it('returns a 401 if the user does not own the ticket', async () => {
    const response = await createTicket();

    await request(app)
      .put(`/api/tickets/${response.body.ticket.id}`)
      .set('Cookie', signin())
      .send({ title: 'New test', price: 20 })
      .expect(401);
  });

  it('returns a 400 if the user provides an invalid title or price', async () => {
    // save a cookie to maintain the same userId
    const cookie = signin();

    const response = await createTicket(cookie);

    await request(app)
      .put(`/api/tickets/${response.body.ticket.id}`)
      .set('Cookie', cookie)
      .send({ title: '', price: 20 })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${response.body.ticket.id}`)
      .set('Cookie', cookie)
      .send({ price: '' })
      .expect(400);
  });
  it('updates the ticket provided valid inputs', async () => {
    // save a cookie to maintain the same userId
    const cookie = signin();

    const response = await createTicket(cookie);

    await request(app)
      .put(`/api/tickets/${response.body.ticket.id}`)
      .set('Cookie', cookie)
      .send({ title: 'New Test', price: 20 })
      .expect(200);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.ticket.id}`)
      .send();

    expect(ticketResponse.body.ticket.title).toEqual('New Test');
    expect(ticketResponse.body.ticket.price).toEqual('20');
  });
});
