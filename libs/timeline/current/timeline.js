/* --- */
/* labaix.com/timeline */
/* --- */
var timeline = {
    /* --- */
    Phases: [],
    /* --- */
    Phase: function(Name) {
        var self = this,
            O = null,
            p = 0;
        for (p = 0; p < self.Phases.length; p += 1) {
            if (self.Phases[p].Name === smartquotes(Name)) {
                O = self.Phases[p];
                break;
            }
        }
        return O;
    },
    /* --- */
    Variables: [],
    /* --- */
    Variable: function(Name) {
        var self = this,
            O = null,
            k = 0;
        for (k = 0; k < self.Variables.length; k += 1) {
            if (self.Variables[k].Name === smartquotes(Name)) {
                O = self.Variables[k];
                break;
            }
        }
        return O;
    },

    /* Added Parameters */
    startYear: null,
    Capacity: null,
    electricityPrice: null,
    pCost_total: null,
    oCost: null,

    /* --- */
    Time: 0,
    Cashflows: [],
    Rate: 5,
    NPV: 0,
    IRR: 0,
    Chart: {
        Colors: [""],
        Categories: [""],
        Data: [],
        Ymin: +1e+99,
        Ymax: -1e+99
    },
    /* --- */
    discount: function(rate) {
        /* --- */
        var self = this,
            k = 0,
            Beginning = 0,
            End = 0,
            t = 0,
            c = 0;
        /* --- */
        self.Time = 0;
        self.Cashflows = [
            ["Year", "Cashflow", "Discounted Cashflow (" + rate + "%)"]
        ];
        self.Rate = rate;
        self.NPV = 0;
        self.IRR = 0;
        self.Chart = {
            Colors: [""],
            Categories: [""],
            Data: [],
            Ymin: +1e+99,
            Ymax: -1e+99
        };
        /* --- */
        for (k = 0; k < self.Phases.length; k += 1) {
            /* --- */
            if (k === 0) {
                /* --- */
                Beginning = self.Phases[k].Beginning;
                End = self.Phases[k].End;
                /* --- */
            } else {
                /* --- */
                if (self.Phases[k].Beginning <= Beginning) {
                    Beginning = self.Phases[k].Beginning;
                }
                /* --- */
                if (self.Phases[k].End >= End) {
                    End = self.Phases[k].End;
                }
                /* --- */
            }
            /* --- */
            self.Phases[k].Value = 0;
            /* --- */
            if (!self.Chart.Colors.includes(self.Phases[k].Color)) {
                self.Chart.Colors.push(self.Phases[k].Color);
                self.Chart.Categories.push("c" + (self.Chart.Colors.length - 1));
            }
            /* --- */
        }
        /* --- */
        for (t = Beginning; t <= End; t += 1) {
            /* --- */
            var tFactor = Math.pow(1.0 + 0.01 * self.Rate, -1.0 * t),
                dataItem = {},
                j = 0,
                jColor = 0;
            /* --- */
            dataItem["t"] = t;
            /* --- */
            for (j = 1; j < self.Chart.Colors.length; j += 1) {
                dataItem["c" + j] = 0.0;
            }
            /* --- */
            c = 0;
            self.Time = t;
            /* --- */
            for (k = 0; k < self.Phases.length; k += 1) {
                /* --- */
                self.Phases[k].Time = self.Time - self.Phases[k].Beginning;
                /* --- */
                if ((self.Time >= self.Phases[k].Beginning) && (self.Time <= self.Phases[k].End)) {
                    /* --- */
                    var c_phase = self.Phases[k].Func();
                    c += c_phase;
                    self.Phases[k].Value += c_phase * tFactor;
                    /* --- */
                    jColor = 0;
                    for (j = 1; j < self.Chart.Colors.length; j += 1) {
                        if (self.Chart.Colors[j] === self.Phases[k].Color) {
                            jColor = j;
                            break;
                        }
                    }
                    if (jColor >= 1) {
                        dataItem["c" + jColor] += c_phase;
                    }
                    /* --- */
                }
                /* --- */
            }
            /* --- */
            self.Cashflows.push([t, c, c * tFactor]);
            self.NPV += c * tFactor;
            self.Chart.Data.push(dataItem);
            if (c < self.Chart.Ymin) {
                self.Chart.Ymin = c;
            }
            if (c > self.Chart.Ymax) {
                self.Chart.Ymax = c;
            }
            /* --- */
        }
        /* --- */
        self.IRR = math.irr(self.Cashflows);
        self.Chart.Colors.shift();
        self.Chart.Categories.shift();
        /* --- */
        if (self.Chart.Ymin < 0) {
            if (self.Chart.Ymax < 0) { // self.Chart.Ymin < self.Chart.Ymax < 0
                self.Chart.Ymax = 0;
            } else { // ( self.Chart.Ymin < 0 ) && ( self.Chart.Ymax > 0 )
                if (self.Chart.Ymax > Math.abs(self.Chart.Ymin)) {
                    self.Chart.Ymin = self.Chart.Ymax * -1.0;
                } else {
                    self.Chart.Ymax = Math.abs(self.Chart.Ymin);
                }
            }
        } else { // self.Chart.Ymax > self.Chart.Ymin > 0
            self.Chart.Ymin = 0;
        }
        /* --- */
    }
    /* --- */
};
/* --- */