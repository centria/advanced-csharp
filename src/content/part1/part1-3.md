---
title: 'Calculations'
nav_order: 3
hidden: false
---

Calculations as such should be quite familiar to you already. They are done with same operators in code, as they are in mathematics: addition with **+**, substraction with **-**, multiplication with **\*** and division with **/**. The order of calculation is also very traditional. From left to right, taking into account any brackets, and multiplication and division before addition or substraction.

```cpp
int first = 2;
Console.WriteLine(first); // prints 2
int second = 4;
Console.WriteLine(second); // prints 4

int sum = first + second; // variable "sum" is set with the value of the sum from "first" and "second"
Console.WriteLine(sum); // prints 6
```

## Calcuation order with brackets.

You can change the order of calculation with brackets, if you wish.

```cpp
int calcWithBrackets = (1 + 1) + 3 * (2 + 5);
Console.WriteLine(calcWithBrackets); // prints 23

int calcWithoutBrackets = 1 + 1 + 3 * 2 + 5;
Console.WriteLine(calcWithoutBrackets); // prints 13
```

## Statement and expression

Expression is a combination of values, that is changed into a value during a calculation or evaluation. For example,

```cpp
int calcWithoutBrackets = 1 + 1 + 3 * 2 + 5;
```

contains an expression of **1 + 1 + 3 \* 2 + 5**, which is evaluated before it is assigned to the variable. The evaluation happens always before the assignment, so the calculation is done before the value is set to the variable.

The evaluation is done in the same order of code as the rest of the code, line by line, left to right. The evaluation can also be done during a print, if the expression is used as a parameter for printing.

```cpp
int first = 42;
int second = 2;

Console.WriteLine(first + second);
// The expression "first + second" is evaluated when this line is called.
// Prints "44".
```

An expression does not change the value of a variable, unless the result of the expression is set as a value or given as a parameter to a method, such as printing.

```cpp
int first = 42;
int second = 2;

first + second;
// Does not work, as the expression is not assigned to a variable or used as a parameter.
```

## Calculations and printing

So far we have looked into basics of printing and calculations. Now let's combine them. You can print the value of a variable with **Console.WriteLine()**. If you want to concatenate the value to a string, it is done with **\*+** and having the string inside quotation marks.

```cpp
int truth = 42;

Console.WriteLine("The magic number is " + truth + ".");
```

```console
The magic number is 42.
```

In our example, we combined a string, value of our variable, and another string. Notice, that the first string ends in whitespace, so there is space between the word "is" and the value. The dot in the end does not have whitespace, so it is right next to the number.

```cpp
Console.WriteLine("The magic number is " + 42);
Console.WriteLine(42 + " is the magic number.");
```

```console
The magic number is 42.
42 is the magic number.
```

If one side of the addition is a string, the other side is also changed to a string when the program is run. In the lower situation of the next example, the integer **2** changes into a string **"2"**, and is combined with a string. In the upper case, we demonstrate again the calculation order and brackets, how they change the case.

```cpp
Console.WriteLine("Four: " + (2 + 2));
Console.WriteLine("But! Twenty-two: " + 2 + 2);
```

```console
Four: 4
But! Twenty-two: 22
```

With all this information, we can create an expression that contains text and a variable, which is evaluated during printing.

```cpp
int x = 10;

Console.WriteLine("value of x is: " + x);

int y = 5;
int z = 6;

Console.WriteLine("y is " + y + " and z is " + z);
```

```console
value of x is 10
y is 5 and z is 6
```

## Multiplication and division

So far we have only done very simple additions. Multiplication is also quite simple, as from mathematical point of view, it is just a special case of addition (well, everything is). For example, 3\*2 is the same as 2+2+2. In code, this could be something like:

```cpp
Console.WriteLine(3*2);
Console.WriteLine(2+2+2);
```

```console
6
6
```

Let's not go deeper than that into the multiplication. Division is more interesting.

When dividing in code, the type of the variables that are divided, also determines the type of the answer. For example, if you divide integers, the result will be an integer.

For the operands of integer types, the result of the **/** operator is of an integer type and equals the quotient of the two operands rounded towards zero:

