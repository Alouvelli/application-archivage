import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPen } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IEmploye } from 'app/shared/model/employe.model';

@Component({
  selector: 'jhi-employe-detail',
  standalone: true,
  templateUrl: './employe-detail.component.html',
  imports: [CommonModule, TranslateModule, FontAwesomeModule, RouterLink]
})
export class EmployeDetailComponent implements OnInit {
  employe: IEmploye | null = null;

  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faPen = faPen;

  private readonly destroyRef = inject(DestroyRef);

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ employe }) => (this.employe = employe ?? null));
  }

  previousState(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
