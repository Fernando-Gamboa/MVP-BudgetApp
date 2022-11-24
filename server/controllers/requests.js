const {getProducts, getProduct, getStyles, getRelated} = require('../models/requests.js')
const db = require('../database/db.js');


const getBal = (req, res) => {
  let query = `SELECT balance FROM login WHERE id = 2`;
  db.query(query, [], (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response.rows[0].balance, 'THIS IS getBal ---');
      res.status(200).json(response.rows[0].balance);
    }
  })
}

const updateBal = (req, res) => {
  // you need to first set one login row to then later update the balance
  let query = `UPDATE login SET balance = ${req.body.balance} WHERE id = 2`;
  db.query(query, [], (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response.rows, 'THIS IS updateBal ---');
      res.status(200).json('Balance is updated');
    }
  })
}

const getTrans = (req, res) => {
  let query = `SELECT * FROM transactions`;
  db.query(query, [], (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response.rows, 'THIS IS getTrans ---');
      res.status(200).json(response.rows);
    }
  })

  // MODELS SECTION ---
  // getProducts(page, count)
  //   .then(result => {
  //     res.status(200).send(result.data);
  //   })
  //   .catch(e => console.log('products getAll error', e.response.data))
}

const addTrans = (req, res) => {
  let query = `INSERT INTO transactions (amount, title, date, time, tag, sign) VALUES ('${req.body.amount}', '${req.body.title}', '${req.body.date}', '${req.body.time}', '${req.body.tag}', '${req.body.sign}')`;
  db.query(query, [], (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response, 'THIS IS addTrans ---');
      res.status(200).json('Transaction created');
    }
  })

  // MODELS SECTION ---
  // let id = req.params.id || {id: '40344'};
  // console.log('get one', req.params);
  // getProduct(id)
  //   .then(result => {
  //     res.status(200).send(result.data);
  //   })
  //   .catch(e => console.log('products getOne error', e.response.data))
}

const getGoals = (req, res) => {
  let query = `SELECT * FROM goals`;
  db.query(query, [], (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response.rows, 'THIS IS getGoals ---');
      res.status(200).json(response.rows);
    }
  })

  // MODELS SECTION ---
  // getProducts(page, count)
  //   .then(result => {
  //     res.status(200).send(result.data);
  //   })
  //   .catch(e => console.log('products getAll error', e.response.data))
}

const addGoals = (req, res) => {
  let query = `INSERT INTO goals (save, sdate, date) VALUES ('${req.body.save}', '${req.body.sdate}', '${req.body.date}')`;
  db.query(query, [], (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response, 'THIS IS addGoals ---');
      res.status(200).json('Goal created');
    }
  })

  // MODELS SECTION ---
  // let id = req.params.id || {id: '40344'};
  // console.log('get one', req.params);
  // getProduct(id)
  //   .then(result => {
  //     res.status(200).send(result.data);
  //   })
  //   .catch(e => console.log('products getOne error', e.response.data))
}

const deleteTrans = (req, res) => {
  let query = `DELETE FROM transactions WHERE id = ${req.body.id}`;
  db.query(query, [], (err, response) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(response, 'THIS IS deleteTrans ---');
      res.status(200).json('Transaction deleted');
    }
  })

  // MODELS SECTION ---
  // let id = req.params.id || {id: '40344'};
  // console.log('get one', req.params);
  // getProduct(id)
  //   .then(result => {
  //     res.status(200).send(result.data);
  //   })
  //   .catch(e => console.log('products getOne error', e.response.data))
}

const deleteGoals = (req, res) => {
  let query = `DELETE FROM goals WHERE id = ${req.body.id}`;
  db.query(query, [], (err, response) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(response, 'THIS IS deleteGoals ---');
      res.status(200).json('Goal deleted');
    }
  })

  // MODELS SECTION ---
  // let id = req.params.id || {id: '40344'};
  // console.log('get one', req.params);
  // getProduct(id)
  //   .then(result => {
  //     res.status(200).send(result.data);
  //   })
  //   .catch(e => console.log('products getOne error', e.response.data))
}

  module.exports.getBal = getBal;
  module.exports.updateBal = updateBal;
  module.exports.getTrans = getTrans;
  module.exports.addTrans = addTrans;
  module.exports.getGoals = getGoals;
  module.exports.addGoals = addGoals;
  module.exports.deleteTrans = deleteTrans;
  module.exports.deleteGoals = deleteGoals;