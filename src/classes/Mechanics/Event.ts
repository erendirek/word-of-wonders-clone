
// Abone olan fonksiyonlari kolayca cagirmak icin olusturulan sinif.
export class Event
{
    subscribers: Array<() => void> = [];

    emit()
    {
        this.subscribers.forEach(f => f());
    }

    subscribe(f: () => void)
    {
        this.subscribers.push(f);
    }

    unsubscribe(f: () => void)
    {
        const index = this.subscribers.indexOf(f);
        if (index == 1) return;
        this.subscribers.splice(index, 1);
    }
}

// Abone olan fonksiyonlari kolayca ve parametre ile cagirmak icin olusturulan sinif.
export class EventT<T>
{
    subscribers: Array<(arg: T) => void> = [];

    emit(val: T)
    {
        this.subscribers.forEach(f => f(val));
    }

    subscribe(f: (arg: T) => void)
    {
        this.subscribers.push(f);
    }

    unsubscribe(f: (arg: T) => void)
    {
        const index = this.subscribers.indexOf(f);
        if (index == 1) return;
        this.subscribers.splice(index, 1);
    }
}