---
title: 'Subproblems'
nav_order: 1
hidden: false
---

## Reading user input

The solution pattern for programming tasks involving reading user input is straightforward. We can use the **System.Console.ReadLine();** command for this task. In most cases, we want to use the command more than once, or use other methods from **System** as well. For this, we will have **using System** in our program structure:

```cpp
using System;

public class Program
{
  public static void Main(string[] args)
  {
    Console.ReadLine();
    // More code...
  }
}

```

In the material this basic structure is assumed to exist, and is not included in the example code.

## Calculating

We quite often need to calculate something in a program, such as an average or a sum. The solution patter to solve such problems is as follows.

- Define the inputs required for the calculation and declare variables for them. Input refers to the values used in the calculation. You can typically identify the type of inputs from the problem description.
- Identify the operation needed, and declare a variable for the result of the calculation. Perform the calculation using the inputs, and assign the result to the variable that was reserved for it. The type of the result can also usually be identified from the problem description.
- Once the calculation is done, do something with its result. This can mean printing the result of a computation, or, for example, using it in calculating an average by dividing a sum of integers by their count.

For example, the solution pattern for the problem **Create a program to calculate the sum of two integers** is the following.

```cpp
// Identifying the input values and declaring the variables for them
int first = 1;
int second = 2;

// Identifying the operation and declaring a variable for the result
int sum = first + second;

// printing the result of the calculation
Console.WriteLine("The sum of " + first + " and " + second + " is " + sum);
```

A program that both reads and calculates combines both of these patterns. One that calculates the product of two integers provided by the use looks like this:

```cpp
// Identifying the input values and declaring the variables for them
int first = 1;
int second = 2;

// Assigning the user input to the variables
first = Convert.ToInt32(Console.ReadLine());
second = Convert.ToInt32(Console.ReadLine());

// Identifying the operation and declaring a variable for the result
int product = first * second;

// Printing the result of the operation
Console.WriteLine("The product of " + first + " and " + second + " is " + product);
```

In the example above, the program has been implemented so that the variables are declared first after which values are read into them. Variable declaration and the reading of values into them can also be combined into one.

```cpp
int first = Convert.ToInt32(Console.ReadLine());
int second = Convert.ToInt32(Console.ReadLine());

int product = first * second;

Console.WriteLine("The product of " + first + " and " + second + " is " + product);

```

## Some alternative functionality

Problems often contain some alternative functionality, and in such case we use conditional statements. A Conditional statement starts with an **if** command followed by an expression in parentheses. The expression evaluates to either true or false. If it evaluates true, the following block delimited by curly brackets gets executed.

```cpp
// if the value is greater than five
if (value > 5)
{
    // then...
}
```

A program that prints "ok" if the value of the variable is greater than 42, and otherwise prints "not ok" looks like this:

```cpp
int value = 15;
if (value > 42)
{
    Console.WriteLine("ok");
}
else
{
    Console.WriteLine("not ok");
}
```

You can also chain together multiple conditions. In such a case, the problem takes the form "if a, then b; else if c, then d; else if e, then f; otherwise g". The chain consists of an if-statement followed by else if-statements each containing its own expression and a block.

```cpp
// if the value is greater than five
if (value > 5)
{
    // functionality when value is greater than five
}
else if (value < 0)
{
    // functionality when value is less than zero
    // and the value IS NOT larger than five
}
else // otherwise
{
    // functionality otherwise
}
```

Conditional functionality can be combined with other solution patterns. Let's look into a problem **"Read two integers from the user. If the sum of the integers is over 100, print too much. If the sum is less than 0, print too little. Otherwise, print ok."** The program below combines reading, calculating and conditional functionality.

```cpp
 // Declaring the variables and assigning user input to them
int first = Convert.ToInt32(Console.ReadLine());
int second = Convert.ToInt32(Console.ReadLine());

// Identifying the operation and declaring variable for the result
int sum = first + second;

// Doing something with the result. In this case
// the result is used in the conditional operations.

if (sum > 100) // if the sum is over 100
{
    Console.WriteLine("too much");
}
else if (sum < 0) // if the sum is less than 0
{
    Console.WriteLine("too little");
}
else // otherwise
{
    Console.WriteLine("ok");
}
```

**You can now do the exercises for subproblems**
