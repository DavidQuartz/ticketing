import request from 'supertest';
import { app } from '../../app';
import { createTicket } from '../../test/helper';

describe('Ticket indexing tests', () => {
  it('can fetch a list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app).get('/api/tickets').send();

    expect(response.body.tickets.length).toEqual(3);
  });
});
