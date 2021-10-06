---
title: "Repetition"
nav_order: 5
hidden: false
---


We now can do simple commands, one at a time. But what if we want to do something more than once?

For example, let's make a program which asks the user for a number 7 times and sums them up.

```cpp
int sum = 0;
Console.Write("Give integer value: ");
string userInput = Convert.ToInt32(Console.ReadLine());
sum = sum + userInput;
Console.WriteLine("Sum is " + intValue);

Console.Write("Give integer value: ");
userInput = Convert.ToInt32(Console.ReadLine());
sum = sum + userInput;
Console.WriteLine("Sum is " + sum);

Console.Write("Give integer value: ");
userInput = Convert.ToInt32(Console.ReadLine());
sum = sum + userInput;
Console.WriteLine("Sum is " + sum);

Console.Write("Give integer value: ");
userInput = Convert.ToInt32(Console.ReadLine());
sum = sum + userInput;
Console.WriteLine("Sum is " + sum);

Console.Write("Give integer value: ");
userInput = Convert.ToInt32(Console.ReadLine());
sum = sum + userInput;
Console.WriteLine("Sum is " + sum);

Console.Write("Give integer value: ");
userInput = Convert.ToInt32(Console.ReadLine());
sum = sum + userInput;
Console.WriteLine("Sum is " + sum);

Console.Write("Give integer value: ");
userInput = Convert.ToInt32(Console.ReadLine());
sum = sum + userInput;
Console.WriteLine("Sum is " + sum);
``` 

This will get the job done, but as you can see, there is plenty of repetition, and many lines of code for such a simple task. What if we wanted to ask the user 10 numbers? Or 1000? We could keep copying the same lines, but that would be quite insane.

The easier and nicer way to solve this problem, is with **loops**, especially the **while-loop**, which we  peeked into a little in previous parts. 

```cpp
int sum = 0;
int readNumbers = 0;

while (true) 
{
    if (readNumbers == 7) {
        break;
    }

    Console.WriteLine("Give a number");
    sum = sum + Convert.ToInt32(Console.ReadLine());
    readNumbers = readNumbers + 1;
}
Console.WriteLine("Sum is " + sum);
```

Let's look deeper into the while loops.

## While loop, forever and ever and ever...

```cpp
while (expression)
{
    // Your code is here
    // Here can be any amount of code
}
```

For now, we shall be using the boolean value of **true** as our expression. This can lead us to a neverending loop. Once the code block has been run, the value of the expression is checked. As it is always true, it will always start running the code again.

## Ending a while loop

We did manage to create a program in the previous example, that is not looping forever. We did that with the keyword **break**. As the name suggests, it breaks the loop. More technically, it stops the current code block from running, and jumps ahead to the next code block.

Usually a break is used when the user gives a certain kind of input, or when the loop-calculation has reached a certain point, just like in our example above.

```cpp
int number = 1;

while (true) 
{
    Console.WriteLine(number);
    if (number >= 5) {
        break;
    }
    number = number + 1;
}
Console.WriteLine("All done!");
```

```console
1
2
3
4
5
All done!
```

<Note>We created our original number outside of the loop. If we would create it in the beginning, it would be recreated every time the loop starts again.</Note>

```cpp
while (true) 
{
    int number = 1;
    Console.WriteLine(number);
    if (number >= 5) {
        break;
    }
    number = number + 1;
}
Console.WriteLine("All done!");
```

```console
1
1
1
1
1
... 
(This keeps going forever)
```

You can also ask user input in a while loop. In the following example, we will ask the user if they want to continue the program.

```cpp
while (true) 
{
    Console.WriteLine("Do you want to continue?");
    string input = Console.ReadLine();
    if (input == "no") 
    {
        break;
    }
    Console.WriteLine("Let's keep going!");
}
Console.WriteLine("All done!");
```

```console
Do you want to continue?
> yes
Let's keep going!
Do you want to continue?
> totally
Let's keep going!
Do you want to continue?
> no
All done!
```

In the previous example, we asked the user for string input. Of course, other types of variable work just as well.

```cpp
while (true) 
{
    Console.WriteLine("Input an integer, 0 quits");
    int command = Convert.ToInt32(Console.ReadLine());
    if (command == 0) 
    {
        break;
    }

    Console.WriteLine("You gave " + command);
}

Console.WriteLine("All done!");
```

```console
Input an integer, 0 quits
> 5
You gave 5
Input an integer, 0 quits
> -2
You gave -2
Input an integer, 0 quits
> 0
All done!
```

## Returning to the beginning of a while loop

We return to the beginning of a while loop when all the code inside the code block has been run. It is possible to return to the beginning from other parts of code, as well. We will do that with the **continue** keyword.

In the example below, we will ask the user for positive integers. If the user gives a negative integer, we will print out a message "Not a positive integer" and return to the beginning of the loop. If the user gives a zero, the program will end.

