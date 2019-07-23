/* --- */
function projectDefinition() {
    /* --- */
    var Plant = new Nuclear();
    /* --- */
    Plant.Preparation.PrepOrNot = true;
    Plant.Preparation.Duration = 3; // Years
    Plant.Preparation.pCost_total = 500; // Preparation cost in million USD
    Plant.Preparation.startYear = 2016; // Starting year of preparation
    /* --- */
    Plant.Construction.Duration = 8; // Years
    Plant.Construction.Capacity = 1630; // MW
    Plant.Construction.oCost = 18.2 * Math.pow(10,9) / (Plant.Construction.Capacity * 1000) /2; // Overnight cost in USD per installed kW
    // Plant.Construction.startYear = 2019; // Starting year of construction
    /* --- */
    Plant.Operation.Duration = 60; // Years
    Plant.Operation.fCosts = 29.3 * Math.pow(10,9) / Plant.Operation.Duration / Plant.Construction.Capacity; // Fixed costs (O&M) in USD per MW **per year**
    Plant.Operation.vCosts = 0; // Variable costs (O&M + Fuel) in USD per MWh
    Plant.Operation.Availability = 91; // Average availability in %
    Plant.Operation.electricityPrice = 102.19; // currency per MWh
    /* --- */
    Plant.Decommissioning.Duration = 10; // Years
    Plant.Decommissioning.rCost = null; // Cost relative to construction, in %
    Plant.Decommissioning.eCost = 7.3 * Math.pow(10,3); // Exact total cost, in Million

    /* Transfer Variables to var Timeline */
    timeline.Capacity = Plant.Construction.Capacity;
    timeline.electricityPrice = Plant.Operation.electricityPrice;
    timeline.pCost_total = Plant.Preparation.pCost_total;
    timeline.oCost = Plant.Construction.oCost;

    /* --- */
    Plant.calculate();
    /* --- */
    var annualCashFlowFromElectricitySales = Plant.Operation.electricityPrice * Plant.Operation.AnnualOutput / 1000000.0; // // Million USD (Plant.Operation.AnnualOutput in MWh)
    /* --- */
    timeline.Phases.push(new Phase("Preparation", color.blue, "Preparation phase"));
    timeline.Phase("Preparation").Beginning = Plant.Preparation.Beginning; // Beginning of Year
    timeline.Phase("Preparation").End = Plant.Preparation.End; // End of Year
    timeline.Phase("Preparation").Func = function() {
        return -1.0 * Plant.Preparation.AnnualCashFlow; // Million USD
    };
    /* --- */
    timeline.Phases.push(new Phase("Construction", color.red, "Construction phase"));
    timeline.Phase("Construction").Beginning = Plant.Construction.Beginning; // Beginning of Year
    timeline.Phase("Construction").End = Plant.Construction.End; // End of Year
    timeline.Phase("Construction").Func = function() {
        return -1.0 * Plant.Construction.AnnualCashFlow; // Million USD
    };
    /* --- */
    timeline.Phases.push(new Phase("Operation", color.orange, "Operation phase"));
    timeline.Phase("Operation").Beginning = Plant.Operation.Beginning; // Beginning of Year
    timeline.Phase("Operation").End = Plant.Operation.End; // End of Year
    timeline.Phase("Operation").Func = function() {
        return -1.0 * Plant.Operation.AnnualCashFlow; // Million USD
    };
    /* --- */
    timeline.Phases.push(new Phase("Sales", color.green, "Sales phase"));
    timeline.Phase("Sales").Beginning = Plant.Operation.Beginning; // Beginning of Year
    timeline.Phase("Sales").End = Plant.Operation.End; // End of Year
    timeline.Phase("Sales").Func = function() {
        return +1.0 * annualCashFlowFromElectricitySales; // Million USD
    };
    /* --- */
    timeline.Phases.push(new Phase("Decommissioning", color.pink, "Decommissioning phase"));
    timeline.Phase("Decommissioning").Beginning = Plant.Decommissioning.Beginning; // Beginning of Year
    timeline.Phase("Decommissioning").End = Plant.Decommissioning.End; // End of Year
    timeline.Phase("Decommissioning").Func = function() {
        return -1.0 * Plant.Decommissioning.AnnualCashFlow; // Million USD
    };
    /* --- */
    timeline.discount(timeline.Rate);
    /* --- */
    timeline.Variables.push(new Variable("NPV", timeline.NPV, "Net present value, Million USD."));
    timeline.Variables.push(new Variable("IRR", timeline.IRR, "Internal rate of return, %."));
    /* --- */
    var vSales_objective = -1.0 * (timeline.Phase("Preparation").Value + timeline.Phase("Construction").Value + timeline.Phase("Operation").Value + timeline.Phase("Decommissioning").Value),
    // var vSales_objective = -1.0 * (timeline.Phase("Construction").Value + timeline.Phase("Operation").Value + timeline.Phase("Decommissioning").Value),
        vSales = timeline.Phase("Sales").Value,
        oSales = annualCashFlowFromElectricitySales * vSales_objective / vSales,
        LCOE = (1000000.0 * oSales) / Plant.Operation.AnnualOutput,
        SRR = (1000000.0 * oSales) / (1000.0 * Plant.Construction.Capacity),
        ATR = 100.0 * (1000000.0 * oSales) / (1000.0 * Plant.Construction.Capacity * Plant.Construction.oCost);
    timeline.Variables.push(new Variable("LCOE", LCOE, "Levelized Cost of Electricity, USD per (produced) MWh."));
    timeline.Variables.push(new Variable("SRR", SRR, "Specific Revenue Requirement, USD per Year per (installed) kW."));
    timeline.Variables.push(new Variable("ATR", ATR, "Asset Turnover Requirements, %."));
    /* --- */
    if ((Plant.Preparation.startYear == null) && (Plant.Construction.startYear == null)) {
        timeline.startYear = (new Date()).getFullYear();
    } else {
        timeline.startYear = (Plant.Construction.startYear == null) ? Plant.Preparation.startYear - 1 : Plant.Construction.startYear - 1;
    }
    /* --- */
};
/* --- */