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

/**
 * Webhook endpoint for pusher to notify if a certain channel becomes available
 * or not. This way we can track if a certain worker goes onDuty or not.
 * @param req
 * @param res
 * @param next
 * @property {string} req.body.name - The name of private channel. This value can
 * be either channel_occupied or channel_vacated.
 * @property {string} req.body.channel - The channel name itself (ex. private-{userId})
 * @returns {*}
 */
function onDuty(req, res) {
  const name = req.body.name;
  const channel = req.body.channel;

  return res.json({
    name,
    channel
  });
}

export default { auth, onDuty };
