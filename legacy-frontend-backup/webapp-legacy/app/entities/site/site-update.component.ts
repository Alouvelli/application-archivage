import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { finalize, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ISite, Site } from 'app/shared/model/site.model';
import { SiteService } from './site.service';
import { IEcole } from 'app/shared/model/ecole.model';
import { EcoleService } from 'app/entities/ecole';

@Component({
  selector: 'jhi-site-update',
  standalone: true,
  templateUrl: './site-update.component.html',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, FontAwesomeModule]
})
export class SiteUpdateComponent implements OnInit {
  isSaving = false;
  site: ISite | null = null;

  ecoles: IEcole[] = [];

  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faSave = faSave;

  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);

  editForm = this.fb.group({
    id: [{ value: null, disabled: true }],
    codeSite: ['', [Validators.required, Validators.maxLength(100)]],
    sigleSite: ['', [Validators.required, Validators.maxLength(50)]],
    nineaSite: [''],
    adresseSite: [''],
    telephone: [''],
    emailSite: ['', Validators.email],
    faxSite: [''],
    logoSite: [''],
    enteteSite: [''],
    basPageSite: [''],
    rang: [0],
    etatSite: [true],
    encours: [true],
    ecoleId: [null, Validators.required]
  });

  constructor(
    private readonly siteService: SiteService,
    private readonly ecoleService: EcoleService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ site }) => {
      this.site = site ?? null;
      if (site) {
        this.updateForm(site);
      } else {
        this.editForm.patchValue({
          etatSite: true,
          encours: true
        });
      }
      this.loadEcoles(site);
    });
  }

  previousState(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  save(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const site = this.createFromForm();
    const save$ = site.id !== undefined ? this.siteService.update(site) : this.siteService.create(site);

    save$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isSaving = false))
      )
      .subscribe({
        next: () => this.previousState()
      });
  }

  private updateForm(site: ISite): void {
    this.editForm.patchValue({
      id: site.id ?? null,
      codeSite: site.codeSite ?? '',
      sigleSite: site.sigleSite ?? '',
      nineaSite: site.nineaSite ?? '',
      adresseSite: site.adresseSite ?? '',
      telephone: site.telephone ?? '',
      emailSite: site.emailSite ?? '',
      faxSite: site.faxSite ?? '',
      logoSite: site.logoSite ?? '',
      enteteSite: site.enteteSite ?? '',
      basPageSite: site.basPageSite ?? '',
      rang: site.rang ?? 0,
      etatSite: site.etatSite === 1,
      encours: site.encours === 1,
      ecoleId: site.ecole?.id ?? null
    });
  }

  private loadEcoles(site?: ISite | null): void {
    this.ecoleService
      .query()
      .pipe(
        map((res: HttpResponse<IEcole[]>) => res.body ?? []),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(ecoles => {
        if (site?.ecole && !ecoles.find(ecole => ecole.id === site.ecole!.id)) {
          ecoles.push(site.ecole);
        }
        this.ecoles = ecoles;
      });
  }

  private createFromForm(): ISite {
    const rawValue = this.editForm.getRawValue();
    const selectedEcole = this.ecoles.find(option => option.id === rawValue.ecoleId);

    return {
      ...new Site(),
      id: rawValue.id ?? undefined,
      codeSite: rawValue.codeSite ?? undefined,
      sigleSite: rawValue.sigleSite ?? undefined,
      nineaSite: rawValue.nineaSite ?? undefined,
      adresseSite: rawValue.adresseSite ?? undefined,
      telephone: rawValue.telephone ?? undefined,
      emailSite: rawValue.emailSite ?? undefined,
      faxSite: rawValue.faxSite ?? undefined,
      logoSite: rawValue.logoSite ?? undefined,
      enteteSite: rawValue.enteteSite ?? undefined,
      basPageSite: rawValue.basPageSite ?? undefined,
      rang: rawValue.rang ?? undefined,
      etatSite: rawValue.etatSite ? 1 : 0,
      encours: rawValue.encours ? 1 : 0,
      ecole: selectedEcole
    };
  }
}
