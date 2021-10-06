---
title: "Lists"
nav_order: 2
hidden: false
---


In programming, we often encounter situations where we want to handle many values. The only method we've used so far has been to define a separate variable for storing each value. This is impractical.

```cpp
string word1;
string word2;
string word3;
// ...
string word10;
```

The solution presented above is useless in effect -- consider a situation in which there are thousands of words to store.

Programming languages offer tools to assist in storing a large quantity of values. We will next take a peek at the List, which is used for storing many values that are of the same type.

List is a pre-made tool in C# that helps dealing with lists. It offers various methods, including ones for adding values to the list, removing values from it, and also for the retrieval of a value from a specific place in the list. The concrete implementations -- i.e., how the list is actually programmed -- has beed abstracted behind the methods, so that a programmer making use of a list doesn't need to concern themselves with its inner workings.

## Using and Creating Lists


For a List to be used, it first needs be imported into the program. This is achieved by including the command **using System.Collections.Generic;** at the top of the program. Below is an example program where an List is imported into the program.

To use a List, it also has to be initialized. Below is an example where we create a List that holds integers, called **numbers**.

```cpp
using System.Collections.Generic;

public class Program 
{
    public static void Main(string[] args) 
    {
      List<int> numbers = new List<int>();
      // Rest of the code...
    }
}

```

Creating a new list is done with the command List<type\> list = new List<type\>(), where type is the type of the values to be stored in the list (e.g. int). We create a list for storing strings in the example below.

```cpp
List<string> strings = new List<string>();
```

The type of the List variable is **List**. When a list variable is initialized, the type of the values to be stored is also defined in addition to the variable type -- all the variables stored in a given list are of the same type. As such, the type of an List that stores strings is **List<string\>**. A new list is created with the command new List<\>();.

## Defining the Type of Values That a List Can Contain

When defining the type of values that a list can include, the type is written the same way as when declaring variables. A list that includes int-type variables has to be defined in the form **List<int\>**; and a list that includes double-type variables is defined in the form **List<double\>**.

You'll find examples below of creating lists that contain different types of values.

```cpp
List<int> list = new List<int>();
list.Add(1);
```

```cpp
List<double> list = new List<double>();
list.Add(4.2);
```

```cpp
List<bool> list = new List<bool>();
list.Add(true);
```

```cpp
List<string> list = new List<string>();
lista.Add("String is text");
```

Once a list has been created, List assumes that all the variables contained in it are of the correct type. Of course, you can store variables with the correct type in them, as well. Then the value of said variable is stored.

```cpp
List<int> integers = new List<int>();
int integer = 1;
integers.Add(integer);

List<double> doubles = new List<double>();
double d = 4.2;
doubles.Add(d);
```

## Adding to a List and Retrieving a Value from a Specific Place

The next example demonstrates the addition of a few strings into an List containing strings. Addition is done with the list method **Add**, which takes the value to be added as a parameter. We then print the value at position zero. To retrieve a value from a certain position, you use a special annotation of **list[index]**, where list is your list, and index is the position from where to get the data. 

```cpp
public class WordListExample 
{
  public static void Main(string[] args) 
  {
    // create the word list for storing strings
    List<string> wordList = new List<string>();

    // add two values to the word list
    wordList.Add("First");
    wordList.Add("Second");

    // retrieve the value from position 0 of the word list, and print it
    Console.WriteLine(wordList[0]);
  }
}
```

Program writes:

```console
First
```

As can be seen, the latter method retrieves the first value from the list when it is given the parameter **0**. This is because list positions are counted starting from zero. The first value is found by wordList[0], the second by wordList[1], and so on.

```cpp
public class WordListExample 
{
  public static void Main(string[] args) 
  {
    // create the word list for storing strings
    List<string> wordList = new List<string>();

    // add two values to the word list
    wordList.Add("First");
    wordList.Add("Second");

    // retrieve the value from position 0 of the word list, and print it
    Console.WriteLine(wordList[1]);
  }
}
```

Program writes:

```console
Second
```

## Retrieving Information from a "Non-Existent" Place

If you try to retrieve information from a place that does not exist on the list, the program will print a **ArgumentOutOfRangeException** error. In the example below, two values are added to a list, after which there is an attempt to print the value at place two on the list.

