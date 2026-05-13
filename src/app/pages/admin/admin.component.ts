import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  template: `
    <div class="admin-page">
      <div class="admin-header">
        <h1><i class="pi pi-list-check"></i> Buchungsübersicht</h1>
        <p-button label="Aktualisieren" icon="pi pi-refresh" [outlined]="true" size="small" />
      </div>

      <p-table [value]="bookings" [paginator]="true" [rows]="10"
        [rowsPerPageOptions]="[10, 25, 50]"
        [tableStyle]="{'min-width': '50rem'}"
        styleClass="p-datatable-striped">
        <ng-template pTemplate="header">
          <tr>
            <th>ID</th>
            <th>Hüpfburg</th>
            <th>Datum</th>
            <th>Kunde</th>
            <th>E-Mail</th>
            <th>Telefon</th>
            <th>Status</th>
            <th>Aktionen</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-b>
          <tr>
            <td><code>#{{ b.id }}</code></td>
            <td>{{ b.productName }}</td>
            <td>{{ b.date | date:'dd.MM.yyyy' }}</td>
            <td>{{ b.customerName }}</td>
            <td>{{ b.customerEmail }}</td>
            <td>{{ b.customerPhone }}</td>
            <td>
              <p-tag [value]="statusLabel(b.status)"
                [severity]="statusSeverity(b.status)" />
            </td>
            <td>
              <div class="action-btns">
                <p-button icon="pi pi-check" severity="success" [text]="true" size="small" />
                <p-button icon="pi pi-times" severity="danger" [text]="true" size="small" />
              </div>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="8" class="empty-msg">Keine Buchungen vorhanden.</td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  bookings: Booking[] = [
    { id: 'BU001', productId: '1', productName: 'Hüpfburg „Schloss"', date: '2025-06-15', customerName: 'Anna Müller', customerEmail: 'anna@test.de', customerPhone: '0151 123456', customerAddress: 'Musterstr. 1', status: 'confirmed' },
    { id: 'BU002', productId: '2', productName: 'Hüpfburg „Bubble House"', date: '2025-06-22', customerName: 'Tom Schmidt', customerEmail: 'tom@test.de', customerPhone: '0152 654321', customerAddress: 'Teststr. 5', status: 'pending' },
    { id: 'BU003', productId: '1', productName: 'Hüpfburg „Schloss"', date: '2025-07-04', customerName: 'Lisa Wagner', customerEmail: 'lisa@test.de', customerPhone: '0153 111222', customerAddress: 'Beispielweg 9', status: 'cancelled' },
  ];

  statusLabel(status: string): string {
    return { pending: 'Ausstehend', confirmed: 'Bestätigt', cancelled: 'Storniert' }[status] ?? status;
  }

  statusSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' {
    return { pending: 'warn', confirmed: 'success', cancelled: 'danger' }[status] as any ?? 'info';
  }
}
