const fs = require('fs');

// Function to calculate the minimum ticks required to move from current to expected dial number
function calculateMinTicks(current, expected) {
    let rightTicks = (expected - current + 10) % 10;
    let leftTicks = (current - expected + 10) % 10;
    return Math.min(rightTicks, leftTicks);
}

// Function to calculate the total minimum ticks for a set of dials
function calculateSetTicks(currentSet, expectedSet) {
    let totalTicks = 0;
    for (let i = 0; i < currentSet.length; i++) {
        totalTicks += calculateMinTicks(currentSet[i], expectedSet[i]);
    }
    return totalTicks;
}

// Function to calculate the final result by multiplying the results of all sets
function calculateFinalResult(sets) {
    let finalResult = 1;
    sets.forEach(set => {
        finalResult *= calculateSetTicks(set.current, set.expected);
    });
    return finalResult;
}

// Function to parse input text and convert it into sets of dials
function parseInput(inputText) {
    const lines = inputText.trim().split('\n').map(line => line.trim()).filter(line => line !== '');
    let sets = [];
    for (let i = 0; i < lines.length; i += 2) {
        const current = lines[i].split('').map(Number);  // Convert each digit to a number
        const expected = lines[i + 1].split('').map(Number);
        sets.push({ current, expected });
    }
    return sets;
}

// Read the input file asynchronously
fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Parse the input text to get sets of dials
    const sets = parseInput(data);

    // Calculate the final result
    const result = calculateFinalResult(sets);
    // console.log('test', result);
    console.log(sets,'the number is sOooo big :', result); // Final result for these sets

});