import Rx from 'rxjs/Rx';

export default (initial) => {
    const subject = new Rx.BehaviorSubject(initial);
    let atom = subject.scan((state, action) => action(state));
    atom.modify = action => subject.next(action);
    return atom;
}