```cpp
while (true) 
{
    Console.WriteLine("Input a positive integer, 0 quits");
    int number = Convert.ToInt32(Console.ReadLine());
    if (number == 0) 
    {
        break;
    }
    if  (number < 0)
    {
        Console.WriteLine("Not a positive integer!");
        continue;
    }

    Console.WriteLine("You gave " + number);
}

Console.WriteLine("All done!");
```

```console
Input a positive integer, 0 quits
> 12
You gave 12
Input a positive integer, 0 quits
> -2
Not a positive integer!
Input a positive integer, 0 quits
> 0
All done!
```

You might have noticed, that we used two ifs instead of if-else-if structure. Let's see our code with if-else.

```cpp
while (true) 
{
    Console.WriteLine("Input a positive integer, 0 quits");
    int number = Convert.ToInt32(Console.ReadLine());
    if (number == 0) 
    {
        break;
    }
    else if  (number < 0)
    {
        Console.WriteLine("Not a positive integer!");
        continue;
    }

    Console.WriteLine("You gave " + number);
}

Console.WriteLine("All done!");
```

The only difference in code is the **else if** instead of just if. What if we change the order inside the block?

```cpp
while (true) 
{
    Console.WriteLine("Input a positive integer, 0 quits");
    int number = Convert.ToInt32(Console.ReadLine());
    if  (number < 0)
    {
        Console.WriteLine("Not a positive integer!");
        continue;
    }
    if (number == 0) 
    {
        break;
    }
    Console.WriteLine("You gave " + number);
}

Console.WriteLine("All done!");
```

The functionality from the user's perspective is identical. Let's combine this code into if-else-structure.

```cpp
while (true) 
{
    Console.WriteLine("Input a positive integer, 0 quits");
    int number = Convert.ToInt32(Console.ReadLine());
    if  (number < 0)
    {
        Console.WriteLine("Not a positive integer!");
    }
    else if (number == 0) 
    {
        break;
    }
    else 
    {
    Console.WriteLine("You gave " + number);
    }
}

Console.WriteLine("All done!");
```

Now let's comment the newest versions of our program, to see what happens in the code.

```cpp
// Repeat until the block has been exited
while (true) 
{
    // Ask user for input
    Console.WriteLine("Input a positive integer, 0 quits");
    // Read the input
    int number = Convert.ToInt32(Console.ReadLine());
    
    // Check the user input is above zero, give "error"
    if  (number < 0)
    {
        Console.WriteLine("Not a positive integer!");
        continue;
    }
    // Check if user wants to exit the loop
    if (number == 0) 
    {
        break;
    }
    // Print the outcome
    Console.WriteLine("You gave " + number);
}

// Confirm exit with print
Console.WriteLine("All done!");
```

All the lines and inner code blocks have a simple, meaningful task to perform. What about the combined version?

```cpp
// Repeat until the block has been exited
while (true) 
{
    // Ask user for input
    Console.WriteLine("Input a positive integer, 0 quits");
    // Read the input
    int number = Convert.ToInt32(Console.ReadLine());

    // if-else-if-else
    // One code block, multiple functions...

    // Check if number is too small, give warning
    if  (number < 0)
    {
        Console.WriteLine("Not a positive integer!");
    }
    // If the number is not too small, check if the user wants to exit the loop
    else if (number == 0) 
    {
        break;
    }
    // If the number is not too small and the user does not want to exit the loop, print the outcome
    else 
    {
    Console.WriteLine("You gave " + number);
    }
}
// Confirm exit with print
Console.WriteLine("All done!");
```

As you can see, the if-else-if-else block has quite a huge task, and defining it takes few steps. When you design your programs, you should aim for simple tasks for all the code blocks.

## Calculations with while loops

While-loops are often used for calculations. For example programs, that handle undetermined amounts of user inputs, are based on while-structrure. In these kinds of programs we can gather for example statistics from given numbers or other inputs.

For a program to be able to print information after the while loop has been executed, we must store and modify data during the loop.

If the variable for data storage is introduced inside the block dedicated for the loop, the variable is accessible only inside the block, but not elsewhere. Let's demonstrate that with commented code.

```cpp
// Repeat until the block has been exited

while (true) 
{
    // Create a variable as storage for counting 1s
    int countOnes = 0;
    // Ask for integers
    Console.WriteLine("Input an integer, 0 quits");
    // Read user input
    int number = Convert.ToInt32(Console.ReadLine());
    // If the input is 0, exit the loop
    if (number == 0) 
    {
        break;
    }
    // If the input is 1, add to count
    if  (number == 1)
    {
        // Increase the value of countOnes by 1
        countOnes = countOnes + 1;
    }
}

// This cannot access the variable "countOnes",
// as it has been defined in the inner block.
// Our code does not compile.
Console.WriteLine("Amount of ones: " + countOnes);
```

