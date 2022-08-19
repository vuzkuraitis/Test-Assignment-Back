const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');

const { mysqlConfig } = require('../../config');
const validation = require('../../middleware/validation');

const addSchema = Joi.object({
  product_typeId: Joi.number().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  size: Joi.number(),
  length: Joi.number(),
  width: Joi.number(),
  height: Joi.number(),
  weight: Joi.number(),
  sku: Joi.string(),
});

const router = express.Router();

router.post('/add-card', validation(addSchema), async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const [data] =
      await con.execute(`INSERT INTO products (sku, name, price, size, length, width, height, weight, product_typeId)
            VALUES (${mysql.escape(req.body.sku)}, 
            ${mysql.escape(req.body.name)},
            ${mysql.escape(req.body.price)},
            ${mysql.escape(req.body.size)},
            ${mysql.escape(req.body.length)},
            ${mysql.escape(req.body.width)},
            ${mysql.escape(req.body.height)},
            ${mysql.escape(req.body.weight)},
            ${mysql.escape(req.body.product_typeId)})
            `);
    await con.end();

    if (!data.insertId) {
      return res.status(500).send({ err: 'Please try again' });
    }
    return res.send({ msg: 'Succesfully added a Card' });
  } catch (err) {
    return res.status(500).send({ err: 'Server issue occured. Please try again later' });
  }
});

module.exports = router;
