Feature: A set of scenarios for testing the presta shop website


  #Given There is a product in the store called Hummingbird printed t-shirt
  Scenario Outline: User add product to wishlist
    Given User is logged in with "<Email>" and "<Password>"
    When User is on Home Page
    And User add a product to wishlist
    Then The product successfully added to the wishlist

    Examples:
      | Email                  | Password     |
      | yali4343@gmail.com     | 0548005118   |



  Scenario Outline: test product from the store
    Given Admin is logged in with "<Email>" and "<Password>"
    When Admin deletes the product "<product_name>"
    Then product "<product_name>" is deleted

    Examples:
      | Email                |   Password     | product_name                      |
      | amitdvash1@gmail.com |   0548005118   | Hummingbird printed t-shirt       |

