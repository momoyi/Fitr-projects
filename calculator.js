console.log("Connected to calculator");

function numberWithCommas(x) {
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}



$(document).ready(function() {
	// Declare Global Variables
	let cpc;
	let sales;
	let winRate;
	let revenue;

	// Calculate initial values
	let worstCRate = 5;
	let moderateCRate = 10;
	let bestCRate = 15;

	let clicksWorstVal = Math.ceil(1 / (worstCRate / 100));
	let clicksModerateVal = Math.ceil(1 / (moderateCRate / 100));
	let clicksBestVal = Math.ceil(1 / (bestCRate / 100));

	let cplWorstVal = cpc ? clicksWorstVal * cpc : 0;
	let cplModerateVal = cpc ? clicksModerateVal * cpc : 0;
	let cplBestVal = cpc ? clicksBestVal * cpc : 0;

	let leadsVal = sales && winRate ? (1 / (winRate / 100)) * sales : 0;

	let cpaWorstVal =
		winRate && cplWorstVal ? (1 / (winRate / 100)) * cplWorstVal : 0;
	let cpaModerateVal =
		winRate && cplModerateVal ? (1 / (winRate / 100)) * cplModerateVal : 0;
	let cpaBestVal =
		winRate && cplBestVal ? (1 / (winRate / 100)) * cplBestVal : 0;

	let quarterlyBudgetWorstVal = sales && cpaWorstVal ? sales * cpaWorstVal : 0;
	let quarterlyBudgeteModerateVal =
		sales && cpaModerateVal ? sales * cpaModerateVal : 0;
	let quarterlyBudgetBestVal = sales && cpaBestVal ? sales * cpaBestVal : 0;

	let monthlyBudgetWorstVal = quarterlyBudgetWorstVal
		? quarterlyBudgetWorstVal / 3
		: 0;
	let monthlyBudgetModerateVal = quarterlyBudgeteModerateVal
		? quarterlyBudgeteModerateVal / 3
		: 0;
	let monthlyBudgetBestVal = quarterlyBudgetBestVal
		? quarterlyBudgetBestVal / 3
		: 0;

	let dailyBudgetWorstVal = monthlyBudgetWorstVal
		? monthlyBudgetWorstVal / 30.4
		: 0;
	let dailyBudgetBestVal = monthlyBudgetBestVal
		? monthlyBudgetBestVal / 30.4
		: 0;
	let dailyBudgetModerateVal = monthlyBudgetModerateVal
		? monthlyBudgetModerateVal / 30.4
		: 0;

	// Assign initial values
	$("#conversion-rate-worst").val("5");
	$("#conversion-rate-worst-mobile").val("5");
	$("#conversion-rate-moderate").val("10");
	$("#conversion-rate-moderate-mobile").val("10");
	$("#conversion-rate-best").val("15");
	$("#conversion-rate-best-mobile").val("15");

	$("#clicks-worst").text(clicksWorstVal);
	$("#clicks-worst-mobile").text(clicksWorstVal);
	$("#clicks-moderate").text(clicksModerateVal);
	$("#clicks-moderate-mobile").text(clicksModerateVal);
	$("#clicks-best").text(clicksBestVal);
	$("#clicks-best-mobile").text(clicksBestVal);

	$("#cpl-worst").text("$" + cplWorstVal.toString());
	$("#cpl-worst-mobile").text("$" + cplWorstVal.toString());
	$("#cpl-moderate").text("$" + cplModerateVal.toString());
	$("#cpl-moderate-mobile").text("$" + cplModerateVal.toString());
	$("#cpl-best").text("$" + cplBestVal.toString());
	$("#cpl-best-mobile").text("$" + cplBestVal.toString());

	$("#leads-required-worst").text(leadsVal);
	$("#leads-required-worst-mobile").text(leadsVal);
	$("#leads-required-moderate").text(leadsVal);
	$("#leads-required-moderate-mobile").text(leadsVal);
	$("#leads-required-best").text(leadsVal);
	$("#leads-required-best-mobile").text(leadsVal);

	$("#cpa-worst").text("$" + cpaWorstVal.toString());
	$("#cpa-worst-mobile").text("$" + cpaWorstVal.toString());
	$("#cpa-moderate").text("$" + cpaModerateVal.toString());
	$("#cpa-moderate-mobile").text("$" + cpaModerateVal.toString());
	$("#cpa-best").text("$" + cpaBestVal.toString());
	$("#cpa-best-mobile").text("$" + cpaBestVal.toString());

	$("#quarterly-budget-worst").text("$" + quarterlyBudgetWorstVal.toString());
	$("#quarterly-budget-worst-mobile").text(
		"$" + quarterlyBudgetWorstVal.toString()
	);
	$("#quarterly-budget-moderate").text(
		"$" + quarterlyBudgeteModerateVal.toString()
	);
	$("#quarterly-budget-moderate-mobile").text(
		"$" + quarterlyBudgeteModerateVal.toString()
	);
	$("#quarterly-budget-best").text("$" + quarterlyBudgetBestVal.toString());
	$("#quarterly-budget-best-mobile").text(
		"$" + quarterlyBudgetBestVal.toString()
	);

	$("#monthly-budget-worst").text("$" + monthlyBudgetWorstVal.toString());
	$("#monthly-budget-worst-mobile").text(
		"$" + monthlyBudgetWorstVal.toString()
	);
	$("#monthly-budget-moderate").text("$" + monthlyBudgetModerateVal.toString());
	$("#monthly-budget-moderate-mobile").text(
		"$" + monthlyBudgetModerateVal.toString()
	);
	$("#monthly-budget-best").text("$" + monthlyBudgetBestVal.toString());
	$("#monthly-budget-best-mobile").text("$" + monthlyBudgetBestVal.toString());

	$("#daily-budget-worst").text("$" + dailyBudgetWorstVal.toString());
	$("#daily-budget-worst-mobile").text("$" + dailyBudgetWorstVal.toString());
	$("#daily-budget-moderate").text("$" + dailyBudgetModerateVal.toString());
	$("#daily-budget-moderate-mobile").text(
		"$" + dailyBudgetModerateVal.toString()
	);
	$("#daily-budget-best").text("$" + dailyBudgetBestVal.toString());
	$("#daily-budget-best-mobile").text("$" + dailyBudgetBestVal.toString());

	// Define functions
	function reCalculateValues() {
		calculateWorst();
		calculateModerate();
		calculateBest();
	}



	function parseQueryStringAndFillForm() {
		const queryParams = new URLSearchParams(window.location.search);

		const salesGoal = parseFloat(queryParams.get('salesGoal'));
		const winRateVal = parseFloat(queryParams.get('winRate'));
		const averageCPC = parseFloat(queryParams.get('averageCPC'));
		const revenueSale = parseFloat(queryParams.get('revenueSale'));

		if (!isNaN(salesGoal)) {
			document.getElementById('sales-goal').value = salesGoal
			sales = salesGoal;
		}

		if (!isNaN(winRateVal)) {
			document.getElementById('win-rate').value = winRateVal;
			winRate = winRateVal;
		}
		if (!isNaN(averageCPC)) {
			document.getElementById('average-cpc').value = averageCPC;
			cpc = averageCPC;
		}
		if (!isNaN(revenueSale)) {
			document.getElementById('revenue-sale').value = revenueSale;
			revenue = revenueSale;
		}
	}




	// Function to check if all parameters are present in the URL
	function checkParameters() {
		var urlParams = new URLSearchParams(window.location.search);
		var paramsToCheck = ['salesGoal', 'winRate', 'averageCPC', 'revenueSale'];
		var allParamsPresent = paramsToCheck.every(function(param) {
			return urlParams.has(param);
		});

		if (allParamsPresent) {
			setTimeout(reCalculateValues, 2000);
			;
		}
	}


	// Call the function to parse the query string and fill the form when the document loads
	parseQueryStringAndFillForm();
	checkParameters();




	function calculateWorst() {
		clicksWorstVal = 1 / (worstCRate / 100);
		$("#clicks-worst").text(Math.ceil(clicksWorstVal));
		$("#clicks-worst-mobile").text(Math.ceil(clicksWorstVal));

		cplWorstVal = clicksWorstVal * cpc;
		$("#cpl-worst").text("$" + numberWithCommas(cplWorstVal.toFixed(2)));
		$("#cpl-worst-mobile").text("$" + numberWithCommas(cplWorstVal.toFixed(2)));

		leadsVal = (1 / (winRate / 100)) * sales;
		$("#leads-required-worst").text(leadsVal.toFixed(2));
		$("#leads-required-worst-mobile").text(leadsVal.toFixed(2));

		cpaWorstVal = (1 / (winRate / 100)) * cplWorstVal;
		$("#cpa-worst").text("$" + numberWithCommas(cpaWorstVal.toFixed(2)));
		$("#cpa-worst-mobile").text("$" + numberWithCommas(cpaWorstVal.toFixed(2)));

		quarterlyBudgetWorstVal = sales * cpaWorstVal;
		$("#quarterly-budget-worst").text(
			"$" + numberWithCommas(quarterlyBudgetWorstVal.toFixed(2))
		);
		$("#quarterly-budget-worst-mobile").text(
			"$" + numberWithCommas(quarterlyBudgetWorstVal.toFixed(2))
		);

		monthlyBudgetWorstVal = quarterlyBudgetWorstVal / 3;
		$("#monthly-budget-worst").text(
			"$" + numberWithCommas(monthlyBudgetWorstVal.toFixed(2))
		);
		$("#monthly-budget-worst-mobile").text(
			"$" + numberWithCommas(monthlyBudgetWorstVal.toFixed(2))
		);

		dailyBudgetWorstVal = monthlyBudgetWorstVal / 30.4;
		$("#daily-budget-worst").text(
			"$" + numberWithCommas(dailyBudgetWorstVal.toFixed(2))
		);
		$("#daily-budget-worst-mobile").text(
			"$" + numberWithCommas(dailyBudgetWorstVal.toFixed(2))
		);

		let roasWorstVal = ((sales * revenue) / monthlyBudgetWorstVal) * 100;
		$("#roas-worst").text(numberWithCommas(roasWorstVal.toFixed(2)) + "%");
		$("#roas-worst-mobile").text(
			numberWithCommas(roasWorstVal.toFixed(2)) + "%"
		);
	}

	function calculateModerate() {
		clicksModerateVal = 1 / (moderateCRate / 100);
		$("#clicks-moderate").text(Math.ceil(clicksModerateVal));
		$("#clicks-moderate-mobile").text(Math.ceil(clicksModerateVal));

		cplModerateVal = clicksModerateVal * cpc;
		$("#cpl-moderate").text("$" + numberWithCommas(cplModerateVal.toFixed(2)));
		$("#cpl-moderate-mobile").text(
			"$" + numberWithCommas(cplModerateVal.toFixed(2))
		);

		leadsVal = (1 / (winRate / 100)) * sales;
		$("#leads-required-moderate").text(leadsVal.toFixed(2));
		$("#leads-required-moderate-mobile").text(leadsVal.toFixed(2));

		cpaModerateVal = (1 / (winRate / 100)) * cplModerateVal;
		$("#cpa-moderate").text("$" + numberWithCommas(cpaModerateVal.toFixed(2)));
		$("#cpa-moderate-mobile").text(
			"$" + numberWithCommas(cpaModerateVal.toFixed(2))
		);

		quarterlyBudgetModerateVal = sales * cpaModerateVal;
		$("#quarterly-budget-moderate").text(
			"$" + numberWithCommas(quarterlyBudgetModerateVal.toFixed(2))
		);
		$("#quarterly-budget-moderate-mobile").text(
			"$" + numberWithCommas(quarterlyBudgetModerateVal.toFixed(2))
		);

		monthlyBudgetModerateVal = quarterlyBudgetModerateVal / 3;
		$("#monthly-budget-moderate").text(
			"$" + numberWithCommas(monthlyBudgetModerateVal.toFixed(2))
		);
		$("#monthly-budget-moderate-mobile").text(
			"$" + numberWithCommas(monthlyBudgetModerateVal.toFixed(2))
		);

		dailyBudgetModerateVal = monthlyBudgetModerateVal / 30.4;
		$("#daily-budget-moderate").text(
			"$" + numberWithCommas(dailyBudgetModerateVal.toFixed(2))
		);
		$("#daily-budget-moderate-mobile").text(
			"$" + numberWithCommas(dailyBudgetModerateVal.toFixed(2))
		);

		let roasModerateVal = ((sales * revenue) / monthlyBudgetModerateVal) * 100;
		$("#roas-moderate").text(
			numberWithCommas(roasModerateVal.toFixed(2) + "%")
		);
		$("#roas-moderate-mobile").text(
			numberWithCommas(roasModerateVal.toFixed(2) + "%")
		);
	}

	function calculateBest() {
		clicksBestVal = 1 / (bestCRate / 100);
		$("#clicks-best").text(Math.ceil(clicksBestVal));
		$("#clicks-best-mobile").text(Math.ceil(clicksBestVal));


		cplBestVal = clicksBestVal * cpc;
		$("#cpl-best").text("$" + numberWithCommas(cplBestVal.toFixed(2)));
		$("#cpl-best-mobile").text("$" + numberWithCommas(cplBestVal.toFixed(2)));


		leadsVal = (1 / (winRate / 100)) * sales;
		$("#leads-required-best").text(leadsVal.toFixed(2));
		$("#leads-required-best-mobile").text(leadsVal.toFixed(2));


		cpaBestVal = (1 / (winRate / 100)) * cplBestVal;
		$("#cpa-best").text("$" + numberWithCommas(cpaBestVal.toFixed(2)));
		$("#cpa-best-mobile").text("$" + numberWithCommas(cpaBestVal.toFixed(2)));


		quarterlyBudgetBestVal = sales * cpaBestVal;
		$("#quarterly-budget-best").text(
			"$" + numberWithCommas(quarterlyBudgetBestVal.toFixed(2))
		);
		$("#quarterly-budget-best-mobile").text(
			"$" + numberWithCommas(quarterlyBudgetBestVal.toFixed(2))
		);

		monthlyBudgetBestVal = quarterlyBudgetBestVal / 3;
		$("#monthly-budget-best").text(
			"$" + numberWithCommas(monthlyBudgetBestVal.toFixed(2))
		);
		$("#monthly-budget-best-mobile").text(
			"$" + numberWithCommas(monthlyBudgetBestVal.toFixed(2))
		);

		dailyBudgetBestVal = monthlyBudgetBestVal / 30.4;
		$("#daily-budget-best").text(
			"$" + numberWithCommas(dailyBudgetBestVal.toFixed(2))
		);
		$("#daily-budget-best-mobile").text(
			"$" + numberWithCommas(dailyBudgetBestVal.toFixed(2))
		);

		let roasBestVal = ((sales * revenue) / monthlyBudgetBestVal) * 100;
		$("#roas-best").text(numberWithCommas(roasBestVal.toFixed(2)) + "%");
		$("#roas-best-mobile").text(numberWithCommas(roasBestVal.toFixed(2)) + "%");
	}

	// Add event listeners
	$("#conversion-rate-worst").on("change keyup paste", function() {
		worstCRate = $(this).val() ? $(this).val() : 0;
		if (!worstCRate) {
			$("#worst-sign").css("color", "#8a8a8a");
		} else {
			$("#worst-sign").css("color", "#ffffff");
		}

		reCalculateValues();
	});

	//Adjust div width
	$("#conversion-rate-worst").on("keyup", function() {
		let currentVal = $(this).val();
		if (!currentVal) {
			$(this).css('width', '20px');
		} else {
			$(this).css('width', ((this.value.length + 1) * 9) + 'px');
		}
	});


	$("#conversion-rate-worst-mobile").on("change keyup paste", function() {
		worstCRate = $(this).val() ? $(this).val() : 0;
		if (!worstCRate) {
			$("#worst-sign-mobile").css("color", "#8a8a8a");
		} else {
			$("#worst-sign-mobile").css("color", "#ffffff");
		}
		reCalculateValues();
	});

	//Adjust div width
	$("#conversion-rate-worst-mobile").on("keyup", function() {
		let currentVal = $(this).val();
		if (!currentVal) {
			$(this).css('width', '20px');
		} else {
			$(this).css('width', ((this.value.length + 1) * 9) + 'px');
		}
	});


	$("#conversion-rate-moderate").on("change keyup paste", function() {
		moderateCRate = $(this).val() ? $(this).val() : 0;
		if (!moderateCRate) {
			$("#moderate-sign").css("color", "#8a8a8a");
		} else {
			$("#moderate-sign").css("color", "#ffffff");
		}
		reCalculateValues();
	});

	//Adjust div width
	$("#conversion-rate-moderate").on("keyup", function() {
		let currentVal = $(this).val();
		if (!currentVal) {
			$(this).css('width', '20px');
		} else {
			$(this).css('width', ((this.value.length + 1) * 9) + 'px');
		}
	});


	$("#conversion-rate-moderate-mobile").on("change keyup paste", function() {
		moderateCRate = $(this).val() ? $(this).val() : 0;
		if (!moderateCRate) {
			$("#moderate-sign-mobile").css("color", "#8a8a8a");
		} else {
			$("#moderate-sign-mobile").css("color", "#ffffff");
		}
		reCalculateValues();
	});

	//Adjust div width
	$("#conversion-rate-moderate-mobile").on("keyup", function() {
		let currentVal = $(this).val();
		if (!currentVal) {
			$(this).css('width', '20px');
		} else {
			$(this).css('width', ((this.value.length + 1) * 9) + 'px');
		}
	});


	$("#conversion-rate-best").on("change keyup paste", function() {
		bestCRate = $(this).val() ? $(this).val() : 0;
		if (!bestCRate) {
			$("#best-sign").css("color", "#8a8a8a");
		} else {
			$("#best-sign").css("color", "#ffffff");
		}
		reCalculateValues();
	});

	//Adjust div width
	$("#conversion-rate-best").on("keyup", function() {
		let currentVal = $(this).val();
		if (!currentVal) {
			$(this).css('width', '20px');
		} else {
			$(this).css('width', ((this.value.length + 1) * 9) + 'px');
		}
	});


	$("#conversion-rate-best-mobile").on("change keyup paste", function() {
		bestCRate = $(this).val() ? $(this).val() : 0;
		if (!bestCRate) {
			$("#best-sign-mobile").css("color", "#8a8a8a");
		} else {
			$("#best-sign-mobile").css("color", "#ffffff");
		}
		reCalculateValues();
	});

	//Adjust div width
	$("#conversion-rate-best-mobile").on("keyup", function() {
		let currentVal = $(this).val();
		if (!currentVal) {
			$(this).css('width', '20px');
		} else {
			$(this).css('width', ((this.value.length + 1) * 9) + 'px');
		}
	});


	$("#sales-goal").on("change keyup paste", function() {
		sales = $(this).val() ? $(this).val() : 0;
		reCalculateValues();
	});


	$("#win-rate").on("change keyup paste", function() {
		winRate = $(this).val() ? $(this).val() : 0;
		if (!winRate) {
			$("#rate-sign").css("color", "#8a8a8a");
		} else {
			$("#rate-sign").css("color", "#ffffff");
		}
		reCalculateValues();
	});

	//Adjust div width
	$("#win-rate").on("keyup", function() {
		let currentVal = $(this).val();
		if (!currentVal) {
			$(this).css('width', '20px');
		} else {
			$(this).css('width', ((this.value.length + 1) * 9) + 'px');
		}
	});


	$("#revenue-sale").on("change keyup paste", function() {
		revenue = $(this).val() ? $(this).val() : 0;
		if (!revenue) {
			$("#revenue-sign").css("color", "#8a8a8a");
		} else {
			$("#revenue-sign").css("color", "#ffffff");
		}
		reCalculateValues();
	});


	$("#average-cpc").on("change keyup paste", function() {
		cpc = $(this).val() ? $(this).val().replace("$", "") : 0;
		if (!cpc) {
			$("#cpc-sign").css("color", "#8a8a8a");
		} else {
			$("#cpc-sign").css("color", "#ffffff");
		}
		reCalculateValues();
	});


});
