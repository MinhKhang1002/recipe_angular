import { Component } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig) {}
  title = '';
  items!: MenuItem[];

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
      {
        label: 'Recipe Book',
        icon: 'pi pi-fw pi-file',
      },
      {
        label: 'Recipes',
        icon: 'pi pi-fw pi-file',
        routerLink: ['recipes'],
      },
      {
        label: 'Shopping List',
        icon: 'pi pi-fw pi-pencil',
        routerLink: ['shopping-list'],
      },
    ];
  }
}
