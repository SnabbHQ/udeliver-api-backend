import express from 'express';
import agentRoutes from './agent/agent.route';
import authRoutes from './auth/auth.route';
import pusherRoutes from './pusher/pusher.route';
import userRoutes from './user/user.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount agents routes at /agents
router.use('/agents', agentRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount pusher routes at /pusher
router.use('/pusher', pusherRoutes);

export default router;
