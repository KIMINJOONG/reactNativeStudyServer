import decodeJWT from "./decodeJWT";

export const isLoggedIn = async(req, res, next) => {
    const token = req.headers['token'];
    if(token) {
        const user = await decodeJWT(token);
        if(user){
            req.user = user;
            next();
        }
    } else {
        res.send('로그인을 해주세요.');
    }
}