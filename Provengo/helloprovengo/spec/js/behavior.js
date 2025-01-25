
/* @provengo summon selenium */
/* @Provengo summon ctrl */


//------------------------------------Start User-------------------------------

bthread('userAddProductToWishlist', function () {


    let s = new SeleniumSession("userSession");
    s.start(prestaShopURL);
    s.userLogin();
    // request(Event('userLogin'));

    searchForProduct(s);
    // request(Event('searchForProduct'));

    addProductToWishlist(s);
    // request(Event('addProductToWishlist'));

    checkProductAdded(s);
    request(Event('checkProductAdded'));

})

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
    // request(Event('adminLogin'));
    //
    s.adminDeleteAProduct();
    // request(Event('adminDeleteAProduct'));
    //
    s.adminCheckProductNotExists();
    // request(Event('adminCheckProductNotExists'));

})

bthread("Constraint1", function () {
    sync({ waitFor: Event("End(checkProductAdded)"), block: Event("Start(adminDeleteAProduct)") })
})



/**
 * bthread that responsible for marking the critical events in the system for the domain specific marking.
 */

// bthread('domain specific marking', function() {
//
//     const endOfActionES = EventSet("", e => e.name.startsWith("End("));
//
//     let e = sync({ waitFor: endOfActionES });
//     let criticalEvents = ["searchForProduct", "addProductToWishlist", "adminDeleteAProduct"];
//
//     let criticalEventsOrder = [];
//
//     while (e.name !== "End(adminDeleteAProduct)") {
//         criticalEvents.forEach(ce => {
//             if (e.name.includes(ce)) {
//                 criticalEventsOrder.push(ce);
//             }
//         });
//         e = sync ({waitFor: endOfActionES});
//     }
//     criticalEventsOrder.push("adminDeleteAProduct");
//
//     let ceo = criticalEventsOrder.join(" -> ");
//     sync({request: Ctrl.markEvent(ceo)});
// })


/**
 * Tracks and marks the flow of events between admin and user sessions.
 * This bthread counts events for each session type and marks critical transition points.
 * It starts after admin login completes and continues until both admin product deletion
 * and user product search events occur.
 *
 * Marks format: "{user_count},{admin_count},{session_name}"
 * - user_count: Number of user session events
 * - admin_count: Number of admin session events
 * - session_name: Current session identifier
 */
// bthread('two way marking', function() {
//     sync({ waitFor: Event('End(adminLogin)') });
//     const eventSet = EventSet("", e => true);
//     let admin_count = 0;
//     let user_count = 0;
//
//     let adminDeleteProduct_flag = false;
//     let userSearchProduct_flag = false;
//
//     while (!adminDeleteProduct_flag || !userSearchProduct_flag) {
//         let e = sync({waitFor: eventSet});
//         let session = e.session || (e.data && e.data.session && e.data.session.name);
//
//         if(session === 'adminDeleteAProduct') {
//             admin_count++;
//         } else if(session) {
//             user_count++;
//         }
//
//         if (e.name === 'End(adminDeleteAProduct)') {
//             adminDeleteProduct_flag = true;
//         }
//         if (e.name === 'End(searchForProduct)') {
//             userSearchProduct_flag = true;
//         }
//
//         sync({request: Ctrl.markEvent(`${user_count},${admin_count},${session || ''}`)});
//     }
// });

//------------------------------------End Admin-------------------------------




