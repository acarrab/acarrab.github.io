# Deep learning Projects

*Last updated: Wednesday, November 8th 2017*



Right now, I am working on a handful of projects that pertain to deep learning as well as making my way through
[this book](http://www.deeplearningbook.org/). This started from long-running interest in machine learning.
After taking some of the math classes that pertain to deep learning (Linear Algebra, Discrete Mathematics, Theory of Probability, Differential Equations, and Multi-variable Calculus), I want to learn deep learning in *depth*.

## Senior Capstone Project

Currently working on a senior capstone project in which we have been entrusted 2 **NVIDIA Tesla P100 GPUs**. These are GPUs that are specifically made to tackle some of the biggest problems in Machine Learning. Our group has been working on creating the proper infrastructure that will be able to efficiently and without additional bottlenecks.

I specifically have been researching different hardware requirements for the GPUs, working on finding some good examples that showcase their powerful performance. So far, our group--through one of our clemson faculty members--is ordering components, like a server rack and other necessities.

### Goals for the project

We are working on a handful of goals, but here are the basics

1. Setting up Tesla P100 Architecture
1. Take online classes in order to learn more about deep-learning frameworks
1. Implement some projects within the system after setup
1. Benchmark the performance of the machine against other machines in the department
1. Create tutorial tailored for students in order to give them familiarity with the system
1. Create fun example in order to showcase one of many cool projects within the Computer Science Department at Clemson

## Technical Writing

(Yes even within Technical Writing)

Our class is making a showcase and giving a presentation of the new technologies of that are available through new IoT/Big Data.
Beyond that, a large aspect of the project is our groups teaming up with groups at University of Braunschweig in Germany.

Our group, on the other hand, is taking this opportunity to showcase real-time Object-Recognition and Classification using some neat libraries. (However, we have not yet decided between Tensor Flow, DIGITS, or Watson's object recognition software)

## Personal Goals

I am working on learning more of the math in order to be able to create tailored machine learning models in order to tackle real-world problems. However, I do not want to use something so cool and not really know what is going on underneath the hood.

## Deep Dream Results from code

The example code used is from the [tensorflow deep dream example](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/examples/tutorials/deepdream).

### Transitions

Creating click to apply deep dream application. The result will give users the ability to apply transitions by clicking which type of objects they would like to look for in the image. Like, what the model was trained on. Right now, I am using inception—which was trained on imagenet and therefore saw a lot of dogs—to apply deep dream to images in order to show what types of features result in activated responses within the network. This results in dogified images. Then, adding an objective we are able to use the same network in order to apply flowery base to the image.

When combinations come into play, we are able to create images that are combinations of different styles, which allows for students to have a degree of artistic freedom.
<div class="accordion">

#### Clemson Statium as seed 

<div>

![](../Resources/DeepLearning/ticket_page_FB.jpg)

</div>

##### Flowerfied 

![](../Resources/DeepLearning/flowerfied.jpeg)

##### Flowerfied and Dogified

![](../Resources/DeepLearning/flowerfiedanddogified.jpeg)

#### McAdams (Clemson School of Computing Building)

![](../Resources/DeepLearning/mcadams.jpg)

##### Dogified

![](../Resources/DeepLearning/mcadamsdogified.jpeg)

##### Dogified again

![](../Resources/DeepLearning/mcadamsdogified2.jpeg)

##### and Dogified again

![](../Resources/DeepLearning/mcadamsdogified3.jpeg)

##### Flowerfied 

![](../Resources/DeepLearning/mcadamsdogified3flowerfied.jpeg)

</div>