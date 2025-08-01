import express from 'express';
import { DocumentController } from '../controllers/document.controller';
import { upload } from '../middlewares/upload';

const router = express.Router();

router.post('/upload', upload.array('documents', 10), DocumentController.upload);
router.put('/update/:doc_id', upload.single('document'), DocumentController.update);
router.get('/user/:user_id', DocumentController.getUserDocs);

export default router;
