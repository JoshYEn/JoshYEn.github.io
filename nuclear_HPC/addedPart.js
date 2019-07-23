function defin() {
    /* --- */
    var html = ""
    /* --- */
    html += "<div class='row'>";
    html += "<div class='col'><h4 style='margin: 0;'>Project Descriptions</h4></div>";
    html += "</div>";
    html += "<div style='width: 100%; min-height: 10px;'></div>";

    html += "<div class='row'>";
    html += "<div class='col-9'>";
    html += "<div class='row no-gutters border rounded overflow-hidden flex-md-row mt-2 shadow-sm h-md-250 position-static'>";
    html += "<table class='table table-bordered table-sm table-striped table-hover' style='margin:7px;'>";
    html += "<thead>";
    html += "<tr><th>Characteristic</th><th>Descriptions</th><th>Info Source</th></tr>";
    html += "</thead>";
    html += "<tbody>";

    html += "<tr>";
    html += "<td>NPP Name</td>";
    html += "<td>Hinkley Point C-1</td>";
    html += "<td></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<td>NPP Capacity</td>";
    html += "<td>" + timeline.Capacity + " MW</td>";
    html += "<td></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<td>Electricity Price</td>";
    html += "<td>£92.50/MWh (CfD price for 35y, in 2012 price)</br>\
            £" + timeline.electricityPrice + "/MWh (in 2016 price)</td>";
    html += "<td><a href='https://www.gov.uk/government/collections/hinkley-point-c'>UK Government</a></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<td>Preparation Cost</td>";
    html += "<td>£" + timeline.pCost_total + "M</td>";
    html += "<td></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<td>Construction Cost</td>";
    html += "<td>£18.2B (in 2016 price)</td>";
    html += "<td></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<td>Calculated Overnight Cost</td>";
    html += "<td>£" + timeline.oCost.toFixed(2) + "/kW</td>";
    html += "<td></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<td>Construction Start Date</td>";
    html += "<td>11 Dec, 2018 (2019)</td>";
    html += "<td><a href='https://pris.iaea.org/PRIS/CountryStatistics/ReactorDetails.aspx?current=1072'>PRIS</a></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<td>Total Decommission Cost</td>";
    html += "<td>£7.3B (in 2016 price)</td>";
    html += "<td></td>";
    html += "</tr>";

    html += "</tbody>";
    html += "</table>";
    html += "</div>";
    html += "</div>";

    html += "<div class='col-3'>";
    html += "<iframe src='http://inflation.iamkate.com/calculator/' width='264' height='200'\
            sandbox='allow-scripts allow-top-navigation' style='margin-top:8px'></iframe>";
    html += "</div>";
    html += "</div>";

    /* --- */
    $(".cls_defin").prepend(html);
}