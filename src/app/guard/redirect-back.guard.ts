import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RedirectBackGuard implements CanActivate {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const uuid = this.activatedRoute.snapshot.paramMap.get('uuid');

    // Check if the user is trying to access the /agent/:uuid route
    if (this.router.url.includes(`/agent/${uuid}`)) {
      // Redirect to the /agents page
      this.router.navigate(['/agents']);
      return false; // Prevent navigation to the /agent/:uuid page
    }

    return true; // Allow navigation
  }
}
