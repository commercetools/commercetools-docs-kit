export const pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    auth0Domain: Joi.string().description(`Auth0 domain name`),
    auth0ClientId: Joi.string().description(`Auth0 client id`),
    learnApiBaseUrl: Joi.string()
      .allow('')
      .default('')
      .description(`Learn API base url`),
    hideLogin: Joi.bool().description(
      `Flag that determines if the login information are visible in the top bar`
    ),
  });
};
