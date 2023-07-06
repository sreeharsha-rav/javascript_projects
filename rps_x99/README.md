## Rock Paper Scissors x99
<!-- Project Description -->
Rock, Paper, Scissors x99 is an interactive web game that puts a new twist on the classic game of Rock, Paper, Scissors. In this variation, players will strategically select three moves, each consisting of a type (Rock, Paper, or Scissors) and a strength value. The objective is to outsmart your opponent by making strategic move choices and allocating strength points wisely.

<!-- Image GIF of project -->
![Rock-Paper-Scissors x99](https://github.com/sreeharsha-rav/javascript_projects/blob/main/rps_x99/gif/js_rps.gif)

### Installation and Usage
<!-- How to install and run the project? -->
Code will run in the browser instead of the terminal. To use it:
1. Make sure you are in *rps_x99* directory, after *cloning/downloading* repo to your system.
2. From the root project directory, run on terminal:
    ```bash
    npm install
    ```
    to install all necessary dependencies. (You will just need to do this once)
3. **Game Play:**
    1. *Start the game*: Launch the web game in your browser (Open **index.html**) and invite a friend or play against the computer.
    2. *Choose Your Moves*: For each of the three rounds, select your moves by specifying the type (Rock, Paper, or Scissors) and allocating strength points. You have a total of 99 strength points to distribute among your moves. Ensure that each move has a minimum strength value of 1.
    3. *Compare Moves*: After both players have made their move selections, the game will compare the moves in the order they were chosen. If the types of the moves are different, the regular Rock, Paper, Scissors rules apply (e.g., Rock beats Scissors). However, if the move types are the same, the move with higher strength points will be the winner. If both moves have equal strength points, a tie is declared for that round.
    4. *Determine the Winner*: The game consists of three rounds. After all three rounds, the player who wins the majority of the rounds will be declared the overall winner, else the game will end in draw.