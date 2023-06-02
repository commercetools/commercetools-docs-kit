# sso module

This module is providing UI components and helper utilities to integrate auth0 SSO functionality
into other React User interfaces.

Works against the auth0 api.

## Configuration

The module depends on some configuration properties passed to the `gatsby-theme-docs` gatsby plugin, in details:

- `auth0Domain`: the auth0 application domain url (it is defined in the auth0 management app)
- `auth0ClientId`: the auth0 client id (it is defined in the auth0 management app)
- `selfLearningFeatures`: an array of strings representing feature flags used to enable/disable specific functionalities. Expected values:
  - `status-indicator`: feature flag to toggle the course and topics status indicator.
  - `complete-profile-modal`: feature flag to toggle the complete profile modal window functionality

## Components

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
