Feature: Profile Modal

  Scenario: User sees profile modal if profile is not complete
    Given The user is logged in for the first time
    Then The user sees a complete profile modal with empty fields

  Scenario: User cannot submit incomplete profile form
    Given The "user" is logged in
    Given The user sees a complete profile modal with empty fields
    When The user fills in "some" the profile details
    Then The user can't submit the form

  Scenario: User completes profile modal
    Given The "user" is logged in
    Given The user sees a complete profile modal with empty fields
    When The user fills in "all" the profile details
    When The user submits the profile form
    Then The user doesn't see a complete profile modal