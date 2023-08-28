import express from 'express';

import { register } from '../controller/authController';

export default (router: express.Router) => {
  router.post('/auth/register', register);
};
