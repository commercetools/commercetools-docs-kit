Feature: Quiz

  Scenario: User submits a failed attempt
    Given The "user" is logged in with new attempt
    And The user selects "wrong" answers
    When The user clicks the "quiz submit button"
    Then The user sees a "red" ribbon on the quiz section
    And The user sees "error" feedback messages below the anwsers
    And The user sees a try again button
    And The user logs out
    And The user sees a page with "Quiz component" title

  Scenario: User performs a new successfull attempt
    Given The "user" is logged in
    And The user sees a try again button
    And The user clicks the "try again button"
    And The user deselect "wrong" answers
    And The user selects "correct" answers
    When The user clicks the "quiz submit button"
    Then The user sees a "green" ribbon on the quiz section
    And The user sees "success" feedback messages below the anwsers
    And The user doesn't see a try again button
    And The user logs out

  Scenario: User completes all courses in learning path
    Given Attempt to reset e2e user
    Given The "user" logs in using the top login button
    And The user fills in "all" the profile details
    And The user submits the profile form
    And The user completes "course-1" successfully
    Then The user sees a "course" completed modal
    And The user gets redirected to "course-2/overview"
    And The user completes "course-2" successfully
    Then The user sees a "learning path" completed modal
    And The user gets redirected to "site root"

