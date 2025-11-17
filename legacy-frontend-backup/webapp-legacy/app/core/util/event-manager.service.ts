import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';

export interface JhiEvent {
  name: string;
  content?: unknown;
}

export interface JhiEventWithContent<T> extends JhiEvent {
  content: T;
}

export class EventWithContent<T> implements JhiEventWithContent<T> {
  constructor(public name: string, public content: T) {}
}

@Injectable({ providedIn: 'root' })
export class EventManager {
  private readonly eventSubject = new Subject<JhiEvent>();
  private readonly observable = this.eventSubject.asObservable().pipe(share());

  broadcast(event: JhiEvent | string): void {
    if (typeof event === 'string') {
      this.eventSubject.next({ name: event });
      return;
    }
    this.eventSubject.next(event);
  }

  subscribe(eventName: string | string[], callback: (event: JhiEvent) => void): Subscription {
    const names = Array.isArray(eventName) ? eventName : [eventName];
    return this.observable
      .pipe(
        filter((event: JhiEvent) => names.includes(event.name)),
        map((event: JhiEvent) => event)
      )
      .subscribe(callback);
  }

  destroy(subscriber?: Subscription): void {
    subscriber?.unsubscribe();
  }

  observe(eventName: string): Observable<JhiEvent> {
    return this.observable.pipe(
      filter((event: JhiEvent) => event.name === eventName),
      map((event: JhiEvent) => event)
    );
  }
}
