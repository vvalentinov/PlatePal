const request = async (method, token, url, data) => {
    const options = {};

    if (method !== 'GET') {
        options.method = method;

        const isFormData = data instanceof FormData;

        if (!isFormData) {
            options.headers = { 'Content-Type': 'application/json' };
            options.body = JSON.stringify(data);
        } else {
            options.body = data;
        }
    }

    if (token) {
        options.headers = { ...options.headers, 'X-Authorization': token };
    }

    const response = await fetch(url, options);

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
};

export const requestFactory = (token) => {
    return {
        get: request.bind(null, 'GET', token),
        post: request.bind(null, 'POST', token),
        put: request.bind(null, 'PUT', token),
        patch: request.bind(null, 'PATCH', token),
        delete: request.bind(null, 'DELETE', token),
    }
};