All the variables are **visible** to the code block they are in. Let's modify our example, so that the printing line is inside the inner code block, and see what happens.

```cpp
// Repeat until the block has been exited

while (true) 
{
    // Create a variable as storage for counting 1s
    int countOnes = 0;
    // Ask for integers
    Console.WriteLine("Input an integer, 0 quits");
    // Read user input
    int number = Convert.ToInt32(Console.ReadLine());
    // If the input is 0, exit the loop
    if (number == 0) 
    {
        break;
    }
    // If the input is 1, add to count
    if  (number == 1)
    {
        // Increase the value of countOnes by 1
        countOnes = countOnes + 1;
    }
    // Print the amount of 1s from input
    Console.WriteLine("Amount of ones: " + countOnes);
}
```

```console
Input an integer, 0 quits
> 5
Amount of ones: 0
Input an integer, 0 quits
> 1
Amount of ones: 1
Input an integer, 0 quits
> 1
Amount of ones: 1
Input an integer, 0 quits
> 2
Amount of ones: 0
Input an integer, 0 quits
> 0
```

Now the program works, but not the way we intended. As the "storage" is created inside the loop, whenever the loop loops, the variable is created again.

If we want the program to work, we have to create the variable before the loop. The next example works as intended.

```cpp
// Create a variable as storage for counting 1s
int countOnes = 0;

// Repeat until the block has been exited
while (true) 
{

    // Ask for integers
    Console.WriteLine("Input an integer, 0 quits");
    // Read user input
    int number = Convert.ToInt32(Console.ReadLine());
    // If the input is 0, exit the loop
    if (number == 0) 
    {
        break;
    }
    // If the input is 1, add to count
    if  (number == 1)
    {
        // Increase the value of countOnes by 1
        countOnes = countOnes + 1;
    }
}

// Print the amount of 1s from input
Console.WriteLine("Amount of ones: " + countOnes);
```

```console
Input an integer, 0 quits
> 5
Input an integer, 0 quits
> 1
Input an integer, 0 quits
> 1
Input an integer, 0 quits
> -1
Input an integer, 0 quits
> 0
Amount of ones: 2
```

# Exercises

<Exercise title={'034 Continue'}>

Create a program which asks the user if they want to continue. If the user answers "no", then quit the program. Otherwise, ask again.

<Note>Use a while-loop!</Note>

```console
Do you want to continue?
> Yes
Do you want to continue?
> Hot potato
Do you want to continue?
> no
```

</Exercise>

<Exercise title={'035 Answer to life'}>

Create a program, which asks the user for integers, until the user give the number "42".

```console
Give a number:
> 41
Give a number:
> 68
Give a number:
-42
Give a number:
42
```

</Exercise>

<Exercise title={'036 Power of positivity'}>

Create a program, which asks the user for integers. If the number is zero, exit the program. If the number is negative, give the user message "That is negative". If the number is positive, output the number, raised to its second power (the number multiplied with itself).

```console
Give a number:
> 5
25
Give a number:
> -2
That is negative
Give a number:
> 4
16
Give a number:
0
```

</Exercise>

<Exercise title={'037 Counting numbers'}>

Create a program which asks the user for integers. If the integer is 0, quit. In the end, output "Total amount of numbers:" and the amount. Do not count the 0 into the amount.

```console
Give a number:
> 5
Give a number:
> -2
Give a number:
> 22
Give a number:
> 0
Total amount of numbers: 3
```

</Exercise>

<Exercise title={'038 Counting negatives'}>

Create a program which asks the user for integers. If the integer is 0, quit. In the end, output the total amount of **negative numbers** with "Total amount of negative numbers:" and the amount. Do not count the 0 into the amount.

```console
Give a number:
> 5
Give a number:
> -2
Give a number:
> 22
Give a number:
> 0
Total amount of negative numbers: 1
```

</Exercise>

<Exercise title={'039 Sum of numbers'}>

Create a program which asks the user for integers. If the integer is 0, quit. In the end, output the total **sum** of the numbers with "Total sum of numbers:" and the sum. Do not count the 0 into the sum, even though it does not change the result.

```console
Give a number:
> 5
Give a number:
> -2
Give a number:
> 22
Give a number:
> 0
Total sum of numbers: 25
```

</Exercise>

<Exercise title={'040 Amount and sum'}>

Create a program which asks the user for integers. Exit with 0. In the end, output both the amount and the sum. Do not count 0 to either.

```console
Give a number:
> 5
Give a number:
> -2
Give a number:
> 22
Give a number:
> 0
Total sum of numbers: 25
Total amount of numbers: 3
```

<Note>You will need two variables to store the data, one for the sum, one for the amount.</Note>


</Exercise>