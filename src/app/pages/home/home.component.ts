import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe, NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, NgStyle, ButtonModule, ChipModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // Floating spheres – warm beige/mauve palette matching brand image
  readonly bubbles = [
    { size: 96,  top:  6, left:  4, colorIdx: 1, duration: 22, delay:  0 },
    { size: 56,  top:  2, left: 28, colorIdx: 3, duration: 17, delay:  3 },
    { size: 130, top:  8, left: 70, colorIdx: 2, duration: 26, delay:  1 },
    { size: 44,  top: 18, left: 92, colorIdx: 0, duration: 15, delay:  7 },
    { size: 72,  top: 38, left: 88, colorIdx: 1, duration: 20, delay:  5 },
    { size: 110, top: 55, left:  2, colorIdx: 2, duration: 24, delay:  2 },
    { size: 50,  top: 48, left: 18, colorIdx: 3, duration: 18, delay:  9 },
    { size: 88,  top: 72, left: 55, colorIdx: 0, duration: 21, delay:  4 },
    { size: 150, top: 65, left: 78, colorIdx: 1, duration: 30, delay:  6 },
    { size: 38,  top: 82, left: 30, colorIdx: 2, duration: 14, delay: 11 },
    { size: 64,  top: 88, left: 10, colorIdx: 3, duration: 19, delay:  8 },
    { size: 42,  top: 92, left: 65, colorIdx: 0, duration: 16, delay: 13 },
  ];

  bubbleStyle(b: typeof this.bubbles[0]): Record<string, string> {
    return {
      width:  `${b.size}px`,
      height: `${b.size}px`,
      top:    `${b.top}%`,
      left:   `${b.left}%`,
      animationDuration: `${b.duration}s`,
      animationDelay:    `-${b.delay}s`,
      '--ci': `${b.colorIdx}`,
    };
  }
  featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Hüpfburg „Schloss"',
      slug: 'schloss',
      description: 'Elegante weiße Burg – das Highlight für Kindergeburtstage und Familienfeste.',
      price: 120,
      priceUnit: 'day',
      width: 3,
      height: 3,
      length: 3.5,
      capacity: 8,
      images: ['assets/images/castle-placeholder.jpeg'],
      category: 'castle',
      available: true,
      featured: true
    },
    {
      id: '2',
      name: 'Hüpfburg „Bubble House"',
      slug: 'bubble-house',
      description: 'Transparente Glaskuppel – ein magisches Erlebnis für besondere Anlässe.',
      price: 180,
      priceUnit: 'day',
      width: 3,
      height: 3,
      length: 4,
      capacity: 6,
      images: ['assets/images/bubble-house.jpeg'],
      category: 'bubble house',
      available: true,
      featured: true
    }
  ];

  features = [
    { icon: 'pi pi-truck', title: 'Lieferung & Aufbau', text: 'Wir liefern, bauen auf und bauen wieder ab – stressfrei für dich.' },
    { icon: 'pi pi-shield', title: 'Sicher & geprüft', text: 'Alle Hüpfburgen sind TÜV-geprüft und regelmäßig gewartet.' },
    { icon: 'pi pi-heart', title: 'Familienfreundlich', text: 'Perfekt für Kindergeburtstage, Hochzeiten & Events.' },
    { icon: 'pi pi-star', title: 'Top Bewertungen', text: 'Viele zufriedene Familien vertrauen uns bereits.' }
  ];
}
