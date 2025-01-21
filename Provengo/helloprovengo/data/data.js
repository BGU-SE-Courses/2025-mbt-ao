/*
 *  This is a good place to put common test data, project-wide constants, etc.
 */

const prestaShopURL = 'http://localhost/prestashop';
const prestaShopAdminLoginURL = `http://localhost/prestashop/amit_the_admin`;


const xpaths = {
  adminLoginWindow: {
    emailInput: "//div[1]/form[1]/div[1]/input[1]",
    passwordInput: "//form[1]/div[2]/input[1]",
    loginButton: "//div[1]/form[1]/div[3]/button[1]"
  },

  adminMainWindow: {
    catalogButton: "//li[@id='subtab-AdminCatalog']//a",
    profileButton: "//i[text()='account_circle']"
  },

  adminCatalogWindow:{
    productsButton: "//li[@id='subtab-AdminProducts']//a[1]",
  },

  adminProductWindow:{
    insertNameButton: "//tr[2]/td[4]/input[1]",
    searchButton: "//tr[2]/td[11]/button[1]",
    threeDotsButton: "(//button[contains(@class,'btn btn-link')])[3]",
    newProductButton: "//a[@data-original-title='Create a new product: CTRL+P']",
  },

  adminSearchOfNotFoundProductWindow:{
    noResultsMessage: "//table[1]/tbody[1]/tr[1]/td[1]"
  },

  adminThreeDotsWindow:{
    deleteButton: "//td[11]/div[1]/div[1]/div[1]/a[3]"
  },

  adminThreeDotsDeleteWindow:{
    confirmDeleteButton: "//button[contains(@class, 'btn-danger')]"
  },

  adminProfileIconWindow:{
    signOutButton: "//span[text()='Sign out']"
  },

  adminAddProductWindow: {
    productNameInput: "//input[@id='form_step1_name_1']",
    saveButton: "//*[@id='product_form_save_new_btn']"
  },

  userListWindow: {
    emailInput: "//*[@id='input-email']",
    filterButton: "//*[@id='button-filter']",
    selectUserButton: "//tbody[1]/tr[1]/td[1]/input[1]",
    deleteButton: "//button[2]"
  },

  notification:{
    closeNotificationButton: "//*[@class='btn-close']"

  },

  homePageWindow: {
    userInfoButton: "//div[2]/div[1]/a[2]/span[1]",
    loginButton: "//div[1]/div[1]/div[1]/div[2]/div[2]",
    searchField: "//form[1]/input[2]",
    productSearchResult: "//*[@id='ui-id-2']"
  },

  userInfoWindow: {
    wishlistButton: "//div[1]/a[5]/span[1]/i[1]"
  },

  allWishlistWindow: {
    myWishlist: "//div[1]/section[1]/div[1]/ul[1]/li[1]/a[1]",
    homeButton: "//div[1]/div[1]/a[1]/img[1]"
  },

  wishlistContentWindow: {
    deleteProductButton: "//section[1]/div[1]/section[1]/ul[1]/li[1]/div[1]/div[1]/button[2]",
    confirmDeleteButton: "//div[1]/div[1]/a[1]/img[1]",
    homeButton: "//div[1]/div[1]/a[1]/img[1]"
  },

  deleteProductWishlistButton: {
    clickOnDeleteInsideDeleteWindow: "//div[5]/div[1]/div[1]/div[1]/div[3]/button[2]"
  },

  loginWindow: {
    emailField: "//*[@id='field-email']",
    passwordField: "//*[@id='field-password']",
    loginButton: "//*[@id='submit-login']"
  },

  shirtProductWindow: {
    addToWishlistButton: "//div[2]/div[1]/button[1]/i[1]",
    homeButton: "//div[1]/div[1]/a[1]/img[1]"
  },

  addToWishlistWindow: {
    myWishlistOption: "//li[1]/p[1]"
  }
};

const adminEmail  = 'amitdvash1@gmail.com'
const adminPassword = '0548005118'
const productName = 'Banana'
const shirtName = 'Hummingbird printed t-shirt'
const userEmail = 'yali4343@gmail.com'
const userPassword = '0548005118'

