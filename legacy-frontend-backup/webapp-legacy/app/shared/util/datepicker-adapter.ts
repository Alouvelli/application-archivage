/**
 * Angular bootstrap Date adapter
 */
import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import moment, { Moment } from 'moment';

@Injectable()
export class NgbDateMomentAdapter extends NgbDateAdapter<Moment | null> {
    fromModel(date: Moment | null): NgbDateStruct | null {
        if (date && moment.isMoment(date) && date.isValid()) {
            return { year: date.year(), month: date.month() + 1, day: date.date() };
        }
        return null;
    }

    toModel(date: NgbDateStruct | null): Moment | null {
        return date ? moment(`${date.year}-${date.month}-${date.day}`, 'YYYY-MM-DD') : null;
    }
}
