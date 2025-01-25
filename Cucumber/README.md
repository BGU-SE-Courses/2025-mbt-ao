# Testing PrestaShop using Cucumber
This directory contains the cucumber files for testing the user wishlist and admin product management module of the PrestaShop application.


## Running the tests
In order to run our tests you need to open the project using the Inteliji IDE, navigate to the cucumber folder, from there to src/test/resources/hellocucumber and run the RunCucumberTest.java file. This will run all the tests in the feature file.

## Feature files
The behaviors that we tested are in the feature file that inside the [resources/hellocucumber](resources/hellocucumber) directory. See the file for a detailed description of the tests.


## Step files
The step files in the [src/test/java/hellocucumber](src/test/java/hellocucumber) directory contain the code that defines how each sentence in the feature file is translated to Selenium actions. See the files for a detailed description of the implementation.