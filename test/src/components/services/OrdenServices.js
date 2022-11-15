import http from "../../http-common";

const getAll = () => {
    return http.get("/orden");
};

const get = (id) => {
    return http.get(`/orden/${id}`);
};

const getByClient = (id) => {
    return http.get(`/orden/cliente/${id}`);
};

const create = (data) => {
    return http.post("/orden", data);
};

const update = (id, data) => {
    return http.put(`/orden/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/orden/${id}`);
};

const OrdenServices = {
    getAll,
    get,
    getByClient,
    create,
    update,
    remove,
}

export default OrdenServices;