```cpp
public class WordListExample 
{
  public static void Main(string[] args) 
  {
    // create the word list for storing strings
    List<string> wordList = new List<string>();

    // add two values to the word list
    wordList.Add("First");
    wordList.Add("Second");

    // retrieve the value from position 0 of the word list, and print it
    Console.WriteLine(wordList[2]);
  }
}
```

Since the numbering (i.e., indexing) of the list elements starts with zero, the program isn't able to find anything at place two and its execution ends with an error. Below is a description of the error message caused by the program.

```console
Unhandled exception. System.ArgumentOutOfRangeException: Index was out of range. Must be non-negative and less than the size of the collection. (Parameter 'index')
   at System.Collections.Generic.List`1.get_Item(Int32 index)
   at WordListExample.Program.Main(String[] args) in ... Program.cs:line 13
```

The error message tells exactly what and where happened. First, the error contains the error type, **ArgumentOutOfRangeException**. Then it gives a possible correction. Next, the error contains which method caused the error. In this case, it would be the **get_Item(Int32 index)**. Last, the error tells us which part of our code triggered the error.

As you can see, when calling for List[index], we are actually calling method **System.Collections.Generic.List`1.get_Item(Int32 index)**, which is a more complex method, already built in. This is the advantage of built-in methods: We do not have to worry about how to implement a method for data retrieval from a list, as it already exists.

## Numbering and index

Numbering places, i.e., indexing, always begins with zero. The list's first value is located at index 0, the second value at index 1, the third value at index 2, and so on. In programs, an index is denoted with a variable called **i**.

Example list called numbers could contain something like this...

|i|0|1|2|3|4|5|6|...|
|-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|value|6|1|2| 4| 4| 3||

In the list above, the first value is 6 and the second value 1. If a new value was added to the list by calling the **Add method** of numbers with 8 as parameter, the number 8 would be placed at index 6. It would be the seventh number in the list.

```cpp
numbers.Add(8);
```

|i|0|1|2|3|4|5|6|...|
|-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|value|6|1|2| 4| 4| 3|8|

Similarly, by calling the method **numbers[index]** with the parameter 4 the fifth number in the list would be retrieved.

Each tool offered by C# has a name and location. The program can use a tool after it has been imported with the **using** command. The command is given the location and the name of the desired class. For example, the use of a **Console** from System necessitates placing the command **using System;** to the top of the program.

```cpp
using System;

public class Program 
{  
    public static void Main(string[] args) 
    {  
        Console.WriteLine("Console has been imported");
    }  
}   
```

The same usually applies to all C# classes. **Console** is called directly from system, so we can import it with just **using System;**. If we want to use Lists, we have to go deeper, and use **using System.Collections.Generic;**.

```cpp
using System;
using System.Collections.Generic;

public class Program 
{  
    public static void Main(string[] args) 
    {  
        Console.WriteLine("Console has been imported");
        List<string> list = new List<string>();
        list.Add("List can be now used, too.");
    }  
}   
```

## Iterating Over a List

We'll next be examining methods that can be used to go through the values on a list. Let's start with a simple example where we print a list containing four values.

```cpp
List<string> teachers = new List<string>();

teachers.Add("Simon");
teachers.Add("Samuel");
teachers.Add("Ann");
teachers.Add("Anna");

Console.WriteLine(teachers[0]);
Console.WriteLine(teachers[1]);
Console.WriteLine(teachers[2]);
Console.WriteLine(teachers[3]);
```

```console
Simon
Samuel
Ann
Anna
```

The example is obviously clumsy. What if there were more values on the list? Or fewer? What if we didn't know the number of values on the list?

The number of values on a list is provided by the list's **Count** property which returns the number of elements the list contains. The number is an integer (int), and it can be used as a part of an expression or stored in an integer variable for later use.

```cpp
List<string> list = new List<string>();
Console.WriteLine("Number of values on the list: " + list.Count);

lista.add("First");
Console.WriteLine("Number of values on the list: " + list.Count);

int values = list.Count;

lista.add("Second");
Console.WriteLine("Number of values on the list: " + values);
```

```console
Number of values on the list: 0 
Number of values on the list: 1 
Number of values on the list: 1
```

<Note> The Count is not a method but a property. This means that when calling Count, we do not add brackets in the end! </Note>

