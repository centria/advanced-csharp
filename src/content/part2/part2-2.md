---
title: 'More loops'
nav_order: 2
hidden: false
---

In part 1 we had a look of the basic while-true loop structure

```cpp
while (true)
{
  // Do something
}
```

This is very handy when the program has to repeat a functionality until the user provides certain input.

Next, we'll come to know a few other ways to implement loops.

## While-loop with a condition

So far we have been using a loop with the boolean "true" in its paranthesis, so the loop continues forever (or until the loop is ended with the "break" command ).

Actually the paranthesis of a loop contain a conditional expression, or a condition, just like the paranthesis of an "if statement". The true value can be replaced with an expression, which is evaluated as the program is executed. The expression is defined the same way as the condition of a conditional statement.

The following code prints the numbers 1,2,...,5. When the value of the variable number is more than 5, the while-condition evaluates to false and the execution ends.

```cpp
int number = 1;

while (number < 6)
{
  Console.WriteLine(number);
  number++;
}
```

The code above can be read "As long as the value of the variable number is less than 6, print the value of the variable number and increase the value of the variable number by one".

In the code is also a new way to increase a number's value. Above the value of the variable "number" is increased by one every time the loop body is executed.

The program prints as below.

```console
1
2
3
4
5
```

## For-loop

Above we learned how a "while-loop" with a condition can be used to go through numbers in a certain interval.

The structure of this kind of loop is the following.

```cpp
int i = 0;
while (i < 10)
{
  Console.WriteLine(i);
  i++;
}
```

The above loop can be split into three parts. First we introduce the variable i, used to count the number of times the loop has executed, and set its value to 0: **int i = 0;**. This is followed by the definition of the loop -- the loops condition is i < 10 so the loop is executed as long as the value of the variable **i is less than 10**. The loop body contains the functionality to be executed **Console.WriteLine(i);**, which is followed by increasing the value of the variable i++.

The same can be achieved with a **for-loop** like so.

```cpp
for (int i = 0; i < 10; i++)
{
  Console.WriteLine(i);
}
```

A for-loop contains four parts:

- introducing the variable for counting the number of executions;
- the condition of the loop;
- increasing (or decreasing or changing) the value of the counter variable; and
- the functionality to be executed.

```cpp
for (*introducting a variable*; *condition*; *increasing the counter*)
{
  // Functionality to be executed
}
```

Let's see this in action:

```cpp
for (int i = 0; i < 5; i++)
{
  Console.WriteLine(i);
}
```

The example above prints the numbers from zero to four. The interval can also be defined using variables -- the example below uses variables start and end to define the interval of numbers the loop goes through.

```cpp
int start = 3;
int end = 7;
for (int i = start; i < end; i++)
{
  Console.WriteLine(i);
}
```

We will continue practicing loops in the exercises. You can use either a while-loop with a condition, or a for-loop.

## On Stopping a Loop Execution

A loop does not stop executing immediately when its condition evaluates to true. A loop's condition is evaluated at the start of a loop, i.e.,

- when the next statement to be executed is a loop, and
- the execution of the loop body has finished.

Let's look at the following loop.

```cpp
int number = 1;

while (number != 2)
{
  Console.WriteLine(number);
  number = 2;
  Console.WriteLine(number);
  number = 1;
}
```

This prints

```console
1
2
1
2
... keeps on going forever
```

Even though **number equals 2 at one point**, the loop runs forever.

**The condition of a loop is evaluated when the execution of a loop starts and when the execution of the loop body has reached the closing curly bracket.** If the condition evaluates to true, execution continues from the top of the loop body. If the condition evaluates to false, execution continues from the first statement following the loop.

This also applies to for-loops. In the example below, loop execution -- when understood incorrectly -- should end when i equals 100. However, it doesn't.

```cpp
for (int i = 0; i != 100; i++)
{
  Console.WriteLine(i);
  i = 100;
  Console.WriteLine(i);
  i = 0;
}
```

The loop above never stops executing.

