// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../shared/guards/auth.guard';
import { CommunityComponent } from './community.component';




// My Components

export const CommunityRouting: Routes = [
    {
        path: '',
        //component: CommunityComponent,
        children: [


            {
                path: 'assignment',
                loadChildren: () => import('./assignment/assignment.module').then(m => m.AssignmentModule),
                
               

            },
            {
                path: 'portfolio',
                loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule),
                
                //canActivate: [AuthGuard] 

            },
            
        ]
    }
];