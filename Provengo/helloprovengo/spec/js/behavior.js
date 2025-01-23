/* @provengo summon selenium */


// bthread('Admin login', function() {
//   let s = new SeleniumSession('setup admin').start(prestaShopAdminLoginURL)
//   s.adminLogin()
// })

bthread('userAddProductToWishlist', function () {
  let userSession = new SeleniumSession("userSession").start("https://localhost/prestashop");
  sync({request:Event("End(loginUser)")}, loginUser(userSession, {email: 'yali4343@gmail.com', password: '0548005118'}));
  sync({request:Event("End(searchForProduct)")}, searchForProduct(userSession, {productName: 'Hummingbird printed t-shirt'}));
  sync({request:Event("End(addProductToWishlist)")}, addProductToWishlist(userSession));
  sync({request:Event("End(checkProductAdded)")}, checkProductAdded(userSession));
})


bthread("MakeSureStudentDontMarkADeletedCourse2", function() {
  sync({waitFor:Event("End(checkProductAdded)")});
  sync({waitFor:Event("End(addProductToWishlist)")});
  sync({waitFor:Event("End(searchForProduct)")});
})




