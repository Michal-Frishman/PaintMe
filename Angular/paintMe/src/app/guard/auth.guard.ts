import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);

  const router = inject(Router);
  if (isPlatformBrowser(platformId)) {
    if (sessionStorage.getItem('token')) {
      return true;
    }
  }
  router.navigate(['/login']);
  return false;
};
