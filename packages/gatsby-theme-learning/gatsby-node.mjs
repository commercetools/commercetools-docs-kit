export const pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    auth0Domain: Joi.string().required().description(`Auth0 domain name`),
    learnApiBaseUrl: Joi.string()
      .allow('')
      .default('')
      .description(`Learn API base url`),
  });
};
