
// import { defer, filter, from, iif, interval, map, Observable, of, OperatorFunction, pipe, skip, Subscriber, Subscription, take, tap, timer } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import { SafeSubscriber } from 'rxjs/internal/Subscriber';
// import { terminalLog } from '../../../utils/log-in-terminal';
// import '../../assets/css/style.css';

// const sequence = new Promise(resolve => {
//     let count = 0;

//     setInterval(() => {
//         count += 1;

//         console.log('setInterval', count);

//         resolve(count);
//     }, 1000);
// });

// sequence.then(value => {
//     terminalLog(value);
// });

// setTimeout(() => {
//     sequence.then(value => {
//         terminalLog(value);
//     });
// }, 3000);

// const sequence = (function* iteratorFn() {
//     let count = 0;

//     while (true) {
//         count += 1;

//         console.log('iteratorFn', count);

//         yield count;
//     }
// })();

// terminalLog(sequence.next().value);

// setTimeout(() => {
//     terminalLog(sequence.next().value);
// }, 2000);

// setTimeout(() => {
//     terminalLog(sequence.next().value);
// }, 3000);

// const sequence$: Observable<number> = interval(1000);

// sequence$.subscribe(value => {
//     terminalLog(value);
// })

// const sequence$ = new Observable<number>((subscriber: Subscriber<number>) => {
//     console.log('CREATE');
//     let count = 0;

//     const intervalId = setInterval(() => {
//         // console.log('setInterval', count);
//         console.log('new counter', count);

//         if (count === 5) {
//             subscriber.complete();
//             console.log('COMPLETE');

//             // subscriber.error('count === 5');
//             // console.log('ERROR');

//             return;
//         }

//         subscriber.next(count);
//         console.log('NEXT');

//         count += 1;
//     }, 1000);

//     return () => {
//         clearInterval(intervalId);
//         console.log('DESTROY');
//     }
// });

// const allSubscription = new Subscription();

// const subsription: Subscription = sequence$.subscribe({
//     next: value => {
//         terminalLog(`subscribe - 1: ${value}`);
//     },
//     complete: () => {
//         terminalLog(`complete`);
//     },
//     error: err => {
//         terminalLog(`error: ${err}`);
//     }
// });

// allSubscription.add(subsription);

// setTimeout(() => {
//     const subsription: Subscription = sequence$.subscribe({
//         next: value => {
//             terminalLog(`subscribe - 2: ${value}`);
//         },
//         complete: () => {
//             terminalLog(`complete`);
//         },
//         error: err => {
//             terminalLog(`error: ${err}`);
//         }
//     });

//     allSubscription.add(subsription);
// }, 2000);

// setTimeout(() => {
//     allSubscription.unsubscribe();
// }, 4500)

// setTimeout(() => {
//     sequence$.subscribe(value => {
//         terminalLog(`subscribe - 2: ${value}`);
//     })
// }, 3000);



// const ws = new WebSocket('ws://localhost:8081');

// ws.onopen = () => {
//     ws.send('on');
// };

// export const wsMessage$ = new Observable<MessageEvent>(subscriber => {
//     console.log('CREATE');

//     function messageListener(message: MessageEvent) {
//         subscriber.next(message);

//         console.log('NEXT');
//     }

//     function closeListener() {
//         subscriber.complete();
//     }

//     ws.addEventListener('message', messageListener);
//     ws.addEventListener('close', closeListener);

//     return () => {
//         ws.removeEventListener('message', messageListener);
//         ws.removeEventListener('close', closeListener);

//         console.log('DESTROY')
//     }
// });

// const subscription = wsMessage$.subscribe(value => {
//     terminalLog(`subscribe - 1: ${value.data}`);
// })

// setTimeout(() => {
//     wsMessage$.subscribe(value => {
//         terminalLog(`subscribe - 2: ${value.data}`);
//     })
// }, 2000);

// setTimeout(() => {
//     // ws.close();
//     subscription.unsubscribe();
// }, 5000)



// interval(1000).subscribe(terminalLog);
// timer(6000, 1000).subscribe(terminalLog);

// of(1, 2, [3, 2], {count: 4}).subscribe(terminalLog)
// from([1, 2, [3, 2], {count: 4}]).subscribe(terminalLog);

// function* iteratorFn(seed: number, max: number) {
//     let i = seed;

//     while (i < max) {
//         yield i;

//         i += 1;
//     }
// };

// const iterator = iteratorFn(3, 1000);

// from(iterator).subscribe(x => {
//     terminalLog(x);
// })

// from(
//     fetch('https://learn.javascript.ru/courses/groups/api/participants?key=r1v5uj').then(res => res.json())
// ).subscribe(console.log);

// ajax({
//     url: 'https://learn.javascript.ru/courses/groups/api/participants?key=r1v5uj',
//     crossDomain: true,
//     method: 'GET'
// }).subscribe(console.log);

// const stream$ = defer(() => {
//     const random = Math.round(Math.random() * 10);

