const express = require('express');
const mysql = require('mysql2/promise');

const { mysqlConfig } = require('../../config');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const [data] = await con.execute('SELECT * FROM products');
    await con.end();

    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err: 'Server issue occured. Please try again later' });
  }
});

router.get('/product-type', async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const [data] = await con.execute('SELECT * FROM product_type');
    await con.end();

    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err: 'Server issue occured. Please try again later' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCards = `DELETE FROM products
    WHERE id IN (${req.params.id})`;
    const con = await mysql.createConnection(mysqlConfig);
    const [data] = await con.execute(deleteCards);

    await con.end();

    if (!data.affectedRows) {
      return res.status(500).send({ err: 'Please make your selection' });
    }
    return res.send({ msg: 'Successfully deleted a Card' });
  } catch (err) {
    return res.status(500).send({ err: 'A server issue has occured - please try again later' });
  }
});

module.exports = router;
