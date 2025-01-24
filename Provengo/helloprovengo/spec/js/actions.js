
/* @provengo summon selenium */
/* @Provengo summon ctrl */



/**
 * Event filter to detect any start event within a given session.
 *
 * @param {string} s - The session name.
 * @returns {EventSet} - An event set filtering start events within the session.
 */
const AnyStartInSession = function (s) {
  return bp.EventSet("AnyStartInSession-" + s, function (e) {
    return e.data !== null && e.data.hasOwnProperty('startEvent') && e.data.startEvent && String(s).equals(e.data.session.name);
  });
};

/**
 * Defines an action to be added to the SeleniumSession prototype.
 *
 * @param {string} name - The name of the action.
 * @param {function} func - The function implementing the action.
 */
defineAction = function (name, func) {
  SeleniumSession.prototype[name] = function (data) {
    let session = this;

    // Request a start event
    sync({ request: bp.Event(`Start(${name})`, { session: session, startEvent: true, parameters: data }) });

    // Block any other start events in the session while the function is executing
    block(AnyStartInSession(this.name), function () {
      // Execute the function
      func(session, data);

      // Request an end event
      sync({ request: bp.Event(`End(${name})`, { session: session, endEvent: true, parameters: data }) });
    });
  };
};


//--------------------------------------------Start User-------------------------------------------------


/**
 * Logs in a regular user.
 *
 * @param {SeleniumSession} session - The Selenium session instance.
 */
defineAction('userLogin', function (session) {
  with(session) {

    session.click(xpaths.homePageWindow.loginButton)
    writeText(xpaths.loginWindow.emailField, userEmail);
    writeText(xpaths.loginWindow.passwordField, userPassword);
    click(xpaths.loginWindow.loginButton);
  }
});

// function loginUser(session) {
//   sync({request:Event("Start(loginUser)")})
//   session.writeText(xpaths.loginWindow.emailField, userEmail)
//   session.writeText(xpaths.loginWindow.passwordField, userPassword)
//   session.click(xpaths.loginWindow.loginButton)
//   session.click(xpaths.homePageWindow.userInfoButton)
//   session.click(xpaths.userInfoWindow.wishlistButton)
//   let wishlistText = session.waitForVisibility(xpaths.allWishlistWindow.myWishlist).getText()
//   let pattern = /\d+/
//   let match = wishlistText.match(pattern)
//   let numProductsInWishlist = match ? parseInt(match[0]) : 0
//   if (numProductsInWishlist > 0) {
//     session.click(xpaths.allWishlistWindow.myWishlist);
//     for (let i = 0; i < numProductsInWishlist; i++) {
//       session.waitForClickability(xpaths.wishlistContentWindow.deleteProductButton)
//       session.click(xpaths.wishlistContentWindow.deleteProductButton)
//       session.waitForVisibility(xpaths.deleteProductWishlistButton.clickOnDeleteInsideDeleteWindow)
//       session.click(xpaths.deleteProductWishlistButton.clickOnDeleteInsideDeleteWindow)
//       session.refresh()
//     }
//   }
//   session.click(xpaths.wishlistContentWindow.homeButton);
// }

function searchForProduct(session) {
  with (session) {
    sync({request: Event("Start(searchForProduct)")})
    writeText(xpaths.homePageWindow.searchField, shirtName)
    waitForVisibility(xpaths.homePageWindow.productSearchResult)
    click(xpaths.homePageWindow.productSearchResult)
  }
}

function addProductToWishlist(session) {
  sync({request:Event("Start(addProductToWishlist)")})
  session.click(xpaths.shirtProductWindow.addToWishlistButton)
  session.click(xpaths.addToWishlistWindow.myWishlistOption)
  session.click(xpaths.shirtProductWindow.homeButton)
}

