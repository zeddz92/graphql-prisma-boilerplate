function get(obj) {

}

const user = {

    async users(parent, args, {prisma}, info) {

        const {where, orderBy} = args;

        const opArgs = {
            ...args.pagination,
            where,
            orderBy
        };

        const nodes = await prisma.query.users(opArgs);

        return {
            nodes,
            pageInfo: args.pageInfo
        }
    },

};

export default user;