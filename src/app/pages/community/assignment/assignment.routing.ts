import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AssignmentComponent } from './assignment.component';

export const AssignmentRouting: Routes = [
  {
    path: '',
        children: [  
          {
            path: '',
            component: AssignmentComponent,
            canActivate: [AuthGuard]
          }
    

   ]
    
  },
];


