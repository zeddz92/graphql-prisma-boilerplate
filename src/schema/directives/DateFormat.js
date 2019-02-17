import {SchemaDirectiveVisitor} from 'graphql-tools';
import {GraphQLString, defaultFieldResolver} from 'graphql';
import dateformat from 'dateformat'

class DateFormat extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const {resolve = defaultFieldResolver} = field;
        const {format, defaultFormat} = this.args;
        field.resolve = async function (...args) {
            const date = await resolve.apply(this, args);
            return dateformat(date, format || defaultFormat);
        };

        field.type = GraphQLString;
    }

    visitEnumValue(value) {

    }
}

export default DateFormat;