import Agent from '../models/agent.model';

/**
 * Load agent and append to req.
 */
function load(req, res, next, id) {
  Agent.get(id).then((agent) => {
    req.agent = agent; // eslint-disable-line no-param-reassign
    return next();
  }).catch(e => next(e));
}

/**
 * Get agent
 * @returns {Agent}
 */
function get(req, res) {
  return res.json(req.agent);
}

/**
 * Create new agent
 * @property {string} req.body.email - The email of agent.
 * @property {string} req.body.firstName - The first name of agent.
 * @property {string} req.body.lastName - The last name of agent.
 * @property {string} req.body.mobileNumber - The mobileNumber of agent.
 * @property {string} req.body.transportType - The transport type of agent.
 * @property {string} req.body.transportDesc - The transport description (Year,
 model) of agent.
 * @property {string} req.body.licensePlate - The license plate of the agent (if any).
 * @property {string} req.body.color - The color of the vehicle (if any) of the agent.
 * @property {string} req.body.teamId - The teamId of the team which this agent
 belongs to.
 * @returns {Agent}
 */
function create(req, res, next) {
  const agent = new Agent({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobileNumber: req.body.mobileNumber,
    transportType: req.body.transportType,
    transportDesc: req.body.transportDesc,
    licensePlate: req.body.licensePlate,
    color: req.body.color,
    teamId: req.body.teamId,
  });

  agent.save().then(savedAgent => res.json(savedAgent)).catch(e => next(e));
}

/**
 * Update existing agent
 * @property {string} req.body.email - The email of agent.
 * @property {string} req.body.firstName - The first name of agent.
 * @property {string} req.body.lastName - The last name of agent.
 * @property {string} req.body.mobileNumber - The mobileNumber of agent.
 * @property {string} req.body.transportType - The transport type of agent.
 * @property {string} req.body.transportDesc - The transport description (Year,
 model) of agent.
 * @property {string} req.body.licensePlate - The license plate of the agent (if any).
 * @property {string} req.body.color - The color of the vehicle (if any) of the agent.
 * @property {string} req.body.teamId - The teamId of the team which this agent
 * @returns {Agent}
 */
function update(req, res, next) {
  const agent = req.agent;
  agent.email = req.body.email;
  agent.firstName = req.body.firstName;
  agent.lastName = req.body.lastName;
  agent.mobileNumber = req.body.mobileNumber;
  agent.transportType = req.body.transportType;
  agent.transportDesc = req.body.transportDesc;
  agent.licensePlate = req.body.licensePlate;
  agent.color = req.body.color;
  agent.teamId = req.body.teamId;

  agent.save().then(savedAgent => res.json(savedAgent)).catch(e => next(e));
}

/**
 * Get agent list.
 * @property {number} req.query.skip - Number of agents to be skipped.
 * @property {number} req.query.limit - Limit number of agents to be returned.
 * @returns {Agent[]}
 */
function list(req, res, next) {
  const {
    limit = 50,
    skip = 0
  } = req.query;
  Agent.list({ limit, skip }).then(agents => res.json(agents)).catch(e => next(e));
}

/**
 * Delete agent.
 * @returns {Agent}
 */
function remove(req, res, next) {
  const agent = req.agent;
  agent.remove().then(deletedAgent => res.json(deletedAgent)).catch(e => next(e));
}

export default {
  load,
  get,
  create,
  update,
  list,
  remove
};
