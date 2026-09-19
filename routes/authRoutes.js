import {Router} from 'express';
import { SigupController, LoginController, RefreshTokenController, logoutController } from '../controllers/authController.js';

const router = Router();

router.post("/signup", SigupController)

router.post("/login", LoginController)

router.post("/refresh-token", RefreshTokenController)

router.post("/logout", logoutController)

export default router;