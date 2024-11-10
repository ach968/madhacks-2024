# Statistics-Driven Poker Simulation Tool
A data-driven poker tool that utilizes Monte Carlo simulations to predict game outcomes and suggest optimal play strategies.

# Overview
This tool models poker game states as binomial distributions, approximated through normal distributions due to a high number of trials. It compares a player’s hand against opponents’ hands, factoring in the current board, to determine winning hands. The calculated mean and standard deviation for these outcomes are sent to the frontend for visualization.

# AI Model
An AI-driven neural network, built with PyTorch, predicts the optimal betting strategy for each game state—raising, checking, or folding—based on a player's specified risk tolerance. This risk factor (1 for high-risk tolerance, 0 for highly conservative play) influences the model’s approach: a higher risk tolerance encourages the network to be more lenient with aggressive bets that might result in a loss, while penalizing minimal bets on likely wins. While we considered using a genetic algorithm to evaluate game states beyond just win percentages, time constraints limited us to a simpler model.

# Tech Stack
- Backend: Python with Flask
- Frontend: JavaScript and React, built with Vite
- Hosting: Frontend on Vercel, Backend on Heroku
- Data Visualization: Dynamic plotting on the frontend, leveraging statistical outputs from the backend simulations
- Note: No database was used for this project.

# Challenges
The main hurdle was limited computing power. Without a GPU on the backend, parallelizing simulations was not feasible. We compensated by running fewer simulations, which extended processing times but allowed us to gather meaningful data within our constraints.
