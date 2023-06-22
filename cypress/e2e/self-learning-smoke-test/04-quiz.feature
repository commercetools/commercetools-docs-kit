Feature: Quiz

  Scenario: User completes all courses in learning path
    Given Attempt to reset e2e user
    Given The "user" logs in using the top login button
    And The user fills in "all" the profile details "FirstName", "LastName", "Test Corp."
    And The user submits the profile form
    And The user completes "course-1" successfully
    Then The user sees a "course" completed modal
    And The user gets redirected to "course-2/overview"
    And The user completes "course-2" successfully
    Then The user sees a "learning path" completed modal
    And The user gets redirected to "site root"

