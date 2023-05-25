Feature: Login

  @full @smoke
  Scenario: Open the homepage and check title
    Given The user visits the self-learning site
    Then The user sees a page with "Explore how to build a documentation website for commercetools" title

  @full @smoke
  Scenario: User navigates to a quiz page
    Given The user visits the self-learning site
    When The user clicks navigation link with href "course-1/quiz"
    Then The user sees a page with "Quiz component" title

  @full @smoke
  Scenario: User sees a quiz area with login button
    Given The user has navigated to a quiz page
    And The user "is not" logged in
    When The user scrolls to the quiz area
    Then The user sees a login button

  @full @smoke
  Scenario: User should be redirected to auth0 login page
    Given The user has navigated to a quiz page
    And The user "is not" logged in
    When The user clicks the "login button"
    Then The user is redirected to "auth0 login page"

  @full @smoke
  Scenario: User should see the quiz content after login
    Given The user has navigated to a quiz page
    And The user "is not" logged in
    And The user clicks the "login button"
    When The user submits valid auth0 credentials
    Then The user is redirected to "quiz page"
    And The user sees a page with "Quiz component" title
    And The user "is" logged in
    And The user sees quiz content
