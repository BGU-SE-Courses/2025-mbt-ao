package hellocucumber;


import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


/**
 * Class responsible for managing product deletion operations in PrestaShop Admin Panel.
 */
public class PrestaShopAdminImplementation {

    // WebDriver instance for browser interaction
    private WebDriver driver;

    // WebDriverWait instance for handling explicit waits
    private WebDriverWait wait;


    /**
     * Initializes a Prestashop admin session.
     *
     * This method sets up the WebDriver and WebDriverWait instances for the admin user
     * and navigates to the admin panel of the Prestashop site.
     *
     * @param webDriver    The WebDriver instance to be used for browser operations.
     * @param webDriverWait The WebDriverWait instance to handle explicit waits during interactions.
     */
    public void initSessionAsAdmin(WebDriver webDriver, WebDriverWait webDriverWait){
        driver = webDriver;
        wait = webDriverWait;
        driver.get("http://localhost/prestashop/amit_the_admin/");
        System.out.println("Driver setup finished for - Admin");
    }



    /**
     * Logs into the PrestaShop admin page using the provided credentials.
     *
     * @param emailAddress The admin's email address.
     * @param password The admin's password.
     */
    public void logInToAdminPage(String emailAddress, String password) {
        WebElement emailAddressElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//div[1]/form[1]/div[1]/input[1]")));
        emailAddressElement.sendKeys(emailAddress);

        WebElement passwordElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//form[1]/div[2]/input[1]")));
        passwordElement.sendKeys(password);

        WebElement logInButton = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//div[1]/form[1]/div[3]/button[1]")));
        logInButton.click();
    }

    /**
     * Helper method to gracefully close the browser and end the WebDriver session.
     */
    public void logOutAdmin() {
        WebElement profileIconButton = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//i[text()='account_circle']")));
        profileIconButton.click();

        WebElement signOutButton = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//span[text()='Sign out']")));
        signOutButton.click();

    }

    /**
     * Clicks on the "Catalog" button in the PrestaShop admin panel.
     * This action navigates to the catalog section where products and categories are managed.
     *
     * @throws InterruptedException if the thread sleep operation is interrupted.
     */
    public void clickOnCatalogButton() throws InterruptedException {
        WebElement catalogElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//li[@id='subtab-AdminCatalog']//a")));
        catalogElement.click();
        Thread.sleep(1000);
    }

    /**
     * Clicks on the "Products" button within the catalog section in the PrestaShop admin panel.
     * This action navigates to the products management page where products can be added, updated, or removed.
     *
     * @throws InterruptedException if the thread sleep operation is interrupted.
     */
    public void clickOnProductsButton() throws InterruptedException{
        WebElement productElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//li[@id='subtab-AdminProducts']//a[1]")));
        Thread.sleep(1000);
        productElement.click();
    }

    /**
     * Clicks on the "Add Product" button in the products management page of the PrestaShop admin panel.
     * This action initiates the process of adding a new product to the store.
     *
     * @throws InterruptedException if the thread sleep operation is interrupted.
     */
    public void clickOnAddProductButton() throws InterruptedException {
        WebElement addProductElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//a[@data-original-title='Create a new product: CTRL+P']")));
        addProductElement.click();
        Thread.sleep(1000);
    }

    /**
     * Enters the specified product name into the product name input field in the PrestaShop admin panel.
     * This method is used during the product creation process to set the product's name.
     *
     * @param productName The name of the product to be added.
     * @throws InterruptedException if the thread sleep operation is interrupted.
     */
    public void addProductName(String productName) throws InterruptedException {
        WebElement productNameElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//input[@id='form_step1_name_1']")));
        productNameElement.sendKeys(productName);
        Thread.sleep(1000);
    }

    /**
     * Confirms the addition of a new product by clicking the save button in the PrestaShop admin panel.
     * This action finalizes the product creation process and saves it to the store.
     *
     * @throws InterruptedException if the thread sleep operation is interrupted.
     */
    public void confirmProductAddition() throws InterruptedException {
        WebElement confirmProductElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//*[@id='product_form_save_new_btn']")));
        confirmProductElement.click();
        Thread.sleep(1000);
    }


    /**
     * Searches for a product by name in the product management section of the PrestaShop admin panel.
     *
     * @param productName The name of the product to search for.
     */
    public void searchProductName(String productName) throws InterruptedException {
        WebElement searchNameElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//tr[2]/td[4]/input[1]")));
        Thread.sleep(1000);
        searchNameElement.clear();
        searchNameElement.sendKeys(productName);

        WebElement searchButton = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//tr[2]/td[11]/button[1]")));
        Thread.sleep(1000);
        searchButton.click();
    }


    /**
     * Deletes a product from the PrestaShop admin panel.
     *
     * @param productName The name of the product to delete.
     */
    public void deleteItem(String productName) throws InterruptedException {

        clickOnCatalogButton();
        clickOnProductsButton();
        searchProductName(productName);

        WebElement threeDotsElement = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("(//button[contains(@class,'btn btn-link')])[3]")));
        Thread.sleep(1000);
        threeDotsElement.click();

        WebElement deleteElement = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//td[11]/div[1]/div[1]/div[1]/a[3]")));
        Thread.sleep(1000);
        deleteElement.click();

        WebElement confirmDelete = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[contains(@class, 'btn-danger')]")));
        Thread.sleep(1000);
        confirmDelete.click();
    }

    /**
     * Performs cleanup operations by logging out the admin and closing the browser session.
     * This method ensures that the WebDriver session is properly terminated after test execution.
     *
     * If an interruption occurs during logout, it will print an error message and still close the browser.
     */
    public void tearDown() {
        logOutAdmin();
        driver.close();
        driver.quit();
    }






}

