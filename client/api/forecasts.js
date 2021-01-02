module.exports = (req, res) => {
	const aDate = new Date();
	const aDateStr0 = aDate.toDateString();
	aDate.setDate(aDate.getDate() + 1);
	const aDateStr1 = aDate.toDateString();
	aDate.setDate(aDate.getDate() + 1);
	const aDateStr2 = aDate.toDateString();
    res.send([
	/*
	{"id": 0, "day": {"weather": "sunny", "rainchance": "4%", "temp_high": "59"}, "night": {"weather": "clear", "rainchance": "3%", "temp_low": "36"}},
	{"id": 1, "day": {"weather": "partly cloudy", "rainchance": "5%", "temp_high": "62"}, "night": {"weather": "clear", "rainchance": "6%", "temp_low": "38"}},
	{"id": 2, "day": {"weather": "cloudy", "rainchance": "10%", "temp_high": "68"}, "night": {"weather": "cloudy", "rainchance": "15%", "temp_low": "40"}}
	]);
	*/
	{"id": 0, date: aDateStr0, "day": {"weather": "sunny", "rainchance": "4%", "temp_extreme": "59"}, "night": {"weather": "clear", "rainchance": "3%", "temp_extreme": "36"}},
	{"id": 1, date: aDateStr1, "day": {"weather": "partly cloudy", "rainchance": "5%", "temp_extreme": "62"}, "night": {"weather": "clear", "rainchance": "6%", "temp_extreme": "38"}},
	{"id": 2, date: aDateStr2, "day": {"weather": "cloudy", "rainchance": "10%", "temp_extreme": "68"}, "night": {"weather": "cloudy", "rainchance": "15%", "temp_extreme": "40"}}
	]);	
}
