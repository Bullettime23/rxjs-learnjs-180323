import { Observable, Subscriber, Subscription, concat, concatAll, concatMap, defer, fromEvent, fromEventPattern, interval, map, of, take, tap, timer } from 'rxjs';
import '../../assets/css/style.css';
import { terminalLog } from '../../utils/log-in-terminal';

// const sequence = new Promise((resolve) => {
// 	let count = 0;
// 	setInterval(() => {
// 		count += 1;
// 		console.log('Set interval ', count);

// 		resolve(count);
// 	}, 1000);
// });

// sequence.then((value) => {
// 	terminalLog(value);
// });

// setTimeout(() => {
// 	sequence.then((value) => terminalLog(value));
// }, 3000);

//________________Geneartor

// let sequence = (function* iteratorFn() {
// 	let count = 0;
// 	while (true) {
// 		count++;
// 		console.log('Iterator ', count);
// 		yield count;
// 	}
// })();

// terminalLog(sequence.next().value);

// setTimeout(() => terminalLog(sequence.next().value), 2000);
// setTimeout(() => terminalLog(sequence.next().value), 3000);

//____________Observable

// const sequence$: Observable<number> = interval(2000);

// sequence$.subscribe((val) => terminalLog(val));

//_________Stream

// const sequence$ = new Observable<number>((subscriber: Subscriber<number>) => {
// 	console.log('CREATE');
// 	let count = 0;
// 	const intervalId = setInterval(() => {
// 		count += 1;
// 		console.log('Set interval ', count);
// 		if (count === 5) {
// 			subscriber.error('Count = 5');

// 			console.log('ERROR'); // subscriber.complete();
// 			return;
// 		}
// 		subscriber.next(count);
// 		console.log('NEXT');
// 	}, 1000);

// 	return () => {
// 		clearInterval(intervalId);
// 		console.log('DESTROY');
// 	};
// });

// let subscription = sequence$.subscribe({
// 	next: (val) => terminalLog('NEXT: ' + val),
// 	complete: () => terminalLog('COMPLETE'),
// 	error: (err) => terminalLog('ERROR ' + err),
// });

// setTimeout(() => subscription.unsubscribe(), 4000);

// setTimeout(
// 	() =>
// 		(subscription = sequence$.subscribe({
// 			next: (val) => terminalLog('NEXT: ' + val),
// 			complete: () => terminalLog('COMPLETE'),
// 			error: (err) => terminalLog('ERROR ' + err),
// 		})),
// 	8000
// );


// Баловство с webSocket

// const allSubscriptions = new Subscription();
// const ws = new WebSocket("http://localhost:8081");

// ws.onopen = () => {
// 	ws.send('on');
// }

// const wsStream$ = new Observable((subscriber: Subscriber<MessageEvent>)=> {
// 	// Функции на message/complete
// 	function onMessage(msg: MessageEvent) {
// 		subscriber.next(msg);
// 	}

// 	function onClose(msg: CloseEvent) {
// 		subscriber.complete();
// 	}

// 	// add listeners message/complete
// 	ws.addEventListener('message', onMessage);
// 	ws.addEventListener('close', onClose);

// 	// onDestroy
// 	return () => {
// 		subscriber.complete();
// 		ws.removeEventListener('message', onMessage);
// 		ws.removeEventListener('close', onClose);
// 	}
// })

// allSubscriptions.add( wsStream$.subscribe({
// 	next: (msg: MessageEvent) => terminalLog(`Subscription: ${msg.data}`),
// 	complete: ()=> terminalLog('COMPLETE')
// }))

// setTimeout(()=> allSubscriptions.unsubscribe(), 5000);


// fromEvent(document, 'click').pipe(take(5)).subscribe((event: Event)=> {
// 	terminalLog(`EVENT: ${event.type}`);
// 	console.log(event)
// });

// const rand = Math.random();
// const def = defer(()=> {
// 	if (rand > 0.5) {
// 		return ["More then 0.5f"];
// 	}

// 	return ["Less then 0.5f"]
// })

// def.subscribe(terminalLog);
// def.subscribe(terminalLog);
// def.subscribe(terminalLog);
// def.subscribe(terminalLog);

// function addListener(handler: EventListener) {
//     document.addEventListener('click', handler);
//     terminalLog('LISTENER ADDED');
// }

// function removeListener(handler: EventListener) {
//     document.removeEventListener('click', handler);
//     terminalLog('LISTENER REMOVED');
// }

// fromEventPattern(addListener, removeListener).pipe(take(5)).subscribe((event: any)=> {
// 	console.log(event)
// });

// HOO

//concatMap = (map ev -> Interval) + concat

// const clicks = fromEvent(document, 'click');
// const result = clicks.pipe(
//   concatMap((ev: Event) => interval(1000).pipe(take(4)))
// );
// result.subscribe(x => terminalLog(x));

// Results in the following:
// (results are not concurrent)
// For every click on the "document" it will emit values 0 to 3 spaced
// on a 1000ms interval
// one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3

// const clicks$ = fromEvent(document, 'click');

// const higherOrder$ = clicks$.pipe(map(e=> interval(1000).pipe(take(3))));

// const firstOrder$ = higherOrder$.pipe(concatAll());
// firstOrder$.subscribe(x => terminalLog(x));

/**
 * mergeMap работает, как map -> obs, потом merge в своём коллбэке. Возвращает плоские обсерваблы
 * mergeAll вызывается в пайпе HOO и возвращает плоский обсервабл
 * 
 * concatAll - последовательно подписывается и отписывается
 * mergeAll - значения вперемешку
 * swithcAll - подписывается по очереди, но бросает предыдущий, когда эмитит следующий obs
 * exhaustAll - подписывается по очереди, но игнорирует значения следующего obs, пока текущий не закончится
 */