## Repeating Functionality

One common program type is "do something certain amount of times". What's common to all these programs is repetition. Some functionality is done repeatedly, and a counter variable is used to keep track of the repetitions.

The following program calculates the product 4\*3 somewhat clumsily, i.e., as the sum 3 + 3 + 3 + 3:

```cpp
int result = 0;

int i = 0;
while (true)
{
  result += 3; // shorthand for result = result + 3
  i++;  // shorthand for i = i + 1

  if (i == 4)
  {
      break;
  }
}

Console.WriteLine(result);
```

The same functionality can be achieved with the following code.

```cpp
int result = 0;

int i = 0;
while (i < 4)
{
  result += 3; // shorthand for result = result + 3
  i++;  // shorthand for i = i + 1
}

Console.WriteLine(result);
```

Or by using a for-loop as seen in the following.

```cpp
int result = 0;

for (int i = 0; i < 4; i++)
{
  result += 3;
}

Console.WriteLine(result);
```

The program execution using a while-loop is visualized below.

When the number of variables increases, understanding a program becomes harder. Simulating program execution can help in understanding it.

You can simulate program execution by drawing a table containing a column for each variable and condition of a program, and a separate space for program output. You then go through the source code line by line, and write down the changes to the state of the program (the values of each variable or condition), and the program output.

The values of variables **result** and **i** from the previous example have been written out onto the table below at each point the condition **i < 4** is evaluated.

| result |  i  | i < 4 |
| :----: | :-: | :---: |
|   0    |  0  | true  |
|   3    |  1  | true  |
|   9    |  3  | true  |
|   6    |  2  | true  |
|   12   |  4  | false |

## On the Structure of Programs Using Loops

In the previous examples, we have concentrated on cases where the loop is executed a predetermined number of times. The number of repetitions can be based on user input -- in these cases, the for-loop is quite handy.

In programs where the loop body has to be executed until the user gives certain input, the for-loop is not too great. In these cases, the while-true loop we practiced earlier works well.

Let's take a look at a somewhat more complex program that reads integers from the user. The program handles negative numbers as invalid, and zero stops the loop. When the user enters zero, the program prints the sum of valid numbers, the number of valid numbers and the number of invalid numbers.

A possible solution is detailed below. However, the style of the example is not ideal.

```cpp
Console.Write("Write numbers, negative numbers are invalid: ");
int sum = 0;
int validNumbers = 0;
int invalidNumbers = 0;

while (true)
{
  int input = Convert.ToInt32(Console.ReadLine());

  if (input == 0)
  {
    Console.WriteLine("Sum of valid numbers: " + sum);
    Console.WriteLine("Valid numbers: " + validNumbers);
    Console.WriteLine("Invalid numbers: " + invalidNumbers);
    break;
  }

  if (input < 0) {
      invalidNumbers++;
      continue;
  }

  sum += input;
  validNumbers++;
}
```

In the code above, the computation executed after the loop has ended has been implemented inside of the loop. This approach is not recommended as it can easily lead to very complex program structure. If something else --e.g., reading more input -- is to be done when the loop ends, it could also easily end up being placed inside of the loop. As more and more functionality is needed, the program becomes increasingly harder to read.

Let's stick to the following loop structure:

```cpp
// Create variables needed for the loop

while (true)
{
  // read input

  // end the loop --break

  // check for invalid input -- continue

  // handle valid input
}

// functionality to execute after the loop ends
```

In other words, the program structure is cleaner if the things to be done after the loop ends are placed outside of it.

```cpp
Console.Write("Write numbers, negative numbers are invalid: ");
int sum = 0;
int validNumbers = 0;
int invalidNumbers = 0;

while (true)
{
  int input = Convert.ToInt32(Console.ReadLine());

  if (input == 0) {
      break;
  }

  if (input < 0) {
      invalidNumbers++;
      continue;
  }

  sum += input;
  validNumbers++;
}

Console.WriteLine("Sum of valid numbers: " + sum);
Console.WriteLine("Valid numbers: " + validNumbers);
Console.WriteLine("Invalid numbers: " + invalidNumbers);
```

