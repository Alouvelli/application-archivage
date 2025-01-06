import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDocumentclasse } from 'app/shared/model/documentclasse.model';

@Component({
    selector: 'jhi-documentclasse-detail',
    templateUrl: './documentclasse-detail.component.html'
})
export class DocumentclasseDetailComponent implements OnInit {
    documentclasse: IDocumentclasse;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ documentclasse }) => {
            this.documentclasse = documentclasse;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
