import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects-list.component';

export const CommunityRoutes: Routes = [
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
        ],
    }
];

// community/projects
// community/forms
