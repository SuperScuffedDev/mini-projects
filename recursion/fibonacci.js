function fib(n) {
    if (!Number.isInteger(n) || n < 0) return "NO"
    const fibonacci = [0, 1];
    if (n === 0)
        return [];
    else if (n === 1)
        return [0];
    else {
        for (i=2; i<n; i++) {
            fibonacci.push(fibonacci.at(-1) + fibonacci.at(-2));
        };
        return fibonacci;
    };
}

function fibRecurse(n) {
    const fibonacci = [];
    if (n === 0)
        return fibonacci;
    else if (n === 1)
        fibonacci.push(0);
    else {
        lastFib = fibRecurse(n-1)
        fibonacci.push(...lastFib, lastFib.at(-1) + (lastFib.at(-2) ?? 1))
    }
    return fibonacci;
}
