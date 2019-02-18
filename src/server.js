// import '@babel/polyfill/noConflict'
import {GraphQLServer} from 'graphql-yoga';
import {resolvers, fragmentReplacements} from './schema/resolvers';
import schemaDirectives from './schema/directives'

import models from './models';
import prisma from './prisma';

const server = new GraphQLServer({
    typeDefs: './src/schema/schema.graphql',
    resolvers,
    context(request) {
        return {
            prisma,
            request,
            models
        }
    },
    fragmentReplacements,
    schemaDirectives
});

export {server as default}