import prisma from '../prisma';

class Base {
    constructor() {
        this.prisma = prisma;
        this.opConnectionArg = `{ aggregate { count } }`;
    }
}

export default Base;