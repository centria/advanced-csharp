---
title: 'Methods'
nav_order: 3
hidden: false
---

Printing to the screen has been done with the statement **Console.WriteLin()**, and reading numbers with the statement **Console.ReadLine()**. Conditional statements have used **if**, repeat statements **while** and **for**. We notice that printing and reading somewhat differ from **if**, **while**, and **for**; the printing and reading commands are followed by parentheses, and sometimes there also are parameters given to the command between the parentheses. These statements "ending with parentheses" are strictly speaking not commands, but rather methods.

Technically speaking, **a method** is a named set of statements - a part of the program that can be called from elsewhere in the program code by using the method's name. For instance the line of code

```cpp
Console.WriteLine("I am a parameter given to a method!");
```

calls a methods that handles printing to the screen. The internal implementation of the method -- i.e. the set of statements to be executed -- is hidden, and the programmer need not concern themselves with it when using the method.

Thus far all the methods we have used have been pre-made C# methods. Next we will learn to create our own methods.

## Own methods

A method means a named set consisting of statements that can be called from elsewhere in the program code by its name. Programming languages offer pre-made methods, but programmers can also write their own ones. It would in fact be quite exceptional if a program used no methods written by the programmer, because methods help in structuring the program. From this point onward nearly every program on the course will therefore contain custom-created methods.

In the code boilerplate, methods are written outside of the curly braces of the Main, yet inside out the outermost curly braces. They can be located above or below the Main.

```cpp
using System;

public class Program
{
  public static void Main(string[] args)
  {
      // Add your statements here
  }

  // Your own methods are here
}
```

Let's observe how to create a new method. We'll create the method **greet**.

```cpp
public static void Greet()
{
  Console.WriteLine("Greetings from the method world!");
}
```

And then we'll insert it into a suitable place for a method.

```cpp
using System;

public class Program
{
    public static void Main(string[] args)
    {
        // Add your statements here
    }

    // Your own methods are here
    public static void Greet()
    {
      Console.WriteLine("Greetings from the method world!");
    }
}
```

The definition of the method consists of two parts. The first line of the definition includes the name of the method, i.e. **greet**. On the left side of the name are the keywords **public static void**. Beneath the row containing the name of the method is a code block surrounded by curly brackets, inside of which is the code of the method - the commands that are executed when it is called. The only thing our method greet does is write a line of text on the screen.

Calling a custom method is simple: write the name of the methods followed by a set of parentheses and the semicolon. In the following snippet the Main program (Main) calls the greet method four times in total.

```cpp
using System;

public class Program
{
  public static void Main(string[] args)
  {
    // Add your statements here
    Console.WriteLine("Let's try if we can travel to the method world:");
    Greet();

    Console.WriteLine("Looks like we can, let's try again:");
    Greet();
    Greet();
    Greet();
  }

  // Your own methods are here
  public static void Greet()
  {
    Console.WriteLine("Greetings from the method world!");
  }
}
```

The execution of the program produces the following output:

```console
Let's try if we can travel to the method world: Greetings from the method world!
Looks like we can, let's try again:
Greetings from the method world!
Greetings from the method world!
Greetings from the method world!
```

The order of execution is worth noticing. The execution of the program happens by executing the lines of the Main method (**Main**) in order from top to bottom, one at a time. When the encountered statement is a method call, the execution of the program moves inside the method in question. The statements of the method are executed one at a time from top to bottom. After this the execution returns to the place where the method call occured, and then proceeds to the next statement in the program.

Strictly speaking the Main program (**Main**) itself is a method. When the program starts, the operating system calls Main. The Main method is the starting point for the program, since the execution begins from its first row. The execution of a program ends at the end of the Main method.

## On the naming of methods

We discussed variable naming in the previous part. There are conventions for method naming, as well. For methods, we use **PascalCase**. It is very similar to the camelCase used for variables. The major difference is that with PascalCase **method names Start with a Capital Letter**.

In the code example below the method is poorly named. It begins with a lower-case letter and the words are separated by \_ characters. The parentheses after the method name have a space between and indentation in the code block is incorrect.

```cpp
public static void this_method_says_woof ( ) {
Console.WriteLine("woof");
}
```

