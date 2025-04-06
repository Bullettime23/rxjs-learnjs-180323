import { Observable, Subscriber, Subscription, defer, fromEvent, interval, take } from 'rxjs';
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