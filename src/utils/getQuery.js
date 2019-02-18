import prisma from '../prisma';

async function getTotal(connection, where) {
    const fetchTotal = await prisma
        .query[connection](
        {
            where
        },
        `{ aggregate { count } }`
    );
    return fetchTotal.aggregate.count;
}

async function query(args, type) {

    const {pagination, where, orderBy} = args;
    const defaultPage = Number(process.env.DEFAULT_PAGE);
    const defaultPerPage = Number(process.env.DEFAULT_PER_PAGE);
    let {page, perPage} = pagination ||
    {page: defaultPage, perPage: defaultPerPage};

    page = page || defaultPage;
    perPage = perPage || defaultPerPage;

    const opArgs = {
        first: perPage,
        skip: (page * perPage) - perPage,
        where,
        orderBy
    };

    return {
        page,
        perPage,
        total: await getTotal(`${type}Connection`, where),
        nodes: await prisma.query[type](opArgs)
    };

}

export async function rootQuery(args, type) {
    const {where, orderBy} = args;
    const opArgs = {
        where,
        orderBy
    };

    return {
        nodes: await prisma.query[type](opArgs)
    }
}


export default query;