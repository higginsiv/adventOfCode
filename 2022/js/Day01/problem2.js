module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const data = lines;

    let elfCalories = [0];
    let elfIndex = 0;
    
    data.forEach((element) => {
        if (element == '') {
            elfIndex++;
            elfCalories[elfIndex] = 0;
        } else {
            elfCalories[elfIndex] += parseInt(element);
        }
    });
    
    elfCalories.sort((a, b) => {
        return b - a;
    });
    
    const calorieTotal = elfCalories[0] + elfCalories[1] + elfCalories[2];
    return { value: calorieTotal };
}