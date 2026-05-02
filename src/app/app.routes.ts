import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MenuComponent } from './features/menu/menu.component';
import { GalleryComponent } from './features/gallery/gallery.component';
import { ReviewsComponent } from './features/reviews/reviews.component';
import { OrderComponent } from './features/order/order.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent }, 
  { path: 'gallery', component: GalleryComponent }, 
  { path: 'reviews', component: ReviewsComponent }, 
  { path: 'order', component: OrderComponent }, 
  { path: '**', redirectTo: '' }
];