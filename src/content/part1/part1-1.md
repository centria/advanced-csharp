---
title: 'Printing and reading'
nav_order: 1
hidden: false
---

The basic structure of a program is following:

```cpp
using System;

public class Program
{
    public static void Main(string[] args)
    {
        // Add your statements here
    }
}
```

The program execution starts from the first line after **public static void Main(string[] args) {** and ends at the closing **}** bracket. Everything in between is run one row at a time. For example, the most common first program of any programmer, the **Hello World!**, would go like this:

```cpp
public class Program {
    public static void Main(string[] args)
    {
        Console.WriteLine("Hello World!");
    }
}
```

In this example, the only runnable statement is **Console.WriteLine("Hello World!");**, which prints out

```console
Hello World!
```

We will later focus on the terms **public class** and **public static void**, no need to worry about them yet.

In the material the whole structure might not be shown, unless purposefully needed. The example above could be represented also as

```cpp
Console.WriteLine("Hello World!");
```

in the future. In the exercises, for the first weeks the basic structure is given, so you do not have to worry about memorising it quite yet.

## Printing

As mentioned earlier, programming languages have statements built in them. **Console.WriteLine** is one of them. The statement is quite self-explanatory. It tells the computer to **write a line to the console**. You can change the **Hello World!** to any text you wish, as long as the command itself is not changed, and it will work.

The requirements in the exercises are very precise. If for example the line needs to end with an exclamation mark, it cannot be left out.

Programs are created (and read) command by command, where every command has to be on their own line. In the next example, we are calling **Console.WriteLine** twice, which means the print command is executed twice.

```cpp
public class Program {
    public static void Main(string[] args)
    {
        Console.WriteLine("Hello World!");
        Console.WriteLine("... and Pietarsaari!");
    }
}
```

This would print

```console
Hello World!
... and Pietarsaari!
```

To be precise, the command **Console.WriteLine("example text");** prints the text **example text** and a line change. The line change can also be handled with special character **\n**, which is written as a part of the printable text. The example above could also be written as

```cpp
public class Program {
    public static void Main(string[] args)
    {
        Console.WriteLine("Hello World!\n... and Pietarsaari!");
    }
}
```

<Note> There is no empty space around the \n. In a text, every character, even the empty ones, are part of the text. If you would put space around the line change, the first line would end with an empty character and the second one would start with one.</Note>

Sometimes the texts can be quite long, and reading them from a single line can become quite difficult. It is possible to do split the string into multiple pieces and then concatenate them together with the **+** operator. The example above could be

```cpp
public class Program {
    public static void Main(string[] args)
    {
        Console.WriteLine("Hello World!\n" +
        "... and Pietarsaari!");
    }
}
```

This will print exactly the same information as previously. Compared to the first solution this is more efficient, as we have to call the print command only once. Compared to the second solution, this is easier to read.

So far, everything we have printed have ended in a line change. If would want to print something but not change the line in the end, we would use **Console.Write("I do not change line");**

Thus, there are two statements for printing:

- **Console.WriteLine()** prints the text and changes line
- **Console.Write()** prints the text but keeps on the same line