```cpp
Console.WriteLine(13 / 5);    // output: 2
Console.WriteLine(-13 / 5);   // output: -2
Console.WriteLine(13 / -5);   // output: -2
Console.WriteLine(-13 / -5);  // output: 2
```

If we change one (or both) of the numbers to be double, the result will also be a double.

```cpp
Console.WriteLine(13 / 5.0);       // output: 2.6
int x = 13;
int y = 5;
Console.WriteLine((double)x / y);  // output: 2.6
```

If we would like to calculate an average of values, we could do something like

```cpp
int first = 13;
int second = 6;
int third = 42;
double average = (first + second + third) / 3.0; //divide by the amount of numbers
Console.WriteLine(average);  // prints 20.333333333333332
```

Notice, that the divider for the average is **3.0**, which is a double. Even though we declare average as a double, if all the operands are integers, the value for average would evaluate as 20.

## Common misconceptions with variables

When a computer runs source code, the code is run one command at a time, progressing exactly as the code says. When a value is set to a variable, the same event happens every time: The right side of the equals sign is copied as the value of the variable on the left. The most common misconceptions with this operation are:

- The value is moved instead of copying. For example, if source code has a statement

```cpp
first = second;
```

You might think that **second** does not have a value any more, and the value has been transferred to **first**. This is incorrect, for when the **first = second** is evaluated, the value that variable **second** refers to, is **copied** as the value for **first**.

- Seeing the variable declaration as a dependency rather than copying: With the same example

```cpp
first = second;
```

You might think, that any change into **second** affects **first** as well. That is not correct. Once the line of code has been run, there is no affection between first and second. The copying of value is done once and only once.

- Third and most common misconception is the order of copying. Often in the beginning of coding, it easy to mix up the direction on assignment. For example, you might want to write

```cpp
42 = int truth;
42 = 21;
```

Which of course do not work. To understand what is happening in the code for variables,you might want to pick up pen and paper, and write down what happens in the code, line by line. For example in this code, happens quite much:

```cpp
row 1: int first = (1 + 1);
row 2: int second = first + 3 * (2 + 5);
row 3:
row 4: first = 5;
row 5:
row 6: int third = first + second;
row 7: Console.WriteLine(first);
row 8: Console.WriteLine(second);
row 9: Console.WriteLine(third);
```

In the next console you can see what happens, row by row. The program does not of course print all that, but a console window might be easier to read thank plain text.

```console
row 1: create variable first
row 1: evaluate the calculation 1 +1 and assign the value to the variable first
row 1: the value of variable first is now 2
row 2: create variable second
row 2: calculate 2 + 5, 2 + 5 -> 7
row 2: calculate 3 * 7, 3 * 7 -> 21
row 2: calculate first + 21
row 2: copy the value of the variable first into the calculation, the value of first is 2
row 2: calculate 2 + 21, 2 + 21 -> 23
row 2: assign the value for variable second as 23
row 2: the value of variable second is now 23
row 3: (empty, do nothing)
row 4: assign the value for variable first as 5
row 4: the value of variable first is now 5
row 5: (empty, do nothing)
row 6: create variable third
row 6: calculate first + second
row 6: copy the value for variable first arvo into the calculation, the value of variable first is now 5
row 6: calculate 5 + second
row 6: copy the value for variable second arvo into the calculation, the value of variable second is now 23
row 6: calculate 5 + 23 -> 28
row 6: assign the value for variable third as 28
row 6: the value of variable third is now 28
row 7: print variable first
row 7: copy the value for variable first arvo to be printed, the value of variable first is now 5
row 7: print value 5
row 8: print variable second
row 8: copy the value for variable second arvo to be printed, the value of variable second is now 23
row 8: print value 23
row 9: print variable third
row 9: assign the value for variable third arvo to be printed, the value of variable third is now 28
row 9: print value 28
```

**You can now do the exercises for calculations with numbers**