In contrast the method below is correctly named: The name begins with an upper-case letter and the words are joined together with the PascalCase style, meaning that each word begins with an upper-case letter. The parentheses sit next to one another and the contents are correctly indented (the method has its own code block, so the indentation of the code is four characters).

```cpp
public static void ThisMethodSaysWoof()
{
  Console.WriteLine("woof");
}
```

## Method parameters

**Parameters** are values given to a method that can be used in its execution. The parameters of a method are defined on the uppermost row of the method within the parentheses following its name. The values of the parameters that the method can use are copied from the values given to the method when it is executed.

In the following example a parameterized method **Greet** is defined. It has an int type parameter called **numOfTimes**.

```cpp
public static void Greet(int numOfTimes)
{
    int i = 0;
    while (i < numOfTimes)
    {
      Console.WriteLine("Greetings!");
      i++;
    }
}
```

We will call the method greet with different values. The parameter **numOfTimes** is assigned the value **1** on the first call, and **3** on the second.

```cpp
  public static void Main(string[] args)
  {
    Greet(1);
    Console.WriteLine("");
    Greet(3);
  }
```

```console
Greetings!

Greetings!
Greetings!
Greetings!
```

Just like when calling the predefined method **Console.WriteLine()**, you can pass an expression as a paratmeter.

```cpp
  public static void Main(string[] args)
  {
    Greet(1 + 2);
  }
```

```console
Greetings!
Greetings!
Greetings!
```

If an expression is used as a parameter for a method, that expression is evaluated prior to the method call. Above, the expression **evaluates to 3** and the final method call is of the form Greet(3);.

## Multiple parameters

A method can be defined with multiple parameters. When calling such a method, the parameters are passed in the same order.

```cpp
public static void Sum(int first, int second)
{
  Console.WriteLine("The sum of numbers " + first + " and " + second + " is " + (first + second));
}
```

```cpp
Sum(3, 5);

int number1 = 2;
int number2 = 4;

Sum(number1, number2);
```

```console
The sum of numbers 3 and 5 is 8
The sum of numbers 2 and 4 is 6
```

## The values of the parameters are copied in the method call

When calling a method **the values of the parameters are copied**. In practice this means that both the Main method and the method to be called can use similarly named variables, but changing the value of the parameter inside the method does not affect the value of the variable with the same name in the Main method. Let's examine this behavior with the following program.

```cpp
public class Example {
  public static void Main(string[] args)
  {
      int min = 5;
      int max = 10;

      PrintNumbers(min, max);
      Console.WriteLine();

      min = 8;

      PrintNumbers(min, max);
  }

  public static void PrintNumbers(int min, int max)
  {
      while (min < max) {
          Console.WriteLine(min);
          min++;
      }
  }
}
```

The output of the program is:

```console
5
6
7
8
9

8
9
```

Changing the values of the variables in the method PrintNumbers does not affect the values in the Main method, even though they have the same exact names.

So even if they had the same exact name, method parameters are distinct from the variables (or parameters) of different methods. When during a method call a variable is passed to a method, the value of that variable is copied to be used as the value of the parameter variable that is declared in the method definition. These two variables in different methods are different from each other.

As a further demonstration, let's consider the following example. We define a variable called **number** in the Main method. That variable is passed as a parameter to the method **IncrementByThree**.

```cpp
// Main program
public static void Main(String[] args)
{
  int number = 1;
  Console.WriteLine("The value of the variable 'number' in the Main program: " + number);
  IncrementByThree(number);
  Console.WriteLine("The value of the variable 'number' in the Main program: " + number);
}

// method
public static void IncrementByThree(int number)
{
  Console.WriteLine("The value of the method parameter 'number': " + number);
  number = number + 3;
  Console.WriteLine("The value of the method parameter 'number': " + number);
}
```

The execution of the program produces the following output.

```console
The value of the variable 'number' in the Main program: 1
The value of the method parameter 'number': 1
The value of the method parameter 'number': 4
The value of the variable 'number' in the Main program: 1
```

Incrementing the variable **number** inside the method poses no problem. This does not cause changes in the variable **number** inside the Main program. This latter number residing in the Main is different from the one in the method.

The parameter **numbe** ris copied for the method to use -- in other words, a new variable called **number** is created for the **incrementByThree** method, and the value of the variable number in the Main program is copied as its value when the method is called. The variable **number** inside the method **incrementByThree** exists only for the duration of the method execution, and it has no relation to the similarly named variable in the Main program.