In the printed text, there can be special characters, such as **\n**. There are also [**other special characters (here)**](https://en.wikipedia.org/wiki/Escape_character) you might want to familiarise yourself with.

## Parameters for a command

When we want to print something, we have to give that information as a **parameter** to our print command. Parameters are given to the command inside **()**. For example, to print **I like coding**, we give the parameter inside quotes as follows: **Console.Write("I like coding")**.

## Semicolon separates commands

With a semicolon **;** statements are separated from each other. We could write our examples on a one line, but they would not be very readable.

```cpp
Console.Write("Hello "); Console.Write("World!"); Console.Write("\n");
```

This would print out

```console
Hello World!
```

## Code blocks

Code consists of **Code blocks**. Code block means part of the code, separated with **{}**. There are usually multiple of these in a single program, as could already be seen from our basic structure.

For example, the line **public static void Main(string[] args)** that defines where to start the program, defines a block of what to run when the program is started.

```cpp
public class Program
{  // Here starts block for the class

  public static void Main(string[] args)
  {  // Here starts block for the main

  // Your code would be here

  } // The main block ends

} // The class block ends
```

The example shows a block inside another block. Blocks can be used to define the structure of a program. The block for the **class** contains the whole program structure, whereas the block for **main** contains the source code that is run when the program is started.

The block is always opened with **{** and closed with **}**. If either of them is missing, the code will not compile, and thus will not run.

## Comments

As you might have noticed, we already have **comments** in our code. Comments are text that are not compiled and thus are not run. Comments can be used for example to comment certain elements in the code, or to **temporarily** comment out part of a code for debugging purposes. There are two types of comments:

- **// single line comment**
- **/\* multiple line comment \*/**

As you can see, the single line comment is started with **//** but does not have an ending delimeter. Multiline comment starts with **/\*** and ends with **\*/**. Everything between these are considered as a comment by the compiler.

## Code style

Even though there is no style restraint from computer or the language we have chosen, there is great advantage in keeping the code neat and easy to read. For every language, there are widely spread [**coding conventions (here)**](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/coding-conventions). Indentation and variable naming conventions are the most useful ones to keep in mind.

We could write our program as

```cpp
public class Program
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Hello World!\n" +
        "... and Pietarsaari!");
    }
}
```

As well as

```cpp
public class Program { public static void Main(string[] args) { Console.WriteLine("Hello World!\n" +
"... and Pietarsaari!");  }
                                        }
```

But as you can see, the latter is not as easy to read, and understanding for example the different code blocks is harder. **Keep your code neat and clean!**

## Printing a string

Now that we have the tools for programming, let's go a bit deeper. so far we have printed simple lines of text. These texts are actually **string literals**. These literals can be saved into **string variables**. When we introduce a variable into a program, we usually give it a **value**. A value is given by following the variable with a **=** sign, the value and ending the line again with a semicolon, **;**. For example, if we want a string variable called **message** with a value of **I am learning**, we would assign it with

```cpp
string message = "I am learning";
```

Creating a variable gives us an opportunity to reference to the variable inside the program. We could use our variable for printing:

```cpp
string message = "Print me";
Console.WriteLine(message);
```

And would get

```console
Print me
```

If we now would use quotes around our variable name, we would print it as a string literal.

```cpp
string message = "Print me";
Console.WriteLine("message");
```

```console
message
```

As we earlier combined multiple lines of text, the string variables can also be concatenated as a part of printing.

```cpp
string name = "Doctor Octopus";
Console.WriteLine("We meet again, " + name);
```

```console
We meet again, Doctor Octopus
```

Same can be done with multiple parts

```cpp
string name = "Doctor Octopus";
string greeting = "We meet again, ";
Console.WriteLine(greeting + name + "!");
```

```console
We meet again, Doctor Octopus!
```

We could also create a string variable from multiple literals:

```cpp
string counting = "One" + "\n" + "Two" + "\n" + "Three";
Console.WriteLine(counting);
```

```console
One
Two
Three
```

## Reading strings from user

So far we have used strings that are written directly to the source code. It would be nice if we could tell our program, what we want to print each time. This can be done with another built in command, **ReadLine**.

```cpp
public class Program
{
    public static void Main()
    {
    // Print a request for message.
    Console.Write("Give a message: ");

    // Assign a new string variable. The value is the command we want to use.
    string message = Console.ReadLine();

    // Print out the message we gave.
    Console.WriteLine(message);
    }
}
```

This will look something like this with imput **I want to print this**:

```console
Give a message: I want to print this
I want to print this
```

This is the same example, but with concatenating the input message with **Your message was:**

```cpp
public class Program
{
   public static void Main()
   {
    // Print a request for message.
    Console.Write("Give a message: ");

    // Assign a new string variable. The value is the command we want to use.
    string message = Console.ReadLine();

    // Print out the message we gave.
    Console.WriteLine("Your message was: " + message);
   }
}
```

This will look something like this with imput **I want to print this**:

```console
Give a message: I want to print this
Your message was: I want to print this
```

# Exercises

<Exercise title={'001 Hello World!'}>
The basic structure of a program is given in the exercise:

```cpp
using System;

namespace Exercise001
{
    class Program
    {
        public static void Main(string[] args)
        {
            // Add your code here:
            
        }
    }
}
```

The line `\\Add your code here:` is a comment. The composer does not compose it, so you do not have to worry about it. You can remove it, if you want.

Create a program that writes the text `Hello World!` into the console. The program contains the basic structure pictured above.

</Exercise>


<Exercise title={'002 Bonnie Tyler'}>

Let's write some more. Bonnie Tyler once sang about feelings, that also apply to coding:  
```
Once upon a time
I was falling in love
Now I'm only falling apart
```
Create a program which prints these lyrics using `Console.WriteLine` three times.

</Exercise>

<Exercise title={'003 Bonnie Tyler with line changes'}>

Let's refine our program. Print the same message:  
```
Once upon a time
I was falling in love
Now I'm only falling apart
```
This time, use only one `Console.WriteLine`.

</Exercise>

<Exercise title={'004 First variable'}>

The exercise has following structure:

```cpp
using System;
 
namespace Exercise004
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string message = "Passport and floss!";
            Console.WriteLine(message);
        }
    }
}
```

Change it, so that it prints `Passport and a toothbrush!`
Do not change the line containing `Console.WriteLine`, only change the content of the variable!

</Exercise>

<Exercise title={'005 Ada Lovelace'}>

You will find following structure in the exercise:
  
```cpp
using System;

namespace Exercise005
{
    class Program
    {
        public static void Main(string[] args)
        {
            string name = "Ada Lovelace";
            // Write your code here:           
        }
    }
}
```

Modify the code, so that it prints `Hello Ada LoveLace!`
Do not modify the variable content!

</Exercise>

<Exercise title={'006 Print input'}>

Create a program, that asks user for a string. After the user has given the string (written text and pressed enter), the program will print the given line. Example output with `Hello` as input (input marked with `>` for clarification):

```console
Give input!
> Hello
Hello
```

</Exercise>

<Exercise title={'007 Triple hello'}>

Create a program, that asks user for a string. After the user has given the string (written text and pressed enter), the program will print the given line 3 times. Example output with `Hello` as input:

```console
Give input!
> Hello
Hello
Hello
Hello
```

</Exercise>

<Exercise title={'008 Greeting'}>

Create a program, that asks user for their name and greets them. Example output with `Ada` as input:

```console
What is your name?
> Ada
Hello Ada!
```
<Note>Notice the exclamation mark.</Note>

</Exercise>

<Exercise title={'009 Conversation'}>

Create a program, that simulates a small conversation. The program will tell three lines, and expects two user inputs. Example output:

```console
Hello, how are you?
> Fine, thanks.
That's interesting, tell me more
> I learn coding
Thank you for sharing!
```

</Exercise>

<Exercise title={'010 Name and profession'}>

Create a program, that asks the user for a name and a profession. Then make the program to write a little story with this information. Here is an example story with inputs `Ada` and `Data Scientist`.

<Note> Every Ada and Data Scientist in the story are the inputs by the user. Remember to save the Console.ReadLines into variables and use them as parts of the story! </Note>

```console
I will tell a story, but I need some information.
Give a name for main character:
> Ada
Give the character a profession:
> Data Scientist
Here is the story:
Once upon a time there was a Data Scientist called Ada
On her way to work, Ada often pondered what being Data Scientist meant to them.
When you work as a Data Scientist you meet interesting people.
Ada enjoys their work as Data Scientist, The end.
```

</Exercise>