import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IAnneescolaire } from 'app/shared/model/anneescolaire.model';

@Component({
  selector: 'jhi-anneescolaire-detail',
  standalone: true,
  templateUrl: './anneescolaire-detail.component.html',
  imports: [CommonModule, TranslateModule, FontAwesomeModule, RouterLink]
})
export class AnneescolaireDetailComponent implements OnInit {
  anneescolaire: IAnneescolaire | null = null;

  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faPencil = faPencilAlt;

  private readonly destroyRef = inject(DestroyRef);

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ anneescolaire }) => (this.anneescolaire = anneescolaire ?? null));
  }

  previousState(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
