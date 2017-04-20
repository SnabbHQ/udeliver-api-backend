import Promise from 'bluebird';
import mongoose from 'mongoose';
import APIResponse from '../utils/APIResponse';

/**
 * Task Schema
 */
const TaskSchema = new mongoose.Schema({
  comments: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
    enum: ['pickup', 'dropoff']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
TaskSchema.method({});

/**
 * Statics
 */
TaskSchema.statics = {
  /**
   * Get task
   * @param {ObjectId} id - The objectId of task.
   * @returns {Promise<Agent, APIError>}
   */
  get(id) {
    return this.findById(id).exec().then((task) => {
      if (task) {
        return task;
      }
      const err = APIResponse.taskNotFound();
      return Promise.reject(err);
    });
  },

  /**
   * List tasks in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of tasks to be skipped.
   * @param {number} limit - Limit number of tasks to be returned.
   * @returns {Promise<Task[]>}
   */
  list({
    skip = 0,
    limit = 50
  } = {}) {
    return this.find().sort({ createdAt: -1 }).skip(+skip).limit(+limit)
    .exec();
  }
};

/**
 * @typedef Agent
 */
export default mongoose.model('Task', TaskSchema);
