import {generateToken, hashPassword, getUserId} from '../../../utils';


const user = {

    async updateUser(parent, args, {prisma, request}, info) {

        if (typeof args.data.password === 'string') {
            args.data.password = await hashPassword(args.data.password)
        }

        return prisma.mutation.updateUser({
            where: {
                id: args.userId
            },
            data: args.data
        }, info)

    },

    async deleteUser(parent, args, {prisma, request}, info) {
        return prisma.mutation.deleteUser({
            where: {
                id: args.userId
            }
        }, info)
    }

};

export default user;