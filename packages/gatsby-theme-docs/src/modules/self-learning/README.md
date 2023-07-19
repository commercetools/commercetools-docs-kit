# self-learning module

This module is providing UI components and helper utilities to integrate self-learning functionality
into other React User interfaces.

Works against the learning-api.

## Configuration

The module depends on some configuration properties passed to the `gatsby-theme-docs` gatsby plugin, in details:

- `auth0Domain`: the auth0 application domain url (it is defined in the auth0 management app)
- `learnApiBaseUrl`: the learn API base url. It can be omitted if the host running the site matches the api host.
- `selfLearningFeatures`: an array of strings representing feature flags used to enable/disable specific functionalities. Expected values:
  - `status-indicator`: feature flag to toggle the course and topics status indicator.
  - `complete-profile-modal`: feature flag to toggle the complete profile modal window functionality
  - `tabs-session-sync`: feature flag to toggle the syncronization of the user session between tabs. If a user has multiple tabs/windows opened with the same user session, when one of them performs a log out, all the others are logged out automatically. Same applies for login.

## Components

### Quiz

Quiz component can be used in any `mdx` page. It's responsible for fetching, rendering and handling all the interaction logic of a quiz answer submission.
The component simply renders a login CTA if the user is not logged in, otherwise the quiz is rendered.

The component expects 2 mandatory props:

- `courseId`: Id of the course defined in the LMS
- `quizId`: Id of the quiz defined in the LMS

Example

```md title="you write:" secondaryTheme
<Quiz courseId="5565" quizId="85065"/>
```

### CourseCard

Quiz card is a card component displaying information about a specific course. It supports logged in and logged out state. When the user is logged in, the course status is displayed.

The component has the following mandatory props:

- `title`: The course title.
- `href`: Relative path to the first course page
- `courseId`: The courseId
- `duration`: A string giving information about course duration

Example

```md title="you write:" secondaryTheme
<CourseCard duration="30 min" title="Course name" href="self-learning/overview" courseId="66">Course description. Introduction to extensibility possibilities available in Composable Commerce.</CourseCard>
```

### LearningPathCard

Learning path card is a card component displaying information about a learning path.

The component has the following mandatory props:

- `title`: The learning path title.
- `duration`: A string giving information about learning path duration
- `productName`: A string representing the product the learning path is referring to

Example

```md title="you write:" secondaryTheme
<LearningPathCard title="Overview" duration="1 hour 25 minutes | 7 courses" productName="Composable Commerce">
    This learning path is great for Composable Commerce administrators who create/maintain e-commerce data points, primarily work with a user interface, and have some familiarity with APIs.
</LearningPathCard>
```

### IfUserLoggedIn / IfUserLoggedOut

These components are used to wrap content that should only be displayed if the user is logged in or logged out respectively.

The components have 1 optional prop.

- `assumeTrue`: boolean, if set to `true` while auth0 is still loading the logged in/logged out user state, the component will render the content regardless.

Examples

```md title="you write:" secondaryTheme
<IfUserLoggedIn assumeTrue>
 ## Welcome back!
</IfUserLoggedIn>
```

```md title="you write:" secondaryTheme
<IfUserLoggedOut>
 ## Please log in
</IfUserLoggedOut>
```

### FirstName

This component simply render the first name of the logged in user, if the user is logged out, nothing is rendered.

Example

```md title="you write:" secondaryTheme
Hello <FirstName />, welcome back
```

### Learing path card with image on the side

In order to add an image on the side of a learning path card use the following pattern (the image must have been previously added to the /content/files directory)

```md title="you write:" secondaryTheme
<Cards>
  <LearningPathCard title="Overview" duration="1 hour 25 minutes | 7 courses" productName="Composable Commerce"> Description here</LearningPathCard>
  <ImageCard>

![learning path](/content/files/file-name.svg)

  </ImageCard>
</Cards>
```

### IfLearningPathComplete / IfLearningPathNotComplete

These components are used to wrap content that should only be/not be displayed if the user completed the learning path

Examples

```md title="you write:" secondaryTheme
<IfLearningPathComplete>
 Congratulations, you completed learning path
</IfLearningPathComplete>
```

```md title="you write:" secondaryTheme
<IfLearningPathNotComplete>
  Keep learning!
</IfLearningPathNotComplete>
```

### LoginButton

The component renders a button that implements the login functionality through auth0.

The component has the following mandatory props:

- `theme`: (`primary` or `secondary`)
- `label`: The text rendered on the button
- `icon`: (Optional) Icon component to be rendered in front of the label text
- `quizId`: (Optional)Refers to the id of a quiz secton on the page causing auto-scroll to that section after login

Examples

```md title="you write:" secondaryTheme
import { LoginButton } from '@commercetools-docs/gatsby-theme-docs';

<LoginButton
theme="primary"
icon={<UserFilledIcon color="surface"/>}
label="Log in to start the quiz"
quizId={`quiz-${props.quizId}`}
/>
```
