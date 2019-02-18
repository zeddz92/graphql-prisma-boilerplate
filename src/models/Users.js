import Base from './Base';

class Users extends Base {

    constructor() {
        super();
    }

    async count(where) {
        const fetchTotal = await this.prisma.query.usersConnection({where}, this.opConnectionArg);
        return fetchTotal.aggregate.count;
    }
}

export default Users;