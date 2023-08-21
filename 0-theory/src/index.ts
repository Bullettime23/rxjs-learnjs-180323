import { Observable, Subscriber, interval } from 'rxjs';
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

const sequence$ = new Observable<number>((subscriber: Subscriber<number>) => {
	console.log('CREATE');
	let count = 0;
	const intervalId = setInterval(() => {
		count += 1;
		console.log('Set interval ', count);
		if (count === 5) {
			subscriber.error('Count = 5');

			console.log('ERROR'); // subscriber.complete();
			return;
		}
		subscriber.next(count);
		console.log('NEXT');
	}, 1000);

	return () => {
		clearInterval(intervalId);
		console.log('DESTROY');
	};
});

let subscription = sequence$.subscribe({
	next: (val) => terminalLog('NEXT: ' + val),
	complete: () => terminalLog('COMPLETE'),
	error: (err) => terminalLog('ERROR ' + err),
});

setTimeout(() => subscription.unsubscribe(), 4000);

setTimeout(
	() =>
		(subscription = sequence$.subscribe({
			next: (val) => terminalLog('NEXT: ' + val),
			complete: () => terminalLog('COMPLETE'),
			error: (err) => terminalLog('ERROR ' + err),
		})),
	8000
);
