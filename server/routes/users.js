import express from 'express';

import { logIn, signUp } from '../controllers/users.js';

const router = express.Router();

router.post('/login', logIn);
router.post('/signup', signUp)
export default router;