Let's make a new version of the program that prints each index manually. In this intermediate version we use the **index** variable to keep track of the place that is to be outputted.


```cpp
List<string> teachers = new List<string>();

teachers.Add("Simon");
teachers.Add("Samuel");
teachers.Add("Ann");
teachers.Add("Anna");

int index = 0;

if (index < teachers.Count) 
{
  Console.WriteLine(teachers[index]); // index = 0
  index = index + 1; // index = 1
}

if (index < teachers.Count) 
{
  Console.WriteLine(teachers[index]); // index = 1
  index = index + 1; // index = 2
}

if (index < teachers.Count) 
{
  Console.WriteLine(teachers[index]); // index = 2
  index = index + 1; // index = 3
}

if (index < teachers.Count) 
{
  Console.WriteLine(teachers[index]); // index = 3
  index = index + 1; // index = 4
}

if (index < index.Count) 
{
  // this will not be executed since index = 4 and teachers.Count = 4
  Console.WriteLine(teachers[index]);
  index = index + 1;
}
```

We can see that there's repetition in the program above.

We can convert the if statements into a while loop that is repeated until the condition index < teachers.Count no longer holds (i.e., the value of the variable index grows too great).

```cpp
List<string> teachers = new List<string>();

teachers.Add("Simon");
teachers.Add("Samuel");
teachers.Add("Ann");
teachers.Add("Anna");

int index = 0;
// Repeat for as long as the value of the variable `index`
// is smaller than the size of the teachers list
while (index < teachers.Count) 
{
  Console.WriteLine(teachers[index]);
  index = index + 1;
}
```

Now the printing works regardless of the number of elements.

The for-loop is extremely handy here. We can convert the loop above to a for-loop, after which the program looks like this.

```cpp
List<string> teachers = new List<string>();

teachers.Add("Simon");
teachers.Add("Samuel");
teachers.Add("Ann");
teachers.Add("Anna");

for (int index = 0; index < teachers.Count; index++) 
{
    Console.WriteLine(teachers[index]);
}
```

```console
Simon
Samuel
Ann
Anna
```

The index variable of the for-loop is typically labelled **i**:

```cpp
for (int i = 0; i < teachers.Count; i++) 
{
    Console.WriteLine(teachers[index]);
}
```

Let's consider using a list to store integers. The functionality is largely the same as in the previous example. The greatest difference has to do with the initialization of the list -- the type of value to be stored is defined as int, and the value to be printed is stored in a variable called number before printing.

```cpp
List<int> numbers = new List<int>();

numbers.Add(1);
numbers.Add(2);
numbers.Add(3);
numbers.Add(4);

for (int i = 0; i < numbers.Count; i++) 
{
    int number = numbers[i];
    Console.WriteLine(number);
    // alternatively: Console.WriteLine(numbers[i]);
}
```

```console
1
2
3
4
```

Printing the numbers in the list in reverse order would also be straightforward.

```cpp
List<int> numbers = new List<int>();

numbers.Add(1);
numbers.Add(2);
numbers.Add(3);
numbers.Add(4);

int index = numbers.Count - 1;
while (index >= 0)
{
  int number = numbers[index];
  Console.WriteLine(number);
  index = index - 1;
}
```

```console
4
3
2
1
```

Try and recreate the previous example with the for loop!

## Iterating Over a List with a For-Each Loop

If you don't need to keep track of the index as you're going through a list's values, you can make use of the **for-each** loop. It differs from the previous loops in that it has no separate condition for repeating or incrementing.


```cpp
List<string> teachers = new List<string>();

teachers.Add("Simon");
teachers.Add("Samuel");
teachers.Add("Ann");
teachers.Add("Anna");

foreach (string teacher in teachers)
{
  Console.WriteLine(teacher);
}
```

In practical terms, the for-each loop described above hides some parts of the for-loop we practiced earlier.The for-each loop would look like this if implemented as a for-loop:

```cpp
List<string> teachers = new List<string>();

teachers.Add("Simon");
teachers.Add("Samuel");
teachers.Add("Ann");
teachers.Add("Anna");

for (int i = 0; i < teachers.Count; i++) 
{
    string teacher = teachers[i];
    Console.WriteLine(teacher);
}
```

