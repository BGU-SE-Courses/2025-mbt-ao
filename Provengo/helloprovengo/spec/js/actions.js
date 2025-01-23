
// Define an event filter for start events in a session
const AnyStartInSession = function (s) {
  return bp.EventSet("AnyStartInSession-" + s, function (e) {
    return e.data !== null && e.data.hasOwnProperty('startEvent') && e.data.startEvent && String(s).equals(e.data.session.name)
  })
}

defineAction = function (name, func) {
  // Add the new action to the SeleniumSession prototype
  SeleniumSession.prototype[name] = function (data) {
    let session = this;

    // Request a start event
    sync({ request: bp.Event(`Start(${name})`, { session: session, startEvent: true, parameters: data }) })

    // Block any other start events in the session while the function is executing
    block(AnyStartInSession(this.name), function () {
      // Execute the function
      func(session, data)

      // Request an end event
      sync({ request: bp.Event(`End(${name})`, { session: session, endEvent: true, parameters: data }) })
    })
  }
}



defineAction('adminLogin', function (session) {
  with(session){
    writeText(xpaths.adminLoginWindow.emailInput, adminEmail)
    writeText(xpaths.adminLoginWindow.passwordInput, adminPassword)
    waitForClickability(xpaths.adminLoginWindow.loginButton)
    click(xpaths.adminLoginWindow.loginButton)
    waitForVisibility(xpaths.notification.closeNotificationButton)
    click(xpaths.notification.closeNotificationButton)
  }
})

function loginUser(session, e) {
  sync({request:Event("Start(loginUser)")})
  session.writeText(xpaths.loginWindow.emailField, e.email)
  session.writeText(xpaths.loginWindow.passwordField, e.password)
  session.click(xpaths.loginWindow.loginButton)
  session.click(xpaths.homePageWindow.userInfoButton)
  session.click(xpaths.userInfoWindow.wishlistButton)
  let wishlistText = session.waitForVisibility(xpaths.allWishlistWindow.myWishlist).getText()
  let pattern = /\d+/
  let match = wishlistText.match(pattern)
  let numProductsInWishlist = match ? parseInt(match[0]) : 0
  if (numProductsInWishlist > 0) {
    session.click(xpaths.allWishlistWindow.myWishlist);
    for (let i = 0; i < numProductsInWishlist; i++) {
      session.waitForClickability(xpaths.wishlistContentWindow.deleteProductButton)
      session.click(xpaths.wishlistContentWindow.deleteProductButton)
      session.waitForVisibility(xpaths.deleteProductWishlistButton.clickOnDeleteInsideDeleteWindow)
      session.click(xpaths.deleteProductWishlistButton.clickOnDeleteInsideDeleteWindow)
      session.refresh()
    }
  }
  session.click(xpaths.wishlistContentWindow.homeButton);
}

function searchForProduct(session, e) {
  sync({request:Event("Start(searchForProduct)")})
  session.writeText(xpaths.homePageWindow.searchField, e.productName)
  session.waitForVisibility(xpaths.homePageWindow.productSearchResult)
  session.click(xpaths.homePageWindow.productSearchResult)
}

function addProductToWishlist(session, e) {
  sync({request:Event("Start(addProductToWishlist)")})
  session.click(xpaths.shirtProductWindow.addToWishlistButton)
  session.click(xpaths.shirtProductWindow.homeButton)
}



function checkProductAdded(session, e) {
  sync({request:Event("Start(checkProductAdded)")})
  session.click(xpaths.homePageWindow.userInfoButton)
  session.click(xpaths.userInfoWindow.wishlistButton)
  let wishlistText = session.waitForVisibility(xpaths.allWishlistWindow.myWishlist).getText()
  let pattern = /\d+/
  let match = wishlistText.match(pattern)
  let numOfProducts = match ? parseInt(match[0]) : 0
  if (numOfProducts > data.expectedWishlistCount) {
    console.log('Product successfully added to wishlist. Current count: ${numOfProducts}')
  } else {
    throw new Error(
        "Failed to add product to wishlist. Expected at least $data.expectedWishlistCount} products, but found ${numOfProducts}"
    )
  }
})


