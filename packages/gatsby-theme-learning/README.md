# commercetools learning plugin

A gatsby theme plugins providing UI components and helper utilities to integrate self-learning functionality
into other React User interfaces.

Works against the learning-api.

## Configuration

`gatsby-theme-learning` plugin expects the following parameters:

- `auth0Domain`: the auth0 application domain url (it is defined in the auth0 management app)
- `learnApiBaseUrl`: the learn API base url. It can be omitted if the host running the site matches the api host.
- `features`: an array of strings representing feature flags used to enable/disable specific functionalities. Expected values:
  - `status-indicator`: feature flag to toggle the course and topics status indicator.

In order to enable the plugin, at least the following configuration should be added to the `gatsby-config.js` plugin section:

```
{
    resolve: '@commercetools-docs/gatsby-theme-learning',
    options: {
        auth0Domain: 'auth0domain.dummy.tld',
        learnApiBaseUrl: 'https://api.host.tld',
    },
}
```

## Components

### Quiz

Quiz component can be used in any `mdx` page. It's responsible for fetching, rendering and handling all the interaction logic of a quiz answer submission.
The component simply renders a login CTA if the user is not logged in, otherwise the quiz is rendered.

The component expects 2 mandatory props:

- `courseId`: Id of the course defined in Moodle LMS
- `quizId`: Id of the quiz defined in Moodle LMS

### FirstName

A component that returns a user's first name to any `mdx` page. For example, it can be used within a personalized welcome sentence.

Example:

```
Welcome <FirstName/>! This is our course overview.
```
