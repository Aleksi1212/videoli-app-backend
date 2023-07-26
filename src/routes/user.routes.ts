import express from 'express';
const userRoutes = express.Router();

userRoutes
    .get('/getUserData', (req, res) => {
        res.json({ userData: 'userData' });
    })

    .get('/getUserFileData', (req, res) => {
        res.json({ fileData: 'data' });
    })

    .get('/getUserFiles', (req, res) => {
        res.json({ userFiles: 'userFiles' });
    })

    .post('/createFile', (req, res) => {
        res.json({ fileCreated: 'true | false', fileId: 'fileId' });
    })

    .delete('/deleteFile', (req, res) => {
        res.json({ fileDeleted: 'true | false' });
    });

export default userRoutes;
