import {SchemaDirectiveVisitor} from 'graphql-tools';
import {GraphQLNonNull, GraphQLScalarType} from 'graphql';
import validate from '../../utils/validateField';

class LengthDirective extends SchemaDirectiveVisitor {
    visitInputFieldDefinition(field) {
        this.wrapType(field);
    }

    visitFieldDefinition(field) {
        this.wrapType(field);
    }

    wrapType(field) {
        const fieldName = field.astNode.name.value;

        if (field.type instanceof GraphQLNonNull &&
            field.type.ofType instanceof GraphQLScalarType) {
            field.type = new GraphQLNonNull(
                new LimitedLengthType(fieldName, field.type.ofType, this.args));
        } else if (field.type instanceof GraphQLScalarType) {
            field.type = new LimitedLengthType(fieldName, field.type, this.args);
        } else {
            throw new Error(`Not a scalar type: ${field.type}`);
        }
    }
}


class LimitedLengthType extends GraphQLScalarType {
    constructor(fieldName, type, args) {
        super({
            name: `LimitedLength`,

            serialize(value) {
                return type.serialize(value);
            },

            parseValue(value) {
                validate(fieldName, type, value, args);
                return type.parseValue(value);
            },

            parseLiteral(ast) {
                const value = type.parseLiteral(ast);
                validate(fieldName, type, value, args);
                return value;
            }
        });
    }
}

export default LengthDirective;