In practice, the for-each loop examines the values of the list in order one at a time. The expression is defined in the following format: **for (typeOfVariable nameOfVariable: nameOfList)**, where **typeOfVariable** is the list's element type, and **nameOfVariable** is the variable that is used to store each value in the list as we go through it.

## Removing from a List and Checking the Existence of a Value

The list's **RemoveAt(index)** method removes the value that is located at the index that's given as the parameter. The parameter is an integer.

```cpp
// create the list for storing strings
List<string> list = new List<string>();

// add three values to the list
list.Add("First");
list.Add("Second");
list.Add("Third");

// Remove from index 1
list.RemoveAt(1);

// retrieve the value from positions 0 and 1 of the list, and print them
Console.WriteLine(list[0]);
Console.WriteLine(list[1]);
```

```console
First
Third
```

We can also use the method **Remove** if we know the value of the item we want to remove:

```cpp
// create the list for storing strings
List<string> list = new List<string>();

// add three values to the list
list.Add("First");
list.Add("Second");
list.Add("Third");

// Remove with value "Second"
list.Remove("Second");

// retrieve the value from positions 0 and 1 of the list, and print them
Console.WriteLine(list[0]);
Console.WriteLine(list[1]);
```

```console
First
Third
```

The methods work exactly the same way with integers, so be careful, which method you use!

```cpp
// create the list for storing integers
List<int> list = new List<int>();

// add three values to the list
list.Add(1);
list.Add(3);
list.Add(2);

// Remove with value "Second"
list.RemoveAt(1);

// retrieve the value from positions 0 and 1 of the list, and print them
Console.WriteLine(list[0]);
Console.WriteLine(list[1]);
```

```console
1
2
```

```cpp
// create the list for storing integers
List<int> list = new List<int>();

// add three values to the list
list.Add(1);
list.Add(3);
list.Add(2);

// Remove with value 
list.Remove(1);

// retrieve the value from positions 0 and 1 of the list, and print them
Console.WriteLine(list[0]);
Console.WriteLine(list[1]);
```

```console
3
2
```

<Note> The method Remove removes the first match it finds. So, if your list would contain multiples of the same value, only the first one would be removed! </Note>


The list method **Contains** can be used to check the existence of a value in the list. The method receives the value to be searched as its parameter, and it returns a boolean type value (True or False) that indicates whether or not that value is stored in the list.

```cpp
// create the list for storing strings
List<string> list = new List<string>();

// add three values to the list
list.Add("First");
list.Add("Second");
list.Add("Third");

Console.WriteLine("Can we find First: " + list.Contains("First"));


if (list.Contains("Second"))
{
  Console.WriteLine("We found second!");
}
```

```console
Can we find First: True
We found second!
```

## List as a Method Parameter

Like other variables, a list, too, can be used as a parameter to a method. When the method is defined to take a list as a parameter, the type of the parameter is defined as the type of the list and the type of the values contained in that list. Below, the method **Print** prints the values in the list one by one.

```cpp
public static void Print(List<String> list)
{
  foreach (string value in list)
  {
    Console.WriteLine(value);
  }
}
```

We're by now familiar with methods, and it works in the same way here. In the example below we use the method that was implemented above.

```cpp
List<string> strings = new List<string>();

strings.Add("First");
strings.Add("Second");
strings.Add("Third");

Print(strings);
```

```console
First
Second
Third
```

The chosen parameter in the method definition is not dependent on the list that is passed as parameter in the method call. In the program that calls Print, the name of the list variable is **string**, but inside the method Print the variable is called **list** -- the name of the variable that stores the list could also be **printables**, for instance.

It's also possible to define multiple variables for a method. In the example the method receives two parameters: a list of numbers and a threshold value. It then prints all the numbers in the list that are smaller than the second parameter.

```cpp
public static void PrintSmallerThan(List<int> numbers, int threshold) 
{
  foreach(int number in numbers)
  {
    if (number < threshold) 
    {
      Console.WriteLine(number);
    }
  }
}
```

Here we see it in action:

```cpp
List<int> list = new List<int>();

list.Add(1);
list.Add(2);
list.Add(3);
list.Add(2);
list.Add(1);

PrintSmallerThan(list, 3);
```

```console
1
2
2
1
```

As before, a method can also return a value. The methods that return values have the type of the return value in place of the **void** keyword, and the actual returning of the value is done by the **return** command. The method below returns the Count of the list.

