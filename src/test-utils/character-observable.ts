import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

export function createObservable<T>(
  data: T,
): Observable<AxiosResponse<T, any>> {
  const axios = {
    data,
    status: 200,
    statusText: '',
    headers: {},
    config: { url: '', headers: null },
  };

  return new Observable((observer) => {
    setTimeout(() => {
      observer.next(axios);
    }, 300);
  });
}
