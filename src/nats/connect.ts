import { connect } from 'node-nats-streaming';
import config from '../config/config';
import initListeners from './initialize-listener';

const establishNatsConection = () => {
  const stanClient = connect('test-cluster', config.appId, { url: process.env.NATS_URI });
  stanClient.once('connect', () => {
    console.log('Connected successfully to nats streaming server cluster `test-cluster`.');
    initListeners();
  });
  return stanClient;
};

export default establishNatsConection;
