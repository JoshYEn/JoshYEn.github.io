/* --- */
/* labaix.com/timeline */
/* --- */
var math = {
    /* --- */
    zerof: function(f, target, min, max) {
        /* --- */
        // f: function
        // target: = f(zerof)
        // zerof will be searched for in the interval [min, max]   
        /* --- */
        var MAXITER = 1e+9,
            PRECISION = 1e-9,
            sol = 0.0,
            mid = 0.5 * (max + min),
            dif = max - min,
            prd_low, prd_upp,
            fcn_min, fcn_mid, fcn_max,
            o_O = false,
            k;
        /* --- */
        for (k = 1; k <= MAXITER; k++) {
            fcn_min = f(min) - target;
            if (fcn_min == 0.0) {
                sol = min;
                o_O = true;
                break;
            };
            fcn_mid = f(mid) - target;
            if (fcn_mid == 0.0) {
                sol = mid;
                o_O = true;
                break;
            };
            fcn_max = f(max) - target;
            if (fcn_max == 0.0) {
                sol = max;
                o_O = true;
                break;
            };
            /* --- */
            prd_low = 1.0;
            prd_low = prd_low * fcn_min;
            prd_low = prd_low * fcn_mid;
            /* --- */
            prd_upp = 1.0;
            prd_upp = prd_upp * fcn_max;
            prd_upp = prd_upp * fcn_mid;
            /* --- */
            if (prd_low < 0) {
                max = mid;
            } else if (prd_upp < 0) {
                min = mid;
            } else {
                break;
            };
            /* --- */
            mid = 0.5 * (max + min);
            dif = max - min;
            /* --- */
            if (dif < PRECISION) {
                break;
            };
        };
        /* --- */
        if (o_O == false) {
            if (k >= MAXITER) {
                sol = null;
                // throw 'Convergence has not been reached (k >= ' + MAXITER + ')';
            } else if (dif >= PRECISION) {
                sol = null;
                // throw 'Convergence has not been reached (dif >= ' + PRECISION + ')';
            } else {
                sol = mid;
            };
        };
        /* --- */
        return sol;
        /* --- */
    },
    /* --- */
    npv: function(Rate, Cashflows) {
        /* --- */
        var self = this,
            k = 0,
            v = 0.0;
        /* --- */
        for (k = 1; k < Cashflows.length; k++) {
            v += Math.pow(1.0 + 0.01 * Rate, -1.0 * Cashflows[k][0]) * Cashflows[k][1];
        };
        /* --- */
        return v;
        /* --- */
    },
    /* --- */
    irr: function(Cashflows) {
        /* --- */
        var self = this;
        /* --- */
        function _npv_(Rate) {
            return self.npv(Rate, Cashflows);
        };
        /* --- */
        return self.zerof(_npv_, 0.0, 0.0, 100.0);
        /* --- */
    }
    /* --- */
};
/* --- */