```cpp
public static void Count(List<string> list)
{
  return list.Count;
}
```

You can also define own variables for methods. The method below calculates the average of the numbers in the list. If the list is empty, it returns the number -1.

```cpp
public static double Average(List<int> numbers) 
{
  if (numbers.Count == 0) 
  {
      return -1.0;
  }

  int sum = 0;
  foreach(int number in numbers) 
  {
      sum = sum + number;
  }

  return 1.0 * sum / numbers.Count;
}
```
## On Copying the List to a Method Parameter

Earlier we have used integers, floating point numbers, etc. as method parameters. When variables such as int are used as method parameters, the value of the variable is copied for the method's use. The same occurs in the case that the parameter is a list.

Lists, among practically all the variables that can store large amounts of information, are reference-type variables. This means that the value of the variable is a reference that points to the location that contains the information.

When a list (or any reference-type variable) is copied for a method's use, the method receives the value of the list variable, i.e., a reference. In such a case the **method receives a reference to the real value of a reference-type variable**, and the method is able to modify the value of the original reference type variable, such as a list. In practice, the list that the method receives as a parameter is the same list that is used in the program that calls the method.

Let's look at this briefly with the following method.

```cpp
public static void RemoveFirst(List<int> numbers)
{
if (numbers.Count == 0)
{
return;
}
numbers.RemoveAt(0);
}
```

```cpp
List<int> numbers = new List<int>();
numbers.Add(3);
numbers.Add(2);
numbers.Add(6);
numbers.Add(-1);

Console.WriteLine("First print: ");
numbers.ForEach(Console.WriteLine);

RemoveFirst(numbers);

Console.WriteLine("Second print: ");
numbers.ForEach(Console.WriteLine);

RemoveFirst(numbers);
RemoveFirst(numbers);
RemoveFirst(numbers);

Console.WriteLine("Third print: ");
numbers.ForEach(Console.WriteLine);
```

```console
First print: 
3
2
6
-1
Second print: 
2
6
-1
Third print: 
```

As you can see, the methor **RemoveFirst** affects the list it was given as a parameter, directly.

<Note>Instead of doing Console.WriteLine(numbers), to get the values from the list, the annotation is numbers.ForEach(Console.WriteLine); </Note>

## A Summary of List Methods and Properties

You can find all the information about [**Lists here**](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=netframework-4.8). For the most part, we don't need all that information, but a hand selected part from it.

* Adding to a list is done with the method *Add** that receives the value to be added as a parameter.

```cpp
List<int> numbers = new List<int>();
numbers.Add(3);
```

* The number of elements in a list can be discovered with the property **Count**; it returns an integer.

```cpp
List<int> numbers = new List<int>();
int amount = numbers.Count;
Console.WriteLine("Amount of integers in numbers: " + amount);
```

* You can retrieve a value from a certain index with the method **list[index]** that is given the index at which the value resides as a parameter.

```cpp
List<int> numbers = new List<int>();
numbers.Add(3);
Console.WriteLine(numbers[0]);
```

* Removing elements is done with either **Remove** or **RemoveAt**, depending if we remove by value or index.

```cpp
List<string> list = new List<string>();
list.Add("First");
list.Add("Second");
list.Add("Third");
list.RemoveAt(0);
list.Remove("Third");
```

* Checking for the existence of a value is done with the method **Contains**. It's provided the value being searched for as a parameter, and it returns a boolean value.

```cpp
List<string> list = new List<string>();
list.Add("First");
list.Contains("First");
```

* To iterate a list, we use forEach

```cpp
List<int> numbers = new List<int>();
numbers.Add(3);
numbers.Add(2);

numbers.ForEach(Console.WriteLine);
```

# Exercises

<Exercise title={'001 Third from list'}>
The exercise contains a base that asks the user for strings and adds them to a list. The program stops reading when the user enters an empty string. The program then prints the first element of the list.

Your assignment is to modify the program so that instead of the first value, the third value on the list is printed. Remember that programmers start counting from zero! The program is allowed to malfunction if there are fewer than three entries on the list, so you don't need to prepare for such an event at all.

```console
> Tom 
> Emma 
> Alex 
> Mary
>
Alex
```

```console
> Emma 
> Alex 
> Mary
>

Mary
```

</Exercise>

<Exercise title={'002 Sum of second and third'}>