## Methods can return values

The definition of a method indicates whether that method returns a value. If it does, the method definition is to express to type of the return value. Otherwise the keyword **void** is used in the definition. The methods we've created thus far have been defined with the keyword **void** so they have returned no values.

```cpp
public static **void** IncrementByThree()
{
  ...
}
```

The keyword **void** indicates that the method returns nothing. If we want the method to return a value, the keyword must be replaced with the type of the return variable. In the following example there is a method called **AlwaysReturnsTen** which returns an integer-type (**int**) variable (in this case the value 10).

In concrete terms, returning the value happens with the command **return** followed by the value to be returned (or the name of the variable whose value is to be returned).

```cpp
public static int AlwaysReturnsTen()
{
  return 10;
}
```

The method defined above returns an **int** type value **10** when it is called. The return value must be stored if it is to be used. This is done the same way as normal assignment of a variable value -- with the equality sign.

```cpp
public static void Main(String[] args)
{
  int number = AlwaysReturnsTen();

  Console.WriteLine("the method returned the number " + number);
}
```

The return value of the method is placed in an **int** type variable as any other int value. The return value can also used as a part of any expression.

```cpp
double number = 4 * AlwaysReturnsTen() + (alwaysReturnsTen() / 2.0) - 8;

Console.WriteLine("the result of the calculation " + number);
```

All the variable types seen so far can be returned from a method.

| Type of return value                    | Example                                      |
| --------------------------------------- | -------------------------------------------- |
| Method returns nothing                  | public static void ReturnsNothing()          |
| Method returns **int** type variable    | public static int ReturnsInt()               |
| Method returns **double** type variable | public static int ReturnsDouble()            |
| Method returns **bool** type variable   | public static bool ReturnsBool()             |
| Method returns **varible type**         | public static "variable type" NameOfMethod() |

The lines of source code following the command **return** are never executed. Should the programmer add source code in a place after the return command, always unreachable in the execution of the method, the IDE will produce an error message.

From the point of view of an IDE the a method like the following is faulty.

```cpp
public static int FaultyMethod()
{
  return 10;
  Console.WriteLine("I claim to return an integer, but I won't.");
}
```

The next method works since it is possible to reach every statement in it -- even though there is source code below the return command.

```cpp
public static int FunctioningMethod(int parameter)
{
  if (parameter > 10) {
      return 10;
  }
  Console.WriteLine("The number received as parameter is ten or lesser.");

  return parameter;
}
```

If the method is of the form **public static void NameOfMethod()** it is possible to return from it -- in other words to stop its execution in that place -- by using the command return without following it by any value. For instance:

```cpp
public static void PrintEmptyLines(int parameter)
{
  if (parameter > 10)
  {
    return;
  }
  for (int i = 0; i < parameter; i++)
    Console.WriteLine("");
}
```

This would print up to 10 empty lines. If the **parameter** is more than 10, the method will return and not print any lines. It might not be the best of examples, but shows the idea...

## Defining variables inside methods

Defining variables inside methods is done in the same manner as in the "Main program". The method that follows calculates the average of the numbers it receives as parameters. Variables **sum** and **avg** are used to help in the calculation.

```cpp
public static double Average(int number1, int number2, int number3)
{
  int sum = number1 + number2 + number3;
  double avg = sum / 3.0;

  return avg;
}
```

One way to call the method is the following:

```cpp
public static void Main(String[] args)
{
  Console.Write("Enter the first number: ");
  int first = Convert.ToInt32(Console.WriteLine());

  Console.Write("Enter the second number: ");
  int second = Convert.ToInt32(Console.WriteLine());

  Console.Write("Enter the third number: ");
  int third = Convert.ToInt32(Console.WriteLine());

  double averageResult = Average(first, second, third);

  Console.Write("The average of the numbers: " + averageResult);
}
```

Variables defined in a method are only visible inside that method. In the example above, this means that the variables **sum** and **avg** defined inside the method **average** are not visible in the Main program. A typical mistake for a learning programmer is to try and use a method in the following way.

```cpp
public static void Main(String[] args)
{
  int first = 3;
  int second = 8;
  int third = 4;

  Average(first, second, third);

  // trying to use a method's internal variable, DOES NOT WORK!
  Console.Write("The average of the numbers: " + avg);
}
```

