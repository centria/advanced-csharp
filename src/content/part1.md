---
title: 'Part 1 - The beginning'
nav_order: 2
hidden: false
---

During this course, you will learn how to do basic programs. The course starts from the very beginning and goes deeper as we progress. Before we start coding, we have to know what coding is, exactly.

Coding, in brief, is designing and creating **software** or **programs**. The programs are (usually) written in human-readable language, known as **programming languages**. There are hundreds of programming languages available, but on this course we concentrate on **C#**. You can find more information about the language from the [**here**](https://docs.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/). The language has good documentation, and you will find necessary information from there, later during the course.

Programming languages offer multiple **methods** and **commands** as **built-in**. Thus we do not implement everything ourselves. Large part of coding is using the built-in methods for problem solving. The written code is called **source code** and is comprised of **statements** and **expressions**. The code usually read just like any other written text, from left to right, top to bottom.

Our C# programs require a certain type of body to function:

```cpp
public class Program {
    public static void Main(string[] args)
    {
        // Add your statements here
    }
}
```

There are many parts to this body, of which many are automatically created. We will concentrate on them later during this course.

For now it is enough for you to know, that in a program there is always code that is not written by the coder. There are some features in all programming languages that are required for the program to run.

## Running a program

When you want to try if your source code works, you **run your program**. This means basically two steps: First, the code needs to be **compiled**. The second step is running the code. Luckily, the compilation and running can usually be done quite automatically, with a dedicated compiler. With modern development tools compilation and running are done with one command, or even a click of a button.

When you compile your code. the C# compiler compiles the source code into the module, which is converted into the assembly. The assembly contains the Intermediate Language (IL) code along with the metadata information about the assembly. The common language runtime (CLR) works with the assembly. It loads the assembly and converts it into the native code to execute the assembly. Then this native code is executed by the operating system and the output will shows according to your requirement.

As you can see, the compiling process is quite a complicated task, where the human-readable code is transferred into more machine-readable. We concentrate on the human-readable side of code.
