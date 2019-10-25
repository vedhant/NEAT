export function randInt(l, r) {
    return Math.floor(Math.random() * (r - l + 1)) + l;
}

export function rand(l, r) {
    return Math.random() * (r - l) + l;
}

export function randGaussian() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}