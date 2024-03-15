import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './pages/landing/landing.page';
import { GameDetailsPage } from './pages/game-details/game-details.page';
import { AdminPage } from './pages/admin/admin.page';

const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'game/:gameId', component: GameDetailsPage },
  { path: 'game/:gameId/:playerId', component: GameDetailsPage },
  { path: 'admin/:gameId', component: AdminPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
