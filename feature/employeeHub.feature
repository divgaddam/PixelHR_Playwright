Feature: Employee Hub actions

  Background:
    Given I am logged in to the application
    And I click on KalTech

  Scenario: User adds an employee from Employee Hub
    When I click on Employee Hub
    And I click on Manage Employees
    And I click on Add Employees
    And I type "sree" in the first name field
    Then I should see "sree" in the first name field

