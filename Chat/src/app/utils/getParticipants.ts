import { StatusCode } from './constants';

export const getParticipants = async (threadId: string): Promise<string> => {    
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    const response = await fetch(`/chat/threads/${threadId}/participants?api-version=2021-09-07`, requestOptions);

    if (response.status === StatusCode.CREATED) {
      return response.text();
    }
    else if (response.status === StatusCode.NOTFOUND) {
      return "No participants found.";
    }
  } catch (error) {
    console.error('Failed at adding user, Error: ', error);
  }
  return "No participants found. Possible error in attempt.";
};
