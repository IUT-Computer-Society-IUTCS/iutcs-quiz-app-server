import jwt from 'jsonwebtoken';

const secretKey: string = process.env.JWT_SECRET_KEY || 'helloworld';

export const generateToken = (userId: any, username:string) => {
    return jwt.sign({userId, username}, secretKey, {expiresIn: '1h'});
}

