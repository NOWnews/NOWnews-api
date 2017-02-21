
module.exports = (total ,limit, page, skip) => {

    let totalPage = Math.ceil(total/limit);
    let hasNext = (page + 1) > totalPage ? false : true;
    let nextPage = (page + 1) >= totalPage ? totalPage : page + 1;
    let hasPrev = (page - 1) <= 0 ? false : true;
    let prevPage = (page - 1) <= 0 ? 0 : page - 1;

    return {
        total: total,
        totalPage: totalPage,
        currentPage: page,
        hasNext: hasNext,
        nextPage: nextPage,
        hasPrev: hasPrev,
        prevPage: prevPage,
        skip: skip,
        limit: limit
    };
};