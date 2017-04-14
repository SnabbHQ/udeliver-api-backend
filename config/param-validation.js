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
  }
};
