const paginate = (connection) => {
    return {
        currentPage: 1,
        perPage: 10,
        total: connection.aggregate.count,
    }
};

export {paginate as default}