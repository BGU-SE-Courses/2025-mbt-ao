# Software Quality Engineering - System Testing
This is a repository for the system-testing assignment of the Software Quality Engineering course at the [Ben-Gurion University](https://in.bgu.ac.il/), Israel.

## Assignment Description
In this assignment, we tested an open-source software called [PrestaShop](https://demo.prestashop.com/#/en/front).

PrestaShop is a free, open-source e-commerce platform that allows users to create and manage online stores. It provides a wide range of features and tools to support product catalog management, customer engagement, order processing, payment integration, and marketing. Built on PHP and using a MySQL database, PrestaShop is highly customizable through modules and themes, making it a flexible solution for businesses of all sizes. Its user-friendly interface and extensive documentation make it an accessible choice for both developers and non-technical users.

## Installation
PrestaShop Local Installation with XAMPP:

Follow these steps to install PrestaShop locally using XAMPP.
### Step 1: Install and Set Up XAMPP
1. **Download XAMPP**:  
   Visit [XAMPP's official website](https://www.apachefriends.org/) and download the version for your operating system.

2. **Install XAMPP**:  
   Run the installer and follow the setup instructions. Make sure to select **Apache** and **MySQL** components.

3. **Start XAMPP Services**:  
   Launch the XAMPP Control Panel and start the following modules:
   - Apache
   - MySQL

### Step 2: Download PrestaShop
1. **Download PrestaShop**:  
   Go to the [PrestaShop website](https://www.prestashop.com/) and download the latest PrestaShop package.

2. **Extract Files**:  
   Unzip the downloaded file and place the extracted folder in the XAMPP `htdocs` directory:
   - Example: `C:\xampp\htdocs\prestashop`

### Step 3: Create a Database
1. **Access phpMyAdmin**:  
   Open your browser and go to:  
   `http://localhost/phpmyadmin`

2. **Create a Database**:
   - Click the **Databases** tab.
   - Enter a database name (e.g., `prestashop`).
   - Select `utf8_general_ci` as the collation.
   - Click **Create**.

### Step 4: Install PrestaShop
1. **Launch the Installer**:  
   In your browser, navigate to:  
   `http://localhost/prestashop`

2. **Follow the Installation Wizard**:
   - **Language Selection**: Choose your preferred language.
   - **License Agreement**: Accept the terms and conditions.
   - **System Compatibility Check**: Fix any flagged issues (if applicable).
   - **Store Details**: Fill in store details and create an admin account.

3. **Configure Database**:  
   Enter the following details in the database configuration step:
   - **Server**: `localhost`
   - **Database Name**: The name you created in phpMyAdmin (e.g., `prestashop`).
   - **Login**: `root`
   - **Password**: Leave blank (default for XAMPP).

4. **Complete Installation**:
   - In the directory: C:\xampp\htdocs\prestashop you will find the directory named "admin".
   - change the name of the directory as you wish e.g: "im_the_admin".
   - After installation, you will receive links to the Back Office and the Front Office.
     **the correct links are:**
   - Admin Panel: `http://localhost/prestashop/im_the_admin`
   - Front Store: `http://localhost/prestashop`

### Step 5: Secure Installation
1. **Delete the `install` Folder**:  
   Navigate to `C:\xampp\htdocs\prestashop` and delete the `install` directory.

2. **Access the Admin Panel**:  
   Use the admin link and login credentials to access your store backend.

---

## What we tested
We tested the functionality of two features in the PrestaShop platform: **adding products to a wishlist** and **admin management of products (deletion)**. Below are the user stories, preconditions, and expected outcomes for the tests we conducted.

### User Story 1: Adding a Product to the Wishlist

**Description:**  
A logged-in user adds a product to their wishlist.

**Preconditions:**
- The user is logged into their account.
- The product exists in the store and is visible in the product catalog.

**Steps:**
1. The user navigates to the product they wish to add.
2. The user clicks the "Add to Wishlist" button.

**Expected Outcome:**  
The product appears in the user's wishlist, and they can view it from the wishlist section of their account.


### User Story 2: Admin Deletes a Product from the Store

**Description:**  
An admin removes a product from the store's inventory.

**Preconditions:**
- The admin is logged into the admin panel.
- The product exists in the store catalog.

**Steps:**
1. The admin navigates to the product management section in the admin panel.
2. The admin selects the product to be deleted.
3. The admin confirms the deletion action.

**Expected Outcome:**  
The selected product is removed from the store catalog and is no longer visible to users in the product listings (and in particular in their wishlist) or search results.

---

## How we tested
We used two different testing methods:
1. [Cucumber](https://cucumber.io/), a behavior-driven testing framework.
2. [Provengo](https://provengo.tech/), a story-based testing framework.

Each of the testing methods is elaborated in its own directory.


