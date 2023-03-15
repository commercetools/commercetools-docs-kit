export const pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    auth0Domain: Joi.string().description(`Auth0 domain name`),
    auth0ClientId: Joi.string().description(`Auth0 client id`),
    learnApiBaseUrl: Joi.string()
      .allow('')
      .default('')
      .description(`Learn API base url`),
  });
};
