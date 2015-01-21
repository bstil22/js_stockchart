// get raw data
// transform from raw format to format required for rendering (aka what highstock wants)
// render

setup = function() {
	$("#symbol").click(function() {
		var stockQuote = $("#stock").val();
		var req = $.get("https://www.quandl.com/api/v1/datasets/WIKI/" +
				stockQuote + ".json?auth_token=LnZgCF8fyVmHREMm9p3a")
			.success(function(data) {
				stockTimeSeries = []

				for (i = 0; i < data.data.length; i++) {
					stockPrice = data.data[i][4]
					date = Date.parse(data.data[i][0])
					stockTimeSeries.unshift([date, stockPrice])
				}

				renderChart(stockQuote, stockTimeSeries)
			})
			.error(function(data) {
				$("#error").html("Please enter a valid symbol.");
			})
	});
}

function renderChart(title, timeSeries) {
	// Create the chart
	$('#container').highcharts('StockChart', {
		rangeSelector: {
			selected: 1
		},
		// xAxis: {
		// 	type: "datetime", //add this line
		// },

		title: {
			text: title
		},

		series: [{
			name: title,
			data: timeSeries,
			tooltip: {
				valueDecimals: 2
			}
		}]
	})
}

setup();
