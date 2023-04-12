import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamSelectionComponent } from './components/team-selection/team-selection.component';
import { TeamResultsComponent } from './components/team-results/team-results.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/teamSelection',
    pathMatch: 'full',
  },
  {
    path: 'teamSelection',
    component: TeamSelectionComponent,
  },
  {
    path: 'results/:teamCode',
    component: TeamResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
