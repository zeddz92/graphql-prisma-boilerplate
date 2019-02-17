import jwt from 'jsonwebtoken'

require('@babel/polyfill/noConflict');

/**
 * Util function to get a logged user id though a jwt token.
 * @param request
 * @param {boolean} requireAuth
 * @return {null || string}
 */
const getUserId = (request, requireAuth = true) => {
    const header = request.request.headers || request.request.header;
    const {authorization} = header;

    if (authorization) {
        const token = authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId;
    }

    if (requireAuth) {
        throw Error('Authentication required');
    }

    return null

};

export {getUserId as default}