# Exercises

<Exercise title={'005 Iterating to input'}>

Write a program that reads an integer from the user. Then the program prints numbers from 0 to the number given by the user. You can assume that the user always gives a positive number. Below is some examples of the wanted functionality. 

<Note>You can use either a while-loop with a condition, or a for-loop.</Note>

```console
> 4
0
1
2
3
4
```

```console
> 1
0
1
```

</Exercise>

<Exercise title={'006 Iterating to hundred'}>

Write a program, which reads an integer from the user. Then the program prints numbers from that number to 100. You can assume that the user always gives a number less than 100. Below are some examples of the wanted functionality.

```console
> 99
99
100
```

```console
> -4
-4
-3
-2
-1
0
1
... (lots of numbers in between) ...
98
99
100
```

</Exercise>

<Note>

From now on, the exercises might be in multiple sections in the instructions, to make it easier to comprehend. In the end, you should still have only one program per exercise to return.  

Each section is counted separately, when calculating the total amount of points done. For example, the next exercise with 2 sections, counts as 2 points in the total sum you have done. 

</Note>

<Note>
When all the tests pass, you have done all the sections.
</Note>

<Exercise title={'007 Where to and from'}>

- Section 1

Write a program, which prints integers from 1 to a number given by the user.

```console
Where to? 
>3 
1 
2 
3
```

```console
Where to? 
>5 
1 
2 
3 
4 
5
```
<Note>The number read from the user is now the upper limit of the condition. Remember that a &lt;= b means a is smaller or equal to b.</Note>

- Section 2

Ask the user for the starting point as well.

```console
Where to? 
>8 
Where from? 
>5
5 
6 
7 
8
```

If the upper limit is larger than the starting point, nothing is printed:

```
Where to? 
> 12 
Where from? 
> 16
```
<Note>Remember that the lower and the upper limits can be negative!</Note>

</Exercise>

<Exercise title={'008 Numbers and calculations'}>

- Section 1

Implement a program that asks the user for numbers(the program first prints "Give numbers: ") until the user gives the number -1, When the user writes -1, the program prints "Thx! Bye!" and ends.

```console
Give numbers: 
> 5 
> 2 
> 4 
> -1 
Thx! Bye!
```

- Section 2

Extend the program so, that it prints the sum of the numbers (not including the -1) the user has written.

```console
Give numbers: 
> 5 
> 2 
> 4 
> -1 
Thx! Bye! 
Sum: 11
```

- Section 3 

Extend the program so, that it also prints the number of numbers (not including the -1) the user has written.

```console
Give numbers: 
> 5 
> 2 
> 4 
> -1 
Thx! Bye! 
Sum: 11
Numbers: 3
```

- Section 4

Extend the program so, that it prints the average of the numbers (not including the -1) the user has written.

```console
Give numbers: 
> 5 
> 2 
> 4 
> -1 
Thx! Bye! 
Sum: 11
Numbers: 3
Average: 3.666666666666
```

- Section 5

Extend the program so that it prints the number of even and odd numbers (excluding the -1).

```console
Give numbers: 
> 5 
> 2 
> 4 
> -1 
Thx! Bye! 
Sum: 11
Numbers: 3
Average: 3.666666666666
Even: 2
Odd: 1
```

</Exercise>

<Note>
When you are writing a program, whether it's an exercise or a personal project, figure out the types of parts the program needs to function and proceed by implementing them one part at a time. Make sure to test the program right after implementing each part.

Never try solving the whole problem at once, because that makes running and testing the program in the middle of the problem-solving process difficult. Start with something easy that you know you can do. When one part works, you can move on to the next.

Some of the exercises are already split into parts. However, it's often the case in programming that these parts need to be split into even smaller parts. You should almost always run the program after every new line of code. This ensures that the solution is moving in the right direction.
</Note>