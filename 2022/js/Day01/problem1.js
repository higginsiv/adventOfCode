module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const data = lines;

    let elfCalories = [0];
    let elfIndex = 0;
    let calorieMax = 0;

    data.forEach((element) => {
        if (element == '') {
            if (elfCalories[elfIndex] > calorieMax) {
                calorieMax = elfCalories[elfIndex];
            }
            elfIndex++;
            elfCalories[elfIndex] = 0;
        } else {
            elfCalories[elfIndex] += parseInt(element);
        }
    });

    const answer = calorieMax;
    return { value: answer };
}
