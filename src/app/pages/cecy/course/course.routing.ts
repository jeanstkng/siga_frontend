import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { CourseComponent } from './course.component';

export const CourseRouting: Routes = [
  {
      path: '',
      component: CourseComponent,
      canActivate: [AuthGuard]
  },
 
];

