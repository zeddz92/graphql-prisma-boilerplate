import {extractFragmentReplacements} from 'prisma-binding'

import Query from './queries';
import Mutation from './mutations';
import User from './User';

const resolvers = {
    Query,
    Mutation,
    User
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export {resolvers, fragmentReplacements}