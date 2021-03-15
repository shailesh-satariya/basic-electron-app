const apiUrl: string = process.env.REACT_APP_API_URL as string;

/**
 * fetchQuestions function
 *
 * @return {Promise<Response>}
 */
export const fetchRecords = async (): Promise<Response> => {
    return fetch(apiUrl);
};
