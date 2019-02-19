import {SchemaDirectiveVisitor} from 'graphql-tools';
import {GraphQLString, defaultFieldResolver} from 'graphql';
import dateformat from 'dateformat'

class DateFormatDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field, details) {
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

export default DateFormatDirective;