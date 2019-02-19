import {SchemaDirectiveVisitor} from 'graphql-tools';
import {defaultFieldResolver} from 'graphql';

import getUserId from '../../utils/getUserId';

class RequireAuthDirective extends SchemaDirectiveVisitor {

    visitFieldDefinition(field, details) {
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

export default RequireAuthDirective;