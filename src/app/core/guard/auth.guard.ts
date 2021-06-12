import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UserDetails } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CommonService } from 'src/app/shared/services/common/common.service';


@Injectable({
    providedIn: 'root' // ADDED providedIn root here.
})
export class AuthGuard implements CanActivate, CanActivateChild, OnDestroy {
    private destroy$ = new Subject();
    private menuList: Array<any> = [];

    constructor(
        private authService: AuthService,
        private router: Router,
        private commonService: CommonService,
        ) {
        
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkIfAuthenticated(state).then((authenticated: boolean) => {
            return authenticated;
        });
    }

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkIfAuthenticated(state).then((authenticated: boolean) => {
            return authenticated;
        });
    }

    private async checkIfAuthenticated(state: RouterStateSnapshot): Promise<boolean> {
        console.log(state)
        let userDetails: UserDetails = this.authService.getUserDetails();
        this.commonService.userLoginStatus$.next(userDetails ?  true : false);
        if (!userDetails) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}