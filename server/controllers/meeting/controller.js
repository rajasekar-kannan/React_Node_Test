const service = require('./service');

const add = async (req) => {
  return service.add(req.body);
};

const index = async (req) => {
  return service.index(req.query);
};

const view = async (req) => {
  return service.view(req.params.id);
};

const deleteData = async (req) => {
  return service.deleteData(req.params.id);
};

const deleteMany = async (req) => {
  return service.deleteMany(req.body);
};

module.exports = { add, index, view, deleteData, deleteMany };
