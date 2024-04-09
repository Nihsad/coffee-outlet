// calculatePoints.js
// console.log(window.coffeeshops);
// const points = calculatePoints(window.coffeeshops);
// console.log(`Total points: ${points}`);

// console.log("Hello from calculatePoints.js!")
function calculatePoints(coffeeshops) {
    console.log(`Calculating points for coffeeshops: ${JSON.stringify(coffeeshops)}`);
    let totalPoints = 0;
    
    if (coffeeshops && coffeeshops.length > 0) {
        totalPoints = coffeeshops.length * 2;
    }
    console.log(`Total points: ${totalPoints}`);
    return totalPoints;
}

module.exports = calculatePoints;