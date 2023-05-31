Feature: Logout

  @full @smoke
  Scenario: User logs out from the quiz page
    Given The "user" is logged in
    And The user clicks the "logout button"
    Then The user is redirected to "home page"
