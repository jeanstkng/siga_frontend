import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';


export const PortfolioRouting: Routes = [
  {
    path: '',
    
    children: [

      {
          path: 'commitmentLetter',
          loadChildren: () => import('./commitment-letter/commitment-letter.module').then(m => m.CommitmentLetterModule),
            
      },
      {
          path: 'activityReport',
         loadChildren: () => import('./activity-report/activity-report.module').then(m => m.ActivityReportModule),
          
          

      },
      
  ]
    
  },
];