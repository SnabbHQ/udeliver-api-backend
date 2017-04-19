import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import agentCtrl from './agent.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/agents - Get list of agents */
  .get(agentCtrl.list)

  /** POST /api/agents - Create new agent */
  .post(validate(paramValidation.createAgent), agentCtrl.create);

router.route('/:agentId')
  /** GET /api/agents/:agentId - Get agent */
  .get(agentCtrl.get)

  /** PUT /api/agents/:agentId - Update agent */
  .put(validate(paramValidation.updateAgent), agentCtrl.update)

  /** DELETE /api/agents/:agentId - Delete agent */
  .delete(agentCtrl.remove);

/** Load agent when API with agentId route parameter is hit */
router.param('agentId', agentCtrl.load);

export default router;
