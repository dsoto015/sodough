import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MenuComponent } from './features/menu/menu.component';
import { GalleryComponent } from './features/gallery/gallery.component';
import { ReviewsComponent } from './features/reviews/reviews.component';
import { AboutUsComponent } from './features/about-us/about-us.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent }, 
  { path: 'about-us', component: AboutUsComponent }, 
  { path: 'reviews', component: ReviewsComponent }, 
  { path: 'menu', component: MenuComponent }, 
  { path: '**', redirectTo: '' }
];