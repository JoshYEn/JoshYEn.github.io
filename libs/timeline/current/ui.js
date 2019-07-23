/* --- */
/* labaix.com/timeline */
/* --- */
var ui = {
    /* --- */
    phasz: function () {
        /* --- */
        var html = "",
            k = 0,
            data_csvf = "", // not used
            data_csvd = ""; // not used
        /* --- */
        html += "<div class='row'>";
        html += "<div class='col'><h4 style='margin: 0;'>Phases</h4></div>";
        // html += "<div class='col' style='text-align: right;'>&nbsp;</div>";
        html += "</div>";
        html += "<div style='width: 100%; min-height: 10px;'></div>";
        html += "<div class='row no-gutters border rounded overflow-hidden flex-md-row mt-2 shadow-sm h-md-250 position-static'>";
        html += "<table class='table table-bordered table-sm table-striped table-hover' style='margin:7px;'>";
        html += "<thead>";
        html += "<tr><th>Name</th><th>Color</th><th>Begins</th><th>Ends</th><th>Comments</th></tr>";
        html += "</thead>";
        html += "<tbody>";
        for (k = 0; k < timeline.Phases.length; k += 1) {
            html += "<tr>";
            html += "<td>" + timeline.Phases[k].Name + "</td>";
            html += "<td><span style='background: " + timeline.Phases[k].Color + ";'> &nbsp; &nbsp; &nbsp; </span></td>";
            html += "<td>" + (timeline.startYear + timeline.Phases[k].Beginning) + "</td>";
            html += "<td>" + (timeline.startYear + timeline.Phases[k].End) + "</td>";
            html += "<td>" + timeline.Phases[k].Comments + "</td>";
            html += "</tr>";
        }
        html += "</tbody>";
        html += "</table>";
        html += "</div>";
        /* --- */
        $(".cls_phasz").prepend(html);
        /* --- */
    },
    /* --- */
    tline: function () {
        /* --- */
        var html = "",
            k = 0,
            data_csvf = "",
            data_csvd = "";
        /* --- */
        html += "<h4 style='margin: 0;'>Durations</h4>";
        html += "<div style='width: 100%; min-height: 5px;'></div>";
        for (k = 0; k < timeline.Phases.length; k += 1) {
            var offst = timeline.Phases[k].Beginning - 1,
                width = timeline.Phases[k].End - timeline.Phases[k].Beginning + 1;
            offst /= timeline.Cashflows[timeline.Cashflows.length - 1][0];
            offst *= 100;
            width /= timeline.Cashflows[timeline.Cashflows.length - 1][0];
            width *= 100;
            html += "<div style='padding-top: 5px; border-top: 1px solid #eee; margin-top: 5px;'>";
            html += "<div style='width: 20%; float: left;'>" + timeline.Phases[k].Name + "</div>";
            html += "<div style='width: 80%; float: left;'>";
            html += "<div style='width: " + offst + "%; float: left; overflow: hidden;'>&nbsp;</div>";
            html += "<div style='width: " + width + "%; float: left; background: " + timeline.Phases[k].Color + "; border-radius: 5px; text-align: center;'>";
            html += "<div style='font-size: 0.75em; color: #fff; padding: 4px 2px;'>" + (width > 2.5 ? (timeline.Phases[k].End - timeline.Phases[k].Beginning + 1) : "&nbsp;") + "</div>";
            html += "</div>";
            html += "<div style='clear: both;'></div>";
            html += "</div>";
            html += "<div style='clear: both;'></div>";
            html += "</div>";
        }
        /* --- */
        $(".cls_tline").prepend(html);
        /* --- */
    },
    /* --- */
    cashf: function () {
        /* --- */
        var html = "",
            k = 0,
            data_csvf = "cashflows.csv",
            data_csvd = "\"" + timeline.Cashflows[0][0] + "\",\"" + timeline.Cashflows[0][1] + "\",\"" + timeline.Cashflows[0][2] + "\"\n";
        /* --- */
        for (k = 1; k < timeline.Cashflows.length; k += 1) {
            data_csvd += timeline.Cashflows[k][0] + "," + timeline.Cashflows[k][1] + "," + timeline.Cashflows[k][2] + "\n";
        }
        data_csvd = data_csvd.substring(0, data_csvd.length - 1);
        /* --- */
        html += "<div class='row'>";
        html += "<div class='col'><h4 style='margin: 0;'>Cashflows</h4></div>";
        html += "<div class='col' style='text-align: center;'>";
        html += "<div class='custom-control custom-switch'>";
        html += "<input type='checkbox' class='custom-control-input' id='discounted' data-stts='off'/>";
        html += "<label id='DR-label' class='custom-control-label' for='discounted' style='margin-top: 3px';>Discounted (at " + timeline.Rate + "%, <font color=" + color.gray + ">default</font>)</label>";
        html += "</div>";
        html += "</div>";
        html += "<div class='col' style='text-align: right;'><a href='#' class='cls_get_csv' data-csvf='" + data_csvf + "' data-csvd='" + data_csvd + "'>&darr; .csv</a></div>";
        html += "</div>";
        html += "<hr></hr>";

        html += "<div style='width: 100%; min-height: 10px;'></div>";

        html += "<div class='row'>";
        html += "<div class='col'></div>";
        html += "<form class='form-inline mx-sm-3 mb-2'>";
        html += "<div class='input-group'>";
        html += "<input id='VAR-DR-input' type='text' class='form-control input-sm' placeholder='Discount Rate' size='12' maxlength='5'>";
        html += "<div class='input-group-append'>";
        html += "<div class='input-group-text'>%</div>";
        html += "</div>";
        html += "</div>";
        html += "<button id='DRupdate-button' type='button' class='btn btn-info btn-xs' style='margin-left:8px'>boom</button>";
        html += "</form>";
        html += "<div class='col'></div>";
        html += "</div>";

        html += "<div style='width: 100%; min-height: 5px;'></div>";

        html += "<div align='center'>";
        html += "<span id='DR-verify'></span>";
        html += "</div>";

        html += "<div style='width: 100%; min-height: 10px;'></div>";
        /* --- */
        $(".cls_cashf").prepend(html); // JQuery: insert 'html' before ".cls_cashf"
        /* --- */
        this.uchrt();
        /* --- */
    },
    /* --- */
    uchrt: function () {
        /* --- */
        var margin = {
            top: 25,
            right: 25,
            bottom: 50,
            left: 50
        },
            width = 1200 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom,
            svg = d3.select("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
            data = timeline.Chart.Data,
            categories = timeline.Chart.Categories,
            t = d3.map(data, function (d) {
                return (d.t)
            }).keys(),
            x = d3.scaleBand().domain(t).range([0, width]).padding([0.25]),
            y = d3.scaleLinear().domain([timeline.Chart.Ymin, timeline.Chart.Ymax]).range([height, 0]),
            colrz = d3.scaleOrdinal().domain(categories).range(timeline.Chart.Colors),
            stackedData = d3.stack().keys(categories).offset(d3.stackOffsetDiverging)(data),
            mouseover = function (d) {
                var categoryName = d3.select(this.parentNode).datum().key;
                d3.selectAll(".chrtRect").style("opacity", 0.2)
                d3.selectAll("." + categoryName).style("opacity", 1)
            },
            mouseleave = function (d) {
                d3.selectAll(".chrtRect").style("opacity", 0.8)
            };
        /* --- */
        /* --- */
        svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x).tickSizeOuter(0));
        svg.append("g").call(d3.axisLeft(y));
        svg.append("g").selectAll("g").data(stackedData).enter().append("g").attr("fill", function (d) {
            return colrz(d.key);
        }).attr("class", function (d) {
            return "chrtRect " + d.key
        }).selectAll("rect").data(function (d) {
            return d;
        }).enter().append("rect").attr("x", function (d) {
            return x(d.data.t);
        }).attr("y", function (d) {
            return y(d[1]);
        }).attr("height", function (d) {
            return y(d[0]) - y(d[1]);
        }).attr("width", x.bandwidth()).attr("stroke", "grey").on("mouseover", mouseover).on("mouseleave", mouseleave);
        /* --- */
    },
    /* --- */
    vtabl: function () {
        /* --- */
        var html = "",
            k = 0,
            data_csvf = "variables.csv",
            data_csvd = "\"Name\",\"Value\",\"Comments\"\n";
        /* --- */
        for (k = 0; k < timeline.Variables.length; k += 1) {
            data_csvd += "\"" + timeline.Variables[k].Name + "\"," + timeline.Variables[k].Value + ",\"" + timeline.Variables[k].Comments + "\"\n";
        }
        data_csvd = data_csvd.substring(0, data_csvd.length - 1);
        /* --- */
        html += "<div class='row'>";
        html += "<div class='col'><h4 style='margin: 0;'>Variables</h4></div>";
        html += "<div class='col' style='text-align: right;'><a href='#' class='cls_get_csv' data-csvf='" + data_csvf + "' data-csvd='" + data_csvd + "'>&darr; .csv</a></div>";
        html += "</div>";
        html += "<div style='width: 100%; min-height: 10px;'></div>";

        html = this.drawrlttbl(html);
        /* --- */
        $(".cls_vtabl").prepend(html);
        /* --- */
    },
    /* --- */
    render: function (errorsOccurred) {
        /* --- */
        $("cls_defin, .cls_phasz, .cls_tline, .cls_vtabl").empty();
        $("svg").empty();
        /* --- */
        if (!errorsOccurred) {
            /* --- */
            if (typeof defin == 'function') {
                defin();
            }
            this.phasz();
            this.tline();
            this.cashf();
            this.vtabl();
            /* --- */
        }
        /* --- */
        console.log(errorsOccurred ? "Something went wrong" : "");
        /* --- */
    },
    /* --- */
    drawrlttbl(html) {
        var k = 0;
        html += "<div id='Var-table' class='row no-gutters border rounded overflow-hidden flex-md-row mt-2 shadow-sm h-md-250 position-relative'>";
        html += "<table class='table table-bordered table-sm table-striped table-hover' style='margin:7px;'>";
        html += "<thead>";
        html += "<tr><th>Name</th><th>Value</th><th>Comments</th></tr>";
        html += "</thead>";
        html += "<tbody>";
        for (k = 0; k < timeline.Variables.length; k += 1) {
            html += "<tr>";
            html += "<td>" + timeline.Variables[k].Name + "</td>";
            html += "<td>" + timeline.Variables[k].Value + "</td>";
            html += "<td>" + timeline.Variables[k].Comments + "</td>";
            html += "</tr>";
        }
        html += "</tbody>";
        html += "</table>";
        html += "</div>";

        return html;
    }
    /* --- */
};
/* --- */
function recalResults() {
    /* --- */
    timeline.Phases = [];
    timeline.Variables = [];
    $('#Var-table').remove();
    /* --- */
    var html = '',
        errorsOccurred = false;
    /* --- */
    try {
        projectDefinition();
    } catch (e) {
        errorsOccurred = true;
        console.log(e);
    }
    /* --- */
    html = ui.drawrlttbl(html);
    /* --- */
    $(".cls_vtabl").append(html);
}
/* --- */
jQuery(function ($) {
    /* --- */
    var errorsOccurred = false;
    /* --- */
    try {
        projectDefinition();
    } catch (e) {
        errorsOccurred = true;
        console.log(e);
    } finally {
        ui.render(errorsOccurred);
    }
    /* --- */
    $(document).on("click", ".cls_get_csv", function (e) {
        /* --- */
        e.preventDefault();
        /* --- */
        var csv = $(this).attr("data-csvd"),
            blob = new Blob([csv], {
                type: "text/csv;charset=utf-8"
            });
        saveAs(blob, $(this).attr("data-csvf"));
        /* --- */
    });
    /* --- */
    $("input[type='checkbox']").on("change", function () {
        /* --- */
        $("svg").empty();
        /* --- */
        $(this).attr("data-stts", $(this).attr("data-stts") === "on" ? "off" : "on");
        /* --- */
        timeline.discount(timeline.Rate);
        /* --- */
        if ($(this).attr("data-stts") === "on") {
            for (var k = 0; k < timeline.Chart.Data.length; k += 1) {
                var tFactor = Math.pow(1.0 + 0.01 * timeline.Rate, -1.0 * timeline.Chart.Data[k].t);
                for (var ck in timeline.Chart.Data[k]) {
                    if (timeline.Chart.Data[k].hasOwnProperty(ck)) {
                        if (ck != "t") {
                            timeline.Chart.Data[k][ck] *= tFactor;
                        }
                    }
                }
            }
        };
        /* --- */
        ui.uchrt();
        /* --- */
        timeline.discount(timeline.Rate);
        /* --- */
    });
    /* --- */
    $("#VAR-DR-input").bind('keypress', function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#DRupdate-button").click();
        }
    });
    /* --- */
    $("#DRupdate-button").click(function () {
        var result = parseFloat($('#VAR-DR-input').val());
        if (isNaN(result) || result < 0 || result > 50) {
            text = "<font style='color:" + color.gray + "';>Please re-enter discount rate (0 ~ 50)</font>";
        } else {
            text = "";
            timeline.Rate = !isNaN(result) ? result : '';
            $('#DR-label').html("Discounted (at " + timeline.Rate + "%)"); // refresh LABEL
            recalResults();
        }
        $('#DR-verify').html(text);
    });
    /* --- */
});
/* --- */