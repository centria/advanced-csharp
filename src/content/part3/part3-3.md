---
title: "Arrays"
nav_order: 3
hidden: false
---

We've gotten familiar with List, which has a lot of functionality to make the life of a programmer easier. Perhaps the most important is about adding elements: From the point of view of the programmer the size of the List is unlimited. In reality there are no magic tricks in the List -- they have been programmed like any programs or tools offered by the programming language. When you create a list, a limited space is reserved in the memory of the computer. When the List runs out of space, larger space is reserved and the data from the previous space is copied to the new one.

Even though List is simple to use, sometimes we need the ancestor of the List, the Array.

An Array contains a limited amount of numbered spots (indices) for values. The length (or size) of an Array is the amount of these spots, i.e. how many values can you place in the Array. The values in an Array are called elements.

## Creating an Array

There are two ways to create an Array. In the first one you have to explicitly define the size upon the creating. This is how you create an Array to hold three integers:

```cpp
int[] numbers = new int[3];
```

An array is declared by adding square brackets after the type of the elements it contains (typeofelements[]). A new Array is created by calling new followed by the type of the elements, square brackets and the number of the elements in the square brackets.

An array to hold 5 Strings can be created like this:

```cpp
string[] strings = new string[5];
```

## Assigning and accessing elements

An element of an array is referred to by its index. In the example below we create an array to hold 3 integers, and then assigning values to the indices 0 and 2. After that we print the values.

```cpp
int[] numbers = new int[3];
numbers[0] = 2;
numbers[2] = 5;
// numbers[1] is empty

Console.WriteLine(numbers[0]);
Console.WriteLine(numbers[2]);
```

Assigning a value to a specific spot of an Array works much like assigning a value in a normal variable, but in the Array you must specify the index, i.e. to which spot you want to assign the value. The index is specified in in square brackets. You might notice, that the method is exactly the same as for Lists.

The index is an integer, and it's value is between [0, length of the Array - 1]. For example an Array to hold 5 elements has indices 0, 1, 2, 3, and 4.

```cpp
int[] numbers = new int[5];
numbers[0] = 42;
numbers[1] = 13;
numbers[2] = 12;
numbers[3] = 7;
numbers[4] = 1;

Console.WriteLine("Which index should we access? ");
int index = Convert.ToInt32(Console.ReadLine());

Console.WriteLine(numbers[index]);
```

The value held in an Array can also be assigned to be the value of another variable

```cpp
int[] numbers = new int[5];
numbers[0] = 42;
numbers[1] = 13;
numbers[2] = 12;
numbers[3] = 7;
numbers[4] = 1;

Console.WriteLine("Which index should we access? ");
int index = Convert.ToInt32(Console.ReadLine());

int number = numbers[index];
Console.WriteLine(number);
```

## Size of an array and iterating

You can find out the size of the array through the property **Length**. You can access this property by writing name of the array dot name of the variable, i.e. numbers.Length. Note, that this is not a method call, so numbers.Length() doesn't work.

```cpp
int[] numbers = new int[4];

numbers[0] = 12;
numbers[1] = 42;
numbers[2] = 37;
numbers[3] = 9;

Console.WriteLine("The array has " + numbers.Length + " elements:");
for (int i = 0; i < numbers.Length; i++)
{
  Console.WriteLine(numbers[i]);
}
```

```console
The array has 4 elements:
12
42
37
9
```

The example above iterates over indices 0, 1, 2 and 3, and at each index prints the value held in the index. So first it prints **numbers[0]**, then **numbers[1]** etc. The iteration stops, once the condition of the loop **i < numbers.Length** is false, i.e. once the index variable is greater or equal to the length of the array. NB! The iteration doesn't stop the moment the index variable grows too big; the condition is evaluated only in the beginning of the while loop.

If the index is pointing outside the Array, i.e. the element doesn't exist, we get an **IndexOutOfRangeException**. This error tells, that the Array doesn't contain the given index. You cannot access outside of the Array, i.e. index that's less than 0 or greater or equal to the size of the Array.

