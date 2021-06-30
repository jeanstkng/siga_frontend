// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../../shared/guards/auth.guard';
import {ProfessionalComponent} from './professional.component';
import {SkillComponent} from './skill/skill.component';
import {SkillListComponent} from './skill/skill-list/skill-list.component';

// My Components

export const ProfessionalRouting: Routes = [
    {
        path: '',
        component: ProfessionalComponent,
        canActivate: [AuthGuard]
    }
];
