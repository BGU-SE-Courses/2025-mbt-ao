
/* @provengo summon selenium */
/* @Provengo summon ctrl */

//
///**
// * This story opens a new browser window, goes to google.com, and searches for "Pizza".
// */


//------------------------------------Start User-------------------------------



bthread('userAddProductToWishlist', function () {

  // let userSession = new SeleniumSession("userSession").start("https://localhost/prestashop");
  // sync({request:Event("End(loginUser)")}, loginUser(userSession, {email: userEmail, password: userPassword}));
  // sync({request:Event("End(searchForProduct)")}, searchForProduct(userSession, {productName: shirtName}));
  // sync({request:Event("End(addProductToWishlist)")}, addProductToWishlist(userSession));
  // sync({request:Event("End(checkProductAdded)")}, checkProductAdded(userSession));
    let s = new SeleniumSession("userSession");
    s.start(prestaShopURL);
    s.userLogin();
    // request(Event('userLogin'));

    searchForProduct(s);
    // request(Event('searchForProduct'));

    addProductToWishlist(s);
    // request(Event('addProductToWishlist'));

    checkProductAdded(s);
    // request(Event('checkProductAdded'));


})


// bthread("MakeSureStudentDontMarkADeletedCourse2", function() {
//   sync({waitFor:Event("End(checkProductAdded)")});
//   sync({waitFor:Event("End(addProductToWishlist)")});
//   sync({waitFor:Event("End(searchForProduct)")});
// })

//------------------------------------End User-------------------------------
//---------------------------------------------------------------------------
//------------------------------------Start Admin-------------------------------

/**
 * This story is responsible for the initial setup of the test environment.
 * It performs the following steps:
 * 1. Logs into the admin panel of the store.
 * 2. Signals the completion of the setup process.
 */
bthread('adminDeleteAProduct', function() {
    let s = new SeleniumSession('adminDeleteAProduct')
    s.start(prestaShopAdminLoginURL);
    s.adminLogin();
    //request(Event('adminLogin'));

    s.adminDeleteProduct();
    //request(Event('adminDeleteProduct'));

    s.adminCheckProductNotExists();
    //request(Event('adminCheckProductNotExists'));

})

bthread("Constraint1", function () {
    sync({ waitFor: Event("checkProductAdded"), block: Event("adminDeleteProduct") })
})


//------------------------------------End Admin-------------------------------




