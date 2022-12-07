const controllers = require('./controllers/index.js');
const router = require('express').Router();

// users
router.post('/user', controllers.requests.newUser);
// balance
router.get('/login', controllers.requests.getBal);
router.put('/login', controllers.requests.updateBal);
// transactions
router.get('/trans', controllers.requests.getTrans);
router.post('/trans', controllers.requests.addTrans);
router.delete('/trans', controllers.requests.deleteTrans);
router.put('/trans', controllers.requests.editTrans);
// goals
router.get('/goals', controllers.requests.getGoals);
router.post('/goals', controllers.requests.addGoals);
router.delete('/goals', controllers.requests.deleteGoals);
router.put('/goals', controllers.requests.editGoals);

module.exports = router;