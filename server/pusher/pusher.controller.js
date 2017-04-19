import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import pusher from '../../config/pusher';

/**
 * Returns pusher token if valid socke_id and channel
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function auth(req, res, next) {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const presenceData = {
    user_id: 'unique_user_id',
    user_info: {
      name: 'Mr Pusher',
      twitter_id: '@pusher'
    }
  };
  const authToken = pusher.authenticate(socketId, channel, presenceData);
  res.send(authToken);

  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
  return next(err);
}

export default { auth };
