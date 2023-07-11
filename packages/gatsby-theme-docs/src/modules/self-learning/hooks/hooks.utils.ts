import type {
  ApiCallResult,
  EnrolledCourses,
  CourseWithDetails,
  ApiCallResultError,
} from '../external-types';

const ERR_TYPE_NOT_ENROLLED = 'errorcoursecontextnotvalid';

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

/**
 * Checks if the errors array contains a specific code indicating that the
 * user is not yet enrolled into the course
 */
const isUserNotUnenrolledError = (errors: ApiCallResultError[]) =>
  !!errors.find((error) => error.type === ERR_TYPE_NOT_ENROLLED);

export const fetcherWithToken = async (
  url: string,
  getAuthToken: () => Promise<string>,
  learnApiBaseUrl: string,
  method: 'GET' | 'POST'
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
      // any errors different than 'unenrolled' throws an exception
      if (!isUserNotUnenrolledError(jsonResponse.errors)) {
        const msg = `Error: "${jsonResponse.errors[0].message}" while fetching ${url}`;
        console.error(msg);
        throw new FetchDataError(msg);
      }
    }
    return jsonResponse;
  };

  try {
    const accessToken = await getAuthToken();

    // ...then performs fetch
    const response = await fetch(`${learnApiBaseUrl}${url}`, {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      // Allowing to include authorization and cookie headers because the API is hosted on a different
      // subdomain even in production and as opposed to cookie domains, CORS same-origin
      // policy does not consider a subdomain of the document domain same-origin.
      // ("learning-api.docs.commercetools.com" is not same-origin with "docs.commercetools.com")
      credentials: 'include',
    });
    return responseHandler(response);
  } catch (e) {
    const errMsg = `Error while feching data from ${url}`;
    console.error(errMsg, e);
    throw new FetchDataError(errMsg);
  }
};

export const DEFAULT_SWR_FLAGS = {
  //disabled as it's unlikely we experiment network reconnections (mainly happens on mobile devices)
  revalidateOnReconnect: false,
  // must be set disabled due to a Gatsby limitation. All the components tree is un-mounted and remounted causing cache to be revalidated by re-fetching from API
  revalidateIfStale: false,
  // it must stay true to perform the initial call and populate swr cache
  revalidateOnMount: true,
  // arbitrarly set to 3 minutes. It act as fallback mechanism in case manual cache invalidation fails.
  dedupingInterval: 3 * 60 * 1000,
  // we want to revalidate the cache in case the tab loses focus and lately retuns in focus
  revalidateOnFocus: true,
};
