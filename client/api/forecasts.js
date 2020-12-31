module.exports = (req, res) => {
    res.send([
	{"id": 0, "day": {"weather": "sunny", "rainchance": "4%", "temp_high": "59"}, "night": {"weather": "clear", "rainchance": "3%", "temp_low": "36"}},
	{"id": 1, "day": {"weather": "partly cloudy", "rainchance": "5%", "temp_high": "62"}, "night": {"weather": "clear", "rainchance": "6%", "temp_low": "38"}},
	{"id": 2, "day": {"weather": "cloudy", "rainchance": "10%", "temp_high": "68"}, "night": {"weather": "cloudy", "rainchance": "15%", "temp_low": "40"}}
	]);
}
