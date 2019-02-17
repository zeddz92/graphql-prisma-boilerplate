import { Prisma } from 'prisma-binding';
import {fragmentReplacements} from './schema/resolvers';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: "http://localhost:4466",
    secret: process.env.PRISMA_SECRET,
    fragmentReplacements
});

export default prisma;