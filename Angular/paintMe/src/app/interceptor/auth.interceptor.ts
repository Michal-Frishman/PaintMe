import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
   const serverMsg =
  typeof error.error === 'string'
    ? error.error
    : (error.error?.message ?? error.message);
      if (error.status === 401 && serverMsg.includes('Token has expired')) {
        sessionStorage.removeItem('token');
        router.navigate(['/login'],{ queryParams: { expired: 'true' } });
      }
      return throwError(error);
    })
  );
};
