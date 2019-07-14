import express from 'express';
import db from '../models';
import { savePassword, comparePassword } from '../utils/password';
import createJWT from '../utils/createJWT';
import {isLoggedIn} from '../utils/checkLogin';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const {id, password, name } = req.body;
        const hashedPassword = await savePassword(password);
        await db.User.create({
            name,
            userId: id,
            password: hashedPassword
        });
        res.send('성공');
    }catch(e){
        console.error(e);
        next(e);
    }
    
    
});

router.post('/login', async(req, res, next) => {
    try{
        const {id, password} = req.body;
        const user = await db.User.findOne({
            userId: id
        });
        const isLogin = await comparePassword(password, user.password);
        if(isLogin){
            const token = createJWT(user.id);
            const filteredUser = Object.assign({}, user.toJSON());
            delete filteredUser.password;
            return res.status(200).json({'token' : token, 'user' : filteredUser});
        } else {
            return res.status(404).send('비밀번호가 일치하지 않습니다.');
        }
    }catch(e){
        console.error(e);
        next(e);
    }
});

router.get('/detail',isLoggedIn, async(req, res, next) => {
    const user = req.user;
    if(user){
            const filteredUser = await Object.assign({}, user.toJSON());
            delete filteredUser.password;
            return res.status(200).json(filteredUser);
    } else {
        return res.status(404).send('로그인이 필요합니다.');
    }
});

export default router;