import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const createNewContact = (contactInfo) => {
  return axios.post(baseUrl, contactInfo).then((res) => res.data);
};

const updateContact = (id, updatedContact) => {
  return axios.put(`${baseUrl}/${id}`, updatedContact).then((res) => res.data);
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`, id).then((res) => res.data);
};

export default { getAll, createNewContact, updateContact, deleteContact };
