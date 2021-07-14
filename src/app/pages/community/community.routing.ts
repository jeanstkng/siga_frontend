// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../shared/guards/auth.guard';
import { CommunityComponent } from './community.component';




// My Components

export const CommunityRouting: Routes = [
    {
        path: '',
        children: [

            {  
                path: '',
                component: CommunityComponent,
                canActivate: [AuthGuard]
            
                
                
              },
            
           /* {
                path: 'assignment',
                loadChildren: () => import('./assignment/assignment.module').then(m => m.AssignmentModule),
                
              ///  canActivate: [AuthGuard] 

            },
            {
                path: 'portfolio',
                //loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule),
                
                canActivate: [AuthGuard] 

            },*/
            
        ]
    }
];