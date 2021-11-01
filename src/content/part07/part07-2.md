---
title: "Introduction to testing"
nav_order: 2
hidden: false
---

# Testing

In previous section we took a very brief look into testing, but didn't really explain what we were doing. Let's take our first proper steps in the world of program testing.

## Error Situations and Step-By-Step Problem Resolving

Errors end up in the programs that we write. Sometimes the errors are not serious and cause headache mostly to users of the program. Occasionally, however, mistakes can lead to very serious consequences. In any case, it's certain that a person learning to program makes many mistakes.

You should never be afraid of or avoid making mistakes since that is the best way to learn. For this reason, try to break the program that you're working on from time to time to investigate error messages, and to see if those messages tell you something about the error(s) you've made.

The report in the address [http://sunnyday.mit.edu/accidents/MCO_report.pdf](http://sunnyday.mit.edu/accidents/MCO_report.pdf ) describes an incident resulting from a more serious software error and also the error itself.

The bug in the software was caused by the fact that the program in question expected the programmer to use the [International System of Units](https://en.wikipedia.org/wiki/International_System_of_Units) (meters, kilograms, ...) in the calculations. However, the programmer had used the [American Measurement System](https://en.wikipedia.org/wiki/English_Engineering_units) for some of the system's calculations, which prevented the satellite navigation auto-correction system from working as inteded.

The satellite was destroyed.

As programs grow in their complexity, finding errors becomes even more challenging. The debugger integrated into NetBeans can help you find errors. The use of the debugger is introduced with videos embedded in the course material; going over them is always an option.

## Stack Trace

When an error occurs in a program, the program typically prints something called a stack trace, i.e., the list of method calls that resulted in the error. For example, a stack trace might look like this:

```console
Program.cs(13,46): error CS1002: ; expected [/mnt/c/Users/HeikkiHei/Documents/coding-exercises/project_examples/NewTypes/src/NewTypes/NewTypes.csproj]

The build failed. Fix the build errors and run again.
```
* The erroring file is first, **Program.cs**
* Then the location of the error, if possible **(on line 13, character 46)**
* The error code **CS1002**, implicating what was the error
* Exact location of the file

We got this trace bu removing a single semi-colon from our Pets-example.

## Checklist for Troubleshooting

If your code doesn't work and you don't know where the error is, these steps will help you get started.

1. Indent your code properly and find out if there are any missing parentheses.
2. Verify that the variables used are correctly named.
3. Test the program flow with different inputs and find out the sort of input that causes the program to not work as desired. If you received an error in the tests, the tests may also indicate the input used.
4. Add print commands to the program in which you print out the values of the variables used at various stages of the program's execution.
5. Verify that all variables you are using are initialized. If they aren't, a NullPointerException error will occur.
6. If your program causes an exception, you should definitely pay attention to the stack trace associated with the exception, which is the list of method calls that resulted in the situation that caused the exception.

## Passing Test Input Console

Manually testing the program is often laborious. It's possible to automate the passing of input by, for example, creating a [**StringReader**](https://docs.microsoft.com/en-us/dotnet/api/system.io.stringreader?view=netframework-4.8) and giving that content to [**Console.SetIn**](https://docs.microsoft.com/en-us/dotnet/api/system.console.setin?view=netframework-4.8). You'll find an example below of how to test a program automatically. The program first enters five strings, followed by the previously seen string. After that, we try to enter a new string. The string "six" should not appear in the word set.

```cpp
using System;
using System.IO;
using System.Collections.Generic;


namespace Exercise001
{
  class Program
  {
    static void Main(string[] args)
    {
      string input = "one\n" + "two\n" +
                      "three\n" + "four\n" +
                      "five\n" + "one\n" +
                      "six\n";
      StringReader reader = new StringReader(input);

      List<string> read = new List<string>();

      while (true)
      {
        Console.WriteLine("Enter an input: ");
        // Redirect the console input to the reader
        Console.SetIn(reader);
        // It is now in memory and will be given to the ReadLine
        // Every linebreak "\n" starts a new line
        // giving the ReadLine six inputs
        string line = Console.ReadLine();
        if (read.Contains(line))
        {
          break;
        }

        read.Add(line);
      }

      Console.WriteLine("Thank you!");

      if (read.Contains("six"))
      {
        Console.WriteLine("A value that should not have been added to the group was added to it.");
      }
    }
  }
}
```

The program's output only shows the one provided by the program, and no user commands.

```console
Enter an input:
Enter an input:
Enter an input:
Enter an input:
Enter an input:
Enter an input:
Thank you!
```

Passing a string to the constructor of the **StringReader** class replaces input read from the keyboard. As such, the content of the string variable input 'simulates' user input. A line break in the input is marked with \n. Therefore, each part ending in an newline character in a given string input corresponds to one input given to the ReadLine() command.

When testing your program again manually, remove or comment out the line **Console.SetIn(reader);**. Alternatively, you can also change the test input, since we're dealing with a string.

## Unit Testing

The automated testing method laid out above where the input to a program is modified is quite convenient, but limited nonetheless. Testing larger programs in this way is challenging. One solution to this is unit testing, where small parts of the program are tested in isolation.

Unit testing refers to the testing of individual components in the source code, such as classes and their provided methods. The writing of tests revelas whether each class and method observs or deviates from the guideline of each method and class having a single, clear responsibility. The more responsibility the method has, the more complex the test. If a large application is written in a single method, writing tests for it becomes very challenging, if not impossible. Similarly, if the application is broken into clear classes and methods, then writing tests is straightforward.

Ready-made unit test libraries are commonly used in writing tests, which provide methods and help classes for writing tests. One of the widely used testing libraries in C# is [**xUnit**](https://xunit.net/), which has already been used in our exercises.

Let's take a look at writing unit tests with the help of an example. Let's assume that we have the following Calculator class at our use, and want to write automated tests for it.

```cpp
public class Calculator
{

  public int value { get; private set; }

  public Calculator()
  {
    this.value = 0;
  }

  public void Sum(int number)
  {
    this.value = this.value + number;
  }

  public void Substract(int number)
  {
    this.value = this.value + number;
  }
}
```

The calculator works by always remembering the result produced by the preceding calculation. All subsequent calculations are always added to the previous result. A minor error resulting from copying and pasting has been left in the calculator above. The method substract should deduct from the value, but it currently adds to it.

Unit test writing begins by creating a test class, which is created under the Test folder. When testing the **Calculator** class, the test class is to be called **CalculatorTests**. 

The test class **CalculatorTest** is initially quite forgiving, as it does not infact test anything:

```cpp
using System;
using Xunit;

namespace CalculatorTest
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {

        }
    }
}
```

Let's go through the file:

* It belongs to the namespace CalculatorTest
* It has the class **UnitTest1**
* Line\[Fact\] indicates that the following method is a test. **This line is required for dotnet test** to recognize the following method as a test.
* The test method, now called Test1, is empty, and always passes.

Tests are methods of the test class where each test tests an individual unit. Let's begin testing the class -- we start off by creating a test method that confirms that the newly created calculator's value is intially 0.

```cpp
using System;
using Xunit;

namespace CalculatorTest
{
    public class UnitTest1
    {
        [Fact]
        public void CalculatorInitialValueZero()
        {
            Calculator calculator = new Calculator();
            Assert.Equal(0, calculator.value);
        }
    }
}
```

```console
dotnet test 

[. . .]

Starting test execution, please wait...
A total of 1 test files matched the specified pattern.

Passed!  - Failed:     0, Passed:     1, Skipped:     0, Total:     1, Duration: < 1 ms
```

We also gave our test a more meaningful name.

In the **CalculatorInitialValueZero** method a calculator object is first created. The **Assert.Equal** method provided by the xUnit test framework is then used to check the value. The method is imported from the xUnit Framework with **using xUnit;**, and it's given the expected value as a parameter - 0 in this instance - and the value returned by the calculator. If the values of the **Assert.Equal** method values ​​differ, the test will not pass. Each test method should have an "annotation" **\[Fact\]**. This tells the xUnit test framework that this is an executable test method.

Let's add functionality for summing and substacting to the test class.

```cpp
using Xunit;
using Calculators;

namespace CalculatorTest
{
  public class Tests
  {
    [Fact]
    public void CalculatorInitialValueZero()
    {
      Calculator calculator = new Calculator();
      Assert.Equal(0, calculator.value);
    }

    [Fact]
    public void ValueFiveWhenFiveAdded()
    {
      Calculator calculator = new Calculator();
      calculator.Sum(5);
      Assert.Equal(5, calculator.value);
    }

    [Fact]
    public void ValueMinusTwoWhenTwoSubstracted()
    {
      Calculator calculator = new Calculator();
      calculator.Substract(2);
      Assert.Equal(-2, calculator.value);
    }
  }
}
```

Executing the tests produces the following output.


```console
dotnet test

Starting test execution, please wait...
A total of 1 test files matched the specified pattern.
[xUnit.net 00:00:00.37]     CalculatorTest.Tests.ValueMinusTwoWhenTwoSubstracted [FAIL]
  Failed CalculatorTest.Tests.ValueMinusTwoWhenTwoSubstracted [1 ms]
  Error Message:
   Assert.Equal() Failure
Expected: -2
Actual:   2
  Stack Trace:
     at CalculatorTest.Tests.ValueMinusTwoWhenTwoSubstracted() in [. . .]Calculators/test/CalculatorTest/UnitTest1.cs:line 28

Failed!  - Failed:     1, Passed:     2, Skipped:     0, Total:     3, Duration: 19 ms
 ```

 The output tells us that three tests were executed. One of them failed. The test output also informs us of the line in which the error occured (28), and of the expected (-2) and actual (2) values. Whenever the execution of tests ends in an error, the testing framework also displays the error state visually.

 With the previous tests two passed, but one of them resulted in an error. Let's fix the mistake left in the Calculator class.

```cpp
// ...
public void Substract(int number)
{
  this.value -= number;
}
// ...
```

When the test are run again, they pass.

```console
dotnet test 

[. . .]

Starting test execution, please wait...
A total of 1 test files matched the specified pattern.

Passed!  - Failed:     0, Passed:     3, Skipped:     0, Total:     3, Duration: 2 ms
```

Unit testing tends to be extremely complicated if the whole application has been written in "Main". To make testing easier, the app should split into small parts, each having a clear responsibility. In the previous sections, we practiced this when we seperated the user interface from the application logic and created proper folder structure. Writing tests for parts of an application, such as the 'Pets' class from the previous section is significantly easier than writing them for program contained in "Main" in its entirety.

## Test-Driven Development

[**Test-driven development**](https://en.wikipedia.org/wiki/Test-driven_development) is a software development process that's based on constructing a piece of software in small iterations. In test-driven software development, the first thing a programmer always does is write an automatically-executable test, which tests a single piece of the computer program.

The test will not pass because the functionality that satisfies the test, i.e., the part of the computer program to be examined, is missing. Once the test has been written, functionality that meets the test requirements is added to the program. The tests are run again. If all tests pass, a new test is added, or alternatively, if the tests fail, the already-written program is corrected. If necessary, the internal structure of the program will be corrected or refactored, so that the functionality of the program remains the same, but the structure becomes clearer.

Test-driven software development consists of five steps that are repeated until the functionality of the program is complete.

1. Write a test. The programmer decides which program functionality to test and writes a test for it.

2. Run the tests and check if the tests pass. When a new test is written, the tests are run. If the test passes, the test is most likely erroneous and should be corrected - the test should only test functionality that hasn't yet been implemented.

3. Write the functionality that meets the test's requirements. The programmer implements functionality that only meets the test requirements. Note: this doesn't do things that the test does not require - functionality is only added in small increments.

4. Perform the tests. If the tests fail, there is likely to be an error in the functionality written. Correct the functionality - or, if there is no error in the functionality, fix the latest test that was performed.

5. Repair the internal structure of the program. As the size of the program increases, its internal structure is adjusted as needed. Methods that are too long are broken down into multiple parts and classes representing concepts are isolated. The tests are not modified, but are instead used to verify the correctness of the changes made to the program's internal structure - if a change in the program structure changes the functionality of the program, the tests will produce a warning and the programmer can remedy the situation.

You might notice, that this is actually the way our exercises have been done: The tests exist and expect you to create a program, which works as the tests require.

Unit testing is only a part of software testing. On top of unit testing, a developer also performs integration tests that examine the interoperability of components, such as classes, and interface tests that test the application's interface through elements provided by the interface, such as buttons.