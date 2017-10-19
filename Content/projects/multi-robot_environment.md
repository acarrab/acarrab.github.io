## Research Science Internship @ DIMACS REU at Rutgers University

Feel free to download and look at my [research paper](../Resources/finalResearchPaper.pdf).

For this project, I was responsible for generating simulations for
multi-robot environments. These simulations would be used in order to
determine if there are any sharp-transitions in the behavior of
multi-robot systems when the constraints of the system changed,
specifically the locality and density of robots in the system.

Overall, I looked at three different scenarios under these constraints:
Continuous, Discrete, and Discrete with Collision avoidance. Often times
problems that have to do with a continuous amount of possibilities is
simplified to a discrete case to stop it from being able to be solved in
a reasonable amount of time, so that was why continuous with path
planning was not done.

In the end, it was determined that there were no sharp transitions in
the specific environments and scenarios that I explored. Further
research can be done to see what types of properties would lead to such
transitions, but as of now my simulations and path determination
algorithm do not create sharp transitions.

![](../Resources/ContinuousSmaller.gif)

*Continuous Case*

![](resources/DiscreteSmaller.gif)

*Discrete Case*

## Final week and a Research Paper

*Week 9*

This week, I am continuing to write my final research paper based upon
the results that were found. I would like to thank DIMACS and NSF for
the funding that I received and also for the great Summer of Research
that I had; it was an unforgettable experience.

## Final data collection

*Week 8*

This week, I am collecting more data. Also, working on writing the final
research paper and the summary of my experience in the program.


## Lack of a sharp transition

*Week 7*

This week, I worked more with locality and discovered moreso how it
affects the number of collisions overall. There were no unexpected
results however and there was also no perceiveable sharp transition. So
far it seems like I would have to increase the sophistication for the
collision avoidance to get a sharp transition.

##  Locality and disc radius

*Week 6*

This week, I worked more on data collection and exploring the solution.
I implemented the locality based on edge distance generation for
starting and ending nodes for the discs. I also collected data based on
the locality and total discs in the environment as without the locality
the results were predictable and there was no sharp transition.

## More Data and more deterministic

*Week 5*

I gathered basic data on the collision behavior, but the more random
method of determining solutions to the problem caused a few problems
with the speed of solving and thus the speed of collecting data. I
worked this week on making the process deterministic. I also collected
some more data.

## Trying out the GPU

*Week 4*

This week, I generated graphs based on how the locality of travel and
density of the discs area in a unit square affect the number of
collisions. Using plot.ly along with python, I was able to run
simulations on the number of pairwise collisions. In the system there
appeared to be no sharp transitions 


## I now have graphs

*Week 3*

 This week, I generated graphs based on how the locality of travel and
density of the discs area in a unit square affect the number of
collisions. Using plot.ly along with python, I was able to run
simulations on the number of pairwise collisions. In the system there
apeared to be no sharp transitions. 

## Onwards!

*Week 2*

 This week, I ran simulations to determine how the properties of the
system affected the interaction between the discs. The results of this
step are so far inconclusive since no sharp transition was found yet. I
set up python andpygame within visual studios and then started to work
in/learn python to create a grid for the discs to be on. This will be
useful later for creating models with pygame. 


## Start of the Program

*Week 1*

 This week I worked on putting together a presentation as well as making
some headway into gathering data on how the number of discs, the radius,
and maximum distance from starting point to ending point affect the
number of pairwise collisions that occur. I layed out a plan for what I
am going to be researching as well as getting my workspace organized and
set up for working. I met with my mentor, Jingjin Yu, and we layed out
moreso what I will be starting with.