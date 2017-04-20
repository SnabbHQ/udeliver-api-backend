import Joi from 'joi';

export default {
  // POST /api/tasks
  createTask: {
    body: {
      comments: Joi.string().optional(),
      type: Joi.string().optional().valid('pickup', 'dropoff'),
    }
  },

  // UPDATE /api/tasks/:taskId
  updateTask: {
    body: {
      comments: Joi.string().optional(),
      type: Joi.string().optional().valid('pickup', 'dropoff'),
    },
    params: {
      taskId: Joi.string().hex().required()
    }
  },
};
