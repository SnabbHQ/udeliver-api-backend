import Task from './task.model';
import webSocket from '../../config/websocket';

/**
 * Load Task and append to req.
 */
function load(req, res, next, id) {
  Task.get(id).then((task) => {
    req.task = task; // eslint-disable-line no-param-reassign
    return next();
  }).catch(e => next(e));
}

/**
 * Get Task
 * @returns {Task}
 */
function get(req, res) {
  return res.json(req.task);
}

/**
 * Create new Task
 * @property {string} req.body.comments - Extra comments for the Task.
 * @property {string} req.body.type - Define either if it is a pickup or a dropoff.
 * @returns {Task}
 */
function create(req, res, next) {
  const task = new Task({
    comments: req.body.comments,
    type: req.body.type,
  });

  task.save()
  .then((savedTask) => { res.json(savedTask); return savedTask; })
  .then(savedTask => webSocket.trigger('tasks', 'new-task', { task: savedTask }))
  .catch(e => next(e));
}

/**
 * Update existing Task
 * @property {string} req.body.comments - Extra comments for the Task.
 * @property {string} req.body.type - Define either if it is a pickup or a dropoff.
 * @returns {Task}
 */
function update(req, res, next) {
  const task = req.task;
  task.comments = req.body.comments;
  task.type = req.body.type;

  task.save()
  .then(savedTask => res.json(savedTask))
  .catch(e => next(e));
}

/**
 * Get Task list.
 * @property {number} req.query.skip - Number of Tasks to be skipped.
 * @property {number} req.query.limit - Limit number of Tasks to be returned.
 * @returns {Task[]}
 */
function list(req, res, next) {
  const {
    limit = 50,
    skip = 0
  } = req.query;
  Task.list({ limit, skip })
  .then(Tasks => res.json(Tasks))
  .catch(e => next(e));
}

/**
 * Delete Task.
 * @returns {Task}
 */
function remove(req, res, next) {
  const task = req.task;
  task.remove()
  .then(res.send('OK'))
  .catch(e => next(e));
}

export default {
  load,
  get,
  create,
  update,
  list,
  remove
};
