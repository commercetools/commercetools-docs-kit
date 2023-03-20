Feature: Logout

  @full @smoke
  Scenario: User logs out from the quiz page
    Given The "user" is logged in
    And The user clicks the "avatar icon"
    And The avatar menu is displayed
    And The user clicks the "avatar menu logout button"
    Then The user is redirected to "home page"