In the exercise template there is a program that reads integers from the user and adds them to a list. This ends when the user enters 0. The program then prints the first value on the list.

Modify the program so that instead of the first value, the program prints the sum of the second and third numbers. The program is allowed to malfunction if there are fewer than three entries on the list, so you don't need to prepare for such an event at all.

```console
> 1 
> 3 
> 5 
> 7 
> 0 
8
```

```console
> 2 
> 3 
> 4 
> 0 
7
```

</Exercise>

<Exercise title={'003 Exception'}>

There is a program that uses a list in the exercise template. Modify it so that its execution always produces the error `ArgumentOutRangeException`. The user should not have to give any inputs to the program (e.g. write something on the keyboard)

</Exercise>

<Exercise title={'004 Counting names'}>

In the exercise template is a program that reads input from the user. Modify its working so that when the program quits reading (with an empty line), the program prints the number of values on the list.

```console
> Tom 
> Emma 
> Alex 
> Mary
>
In total: 4
```

```console
> Juno 
> Elizabeth 
> Mason 
> Irene
> Olivia
> Liam
> Ida
> Christopher
> Mark
> Sylvester
> Oscar
>
In total: 11
```

<Note>Be sure to use the Count property of the list.</Note>

</Exercise>

<Note>The next exercises are meant for learning to use lists and indices. Even if you could complete the execises without a list, concentrate on training to use lists. The functionality in the exercises is to be implemented after reading the inputs.</Note>

<Exercise title={'005 Last from list'}>

In the exercise template there is a program that reads inputs from the user and adds them to a list. Reading is stopped once the user enters an empty string.

Your task is to modify the method to print the last read value after it stops reading. Print the value that was read last from the list. Use the Count to help you. You do not have to take into consideration empty lists, you can assume that the user always gives at least one input.

```console
> Tom 
> Emma 
> Alex 
> Mary
>
Mary
```

```console
> Juno 
> Elizabeth 
> Mason 
> Irene
> Olivia
> Liam
> Ida
> Christopher
> Mark
> Sylvester
> Oscar
>
Oscar
```

</Exercise>

<Exercise title={'006 First and last'}>

In the exercise template there is a program that reads inputs from the user and adds them to a list. Reading is stopped once the user enters an empty string.

Modify the program to print both the first and the last values after the reading ends. You may suppose that at least two values are read into the list.

```console
> Tom 
> Emma 
> Alex 
> Mary
>
Tom
Mary
```

```console
> Juno 
> Elizabeth 
> Mason 
> Irene
> Olivia
> Liam
> Ida
> Christopher
> Mark
> Sylvester
> Oscar
>
Juno
Oscar
```

```console
> Tom 
> Mary
>
Tom
Mary
```

</Exercise>

<Exercise title={'007 Numbers from list'}>

The exercise template contains a base that reads numbers from the user and adds them to a list. Reading is stopped once the user enters the number -1.

Expand the functionality of the program so that after reading the numbers, it prints all the numbers received from the user. The number used to indicate stopping should not be printed.

```console
> 72
> 2
> 8
> 11
> -1 
72
2
8
11
```

</Exercise>

<Exercise title={'008 Numbers from and to'}>

The exercise template contains a base that reads numbers from the user and adds them to a list. Reading is stopped once the user enters the number -1.

Expand the program to ask for a start and end indices once it has finished asking for numbers. After this the program shall prints all the numbers in the list that fall in the specified range (between the indices given by the user, inclusive). You may assume that the user gives indices that match some numbers in the list.

```console
> 72
> 2
> 8
> 11
> -1 
From where?
> 1
Where to?
> 9 
2 
8
```

```console
> 72
> 2
> 8
> 11
> -1 
From where?
> 0 
Where to?
> 20  
2
8
11 
```

</Exercise>

<Exercise title={'009 Greatest number'}>

The exercise template contains a base that reads numbers from the user and adds them to a list. Reading is stopped once the user enters the number -1.

Continue developing the program so that it ends the greatest number in the list and prints its value after reading all the numbers. The programming should work in the following manner.

```console
> 72
> 2
> 8
> 93
> 11
> -1
The greatest number: 93
```
You can assume that user always gives atleast one viable number.

You can use the source code below as an inspitation. It is used to find the smallest number.

