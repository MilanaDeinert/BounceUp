import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  template: `
    <div class="page-hero">
      <h1>{{ product?.name }}</h1>
    </div>
    <div class="detail-container" *ngIf="product">
      <div class="detail-gallery">
        <img [src]="product.images[0]" [alt]="product.name" />
      </div>
      <div class="detail-info">
        <p class="detail-category">{{ product.category | titlecase }}</p>
        <h1>{{ product.name }}</h1>
        <p class="detail-desc">{{ product.description }}</p>
        <div class="detail-specs">
          <div><i class="pi pi-expand"></i><span>{{ product.width }}m × {{ product.length }}m</span><small>Grundfläche</small></div>
          <div><i class="pi pi-arrow-up"></i><span>{{ product.height }}m</span><small>Höhe</small></div>
          <div><i class="pi pi-users"></i><span>bis {{ product.capacity }}</span><small>Kinder</small></div>
        </div>
        <div class="detail-price">
          <span class="price">{{ product.price }}€</span>
          <span class="price-unit">/ Tag inkl. Aufbau</span>
        </div>
        <div class="detail-actions">
          <a [routerLink]="['/booking']" [queryParams]="{productId: product.id}">
            <p-button label="Jetzt buchen" icon="pi pi-calendar-plus" size="large" />
          </a>
          <a routerLink="/contact">
            <p-button label="Fragen?" icon="pi pi-question-circle" size="large" [outlined]="true" />
          </a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  // Mock data — wird später durch ProductService.getBySlug() ersetzt
  private all: Product[] = [
    { id: '1', name: 'Hüpfburg „Schloss"', slug: 'schloss', description: 'Elegante weiße Burg mit vier Spitztürmen – das Highlight für Kindergeburtstage, Kommunion, Hochzeiten und Familienfeste. Sicher, stabil und ein echter Blickfang.', price: 120, priceUnit: 'day', width: 3, height: 3, length: 3.5, capacity: 8, images: ['assets/images/castle-placeholder.jpeg'], category: 'castle', available: true, featured: true },
    { id: '2', name: 'Hüpfburg „Bubble House"', slug: 'bubble-house', description: 'Transparente Glaskuppel mit Eingangsschleuse – ein einzigartiges, magisches Erlebnis. Perfekt für besondere Anlässe und besondere Gäste. Etwas teurer, aber unvergesslich.', price: 180, priceUnit: 'day', width: 3, height: 3, length: 4, capacity: 6, images: ['assets/images/bubble-house.jpeg'], category: 'bubble house', available: true, featured: true },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.product = this.all.find(p => p.slug === slug) ?? null;
  }
}
