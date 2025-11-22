import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const clientGuardGuard: CanActivateFn = (route, state) => {
  const router:Router= inject(Router);
  let stateConnexion= localStorage.getItem('state');
  if(stateConnexion=="connected_Client")
    return true;
else{
  router.navigate(['/log-in']);
  return false;
}
};
