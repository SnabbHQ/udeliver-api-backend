import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      email: Joi.string().email().required(),
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      email: Joi.string().email().required(),
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/agents
  createAgent: {
    body: {
      email: Joi.string().email().required(),
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      transportType: Joi.string().required().valid('car', 'motorcycle', 'bicycle', 'scooter', 'foot', 'truck'),
      transportDesc: Joi.string().optional(),
      licensePlate: Joi.string().optional(),
      location: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }),
      color: Joi.string().optional(),
      teamId: Joi.string().hex().required()
    }
  },

  // UPDATE /api/agents/:agentId
  updateAgent: {
    body: {
      email: Joi.string().email().required(),
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      transportType: Joi.string().required().valid('car', 'motorcycle', 'bicycle', 'scooter', 'foot', 'truck'),
      transportDesc: Joi.string().optional(),
      licensePlate: Joi.string().optional(),
      location: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }),
      color: Joi.string().optional(),
      teamId: Joi.string().hex().required()
    },
    params: {
      agentId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/pusher/auth
  pusherAuth: {
    body: {
      socket_id: Joi.string().required(),
      channel_name: Joi.string().required()
    }
  },

  // "time_ms": 1492611595838,
  //   "events": [
  //       {
  //           "channel": "private-1234",
  //           "name": "channel_vacated"
  //       }
  //   ]

  // POST /api/pusher/onDuty
  pusherOnDuty: {
    body: {
      time_ms: Joi.number().optional(),
      events: Joi.array().items({
        channel: Joi.string().required(),
        name: Joi.string().required().valid('channel_vacated', 'channel_occupied'),
      }),
    }
  },
};