//     if (random > 8) {
//         return of('True 8');
//     }

//     return random > 5 ? of('True 5') : of('False ' + random);
// })

// stream$.subscribe(terminalLog);
// stream$.subscribe(terminalLog);
// stream$.subscribe(terminalLog);
// stream$.subscribe(terminalLog);

// const stream$ = iif(
//     () => Math.round(Math.random() * 10) > 5,
//     of('True 5'),
//     of('False 5'),
// )

// stream$.subscribe(terminalLog);
// stream$.subscribe(terminalLog);
// stream$.subscribe(terminalLog);
// stream$.subscribe(terminalLog);

// const stream$ = interval(1000);

// (---) === 1000ms(1s) === 1frame

// ---0---1---2---3---4---5---6---7---8---9---10---...
// take: 10
// ---0---1---2---3---4---5---6---7---8---9|
// map: x * 2
// ---0---2---4---6---8---10---12---14---16---18|
// filter: x % 3
// ---0--- --- ---6--- --- ---12--- --- ---18|
// skip: 2
// --- --- --- --- --- --- ---12--- --- ---18|
// take: 1
// --- --- --- --- --- --- ---12|

// stream$
//     .pipe(
//         // ---0---1---2---3---4---5---6---7---8---9---10---...
//         take(10),
//         // ---0---1---2---3---4---5---6---7---8---9|
//         map(x => x * 2),
//         // ---0---2---4---6---8---10---12---14---16---18|
//         tap(value => {
//             console.log(value);

//             // return 1; // bad
//         }),
//         // ---0---2---4---6---8---10---12---14---16---18|
//         filter(x => x % 3 === 0),
//         // ---0--- --- ---6--- --- ---12--- --- ---18|
//         skip(2),
//         // --- --- --- --- --- --- ---12--- --- ---18|
//         take(1),
//         // --- --- --- --- --- --- ---12|
//     )
//     .subscribe(terminalLog);

// class DoubleSubscriber extends SafeSubscriber<number> {
//     next(value: number) {
//         super.next(value * 2);
//     }
// }

// function double(source$: Observable<number>): Observable<number> {
//     return new Observable(subscriber => {
//         // const subscription = source$.subscribe({
//         //     next: value => {
//         //         console.log('NEXT - double');
//         //         subscriber.next(value * 2);
//         //     },
//         //     complete: () => {
//         //         subscriber.complete();
//         //     },
//         //     error: error => {
//         //         subscriber.error(error);
//         //     }
//         // });
//         const subscription = source$.subscribe({
//             next: value => {
//                 console.log('NEXT - double');
//                 subscriber.next(value * 2);
//             },
//             complete: subscriber.complete.bind(subscriber),
//             error: subscriber.error.bind(subscriber),
//         });
//         // const doubleSubscriber = new DoubleSubscriber(subscriber);
//         // const subscription = source$.subscribe(doubleSubscriber);

//         return () => {
//             subscription.unsubscribe();

//             console.log('DESTROY - double');
//         }
//     })
// }

// const subscription = interval(1000)
// const subscription = sequence$
//     .pipe(
//         double
//     )
//     .subscribe({
//         next: value => {
//             terminalLog(value);
//         },
//         complete: () => {
//             terminalLog('COMPLETE');
//         }
//     });

// setTimeout(() => {
//     subscription.unsubscribe();
// }, 4000);

// function myMap<T, U>(cb: (value: T) => U): OperatorFunction<T, U> {
//     return (source$: Observable<T>): Observable<U> => new Observable(subscriber => {
//         const subscription = source$.subscribe({
//             next: value => {
//                 subscriber.next(cb(value));
//             },
//             complete: subscriber.complete.bind(subscriber),
//             error: subscriber.error.bind(subscriber),
//         });

//         return () => {
//             subscription.unsubscribe();
//         }
//     })
// }

// const double = myMap<number, number>(value => value * 2);

// function doubleFilter(source$: Observable<number>): Observable<number> {
//     return source$.pipe(
//         myMap(value => value * 2),
//         filter(value => value % 3 === 0),
//     )
// }

// const doubleFilter = (source$: Observable<number>) => {
//     return filter<number>(value => value % 3 === 0)(
//         myMap<number, number>(value => value * 2)(source$)
//     )
// }
// const doubleFilter = pipe(
//     myMap<number, number>(value => value * 2),
//     filter<number>(value => value % 3 === 0),
// )

// interval(1000)
//     .pipe(
//         doubleFilter
//     )
//     .subscribe(terminalLog);

// pipe(doubleFilter)(interval(1000))
//     .subscribe(terminalLog);

// stream$.pipe(...) ~ pipe(...)(stream$)

// function pipe<T, U>(
//     ...operators: Array<OperatorFunction<any, any>>
// ): OperatorFunction<T, U> {
//     return (startSource$: Observable<T>): Observable<U> => operators.reduce(
//         (source$, operator) => operator(source$),
//         startSource$ as Observable<any>,
//     ) as Observable<U>;
// }
