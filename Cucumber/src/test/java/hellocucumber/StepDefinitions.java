package hellocucumber;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;


public class StepDefinitions {
    private static PrestashopUserImplementation open_wishlist_User_implementation;
    private static PrestaShopAdminImplementation admin_delete_product_implementation;
    private String webDriver = "webdriver.chrome.driver";
    private String path = "C:\\Users\\amitd\\OneDrive - post.bgu.ac.il\\מסמכים\\GitHub\\2025-mbt-ao\\Selenium\\chromedriver.exe";
    private WebDriver driver;
    private WebDriverWait wait;

    /**
     * Constructor to initialize the WebDriver and WebDriverWait instances.
     *
     * Sets up the Chrome WebDriver, launches the browser, maximizes the window,
     * and initializes an explicit wait with a timeout of 10 seconds.
     */
    public StepDefinitions() {
        System.setProperty(webDriver, path);
        // Create an instance of ChromeDriver and WebDriverWait
        driver = new ChromeDriver(); // Launch Chrome browser
        wait = new WebDriverWait(driver, Duration.ofSeconds(10)); // Set explicit wait of 10 seconds
        driver.manage().window().maximize(); // Maximize the browser window
    }

    /**
     * Initializes a Prestashop user session.
     *
     * Creates an instance of PrestashopUserImplementation and starts a session
     * with the current WebDriver and WebDriverWait instances.
     */
    public void PrestashopInitUser() {
        open_wishlist_User_implementation = new PrestashopUserImplementation();
        open_wishlist_User_implementation.initSessionAsUser(driver, wait);
    }

    /**
     * Closes the browser session for the Prestashop user.
     *
     * This method should be called to properly close the browser after test execution.
     */
    public void PrestashopUserTearDown() {
        driver.close(); // Close the browser
    }


    /**
     * Cucumber step definition for user login.
     *
     * This method initializes the user session, navigates to the login page,
     * and enters the provided email and password to log in.
     *
     * @param email    The email of the user.
     * @param password The password of the user.
     */
    @Given("User is logged in with {string} and {string}")
    public void userIsLoggedInWithAnd(String email, String password) throws InterruptedException {
        PrestashopInitUser();
        open_wishlist_User_implementation.goToLogin();
        open_wishlist_User_implementation.enterLoginInfo(email, password);
    }

    /**
     * Navigates the user to the home page.
     *
     * This step ensures that the user is redirected to the Prestashop home page.
     */
    @When("User is on Home Page")
    public void userIsOnHomePage() {
        open_wishlist_User_implementation.goToHomePage();
    }

    /**
     * Adds a product to the user's wishlist.
     *
     * This step searches for a specific product and adds it to the wishlist.
     */
    @And("User add a product to wishlist")
    public void userAddAProductToWishlist() {
        open_wishlist_User_implementation.AddProductToWishList();
    }

    /**
     * Verifies that the product was successfully added to the wishlist.
     *
     * This step checks the wishlist count to confirm the addition and
     * then closes the browser session.
     */
    @Then("The product successfully added to the wishlist")
    public void productSuccessfullyAddedToTheWishlist() {
        open_wishlist_User_implementation.CheckProductAdded();
        PrestashopUserTearDown();
    }


    /**
     * Initializes a Prestashop admin session.
     *
     * This method creates an instance of PrestaShopAdminImplementation and
     * starts an admin session using the existing WebDriver and WebDriverWait instances.
     */
    public void PrestashopInitAdmin() {
        admin_delete_product_implementation = new PrestaShopAdminImplementation();
        admin_delete_product_implementation.initSessionAsAdmin(driver, wait);
    }

    /**
     * Closes and quits the browser session for the Prestashop admin.
     *
     * This method should be called to properly close the browser and release resources after test execution.
     */
    public void PrestashopAdminTearDown() {
//        admin_delete_product_implementation.addProductToStore("Hummingbird printed t-shirt");
        driver.close(); // Close the browser
        driver.quit(); // Quit the browser
    }

    /**
     * Step definition to log into the PrestaShop admin panel using provided credentials.
     * This method is used in Cucumber feature files to perform the admin login action.
     *
     * Given: "Admin is logged in"
     */
    @Given("Admin is logged in with {string} and {string}")
    public void adminLogIn(String arg1, String arg2) {
        PrestashopInitAdmin();
        admin_delete_product_implementation.logInToAdminPage(arg1, arg2); // Attempt to log in with admin credentials
    }


    /**
     * Step definition to delete a specific product from the PrestaShop store.
     *
     * This method is used to locate and remove the specified product using the UI.
     *
     * @param arg1 The product name to be deleted.
     */
    @When("Admin deletes the product {string}")
    public void adminDeletesTheProduct(String arg1) {
        try {
            admin_delete_product_implementation.deleteItem(arg1);  // Delete the located product
        } catch (InterruptedException e) {
            System.out.println("Error deleting product");
            PrestashopAdminTearDown();  // Close the browser in case of failure
        }
    }

    /**
     * Step definition to verify that the specified product has been deleted.
     *
     * This method searches for the product after deletion and checks if the appropriate
     * "no results" message is displayed, indicating successful deletion.
     *
     * @param arg1 The product name to be checked.
     */
    @Then("product {string} is deleted")
    public void productIsDeleted(String arg1) {
        try {
            admin_delete_product_implementation.clickOnProductsButton();  // Navigate to the products page
            admin_delete_product_implementation.searchProductName(arg1);  // Search for the product

            // Locate the element containing the "no results" message
            WebElement noResultsElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                    By.xpath("//table[1]/tbody[1]/tr[1]/td[1]")));

            // Assert that the message confirms the product is no longer available
            Assertions.assertEquals("There is no result for this search. Update your filters to view other products.",
                    noResultsElement.getText());

            PrestashopAdminTearDown();  // Close the browser after successful validation
        } catch (Exception e) {
            System.out.println("Error checking if product is deleted");
            PrestashopAdminTearDown();  // Close the browser in case of an error
        }

    }

}
