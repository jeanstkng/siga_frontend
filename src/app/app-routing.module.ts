import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';


// Application Components
import {AppMainComponent} from './shared/components/main/app.main.component';
import {AppBlankComponent} from './shared/components/blank/app.blank.component';
import { QuestionComponent } from './pages/teacher-eval/question/question.component';
import { TeacherEvalComponent } from './pages/teacher-eval/teacher-eval.component';
import { EvaluationComponent } from './pages/teacher-eval/evaluation/evaluation.component';
import { TypeEvaluationComponent } from './pages/teacher-eval/type-evaluation/type-evaluation.component';


// Application Guards
import {AuthGuard} from './shared/guards/auth.guard';
const routes: Routes = [
    { path: 'app-teacher-eval', component: TeacherEvalComponent },
    { path: 'app-question', component: QuestionComponent },
    { path: 'app-evaluation', component: EvaluationComponent },
    { path: 'app-type-evaluation', component: TypeEvaluationComponent },
  ];

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', redirectTo: '/', pathMatch: 'full'},
                   
                     // ruta para mostrar el formulario
                    {
                        path: 'teacher-eval',
                        loadChildren: () => import('./pages/teacher-eval/question/question.module').then(m => m.QuestionModule),
                       // canActivate: [AuthGuard]
                    },
                    //ruta para mostrar la lista de docentes del estudiante
                    {
                        path: 'teacher-list',
                        loadChildren: () => import('../app/pages/teacher-eval/teacher-list/teacher-list.module').then(m => m.TeacherListModule),
                        //canActivate: [AuthGuard]
                    },

                    {
                        path: 'dashboard',
                        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
                        //canActivate: [AuthGuard]
                    },
                    

                    // ruta evaluacion//
                    {
                        path: 'evaluation',
                        loadChildren: () => import('./pages/teacher-eval/evaluation/evaluation.module').then(m => m.EvaluationModule),
                        canActivate: [AuthGuard]
                    },


                    //ruta tipo de evaluacion
                    {
                        path: 'type-evaluation',
                        loadChildren: () => import('./pages/teacher-eval/type-evaluation/type-evaluation.module').then(m => m.TypeEvaluationModule),
                       canActivate: [AuthGuard]
                    },

                   
                   /* {
                        path: 'user',
                        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
                        canActivate: [AuthGuard]
                    }*/
                ]//ayuda

                   
            },
            {
                path: 'auth',
                component: AppBlankComponent,
                loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
            },
            {path: '**', redirectTo: '/auth/not-found'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
