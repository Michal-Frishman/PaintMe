import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { inject } from '@angular/core';
import { Router } from '@angular/router';

function isTokenValid(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    return payload.exp > currentTime;
  } catch (e) {
    console.error('Invalid token format', e);
    return false;
  }
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');

  if (token) {
    try {
      if (!token || !isTokenValid(token)) {
        sessionStorage.removeItem('token');
        router.navigate(['/login'], { queryParams: { expired: 'true' } });
      }
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
    } catch (err) {
      console.error('Token parse error', err);
    }
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const serverMsg =
        typeof error.error === 'string'
          ? error.error
          : (error.error?.message ?? error.message);

      if (error.status === 401 && !serverMsg.includes('Token has expired')) {
        console.warn('Unauthorized: ', serverMsg);
      }

      return throwError(() => error);
    })
  );
};
