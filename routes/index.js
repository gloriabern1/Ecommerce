var express = require('express');
var router = express.Router();
var Product_Controller=require('../Controllers/Product-controllers');
const passport=require('passport');
/* GET home page. */
router.get('/', Product_Controller.Product_List_Index)
 
router.get('/productdetails/:id', Product_Controller.Get_Product_Detail)

router.get('/productdetails', Product_Controller.Product_List_Index)

router.get('/Productsgrid/:Page?', Product_Controller.Get_Filtered_Product)

router.get('/Checkout', function(req, res, next) {
  res.render('Checkout', { title: 'Gobid Store' });
});

router.get('/add-to-cart/:id', Product_Controller.Add_Product_Cart)

module.exports = router;
