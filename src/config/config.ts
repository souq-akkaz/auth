import generateUuid from '../helpers/functions/generate-uuid.fn';

export default {
  port: process.env.PORT,
  appId: generateUuid(4)(),
  db: {
    schema: 'auth'
  }
};