```cpp
// assume we have a list that contains integers

int smallest = list[0];

for(int i = 0; i < list.Count; i++) {
    int number = list[i];
    if (smallest > number) {
        smallest = number;
    }
}

Console.WriteLine("The smallest number: " + smallest);
```

</Exercise>

<Exercise title={'010 Index'}>

The exercise template contains a base that reads numbers from the user and adds them to a list. Reading is stopped once the user enters the number -1.

Expand the program that then asks the user for a number, and reports that number's index in the list. If the number is not found, the program should not print anything.

```console
> 72 
> 2 
> 8 
> 8 
> 11 
> -1
Search for? 
> 2 
2 is at index 1
```

```console
> 72 
> 2 
> 8 
> 8 
> 11 
> -1
Search for? 
> 8 
8 is at index 2
8 is at index 3
```

</Exercise>

<Exercise title={'011 Smallest and index'}>

Write a program that reads numbers from the user. When number 9999 is entered, the reading process stops. After this the program will print the smallest number in the list, and also the indices where that number is found. Notice: the smallest number can appear multiple times in the list.

```console
> 72
> 2
> 8
> 8
> 11
> 9999
Smallest number: 2 
Found at index: 1
```

```console
> 72
> 44
> 8
> 8
> 11
> 9999
Smallest number: 8 
Found at index: 2 
Found at index: 3
```

<Note> You can combine the programs you wrote for the exercises "Greatest number in the list" and "Index of the requested number". First find the smallest number, and then find the index of that number. </Note>

</Exercise>

<Exercise title={'012 Sum of list'}>

The exercise template contains a base that reads numbers from the user and adds them to a list. Reading is stopped once the user enters the number -1.

Modify the program so that after reading the numbers it calculates and prints the sum of the numbers in the list.

```console
> 72
> 2
> 8
> 11
> -1
Sum: 93
```

</Exercise>

<Exercise title={'013 Finding names'}>

In the exercise template there is a program that reads inputs from the user until an empty string is entered. Add the following functionality to it: after reading the inputs one more string is requested from the user. The program then tell whether that string was found in the list or not.

```
> Tom
> Emma
> Alex
> Mary
Search for?
> Mary
Mary was found!
```

```
> Tom
> Emma
> Alex
> Mary
Search for?
> Logan
Logan was not found!
```

</Exercise>

<Exercise title={'014 Numbers in range'}>

Create the method `public static void PrintNumbersInRange(List<int> numbers, int lowerLimit, int upperLimit)` in the exercise template. The method prints the numbers in the given list whose values are in the range [lowerLimit, upperLimit]. A few examples of using the method are supplied below.

```cpp
List<int> numbers = new List<int>();
numbers.Add(3);
numbers.Add(2);
numbers.Add(6);
numbers.Add(-1);
numbers.Add(5);
numnbers.Add(1);

Console.WriteLine("The numbers in the range [0, 5]");
PrintNumbersInRange(numbers, 0, 5);

Console.WriteLine("The numbers in the range [3, 10]");
PrintNumbersInRange(numbers, 3, 10);
```

```console
The numbers in the range [0, 5] 
3 
2 
5 
1 
The numbers in the range [3, 10] 
3 
6 
5
```

</Exercise>

<Exercise title={'015 Sum method'}>

Create the method `public static int Sum(List<int> numbers)` in the exercise template. The method is to return the sum of the numbers in the parameter list.

```cpp
List<int> numbers = new List<int>();
numbers.Add(3);
numbers.Add(2);
numbers.Add(6);
numbers.Add(-1);
Console.WriteLine(Sum(numbers));

numbers.Add(5);
numbers.Add(1);
Console.WriteLine(Sum(numbers));
```

```console
10
16
```

</Exercise>

<Exercise title={'016 Remove last method'}>

create the method `public static void RemoveLast(List<string> strings)` in the exercise template. The method should remove the last value in the list it receives as a parameter. If the list is empty, the method does nothing.

```cpp
List<string> strings = new List<string>();

strings.Add("First");
strings.Add("Second");
strings.Add("Third");

// Remember, this is how you print all the items in a list
strings.ForEach(Console.WriteLine);

RemoveLast(strings);
RemoveLast(strings);

strings.ForEach(Console.WriteLine);
```

```console
First
Second
Third
First
```

</Exercise>