The next example is a program that first asks the user to enter how many numbers, and then enter the numbers. Finally it prints back the numbers in the same order. The numbers are stored in an Array.

```cpp
Console.WriteLine("How many numbers? ");
int howMany = Convert.ToInt32(Console.ReadLine());

int[] numbers = new int[howMany];

Console.WriteLine("Enter the numbers:");

int index = 0;
while (index < numbers.length) {
    numbers[index] = Convert.ToInt32(Console.ReadLine());
    index = index + 1;
}


Console.WriteLine("Here are the numbers again:");

index = 0;
while (index < numbers.length) {
    Console.WriteLine(numbers[index]);
    index = index + 1;
}
```
An execution of the program might look like this:

```console
How many numbers? 
> 4 
Enter the numbers: 
> 4 
> 8
> 2 
> 1 
Here are the numbers again: 
4 
8 
2 
1
```

## Type of the elements

You can create an array stating the type of the elements of the array followed by square brackets (typeofelements[]). Therefore the elements of the array can be of any type. Here's a few examples:

```cpp
string[] months = new string[12];
double[] approximations = new double[100];

months[0] = "January";
approximations[0] = 3.14;
```

Every programmer should know a bit about the structure of the memory used by a computer program. Each variable -- let it be primitive or reference type -- is saved in the memory. Each variable has size i.e. a defined number of bits (zeros and ones) it takes in the memory. The value of the variable is also represented in bits.

The reference of the array object is actually information about the location of the data. By stating **array[0]** we're referring to the first element of the array. The statement **array[0]** can also be read *"Go to the beginning of the array and move forward 0 times the size of the variable contained in the array -- and return a chunk of data the size of the variable."*

The size of an int variable in C# is 32 bits. One bit is reserved for the (plus or minus) sign, so the largest possible number to present in int is 2^31 -1. When you create an int array of 4 elements, 4 * 32 bits of memory is allocated to hold the integers. When you access **array[2]**, 32 bits are read starting from beginning of the array + 2 * 32 bits.

Some programming languages try to make sure the programmer doesn't go "in the wrong area". If compiler didn't cause the exception when we say **array[-1]**, we would find out the data located just before the array in the memory of the program. In such case there there wouldn't also be anything preventing us from writing a program reading the whole memory reserved for the program.

## Array as a parameter of a method

You can use arrays as a parameter of a method just like any other variable. Because array is reference type, the value of the array is a reference to the information contained in the array. When you use array as a parameter of a method, the method receives a copy of the reference to the array.

```cpp
public static void ListElements(int[] integerArray)
{
  Console.WriteLine("the elements of the array are: ");
  int index = 0;
  while (index < integerArray.Length)
  {
    int number = integerArray[index];
    Console.Write(number + " ");
    index = index + 1;
  }

  Console.WriteLine("");
}
```

In action:
```cpp
int[] numbers = new int[3];
numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;

ListElements(numbers);
```

```console
the elements of the array are: 
1 2 3 
```

As noticed before, you can freely choose the name of the parameter inside the method, the name doesn't have to be the same as the name of the variable when you call the method. Above we call the array **integerArray**, meanwhile the caller of the method has named the same array **numbers**.

Array is an object, so when you change the array inside the method, the changes persist also after the execution of the method.

## The shorter way to create an array

There's also a shortcut to create an array. Here we create an array to hold 3 integers, and initiate it with values 100, 1 and 42 in it:

```cpp
int[] numbers = {100, 1, 42};
```

So apart from calling for **new**, we can also initialize an array with a block, that contains comma-separated values to be assigned in the array. This works for all the types: below we initialize an array of strings, then an array of floating-point numbers. Finally the values are printed.

