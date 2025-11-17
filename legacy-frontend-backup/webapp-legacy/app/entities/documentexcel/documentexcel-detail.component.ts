import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDocumentexcel } from 'app/shared/model/documentexcel.model';

@Component({
    selector: 'jhi-documentexcel-detail',
    templateUrl: './documentexcel-detail.component.html'
})
export class DocumentexcelDetailComponent implements OnInit {
    documentexcel: IDocumentexcel;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ documentexcel }) => {
            this.documentexcel = documentexcel;
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
