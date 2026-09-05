Feature: Home page actions

  Background:
    Given I am logged in to the home page

  Scenario: User clicks on KalTech
    When I click on KalTech
    Then the popup should be closed
    Then I should see the company name "KalTech" on the homepage
