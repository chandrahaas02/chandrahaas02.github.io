---
title: let's create a tic-tac-bot
category: ai
date: "2021-06-09"
---
# How we play
As we all know the tic-tac-toe gmae let's discuss how we created this particular bot in python .
This bot was created using famous therom called minimax therom and all the souce code can be found in the following link

[Tic-tac-toe](https://github.com/chandrahaas02/blog/blob/main/tic.py)

## What is minimax
As the name suggest there is mini player and one maxi player ok let's try to first understand how tic-tac-toe game is played basically players try to make 3 in a row to win (column,diagonal also). The first players who do this is a winner So In this game so we play moves not only complete our game but lso to stop the other person game So basically we move in such way that we we think all possible outcomes if we play that move and play accordingly

That is basically minimax one try to decrease the possiblity of others and try increase his winning possiblity
for eg: if player 1 win we give a score 1 to the board and player2 wins we give the score -1 to the board as player 1 looses
So the player1 tries to maximize the score of the board where player2 tries to minimze the score of the board So this is called
minimax

So basically I will try think of all the possible moves of me and myopponent and then take a wise descison to make a move
Same in this case the bot tries to do same It tries all the posssible moves to do it


## Is it Dumb
Yeah for human beings we may feel it is dumb as it is literally computin all the possible moves which is not required in most of the cases
So can we make it fast yes of-course there are may methods to make it fast like one of the method is called as **alpha-beta puring**

Which basically means If I find my move which make my score the maximum possible-one then litterly I don't need to caluculate all the next possiblities as I cannot maximize it further and this the best (if I am maximizing player)So we set maximum possible -score =alpha and minimimum-possible score =beta and this basically imporve your bot performance and made easier

