import { inject, TestBed } from '@angular/core/testing';

import { EventManager, EventWithContent, JhiEvent } from './event-manager.service';

describe('Event Manager', () => {
  describe('EventWithContent', () => {
    it('should expose the provided name and content', () => {
      const eventWithContent = new EventWithContent('name', 'content');
      expect(eventWithContent).toEqual({ name: 'name', content: 'content' });
    });
  });

  describe('EventManager', () => {
    let receivedEvent: JhiEvent | string | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [EventManager],
      });
      receivedEvent = null;
    });

    it(
      'should not fail when broadcasting without subscribers',
      inject([EventManager], (eventManager: EventManager) => {
        expect(() => eventManager.broadcast({ name: 'modifier', content: 'modified something' })).not.toThrow();
      }),
    );

    it(
      'should invoke the callback for matching events',
      inject([EventManager], (eventManager: EventManager) => {
        eventManager.subscribe('modifier', event => (receivedEvent = event));

        eventManager.broadcast({ name: 'unrelatedModifier', content: 'unrelated modification' });
        expect(receivedEvent).toBeNull();

        eventManager.broadcast({ name: 'modifier', content: 'modified something' });
        expect(receivedEvent).toEqual({ name: 'modifier', content: 'modified something' });
      }),
    );

    it(
      'should support broadcasting by name only',
      inject([EventManager], (eventManager: EventManager) => {
        eventManager.subscribe('modifier', event => (receivedEvent = event));

        eventManager.broadcast('unrelatedModifier');
        expect(receivedEvent).toBeNull();

        eventManager.broadcast('modifier');
        expect(receivedEvent).toEqual({ name: 'modifier' });
      }),
    );

    it(
      'should support multiple event subscriptions',
      inject([EventManager], (eventManager: EventManager) => {
        eventManager.subscribe(['modifier', 'modifier2'], event => (receivedEvent = event));

        eventManager.broadcast('unrelatedModifier');
        expect(receivedEvent).toBeNull();

        eventManager.broadcast({ name: 'modifier', content: 'modified something' });
        expect(receivedEvent).toEqual({ name: 'modifier', content: 'modified something' });

        eventManager.broadcast('modifier2');
        expect(receivedEvent).toEqual({ name: 'modifier2' });
      }),
    );
  });
});
