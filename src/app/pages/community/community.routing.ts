// Angular Router
import {AuthGuard} from '../../shared/guards/auth.guard';
import { CommunityComponent } from './community.component';
import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects-list.component';

// community/projects
// community/forms
// community/portfolio
// community/assignment

// My Components

export const CommunityRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: 'projects',
                component: ProjectsComponent,
            },
            {
                path: 'forms',
                loadChildren: () => import('./forms/form.module').then(m => m.FormModule)
            },
            {
                path: 'forms/:id',
                loadChildren: () => import('./forms/form.module').then(m => m.FormModule)
            },
            {
                path: 'assignment',
                loadChildren: () => import('./assignment/assignment.module').then(m => m.AssignmentModule),
            },
            {
                path: 'portfolio',
                loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule),
            },
        ],
    }
];
