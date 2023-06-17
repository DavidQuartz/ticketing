import jwt from 'jsonwebtoken';

export const signin = () => {
  // Build a jwt payload {id, email}
  const payload = {
    id: 'test',
    email: 'test@test.com',
  };

  // Create the JWT! { jwt: MY_JWT}
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object {jwt: token}
  const session = { jwt: token };
  // Turn that session into JSON
  const sessionJWT = JSON.stringify(session);

  // Take that JSON and encode it as base64
  const base64 = Buffer.from(sessionJWT).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
