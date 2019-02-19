import {SchemaDirectiveVisitor} from 'graphql-tools';

import query from '../../utils/getQuery';

const pageInfo = (nodes, currentPage, perPage, total) => {
    const lastPage = Math.round(total / perPage);
    const nextPage = currentPage < lastPage ? currentPage + 1: null;
    const prevPage = currentPage > 1 ? currentPage - 1: null;
    return {
        nodes,
        pageInfo: {
            total,
            currentPage,
            perPage,
            lastPage,
            nextPage,
            prevPage
        }
    }
};

class PaginateDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field, details) {

        field.resolve = async function (...params) {
            const args = params[1];
            const type = field.name;
            const {page, perPage, nodes, total} = await query(args, type);

            return pageInfo(nodes, page, perPage, total);
        }
    }

    visitEnumValue(value) {
        value.isDeprecated = false;
    }

}

export default PaginateDirective;