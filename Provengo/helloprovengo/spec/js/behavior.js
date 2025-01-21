/* @provengo summon selenium */

bthread('Admin login', function() {
  let s = new SeleniumSession('setup admin').start(prestaShopAdminLoginURL)
  s.adminLogin()
})

bthread('Add Product to Wishlist', function () {
  let session = new SeleniumSession('add-product-session').start(prestaShopURL);

  session.addProductToWishlist({
    productName: 'Hummingbird printed t-shirt',
  });

  session.close(); // Close the browser session
});

bthread('Check Product Added', function () {
  let session = new SeleniumSession('check-product-session').start(prestaShopURL);

  session.checkProductAdded({
    expectedWishlistCount: 1, // מספר המוצרים הצפוי ב-Wishlist לאחר ההוספה
  });

  session.close(); // Close the browser session
});







