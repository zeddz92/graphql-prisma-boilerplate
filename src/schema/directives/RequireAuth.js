import {SchemaDirectiveVisitor} from 'graphql-tools';
import {defaultFieldResolver} from 'graphql';

import getUserId from '../../utils/getUserId';

class RequireAuth extends SchemaDirectiveVisitor {

    visitFieldDefinition(field) {
        const {resolve = defaultFieldResolver} = field;

        field.resolve = async function (...params) {

            const args = params[1];
            const {request} = params[2];

            args.userId = getUserId(request);

            return resolve.apply(this, params)
        }
    }

    visitEnumValue(value) {

    }
}

export default RequireAuth;