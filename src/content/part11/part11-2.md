---
title: "Exceptions"
nav_order: 2
hidden: true
---

# Exceptions

When program execution ends with an error, an exception is thrown. For example a program might have called a method with null reference and the **NullReferenceException** gets thrown, or the program might try to refer to an element outside an array and it leads to the **ArgumentOutOfRangeException** and so on.

Some exceptions we have to always prepare for, such as errors when reading from a file or errors related to problems with a network connection. Runtime exceptions, such as the NullReferenceException, we do not have to prepare for beforehand. C# will always let you know if your code has a statement or an expression which can throw an error you have to prepare for.

## Handling exceptions

We use **try {} catch (Exception e) {}** block structure to handle exceptions. Keyword **try** starts a block containing the code which *might* throw an exception. What happens if an exception is thrown in the **try** block is defined in the block starting with the keyword **catch**. The keyword **catch** is followed by the type of the exception handled by that block, for example "all exceptions" **catch (Exception e)**.

```cpp
try 
{
  // code which possibly throws an exception
} catch (Exception e) 
{
  // code block executed if an exception is thrown
}
```

We use the keyword **catch** because causing an exception is referred to as **throw**ing an exception.

As mentioned above, we do not have to prepare for runtime exceptions such as the NullReferenceException. We do not have to handle these kinds of exceptions, so the program execution stops if an error causes the exception to be thrown. Next we will look at one such situation, parsing strings to integers.

We have used the **Convert.ToInt32** method before. The method throws **FormatException** if the string it has been given cannot be parsed into an integer.

```cpp
Console.WriteLine("Give a number:");
int number = Convert.ToInt32(Console.ReadLine());
```

```console
Give a number:
> hotPotato
Unhandled exception. System.FormatException: Input string was not in a correct format.
   at System.Number.ThrowOverflowOrFormatException(ParsingStatus status, TypeCode type)
   at System.Number.ParseInt32(ReadOnlySpan`1 value, NumberStyles styles, NumberFormatInfo info)
   at System.Convert.ToInt32(String value)
   at Exercise001.Program.Main(String[] args) in [. . .]]/Program.cs:line 12
```

The above program throws an error if the user input is not a valid number. The exception will cause the program execution to stop.

Let's handle the exception. We wrap the call which might throw an exception into a try block, and the code executed if the exception is thrown into a catch block.

```cpp
Console.WriteLine("Give a number:");
int number = 0;
try
{
  number = Convert.ToInt32(Console.ReadLine());
}
catch (Exception e)
{
  Console.WriteLine(e.Message);
}
```

```console
Give a number:
> potato
Input string was not in a correct format.
```

As you can see, we also used a property from the **Exception**. All the exceptions have a message, and it can be used with **exception.Message**. Try and find the message part from the exception we had not caught above.

The code in the catch block is executed immediately if the code in the try block throws an exception. We can demonstrate this by adding a print statement below the line calling the Convert.ToInt32 method in the try block.

```cpp
Console.WriteLine("Give a number:");
int number = 0;
try
{
  number = Convert.ToInt32(Console.ReadLine());
  Console.WriteLine("Good job!");
}
catch (Exception e)
{
  Console.WriteLine(e.Message);
}
```

```console
Give a number:
> 12
Good job!
```

```console
Give a number:
> potato
Input string was not in a correct format.
```

User input, string "potato", is given to the Convert.ToInt32 method as a parameter. The method throws an error if the string cannot be parsed into an integer. Note, that the code within the catch block is executed only if an exception is thrown.

Let's make our integer parser a bit more useful. We'll turn it into a method which prompts the user for a number until they give a valid number. The execution stops only when the user gives a valid number.

```cpp
public static void Main(string[] args)
  {
    ReadNumber();
  }

