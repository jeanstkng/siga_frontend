// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../shared/guards/auth.guard';
import {UserComponent} from './users/user.component';
import {UserAdministrationInstitutionComponent} from './user-administration-institution.component';
// My Components

export const UserAdministrationInstitutionRouting: Routes = [
    {
        path: '',
        component: UserAdministrationInstitutionComponent,
        children: [
            {
                path: 'users',
                component: UserComponent,
                canActivate: [AuthGuard]
            },

        ]
    }
];
