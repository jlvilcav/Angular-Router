const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

const doSomething = () => {
  return new Promise((resolve, reject) => {
      resolve('Valor 1');
      resolve('Valor 2'); //la promesa no resuelve el valor 2
      setTimeout(() =>{
        resolve('Valor 3');
      }, 3000);
  });
}

const doSomething$ = () => {
  return Observable.create(observer => {
    observer.next('Valor 1 $');
    observer.next('Valor 2 $');
    observer.next('Valor 3 $');
    observer.next(null);
    setTimeout(() =>{
      observer.next('Valor 4 $');
    }, 5000);
    setTimeout(() =>{
      observer.next(null);
    }, 8000);
    setTimeout(() =>{
      observer.next('Valor 5 $');
    }, 10000);
  });
}

(async ()=>{
  const rta = await doSomething();
  console.log(rta);
})();

(()=>{
  const obs$ = doSomething$();
  obs$
  .pipe(
    filter(val => val !== null)
  )
  .subscribe(rta => {
    console.log(rta);
  });
})();
