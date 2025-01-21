package hellocucumber;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.assertEquals;



public class PrestashopUserImplementation {
    private static WebDriver driver;
    private static WebDriverWait wait;
    private int products_in_wishlist_before_add_new;

    /**
     * Initializes a web session for the user and navigates to the Prestashop homepage.
     *
     * @param webDriver    The WebDriver instance to use.
     * @param webDriverWait The WebDriverWait instance to use.
     */
    public void initSessionAsUser(WebDriver webDriver, WebDriverWait webDriverWait){
        driver = webDriver;
        wait = webDriverWait;
        driver.get("http://localhost/Prestashop/");
        System.out.println("Driver setup finished for - " + driver.getTitle());
    }

    /**
     * Resets the user's wishlist by removing all existing products.
     * Navigates to the wishlist page and deletes each product found.
     */
    public void resetWishlist() {
        driver.findElement(By.xpath("//div[2]/div[1]/a[2]/span[1]")).click(); // click on user info
        driver.findElement(By.xpath("//div[1]/a[5]/span[1]/i[1]")).click(); // click on wishlist
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement wishlist = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[1]/section[1]/div[1]/ul[1]/li[1]/a[1]")));
        String fullText = wishlist.getText();
        System.out.println(fullText);
        Pattern pattern = Pattern.compile("(\\d+)");
        Matcher matcher = pattern.matcher(fullText);
        if (matcher.find()) {
            int num_products_in_wishlist = Integer.parseInt(matcher.group(1));
            driver.findElement(By.xpath("//div[1]/section[1]/div[1]/ul[1]/li[1]/a[1]")).click();
            wait = new WebDriverWait(driver, Duration.ofSeconds(20));
            for(int i = 0; i < num_products_in_wishlist; i++) {
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//section[1]/div[1]/section[1]/ul[1]/li[1]/div[1]/div[1]/button[2]")));
                driver.findElement(By.xpath("//section[1]/div[1]/section[1]/ul[1]/li[1]/div[1]/div[1]/button[2]")).click();
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[5]/div[1]/div[1]/div[1]/div[3]/button[2]")));
                driver.findElement(By.xpath("//div[5]/div[1]/div[1]/div[1]/div[3]/button[2]")).click();
                driver.navigate().refresh();
            }
        }
        goToHomePage();
    }

    /**
     * Navigates to the login page by clicking the login button.
     */
    public void goToLogin() throws InterruptedException {
        Thread.sleep(1000);
        driver.findElement(By.xpath("//div[1]/div[1]/div[1]/div[2]/div[2]")).click();
    }

    /**
     * Enters the user login information and logs into the system.
     *
     * @param username The user's email or username.
     * @param password The user's password.
     */
    public void enterLoginInfo(String username, String password) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='field-email']"))).sendKeys(username);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='field-password']"))).sendKeys(password);
        driver.findElement(By.xpath("//*[@id='submit-login']")).click();
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        resetWishlist();
    }

    /**
     * Redirects the user to the home page by clicking the homepage logo.
     */
    public void goToHomePage(){
        driver.findElement(By.xpath("//div[1]/div[1]/a[1]/img[1]")).click(); // go to home page
    }

    /**
     * Adds a product to the wishlist and verifies the product count before and after addition.
     * Searches for a specific product and adds it to the wishlist.
     */
    public void AddProductToWishList() {
        driver.findElement(By.xpath("//div[2]/div[1]/a[2]/span[1]")).click(); // click on user info
        driver.findElement(By.xpath("//div[1]/a[5]/span[1]/i[1]")).click(); // click on wishlist
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement wishlist = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[1]/section[1]/div[1]/ul[1]/li[1]/a[1]")));
        String fullText = wishlist.getText();
        System.out.println(fullText);
        Pattern pattern = Pattern.compile("(\\d+)");
        Matcher matcher = pattern.matcher(fullText);
        if (matcher.find()) {
            products_in_wishlist_before_add_new = Integer.parseInt(matcher.group(1));
            System.out.println("found: " + products_in_wishlist_before_add_new);
        } else {
            System.out.println("The are no products in wishlist");
            products_in_wishlist_before_add_new = 0;
        }
        driver.findElement(By.xpath("//div[1]/div[1]/a[1]/img[1]")).click(); // go to home page
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//form[1]/input[2]")));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//form[1]/input[2]"))).sendKeys("Hummingbird printed t-shirt");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='ui-id-2']")));
        driver.findElement(By.xpath("//*[@id='ui-id-2']")).click();
        driver.findElement(By.xpath("//div[2]/div[1]/button[1]/i[1]")).click(); // click on wishlist
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//li[1]/p[1]")));
        driver.findElement(By.xpath("//li[1]/p[1]")).click(); // choose my wishlist
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[1]/div[1]/a[1]/img[1]")));
        driver.findElement(By.xpath("//div[1]/div[1]/a[1]/img[1]")).click(); // go to home page
    }

    /**
     * Verifies if a product has been successfully added to the wishlist.
     *
     * This method navigates to the wishlist page and checks the number of products.
     * It compares the current number of products in the wishlist with the count
     * before the addition to confirm if the new product was successfully added.
     *
     * An assertion is used to validate the expected product count.
     */
    public void CheckProductAdded() {
        driver.findElement(By.xpath("//div[2]/div[1]/a[2]/span[1]")).click(); // click on user info
        driver.findElement(By.xpath("//div[1]/a[5]/span[1]/i[1]")).click(); // click on wishlist
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement wishlist = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//section[1]/div[1]/ul[1]/li[1]/a[1]"))); // get the wishlist
        String fullText = wishlist.getText();
        System.out.println(fullText);
        Pattern pattern = Pattern.compile("(\\d+)");
        Matcher matcher = pattern.matcher(fullText);
        int num_of_products;
        if (matcher.find()) {
            num_of_products = Integer.parseInt(matcher.group(1));
            System.out.println("found: " + num_of_products);
            assertEquals(num_of_products, products_in_wishlist_before_add_new + 1, "The product added to wishlist successfully");
        } else {
            System.out.println("The are no products in wishlist, didnt succeed to add new product");
        }
    }
}
