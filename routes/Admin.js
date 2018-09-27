var express = require('express');
var router = express.Router();
var Category_controllers = require('../Controllers/Category-controllers');
var Subcategory_controllers=require('../Controllers/Subcategory-controllers');
var items_controllers=require('../Controllers/Item-controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('AdminViews/Dashboard', { title: 'Admin Page' });
});

/// Category ROUTES ///

// GET catalog home page.
//router.get('/', Category_controller.index);

// GET request for creating a Category. NOTE This must come before routes that display Category (uses id).
router.get('/Createcategory', function(req, res, next) {
  res.render('AdminViews/Createcategory', { title: 'Admin Page' });
});

// POST request for creating Category.
router.post('/create', Category_controllers.Category_create_post);

// GET request to delete Category.
//router.get('/:id/delete', Category_controllers.Category_delete_get);

// POST request to delete Category.
router.post('/:id/delete', Category_controllers.Category_delete_post);

// GET request to update Category.

router.get('/:id/update', Category_controllers.Category_update_get);

// POST request to update Category.
router.post('/:id/update', Category_controllers.Category_update_post);

// GET request for one Category.
//router.get('/:id', Category_controllers.Category_detail);


router.get('/CategoryList', Category_controllers.Category_list);

/// SubCategory ROUTES ///

// GET request for creating a Category. NOTE This must come before routes that display Category (uses id).
router.get('/CreateSubcategory', Subcategory_controllers.Subcategory_Create_get);

// POST request for creating Category.
router.post('/createSubCategory', Subcategory_controllers.Subcategory_Create_Post);

// GET request to delete Category.
//router.get('/:id/delete', Category_controllers.Category_delete_get);

// POST request to delete Category.
router.post('/:id/deleteSubcategory', Subcategory_controllers.Subcategory_delete_Post);

// GET request to update Category.

router.get('/:id/updateSubcategory', Subcategory_controllers.Subcategory_Update_get);

// POST request to update Category.
router.post('/:id/updatesubcategory', Subcategory_controllers.Subcategory_Update_post);

// GET request for one Category.
//router.get('/:id', Category_controllers.Category_detail);

// GET request for list of all Category items.
router.get('/SubCategoryList', Subcategory_controllers.Subcategory_list);

/// ITEM ROUTES ///

// GET request for creating a Category. NOTE This must come before routes that display Category (uses id).
router.get('/CreateItem', items_controllers.Item_Create_get);

// POST request for creating Category.
router.post('/createItem', items_controllers.Item_Create_Post);

// GET request to delete Category.
//router.get('/:id/delete', Category_controllers.Category_delete_get);

// POST request to delete Category.
router.post('/:id/DeleteItem', items_controllers.Item_delete_Post);

// GET request to update Category.

router.get('/:id/UpdateItem', items_controllers.Item_Update_get);

// POST request to update Category.
router.post('/:id/UpdateItem', items_controllers.Item_Update_post);

// GET request for one Category.
//router.get('/:id/ItemDetail', items_controllers.Item_detail);

// GET request for list of all Category items.
router.get('/ItemList', items_controllers.Item_list);

router.get('/ItemList/subcategory/:id', items_controllers.Item_list_subcategory);

module.exports = router;
