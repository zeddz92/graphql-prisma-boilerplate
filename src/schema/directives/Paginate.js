import {SchemaDirectiveVisitor} from 'graphql-tools';
import {defaultFieldResolver} from 'graphql';

const pageInfo = (currentPage, perPage, total) => {
    const lastPage = Math.round(total / perPage);
    return {
        total,
        currentPage,
        perPage,
        lastPage
    }
};


class Paginate extends SchemaDirectiveVisitor {
    visitFieldDefinition(field, details) {
        const {resolve = defaultFieldResolver} = field;
        const {defaultPage, defaultPerPage} = this.args;


        field.resolve = async function (...params) {
            const args = params[1];
            const {models} = params[2];

            const pagination = params[1].pagination || {};
            let {page, perPage} = pagination;

            page = page || defaultPage;
            perPage = perPage || defaultPerPage;

            if(!models.hasOwnProperty(field.name)) {
                throw new Error('Model could not be found');
            }

            const model = new models[field.name];
            const total = await model.count(args.where);

            args.pageInfo = pageInfo(page, perPage, total);

            args.pagination = {
                first: perPage,
                skip: (page * perPage) - perPage,
            };

            return resolve.apply(this, params)
        }

    }

    visitEnumValue(value) {
        value.isDeprecated = false;
    }

}

export default Paginate;