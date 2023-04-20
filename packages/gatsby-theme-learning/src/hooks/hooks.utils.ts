import type {
  ApiCallResult,
  EnrolledCourses,
  CourseWithDetails,
} from '../external-types';

export const getCredentialsByEnv = (env: 'production' | 'testing') =>
  env === 'production' ? 'same-origin' : 'include';

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
  getAuthToken: () => Promise<string>,
  learnApiBaseUrl: string,
  env: 'production' | 'testing'
): Promise<ApiCallResult<EnrolledCourses | CourseWithDetails>> => {
  const responseHandler = async (response: Response) => {
    if (!response.ok) {
      const info = await response.json();
      throw new FetchDataError(
        `HTTP Error while feching data from ${url}`,
        response.status,
        info
      );
    }
    const jsonResponse = (await response.json()) as ApiCallResult<
      EnrolledCourses | CourseWithDetails
    >;
    if (jsonResponse.errors) {
      const msg = `Error: "${jsonResponse.errors[0].message}" while fetching ${url}`;
      console.error(msg);
      throw new FetchDataError(msg);
    }
    return jsonResponse;
  };

  try {
    const accessToken = await getAuthToken();

    // ...then performs fetch
    const response = await fetch(`${learnApiBaseUrl}${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: getCredentialsByEnv(env),
    });
    return responseHandler(response);
  } catch (e) {
    const errMsg = `Error while feching data from ${url}`;
    console.error(errMsg, e);
    throw new FetchDataError(errMsg);
  }
};
