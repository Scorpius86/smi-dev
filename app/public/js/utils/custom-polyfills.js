jQuery(function ($) {
    RegisterPolyfills();
});

function RegisterPolyfills() {
    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function (fun /*, inicial*/ ) {
            var longitud = this.length;
            if (typeof fun != "function")
                throw new TypeError();

            // no se devuelve ningún valor si no hay valor inicial y el array está vacío
            if (longitud == 0 && arguments.length == 1)
                throw new TypeError();

            var indice = 0;
            if (arguments.length >= 2) {
                var rv = arguments[1];
            } else {
                do {
                    if (indice in this) {
                        rv = this[indice++];
                        break;
                    }

                    // si el array no contiene valores, no existe valor inicial a devolver
                    if (++indice >= longitud)
                        throw new TypeError();
                }
                while (true);
            }

            for (; indice < longitud; indice++) {
                if (indice in this)
                    rv = fun.call(null, rv, this[indice], indice, this);
            }

            return rv;
        };
    }

    if (!Array.prototype.filter) {
        Array.prototype.filter = function (func, thisArg) {
            'use strict';
            if (!((typeof func === 'Function') && this))
                throw new TypeError();

            var len = this.length >>> 0,
                res = new Array(len), // preallocate array
                c = 0,
                i = -1;
            if (thisArg === undefined)
                while (++i !== len)
                    // checks to see if the key was set
                    if (i in this)
                        if (func(t[i], i, t))
                            res[c++] = t[i];
                        else
                            while (++i !== len)
                                // checks to see if the key was set
                                if (i in this)
                                    if (func.call(thisArg, t[i], i, t))
                                        res[c++] = t[i];

            res.length = c; // shrink down array to proper size
            return res;
        };
    }

    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function (predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return undefined.
                return undefined;
            },
            configurable: true,
            writable: true
        });
    }
}