import {GraphQLInt, GraphQLString} from "graphql";
import {expect} from "chai";

function handleArgs(fieldName, value, args, desc) {

    let error = `The ${fieldName} must be `;

    try {
        if (args.hasOwnProperty("min") && !args.hasOwnProperty("max")) {
            error += `at least ${args.min} ${desc}`;
            expect(value).to.be.above(args.min - 1);
        } else if (!args.hasOwnProperty("min") && args.hasOwnProperty("max")) {
            error += `below ${args.max} ${desc}`;
            expect(value).to.be.below(args.max);
        } else {
            error += `between ${args.min} and ${args.max} ${desc}`;
            expect(value).to.be.within(args.min, args.max);
        }
    } catch (e) {
        throw new Error(error);
    }

}

function validate(fieldName, type, value, args) {
    switch (type) {
        case GraphQLString:
            handleArgs(fieldName, value.length, args, 'characters');
            break;
        case GraphQLInt:
            handleArgs(fieldName, value, args, type, '');
            break;
        default:
            throw new Error('Invalid scalar type');
    }
}

export default validate;