import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, ButtonModule],
  template: `
    <div class="page-hero">
      <h1>Unsere Hüpfburgen</h1>
      <p>Entdecke unsere gesamte Auswahl an Hüpfburgen für jeden Anlass.</p>
    </div>
    <div class="catalog-grid">
      @for (p of products; track p.id) {
        <article class="product-card" [routerLink]="[p.slug]">
          <div class="product-card__image">
            <img [src]="p.images[0]" [alt]="p.name" />
            <span class="product-card__badge">Ab {{ p.price }}€ / Tag</span>
          </div>
          <div class="product-card__body">
            <h3>{{ p.name }}</h3>
            <p>{{ p.description }}</p>
            <p-button label="Details" icon="pi pi-arrow-right" iconPos="right" [outlined]="true" />
          </div>
        </article>
      }
    </div>
  `,
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  products: Product[] = [
    { id: '1', name: 'Hüpfburg „Schloss"', slug: 'schloss', description: 'Elegante weiße Burg – das Highlight für Kindergeburtstage und Familienfeste.', price: 120, priceUnit: 'day', width: 3, height: 3, length: 3.5, capacity: 8, images: ['assets/images/castle-placeholder.jpeg'], category: 'castle', available: true, featured: true },
    { id: '2', name: 'Hüpfburg „Bubble House"', slug: 'bubble-house', description: 'Transparente Glaskuppel – ein magisches Erlebnis für besondere Anlässe.', price: 180, priceUnit: 'day', width: 3, height: 3, length: 4, capacity: 6, images: ['assets/images/bubble-house.jpeg'], category: 'bubble house', available: true, featured: true },
  ];
}
