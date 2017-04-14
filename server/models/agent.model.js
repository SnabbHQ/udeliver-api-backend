import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Agent Schema
 */
const AgentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  transportType: {
    type: String,
    required: true,
    enum: ['car', 'motorcycle', 'bicycle', 'scooter', 'foot', 'truck']
  },
  transportDesc: {
    type: String,
    required: false
  },
  licensePlate: {
    type: String,
    required: false
  },
  color: {
    type: String,
    required: false
  },
  teamId: {
    type: String,
    required: true
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
AgentSchema.method({});

/**
 * Statics
 */
AgentSchema.statics = {
  /**
   * Get agent
   * @param {ObjectId} id - The objectId of agent.
   * @returns {Promise<Agent, APIError>}
   */
  get(id) {
    return this.findById(id).exec().then((agent) => {
      if (agent) {
        return agent;
      }
      const err = new APIError('No such agent exists!', httpStatus.NOT_FOUND);
      return Promise.reject(err);
    });
  },

  /**
   * List agents in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of agents to be skipped.
   * @param {number} limit - Limit number of agents to be returned.
   * @returns {Promise<Agent[]>}
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
export default mongoose.model('Agent', AgentSchema);
