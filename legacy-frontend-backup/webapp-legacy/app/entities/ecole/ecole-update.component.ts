import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEcole } from 'app/shared/model/ecole.model';
import { EcoleService } from './ecole.service';
import { IApplication } from 'app/shared/model/application.model';
import { ApplicationService } from 'app/entities/application';

@Component({
    selector: 'jhi-ecole-update',
    templateUrl: './ecole-update.component.html'
})
export class EcoleUpdateComponent implements OnInit {
    @Input() ecole: IEcole;
    isSaving: boolean;

    applications: IApplication[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ecoleService: EcoleService,
        protected applicationService: ApplicationService,

        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;

        // this.activatedRoute.data.subscribe(({ ecole }) => {
        //     this.ecole = ecole;
        // });
        this.applicationService
            .query({ filter: 'ecole-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IApplication[]>) => mayBeOk.ok),
                map((response: HttpResponse<IApplication[]>) => response.body)
            )
            .subscribe(
                (res: IApplication[]) => {
                    if (!this.ecole.application || !this.ecole.application.id) {
                        this.applications = res;
                    } else {
                        this.applicationService
                            .find(this.ecole.application.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IApplication>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IApplication>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IApplication) => (this.applications = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.loadAllEcole();

    }

    previousState() {
        window.history.back();
    }
    updateEtat(){

        if(this.ecole.selectedSite==true){
            this.ecole.selectedSite=false
        }else{
            this.ecole.selectedSite=true
        }
    }
    save() {
        this.isSaving = true;
        if (this.ecole.id !== undefined) {
            this.ecole.logoEcole= document.getElementById('field_logoEcole').value;
            this.ecole.enteteEcole= document.getElementById('field_enteteEcole').value;
            this.ecole.basPageEcole= document.getElementById('field_basPageEcole').value;
            this.ecoleService.update(this.ecole).subscribe(
                ()=>{

                }
            )
        } else {
            this.ecole.logoEcole= document.getElementById('field_logoEcole').value;
            this.ecole.enteteEcole= document.getElementById('field_enteteEcole').value;
            this.ecole.basPageEcole= document.getElementById('field_basPageEcole').value;
            this.ecoleService.create(this.ecole).subscribe(
                ()=>{

                }
            );
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEcole>>) {
        result.subscribe((res: HttpResponse<IEcole>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackApplicationById(index: number, item: IApplication) {
        return item.id;
    }
    changeSiteOUI(){
        this.ecole.selectedSite=true;
        console.log("cool")
    }
    changeSiteNON(){
        console.log("cool")
        this.ecole.selectedSite=false;
    }
    loadAllEcole(){
        this.applicationService.allEcole().subscribe(
            (data)=>{
                if(data.body.length!=0){
                    this.ecole=data.body[0];
                }
            }
        );
    }

}
