/* --- */
/* labaix.com/timeline */
/* --- */
function Nuclear() {/* --- */
    this.Preparation = {
        /* --- */
        PrepOrNot: false,
        Duration: 4, // Years
        pCost_total: 0, // Preparation cost in USD per installed kW
        startYear: null
        /* --- */
    };
    /* --- */
    this.Construction = {
        /* --- */
        Duration: 7, // Years
        oCost: 4600, // Overnight cost in USD per installed kW
        Capacity: 1200, // MW
        startYear: null
        /* --- */
    };
    /* --- */
    this.Operation = {
        /* --- */
        Duration: 60, // Years
        fCosts: 100000, // Fixed costs (O&M) in USD per MW per year
        vCosts: 11.5, // Variable costs (O&M + Fuel) in USD per MWh
        Availability: 85, // Average availability in %
        electricityPrice: 100 // USD per MWh
        /* --- */
    };
    /* --- */
    this.Refurbishment = {
        /* --- */
        Delay: 30, // Years after beginning of operation
        Duration: 1, // Years
        rCost: 10 // Cost relative to construction, in %
        /* --- */
    };
    /* --- */
    this.Decommissioning = {
        /* --- */
        Delay: 0, // Years after end of operation
        Duration: 10, // Years
        rCost: 15, // Cost relative to construction, in %
        eCost: null // Exact Cost of Decommissioning, in Million USD
        /* --- */
    };
    
    /* --- */
    this.calculate = function() {
        /* enable preparation stage */
        if (this.Preparation.PrepOrNot == true) {
            this.Preparation["Beginning"] = 1;
            this.Preparation["End"] = this.Preparation["Beginning"] + this.Preparation.Duration - 1;
        } else {
            this.Preparation["Beginning"] = 0;
            this.Preparation["End"] = 0;
        }

        /* calculate project duration */
        this.Construction["Beginning"] = this.Preparation["End"] + 1;
        this.Construction["End"] = this.Construction["Beginning"] + this.Construction.Duration - 1;
        this.Operation["Beginning"] = this.Construction["End"] + 1;
        this.Operation["End"] = this.Operation["Beginning"] + this.Operation.Duration - 1;
        this.Refurbishment["Beginning"] = this.Operation["Beginning"] + this.Refurbishment.Delay;
        this.Refurbishment["End"] = this.Refurbishment["Beginning"] + this.Refurbishment.Duration - 1;
        this.Decommissioning["Beginning"] = this.Operation["End"] + this.Decommissioning.Delay + 1;
        this.Decommissioning["End"] = this.Decommissioning["Beginning"] + this.Decommissioning.Duration - 1;

        /* calculate cashflow of each stage */
        this.Preparation["AnnualCashFlow"] = this.Preparation.pCost_total / this.Preparation.Duration; // Million USD;
        this.Construction["AnnualCashFlow"] = this.Construction.oCost * (1000 * this.Construction.Capacity) / 1000000.0 / this.Construction.Duration; // Million USD
        this.Refurbishment["AnnualCashFlow"] = (this.Refurbishment.rCost / 100.0) * this.Construction["AnnualCashFlow"] * this.Construction.Duration / this.Refurbishment.Duration; // Million USD
        if (this.Decommissioning.eCost === null && !isNaN(this.Decommissioning.rCost)) {
            this.Decommissioning["AnnualCashFlow"] = (this.Decommissioning.rCost / 100.0) * this.Construction["AnnualCashFlow"] * this.Construction.Duration / this.Decommissioning.Duration; // Million USD
        } else if (this.Decommissioning.rCost === null && !isNaN(this.Decommissioning.eCost)) {
            this.Decommissioning["AnnualCashFlow"] = (this.Decommissioning.eCost) / this.Decommissioning.Duration; // Million USD
        } else {
            alert("Caution: rCost and eCost are both assigned number in Decommissioning");
            this.Decommissioning["AnnualCashFlow"] = 0;
        }
        
        /* calculate cashflow of each year */
        this.Operation["AnnualOutput"] = this.Construction.Capacity * 8765.81 * (this.Operation.Availability / 100.0); // MWh (8765.8 = Number of hours per year)
        this.Operation["AnnualCashFlow"] = (this.Operation.fCosts * this.Construction.Capacity + this.Operation.vCosts * this.Operation["AnnualOutput"]) / 1000000.0; // Million USD
        /* --- */
    };
    /* --- */
};
/* --- */