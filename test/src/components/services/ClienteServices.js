import http from "../../http-common";

const getAll = () => {
    return http.get("/cliente");
};

const get = (id) => {
    return http.get(`/cliente/${id}`);
};

const create = (data) => {
    return http.post("/cliente", data);
};

const update = (id, data) => {
    return http.put(`/cliente/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/cliente/${id}`);
};

const ClienteServices = {
    getAll,
    get,
    create,
    update,
    remove,
}

export default ClienteServices;