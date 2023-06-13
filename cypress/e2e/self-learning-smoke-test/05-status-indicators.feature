Feature: Status indicator

Scenario: User sees all incomplete status indicators before taking the course
  Given Attempt to reset e2e user
  Given The "user" logs in using the top login button
  And The user fills in "all" the profile details
  And The user submits the profile form
  Then The course "66" status icon is "circle"
  And The course "66" topics indicators are "topic-status-circle"
  And The course "69" status icon is "circle"
  And The course "69" topics indicators are "topic-status-circle"

Scenario: User sees completed status indicators for the first course after taking it
  Given The "user" logs in using the top login button
  And The user completes "course-1" successfully
  And The course "66" status icon is "verified"
  And The course "66" topics indicators are "topic-status-checkActive"
  And The course "69" status icon is "circle"
  And The course "69" topics indicators are "topic-status-circle"
  And The course status has fully loaded
  And A snapshot is taken

Scenario: User sees completed status indicators for the first and second courses after taking them
  Given The "user" logs in using the top login button
  And The user completes "course-2" successfully
  And The course "66" status icon is "verified"
  And The course "66" topics indicators are "topic-status-checkActive"
  And The course "69" status icon is "verified"
  And The course "69" topics indicators are "topic-status-checkActive"
  And The course status has fully loaded
  And A snapshot is taken
