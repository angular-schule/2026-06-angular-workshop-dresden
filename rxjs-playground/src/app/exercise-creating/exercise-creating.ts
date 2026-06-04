import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, take, Subscriber, Observer } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-creating.html',
  imports: [HistoryWindow]
})
export class ExerciseCreating {

  logStream$ = new ReplaySubject<unknown>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    // of('Dresden', 'Leipzig', 'Nürnberg')
    // interval(1000)      // ---0---1---2---3---4---5---6---7---8---9 ...
    // timer(3000)         // ---------0|
    // timer(3000, 1000)   // ---------0---1---2---3---4---5---6 ...
    // timer(0, 1000)      // 0---1---2---3---4---5---6 ...
    
    
    /*timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });*/

    function intervalFromArray<T>(intervalMs: number, values: T[]): Observable<T> {
      return interval(intervalMs).pipe(
        take(values.length),
        map(i => values[i])
      );
    }

    intervalFromArray(1000, ['A', 'B', 'C', 'D']).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });


    /******************************/

    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(5);
      sub.next(10);
      sub.next(20);

      setTimeout(() => sub.next(100), 2000)
      setTimeout(() => sub.complete(), 4000)
    }


    const obs: Observer<number> = {
      next: (e: number) => console.log(e),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG')
    };

    // producer(obs);
    // Finnische Notation
    const myObs$ = new Observable(producer);
    // myObs$.subscribe(obs);


    new Observable<number>(sub => {
      sub.next(30000);
    })

    
    /******************************/
  }

  log(msg: unknown) {
    this.logStream$.next(msg);
  }

}
