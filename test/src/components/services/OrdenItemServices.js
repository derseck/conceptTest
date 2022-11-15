import http from "../../http-common";

const getAll = () => {
    return http.get("/ordenItem");
};

const get = (id) => {
    return http.get(`/ordenItem/${id}`);
};

const getByOrden = (id) => {
    return http.get(`/ordenItem/orden/${id}`);
};

const create = (data) => {
    return http.post("/ordenItem", data);
};

const update = (id, data) => {
    return http.put(`/ordenItem/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/ordenItem/${id}`);
};

const OrdenItemServices = {
    getAll,
    get,
    getByOrden,
    create,
    update,
    remove,
}

export default OrdenItemServices;