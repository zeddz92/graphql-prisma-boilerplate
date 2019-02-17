import bcrypt from 'bcryptjs';
import {generateToken, hashPassword} from '../../../utils';

const auth = {
    async login(parent, args, {prisma}, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        });

        if(!user) {
            throw new Error('Unable to login')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password);

        if(!isMatch) {
            throw new Error('Unable to login')
        }

        return {
            user,
            token: generateToken(user.id)
        }
    },

    async signup(parent, args, {prisma}, info) {
        const password = await hashPassword(args.data.password);

        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        });

        return {
            user,
            token: generateToken(user.id)
        }
    },
};

export default auth;