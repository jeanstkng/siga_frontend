import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

export const CecyRouting: Routes = [
 
  {
    path: '',
    children: [
        {
            path: 'course',
            loadChildren: () => import('./course/course.module').then(m => m.CourseModule),
            canActivate: [AuthGuard]
        },
        {
          path: 'planification',
          loadChildren: () => import('./planification/planification.module').then(m => m.PlanificationModule),
          canActivate: [AuthGuard]
      },
      
    ]
}
];


