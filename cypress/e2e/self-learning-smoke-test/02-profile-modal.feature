Feature: Profile Modal

  Scenario: User sees profile modal if profile is not complete
    Given Attempt to reset e2e user
    And The "user" logs in using the top login button
    Then The user sees a complete profile modal with empty fields
    And The page has fully loaded
    And A snapshot is taken

  Scenario: User cannot submit incomplete profile form
    Given The "user" logs in using the top login button
    Given The user sees a complete profile modal with empty fields
    When The user fills in "some" the profile details "FirstName", "LastName", "Test Corp."
    Then The user can't submit the form

  Scenario: User completes profile modal
    Given The "user" logs in using the top login button
    Given The user sees a complete profile modal with empty fields
    When The user fills in "all" the profile details "FirstName", "LastName", "Test Corp."
    When The user submits the profile form
    Then The user doesn't see a complete profile modal

  Scenario: User updates his profile data
    Given The "user" logs in using the top login button
    And The user clicks the "avatar icon"
    And The user sees an update profile modal with the values "FirstName", "LastName", "Test Corp."
    When The user fills in "all" the profile details "Updated name", "Updated surname", "Updated company"
    And The user submits the profile form
    Then The user doesn't see a complete profile modal
    And The avatar icon shows "UU"
