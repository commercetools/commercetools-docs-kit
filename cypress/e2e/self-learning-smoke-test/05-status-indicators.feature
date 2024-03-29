Feature: Status indicator

Scenario: User sees all incomplete status indicators before taking the course
  Given Attempt to reset e2e user
  Given The "user" logs in using the top login button
  And The user sees a complete profile modal with empty fields
  And The user fills in "all" the profile details "FirstName", "LastName", "Test Corp."
  And The user submits the profile form
  Then The course "66" status icon is "circle"
  And The course "66" topics indicators are "topic-status-circle"
  And The course "69" status icon is "circle"
  And The course "69" topics indicators are "topic-status-circle"
  And The user logs out

Scenario: User sees completed status indicators for the first course after taking it
  Given The "user" logs in using the top login button
  And The user completes "course-1" successfully
  Then The course "66" status icon is "verified"
  And The course "66" topics indicators are "topic-status-checkActive"
  And The course "69" status icon is "circle"
  And The course "69" topics indicators are "topic-status-circle"
  And The page has fully loaded
  And A snapshot is taken
  And The user sees a "course" completed modal
  And The user logs out

Scenario: User sees completed status indicators for the first and second courses after taking them
  Given The "user" logs in using the top login button
  And The user completes "course-2" successfully
  And The course "66" status icon is "verified"
  And The course "66" topics indicators are "topic-status-checkActive"
  And The course "69" status icon is "verified"
  And The course "69" topics indicators are "topic-status-checkActive"
  And The page has fully loaded
  And A snapshot is taken
  And The user sees a "learning path" completed modal
  And The user logs out
