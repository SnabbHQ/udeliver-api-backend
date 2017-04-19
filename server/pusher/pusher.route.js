import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import pusherCtrl from './pusher.controller';

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/pusher/auth - Authentication for presence channel for Puhser */
router.route('/auth')
  .post(validate(paramValidation.pusherAuth), pusherCtrl.auth);

export default router;
