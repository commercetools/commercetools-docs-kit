import type { ApiCallResult, EnrolledCourses } from '../external-types';

class FetchDataError extends Error {
  status: number | undefined;
  info: object | undefined;

  constructor(message: string, status?: number | undefined, info?: object) {
    super(message);
    this.status = status;
    this.info = info;

    Object.setPrototypeOf(this, FetchDataError.prototype);
  }
}

export const fetcherWithToken = async (
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: any,
  auth0Domain: string,
  learnApiBaseUrl: string
): Promise<ApiCallResult<EnrolledCourses>> => {
  const responseHandler = async (response: Response) => {
    if (!response.ok) {
      const info = await response.json();
      throw new FetchDataError(
        `HTTP Error while feching data from ${url}`,
        response.status,
        info
      );
    }
    return response.json();
  };

  try {
    // first wait for a token...
    const audience =
      auth0Domain === 'auth.id.commercetools.com'
        ? 'commercetools.eu.auth0.com'
        : auth0Domain;

    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${audience}/api/v2/`,
      },
    });

    // ...then performs fetch
    const response = await fetch(`${learnApiBaseUrl}${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return responseHandler(response);
  } catch (e) {
    const errMsg = `Error while feching data from ${url}`;
    console.error(errMsg, e);
    throw new FetchDataError(errMsg);
  }
};
