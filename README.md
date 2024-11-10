# Statistics Driven Poker Simulation Tool

Data-driven poker tool using Monte-Carlo simulation of game outcomes. 

## Idea

We modeled each game state as a binomial distribution that can be approximated through a normal distribution due to a large number of trials. We compared the player's hand to each of the opponents' hands in relation to the current board in order to determine wins, and calculated the mean and standard deviation. We sent this data to the frontend to be plotted.

## AI Model

We constructed a data-driven neural network using PyTorch in order to predict the optimal amount to raise (or whether to check/fold) for each game state. The basic concept is as follows: based on a risk tolerance factor specified by the player, (1 being very open to taking risks and 0 being very conservative) and its calculated win percentage, the network guesses how much to raise. The higher the risk tolerance factor, the less it is punished for raising a lot on a loss, but more for checking or raising very little on a win. We wanted to model this with a genetic algorithm based on the entire game state instead of just the win percentage, but with only 24 hours, this proved difficult.

## Stack

We used Python and Flask for the backend and Vite, JavaScript, and React for the frontend. There was no database involved. We hosted the frontend on Vercel and the backend on Heroku.

## Challenges

Our main challenge was computing power. Since we didn't have access to a GPU on the backend, parallelizing the simulations wasn't possible, so we had to settle for longer computing times and a smaller number of simulations.
