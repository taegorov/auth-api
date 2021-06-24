'use strict';

const permissions = require('../../../auth-server/src/auth/middleware/acl')
const bearer = require('../../../auth-server/src/auth/middleware/bearer')
const express = require('express');
const dataModules = require('../../../auth-server/src/auth/models/index');

const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  console.log(req.params.model);
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model', bearer, permissions('read'), handleGetAll);
router.get('/:model/:id', bearer, permissions('read'), handleGetOne);
router.post('/:model', bearer, permissions('create'), handleCreate);
router.put('/:model/:id', bearer, permissions('update'), handleUpdate);
router.delete('/:model/:id', bearer, permissions('delete'), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.findAll();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.findOne({ where: { id: id } });
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let record = await req.model.findOne({ where: { id: id } });
  let updatedRecord = await record.update(obj);
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.destroy({ where: { id: id } });
  res.status(200).json(deletedRecord);
}


module.exports = router;