```cpp
string[] arrayOfStrings = {"Mike L.", "Mike P.", "Mike V."};
double[] arrayOfFloatingpoints = {1.20, 3.14, 100.0, 0.6666666667};

for (int i = 0; i < arrayOfStrings.Length; i++) {
    Console.WriteLine(arrayOfStrings[i] + " " +  arrayOfFloatingpoints[i]);
}
```

```console
Mike L. 1.2
Mike P. 3.14
Mike V. 100
```

When you initialize an array with a block, the length of the array is precisely the number of the values specified in the block. The values of the block are assigned to the array in the order, eg. the first value is assigned to the index 0, the second value to the index 1 etc.

```cpp
// index           0   1    2    3   4   5     6     7
int[] numbers = {100,  1,  42,  23,  1,  1, 3200, 3201};

// prints the number at index 0, i.e. number 100
Console.WriteLine(numbers[0]);
// prints the number at index 2, i.e. number 42
Console.WriteLine(numbers[2]);
```

Just like in Lists, you can't access an index outside of the array. You can try out the following example on your own computer.

```cpp
string[] arrayOfStrings = {"Mike L.", "Mike P.", "Mike V."};
double[] arrayOfFloatingpoints = {1.20, 3.14, 100.0, 0.6666666667};

for (int i = 0; i < arrayOfFloatingpoints.Length; i++) {
    Console.WriteLine(arrayOfStrings[i] + " " +  arrayOfFloatingpoints[i]);
}
```

# Exercises

<Exercise title={'017 Swap indices'}>

The exercise template already contains a program, that creates an array and prints the values of the array twice. Modify the program to do following: After the first printing, the program should ask for two indices from the user. The values in these two indices should be swapped, and in the end the values of the array should be printed once again.

```console
1 
3 
5 
7 
9

Give two indices to swap: 
> 2 
> 4

1 
3 
9 
7 
5
```

```console
1 
3 
5 
7 
9

Give two indices to swap: 
> 0 
> 1

3 
1 
5 
7 
9
```

You can assume the array to contain the given indices.   

<Note>You'll need an additional variable to store one of the values for little while.</Note>

</Exercise>

<Exercise title={'018 Searching array'}>

The exercise template has already an array containing numbers. Complete the program to ask the user for a number to search in the array. If the array contains the given number, the program tells the index containing the number. If the array doesn't contain the given number, the program will tell the number wasn't found.

```console
Search for? 
> 3 
3 is at index 4.
```

```console
Search for? 
> 7 
7 is at index 7.
```

```console
Search for? 
> 22 
22 was not found.
```

</Exercise>

<Exercise title={'019 Sum of numbers in array'}>

The template has a method `public static int SumOfNumbersInArray(int[] array)`. Complete the method so, that it computes and returns the sum of the numbers in the array it receives as parameter.

You can try out the computation of the sum with this example:

```cpp
int[] numbers = {5, 1, 3, 4, 2};
int sum = SumOfNumbersInArray(numbers);
Console.WriteLine(sum);
```

```console
15
```

</Exercise>

<Exercise title={'020 Print neatly'}>

Complete the method `public static void PrintNeatly(int[] array)` in the template to make it print the numbers of the array it receives more neatly. There should be a whitespace and a comma between each number. don't put a comma after the last number.

Print the numbers on one line using `Console.Write`.

You can try out your printing with this example:

```cpp
int[] array = {5, 1, 3, 4, 2};
PrintNeatly(array);
```

```console
5, 1, 3, 4, 2
```

</Exercise>

<Exercise title={'021 Array in stars'}>

Complete the method `public static void PrintArrayInStars(int[] array)` in the template to make it print a row of stars for each number in the array. The amount of stars on each row is defined by the corresponding number in the array.

You can try out the printing with this example:

```cpp
int[] array = {5, 1, 3, 4, 2};
PrintArrayInStars(array);
```

```
***** 
* 
*** 
**** 
**
```

The 0th element of the array is 5, so the first line has 5 stars. The next one has 1 etc.

</Exercise>