function checkProductAdded(session) {
  sync({request: Event("Start(checkProductAdded)")})
  session.click(xpaths.homePageWindow.userInfoButton)
  session.click(xpaths.userInfoWindow.wishlistButton)
  session.click(xpaths.allWishlistWindow.myWishlist)
  // assertText(xpaths.myWishlistOptionWindow.productNameText, "Hummingbird printed t-shirt");
  sync({request: Event("End(checkProductAdded)")})
}
//   let wishlistText = session.waitForVisibility(xpaths.allWishlistWindow.myWishlist).getText()
//   let pattern = /\d+/
//   let match = wishlistText.match(pattern)
//   let numOfProducts = match ? parseInt(match[0]) : 0
//   if (numOfProducts > data.expectedWishlistCount) {
//     console.log('Product successfully added to wishlist. Current count: ${numOfProducts}')
//   } else {
//     throw new Error(
//         "Failed to add product to wishlist. Expected at least $data.expectedWishlistCount} products, but found ${numOfProducts}"
//     )
//   }
// }


// -------------------------------------------Start Admin--------------------------------------------
/*  */

/**
 * Logs in an admin user.
 *
 * @param {SeleniumSession} session - The Selenium session instance.
 */

defineAction('adminLogin', function (session) {
  with(session) {
    //add start event
    sync({request: Event('Start(adminLogin)')})
    //open in full screen
    writeText(xpaths.adminLoginWindow.emailInput, adminEmail);
    writeText(xpaths.adminLoginWindow.passwordInput, adminPassword);
    waitForClickability(xpaths.adminLoginWindow.loginButton);
    click(xpaths.adminLoginWindow.loginButton);

    //wait 2 seconds
    //add end event
    sync({request: Event('End(adminLogin)')})
    Ctrl.doSleep(2000);

  }
});


/**
 * Deletes a product from the admin panel.
 *
 * @param {SeleniumSession} session - The Selenium session instance.
 */
defineAction('adminDeleteProduct', function (session) {
  with(session) {
    sync({request: Event('Start(adminDeleteProduct)')})


    // make sure to open in maximum window
    waitForVisibility(xpaths.adminMainWindow.catalogButton);
    click(xpaths.adminMainWindow.catalogButton);
    waitForVisibility(xpaths.adminCatalogWindow.productsButton);
    click(xpaths.adminCatalogWindow.productsButton);
    waitForVisibility(xpaths.adminProductWindow.searchButton);
    //clean the input field
    clear(xpaths.adminProductWindow.insertNameButton);
    writeText(xpaths.adminProductWindow.insertNameButton, productName);
    click(xpaths.adminProductWindow.searchButton);
    waitForVisibility(xpaths.adminProductWindow.threeDotsButton);
    click(xpaths.adminProductWindow.threeDotsButton);
    waitForVisibility(xpaths.adminThreeDotsWindow.deleteButton);
    click(xpaths.adminThreeDotsWindow.deleteButton);
    waitForVisibility(xpaths.adminThreeDotsDeleteWindow.confirmDeleteButton);
    click(xpaths.adminThreeDotsDeleteWindow.confirmDeleteButton);
    //wait
    Ctrl.doSleep(5000);
    sync({request: Event('End(adminDeleteProduct)')})
  }
});

defineAction('adminCheckProductNotExists', function (session) {
  with(session) {
    sync({request: Event('Start(adminCheckProductNotExists)')})


    // make sure to open in a little bit bigger window
    waitForVisibility(xpaths.adminCatalogWindow.productsButton);
    click(xpaths.adminCatalogWindow.productsButton);
    waitForVisibility(xpaths.adminProductWindow.searchButton);
    //clean the input field
    clear(xpaths.adminProductWindow.insertNameButton);
    writeText(xpaths.adminProductWindow.insertNameButton, productName);
    click(xpaths.adminProductWindow.searchButton);
    //check if text in path x is equal to "hello world"
    assertText(xpaths.adminSearchOfNotFoundProductWindow.noResultsMessage, "There is no result for this search. Update your filters to view other products.");
    sync({request: Event('End(adminCheckProductNotExists)')})
  }
});

// -------------------------------------------End Admin----------------------------------------------










// // -------------------------------------------START 2023 PROJECT------------------------------------



//
// /**
//  * Adds a product to the user's wishlist.
//  *
//  * @param {SeleniumSession} session - The Selenium session instance.
//  */
// defineAction('userAddProductToWishlist', function (session) {
//   with(session) {
//     moveToElement(xpaths.userMainWindow.heartButton);
//     waitForClickability(xpaths.userMainWindow.heartButton);
//     click(xpaths.userMainWindow.heartButton);
//   }
// });

// -------------------------------------------END 2023 PROJECT -------------------------------------