Above the programmer tries to use the variable **avg** that is defined **inside the method average**, and then print its value. However, the variable **avg only exists inside the method average**, and it cannot be accessed from outside it.

The following mistakes are also commonplace.

```cpp
public static void Main(String[] args)
{
  int first = 3;
  int second = 8;
  int third = 4;

  // trying to use the method name only, DOES NOT WORK!
  Console.Write("The average of the numbers: " + Average);
}
```

In the example above there is an attempt to use the name of the method **average** as if it were a variable. A method has to be called, however.

In addition to placing the result of the method into a help variable, another working solution is to execute the method call directly inside the print statement:

```cpp
public static void Main(String[] args)
{
  int first = 3;
  int second = 8;
  int third = 4;

  // calling the method inside the print statement, DOES WORK!
  Console.Write("The average of the numbers: " + average(first, second, third));
}
```

Here the method call occurs first and it returns the value 5.0. After this that value is printed with the help of the print statement.

## Calculating the return value inside a method

The value to be returned need not be fully pre-defined - it can also be calculated. The return command that returns a value from the method can also be given an expression that is evaluated before the returning.

In the following example we'll define the method sum that adds together the values of two variables and returns the sum. The values of the variables that are summed are received as method parameters.

```cpp
public static int Sum(int first, int second)
{
  return first + second;
}
```

When the execution of the method reaches the statement **return first + second;**, the expression **first + second** is evaluated, and later its value will be returned.

The method is called in the following manner. Below the numbers 2 and 7 are added together with the method **Sum**. The return value produces by the method call is placed into the variable **sumOfNumbers**.

```cpp
int sumOfNumbers = Sum(2, 7);
// sumOfNumbers is now 9
```

Let's expand the previous example so that the numbers are entered by the user:

```cpp
public static void Main(String[] args)
{
  Console.Write("Enter the first number: ");
  int first = Convert.ToInt32(Console.ReadLine());

  Console.Write("Enter the second number: ");
  int second = Convert.ToInt32(Console.ReadLine());

  Console.Write("The combined sum of the numbers is: " + Sum(first, second));
}

public static int Sum(int first, int second)
{
  return first + second;
}
```

In the example above the return value of the method is not stored in a variable, but rather is directly used as part of the print.

The values passed to a method are copied to its paremeters. Due to this the names of the parameters and the names of the variables defined on the side of the caller really have nothing to do with each other. In the previous example both the variables of the Main program and the method parameters were named similarly (**first** and **second**) "by accident". The code below will function in exactly the same manner even though the variables are named differently:

```cpp
public static void Main(String[] args)
{
  Console.Write("Enter the first number: ");
  int number1 = Convert.ToInt32(Console.ReadLine());

  Console.Write("Enter the second number: ");
  int number2 = Convert.ToInt32(Console.ReadLine());

  Console.Write("The combined sum of the numbers is: " + Sum(number1, number2));
}

public static int Sum(int first, int second)
{
  return first + second;
}
```

Now the value of the variable **number1** is copied as the value of the method parameter **first**, and the value of the variable **number2** copied as the value of the parameter **second**.

## Execution of method calls and the call stack

How does the computer remember where to return after the execution of a method?

The execution environment of C# source code keeps track of the method being executed in the call stack. The call stack contains frames, each of which includes information about a specific method: its internal variables and their values. When a method is called, a new frame containing its variables is created in the call stack. When the execution of a method ends, the frame relating to that method is removed from the call stack, which leads to execution resuming at the previous method of the stack.

When a method is called, the execution of the calling method await the execution of the called method. This can be visualized with the call stack. The call stack refers to the stack formed by the method calls -- the method that is currently being executed is always on the top of the stack, and on ending the execution of a method execution is resumed in the method that is next on the stack. Let's examine the following program:

```cpp
public static void Main(String[] args)
{
  Console.WriteLine("Hello world!");
  PrintNumber();
  Console.WriteLine("Bye bye world!");
}

public static void PrintNumber() {
  Console.WriteLine("Number");
}
```

The execution begins from the first line of the method **Main** when the program is started. The text "Hello world!" is printed with the command on this line. The call stack of the program looks like this:

```console
Main
```

