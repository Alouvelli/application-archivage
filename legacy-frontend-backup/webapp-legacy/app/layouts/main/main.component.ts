import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from '../navbar/navbar.component';
import { PageRibbonComponent } from '../profiles/page-ribbon.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'jhi-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, PageRibbonComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.scss']
})
export class JhiMainComponent {}
