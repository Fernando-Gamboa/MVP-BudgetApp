const {getProducts, getProduct, getStyles, getRelated} = require('../models/products.js')
const db = require('../database/db.js');


const getAllP = (req, res) => {
  console.log(req.query.count)
  // declare a page and count
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  // set a count LIMIT and an OFFSET for pagination
  let query = `SELECT * FROM products LIMIT ${count} OFFSET ${count * page - count}`;
  db.query(query, [], (err, response) => {
    if (err) {
      console.log(err, 'Select proper count/page number (>= 1)');
    } else {
      console.log(response.rows, 'THIS IS getALLP ---');
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

const getOne = (req, res) => {

  console.log(req.params.id);

  let query = `SELECT row_to_json(p)
  from (
    SELECT id, name, slogan, description, category, default_price,
      (
        SELECT array_to_json(array_agg(row_to_json(f)))
        from (
          SELECT feature, value
          FROM features
          WHERE product_id = products.id
        ) f
      ) as features
    FROM products
    WHERE id = ${req.params.id}
  ) p
  `;
  db.query(query, [], (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response.rows[0].row_to_json, 'THIS IS getOne ---');
      res.status(200).json(response.rows[0].row_to_json);
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


module.exports.getAllP = getAllP;
module.exports.getOne = getOne;