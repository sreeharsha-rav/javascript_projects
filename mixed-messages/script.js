// silly excuses data
const sillyExcuseGenerator = {
    problems: [
      "my pet unicorn",
      "my talking parrot",
      "my magic carpet",
      "my invisible friend",
      "my time machine",
      "my alien abduction",
      "my intergalactic mission",
      "my secret spy operation",
      "my teleportation experiment",
    ],
    actions: [
      "borrowed my homework",
      "ate my alarm clock",
      "stole my bicycle",
      "flew away with my keys",
      "froze my computer",
      "erased my to-do list",
      "hid my shoes",
      "challenged me to a dance-off",
      "invited me to a tea party on Mars",
    ],
    locations: [
      "in a parallel universe",
      "at the bottom of the ocean",
      "on top of Mount Everest",
      "in the Bermuda Triangle",
      "inside a giant watermelon",
      "on the moon",
      "inside a beehive",
      "inside a giant sandwich",
      "in a land of talking vegetables",
    ],
};

// function to generate random number for given input
function generateRandomNumber(num) {
    // Gets # from 0 -> num - 1
    return Math.floor(Math.random() * num)
}

// function to generate a random message
function generateMessage() {
    // store random messages
    let excuse = [];

    // Iterate over the silly excuse object data
    for(let part in sillyExcuseGenerator) {
        let optionIdx = generateRandomNumber(sillyExcuseGenerator[part].length)
    
        // use the object's properties to customize the message being added to excuse 
        switch(part) {
        case 'problems':
            excuse.push(sillyExcuseGenerator[part][optionIdx])
            break
        case 'actions':
            excuse.push(sillyExcuseGenerator[part][optionIdx])
            break
        case 'locations':
            excuse.push(sillyExcuseGenerator[part][optionIdx])
            break
        default:
            excuse.push('There is not enough info.')
        }
    }

    // final message
    return `I can't make it because ${excuse[0]} ${excuse[1]} ${excuse[2]}.`;
}

// Display the message when the button is clicked
document.getElementById('generate').addEventListener('click', function() {
    const message = generateMessage();
    document.getElementById('message').textContent = message;
});