public static int ReadNumber()
{
  while (true)
  {
    Console.Write("Give a number: ");
    try
    {
      int readNumber = Convert.ToInt32(Console.ReadLine());
      return readNumber;
    }
    catch (Exception e)
    {
      Console.WriteLine(e.Message);
    }
  }
}
```

```console
Give a number: hotPotato
Input string was not in a correct format.
Give a number: Normal potato
Input string was not in a correct format.
Give a number: Spicy potato
Input string was not in a correct format.
Give a number: 12
```

## Catching file exceptions

A common usage of try-catch is with reading and writing files. For now, we have trusted our coding, and the filepaths we write to be correct. But what happens if the file does not exist? Let's take a look. Below is an example, we've already used.

```cpp
string text = File.ReadAllText("fileDoesNotExist.txt");
Console.WriteLine(text);
```

In the examples below, \[. . .\] is used to hide the full path of the file. In the real exceptions, there would be a complete file path.

```console
Unhandled exception. System.IO.FileNotFoundException: Could not find file '[. . .]/fileDoesNotExist.txt'.
File name: '[. . .]/fileDoesNotExist.txt'
   at Interop.ThrowExceptionForIoErrno(ErrorInfo errorInfo, String path, Boolean isDirectory, Func`2 errorRewriter)
   at Microsoft.Win32.SafeHandles.SafeFileHandle.Open(String path, OpenFlags flags, Int32 mode)
   at System.IO.FileStream.OpenHandle(FileMode mode, FileShare share, FileOptions options)
   at System.IO.FileStream..ctor(String path, FileMode mode, FileAccess access, FileShare share, Int32 bufferSize, FileOptions options)
   at System.IO.StreamReader.ValidateArgsAndOpenPath(String path, Encoding encoding, Int32 bufferSize)
   at System.IO.StreamReader..ctor(String path, Encoding encoding, Boolean detectEncodingFromByteOrderMarks)
   at System.IO.File.InternalReadAllText(String path, Encoding encoding)
   at System.IO.File.ReadAllText(String path)
   at Exercise001.Program.Main(String[] args) in [. . .]/Program.cs:line 12
```

We get quite a stack trace, but most importanty, we get **FileNotFoundException**. Let's catch that.

```cpp
try
{
  string text = File.ReadAllText("fileDoesNotExist.txt");
  Console.WriteLine(text);
}
catch (Exception e)
{
  Console.WriteLine(e.Message);
}
```

```console
Could not find file '[. . .]/fileDoesNotExist.txt'.
```

Now we have a much more manageable error, but also our program did not crash. Let's try once more with a file that exists. I am using a "text.txt" file and printing its content.

```cpp
try
{
  string text = File.ReadAllText("text.txt");
  Console.WriteLine(text);
}
catch (Exception e)
{
  Console.WriteLine(e.Message);
}
```

```console
This is a line
This is second line
This is 3rd
This includes a double, 3.25
This has "quotes"
```

Now our file is read, the code inside the try-block is executed, and the catch-block is not executed, as the try-condition worked.

## Shifting the responsibility

Methods and constructors can throw exceptions. There are roughly two categories of exceptions. There are exceptions we have to handle, and exceptions we do not have to handle. We can handle exceptions by wrapping the code into a **try-catch** block or *throwing them out of the method*.

The code below reads the file given to it as a parameter line by line. Reading a file can throw an exception -- for example the file might not exist or the program does not have read rights to the file. This kind of exception has to be handled. We handle the exception by wrapping the code into a try-catch block. In this example we do not really care about the exception, but we do print a message to the user about it.

```cpp
public static void Main(string[] args)
{
  ReadLines("text.txt").ForEach(Console.WriteLine);
}


public static List<string> ReadLines(string fileName)
{
  List<string> list = new List<string>();
  try
  {
    string[] lines = File.ReadAllLines(fileName);
    list = new List<string>(lines);
  }
  catch (Exception e)
  {
    Console.WriteLine(e.Message);
  }
  return list;
}
```

A programmer can also leave the exception unhandled and shift the responsibility for handling it to whomever calls the method. We can shift the responsibility of handling an exception forward by throwing the exception out of a method. Notice on throwing an exception forward **throw new *ExceptionType*** is added in the method.

```cpp
public static void Main(string[] args)
{
  try
  {
    ReadLines("nonExistingFile.txt").ForEach(Console.WriteLine);
  }
  catch (Exception e)
  {
    Console.WriteLine("Caught in Main!");
  }
}


public static List<string> ReadLines(string fileName)
{
  List<string> list = new List<string>();
  if (!File.Exists(fileName))
  {
    throw new System.IO.FileNotFoundException();
  }
  string[] lines = File.ReadAllLines(fileName);
  list = new List<string>(lines);

  return list;
}
```

```console
Caught in Main!
```


## Throwing exceptions

In the previous topic, we already threw our first exception. Let's look into that a little deeper.

The throw command throws an exception. For example a **FormatException** can be done with command throw new FormatException(). The following code always throws an exception.

```cpp
public static void Main(string[] args)
{
  throw new FormatException();
}
```

```console
Unhandled exception. System.FormatException: One of the identified items was in an invalid format.
[. . .]
```

One exception which the user does not have to prepare for is **ArgumentException**. The ArgumentException tells the user that the values given to a method or a constructor as parameters are wrong. It can be used when we want to ensure certain parameter values.

Lets create class Grade. It gets a integer representing a grade as a constructor parameter.

```cpp
namespace Exercise001
{
  public class Grade
  {
    public int grade { get; }

    public Grade(int grade)
    {
      this.grade = grade;
    }
  }
}
```

We want that the grade fills certain criteria. The grade has to be an integer between 0 and 5. If it is something else, we want to throw an exception. Let's add a conditional statement to the constructor, which checks if the grade fills the criteria. If it does not, we throw the **ArgumentException** with **throw new ArgumentException("Grade must be between 0 and 5.");**.

```cpp
namespace Exercise001
{
  using System;
  public class Grade
  {
    public int grade { get; }

    public Grade(int grade)
    {
      if (grade < 0 || grade > 5)
      {
        throw new ArgumentException("Grade must be between 0 and 5.");
      }
      this.grade = grade;
    }
  }
}
```

Let's try this in action

```cpp
Grade grade = new Grade(3);
Console.WriteLine(grade.grade);

Grade illegalGrade = new Grade(22);
// exception happens, execution will not continue from here
```

```console
3
Unhandled exception. System.ArgumentException: Grade must be between 0 and 5.
   [. . .]
```

Exceptions which must be handled are exceptions which are checked for during compilation. Due to this, some exceptions have to be prepared for with a **try-catch** block or by throwing them out of a method with a throws attribute in a method declaration. For example exceptions related to handling files, **IOException** and **FileNotFoundException**, are this kind of exceptions.

Some exceptions are not checked for during compilation. They can be thrown during execution. These kinds of exceptions do not have to be handled with a try-catch block. For example **ArgumentException** and **NullReferenceException** are this kind of exceptions.


## Details of the exception

A catch block defines which exception to prepare for with catch \(*Exception e*\). The details of the exception are saved to the **e** variable.

```cpp
try {
    // program code which might throw an exception
} catch (Exception e) {
    // details of the exception are stored in the variable e
}
```

We have already used the property **Message**. In it is stored the message that describes the exception. Another useful property is **StackTrace**, which gives us a string representation of the immediate frames on the call stack.

```console
Unhandled exception. System.ArgumentException: Grade must be between 0 and 5.
   at Exercise001.Grade..ctor(Int32 grade) in [. . .]]/Grade.cs:line 14
   at Exercise001.Program.Main(String[] args) in []. . .]/Program.cs:line 14
```

We read a stack trace from the bottom up. At the bottom is the first call, so the execution of the program has begun from the **Main()** method for the **Program** class. Line 14 of the Main method was used to create the new Grade object, with illegal parameters. Line 14 of the Grade class is the constructor, and it has now thrown and **ArgumentException**. The details of an exception are very useful when trying to pinpoint where an error happens.