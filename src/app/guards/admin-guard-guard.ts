import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const router:Router= inject(Router);
  let stateConnexion= localStorage.getItem('state');
  if(stateConnexion=="connected_Admin")
    return true;
else{
  router.navigate(['/log-in']);
  return false;
}
};
