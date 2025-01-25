
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

/**
 * Searches for a product on the website.
 *
 * @param {SeleniumSession} session - The Selenium session instance.
 */
function searchForProduct(session) {
  with (session) {
    sync({request: Event("Start(searchForProduct)")})
    writeText(xpaths.homePageWindow.searchField, shirtName)
    waitForVisibility(xpaths.homePageWindow.productSearchResult)
    click(xpaths.homePageWindow.productSearchResult)
    sync({request: Event("End(searchForProduct)")})

  }
}

/**
 * Adds a product to the wishlist.
 *
 * @param {SeleniumSession} session - The Selenium session instance.
 */
function addProductToWishlist(session) {
  sync({request:Event("Start(addProductToWishlist)")})
  session.click(xpaths.shirtProductWindow.addToWishlistButton)
  session.click(xpaths.addToWishlistWindow.myWishlistOption)
  session.click(xpaths.shirtProductWindow.homeButton)
  sync({request:Event("End(addProductToWishlist)")})

}

/**
 * Checks if the product has been added to the wishlist.
 *
 * @param {SeleniumSession} session - The Selenium session instance.
 */
function checkProductAdded(session) {
  sync({request: Event("Start(checkProductAdded)")})
  session.click(xpaths.homePageWindow.userInfoButton)
  session.click(xpaths.userInfoWindow.wishlistButton)
  session.click(xpaths.allWishlistWindow.myWishlist)
  // assertText(xpaths.myWishlistOptionWindow.productNameText, "Hummingbird printed t-shirt");
  sync({request: Event("End(checkProductAdded)")})
}


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
defineAction('adminDeleteAProduct', function (session) {
  with(session) {
    sync({request: Event('Start(adminDeleteAProduct)')})


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
    sync({request: Event('End(adminDeleteAProduct)')})
  }
});


/**
 * Checks if a product does not exist in the admin panel.
 *
 * @param {SeleniumSession} session - The Selenium session instance.
 */
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

