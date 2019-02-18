import {rootQuery} from '../../../utils/getQuery';

const user = {

    async users(parent, args, {prisma}, info) {
        return rootQuery(args, info.fieldName);
    },

};

export default user;