Once the print command has been executed, the next line that calls the method **PrintNumber** is in turn. Calling that method moves the execution of the program to the beginning of the method PrintNumber. Meanwhile the Main method will wait until the execution of the method PrintNumber ends. While inside the method PrintNumber the call stack looks like this:

```console
PrintNumber
Main
```

Once the method PrintNumber completes, we return to the method that is immediately below the method PrintNumber in the call stack -- in this case the method Main. PrintNumber is removed from the call stack, and the execution continues on the line after the PrintNumber method call in the Main method. The state of the call stack is now the following:

```console
Main
```

## Call stack and method parameters

Let's examine the call stack in a situation where there are parameters defined for the method.

```cpp
public static void Main(String[] args)
{
  int beginning = 1;
  int end = 5;

  PrintStarts(beginning, end);
}

public static void PrintStars(int beginning, int end) {
  while (beginning < end) {
      Console.Write("*");
      beginning++; // equal to beginning = beginning + 1
  }
}
```

The execution of the program begins on the first line of the **Main** method. The next two lines create the variables beginning and end and place values to them. The state of the program prior to calling the method PrintStars:

```console
Main beginning = 1 end = 5
```

When **PrintStars** is called, the Main method enters waiting state. The method call causes new variables beginning and end to be created for the method PrintStars; the values passed as parameters are assigned to them. These values are copied from the variables beginning and end of the Main method. The state of the program on the first line of the execution of the method PrintStars is illustrated below.

```console
PrintStars beginning = 1 end = 5
Main beginning = 1 end = 5
```

When the command beginning++ is executed within the repeat statement, the value of the variable beginning that belongs to the method currently being executed is altered.

```console
PrintStars beginning = 2 end = 5
Main beginning = 1 end = 5
```

So the values of the variables in the method Main remain unchanged. The execution of the method printStart would continue for some time after this. When the execution of that method ends, the execution resumes inside the Main method.

```console
Main beginning = 1 end = 5
```

## Call stack and returning a value from a method

Let's next study an example where the method returns a value. The **Main** method of the program calls a separate **Start** method, inside of which two variables are created, the **Sum** method is called, the the value returned by the Sum method is printed.

```cpp
public static void Main(String[] args)
{
  Start();
}

public static void Start()
{
  int first = 5;
  int second = 6;

  int sum = Sum(first, second);

  Console.WriteLine("Sum: " + sum);
}

public static int Sum(int number1, int number2) {
  return number1 + number2;
}
```

At the beginning of executing the method **Start** the call stack looks like the following illustration, since it was called from the **Main** method. The method Main has no variables of its own in this example:

```console
Start
Main
```

When variables first and second have been created in the Start method (the first two rows of that method have been executed, in other words), the situation resembles the following:

```console
Start first = 5 second = 6
Main
```

The command **int sum = Sum(first, second);** creates the variable sum in the method Start, and calls the method sum. The method Start enters a waiting state. Since the parameters number1 and number2 are defined in the method Sum, they are created right at the beginning of the method's execution, and then the values of the variables given as parametes are copied into them.

```console
Sum number1 = 5 number2 = 6
Start first = 5 second = 6
sum // no value
Main
```

The execution of the method sum adds together the values of the variables number1 and number2. The command return returns the sum of the numbers to the method that is one lower in the call stack, so the method Start in this case. The returned value is set as the value of the variable sum.

```console
Start first = 5 second = 6
sum = 11
Main
```

After that the print command is executed, and then we return to the Main method. Once the execution reaches the end of the Main method, the execution of the program ends.

## Method calling another method

As we noticed before, you can call other methods from inside methods. An additional example of this technique is given below. We'll create the method MultiplicationTable that prints the multiplication table of the given number. The multiplication table prints the rows with the help of the method PrintMultiplicationTableRow.

```cpp
public static void MultiplicationTable(int max)
{
  int number = 1;

  while (number <= max)
  {
    PrintMultiplicationTableRow(number, max);
    number++;
  }
}

public static void PrintMultiplicationTableRow(int number, int coefficient)
{
  int printable = number;
  while (printable <= number * coefficient)
  {
    Console.Write("  " + printable);
    printable += number;
  }
  Console.WriteLine("");
}
```

The output of the method call **MultiplicationTable(3)**, for instance, looks like this:

```console
1 2 3
4 5 6
7 8 9
```

**You can now do the exercises for methods**
