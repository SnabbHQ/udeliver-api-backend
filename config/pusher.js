import Pusher from 'pusher';

const pusher = new Pusher({
  appId: '328861',
  key: 'f0313bf24c4d0285f4c2',
  secret: '86f1f620d518b8e7fa75',
  cluster: 'eu',
  encrypted: true
});

export default pusher;
