import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { PortfolioRouting } from './portfolio.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PortfolioRouting),
  ],
  declarations: [PortfolioComponent]
})
export class PortfolioModule { }
