Feature: PixelHR Login page

  Scenario: User login to the application
    Given I navigate to the Login page
    When login with user name and password
    And click on SignIn
    Then I should be navigated to the home page