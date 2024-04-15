import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './pages/landing/landing.page';
import { GameDetailsPage } from './pages/game-details/game-details.page';
import { AdminPage } from './pages/admin/admin.page';
import { RoleGuard } from './guards/role.guard';
import { AuthGuard } from './guards/auth.guard';
import { AboutPage } from './pages/about/about.page';

const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'about', component: AboutPage },
  {
    path: 'game/:gameId',
    component: GameDetailsPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'game/:gameId/:playerId',
    component: GameDetailsPage,
    canActivate: [AuthGuard],
  },
  { path: 'admin/:gameId', component: AdminPage, canActivate: [RoleGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
