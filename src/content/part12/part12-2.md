---
title: "Using"
nav_order: 2
hidden: false
---

# Using using

In our material and exercises, we have used the keyword **using** only to bring other namespaces available for our classes to use, but that is not the only way to use it. The keyword **using** can roughly be divided into two, with **using directive** and **using statement**. Let's start with the first one.

## Using directive

Namespaces are made available to our code with the **using directive**. For example,

```cpp
using System;
```

is a directive. With the directive, we allow our code to access members of other namespaces, such as System in the example above. We can also use the directive to create **aliases**.

When we use the directive, we get access to that specific namespace, but not the nested namespaces, nor the namespaces above. For that reason, we often have multiple namespaces brought from the same upper namespace, such as

```cpp
using System;
using System.IO;
using System.Collections.Generic;
// and so on
```

Even though we have access to System, we do not automatically get access to System.IO or other nested namespaces.

Using directives should be used...

* At the beginning of a source code file, before any namespace or type definitions.
* In any namespace, but before any namespace or types declared in this namespace.

Where ever you put your directive, defines which members of that file can access the directive. The directive is restricted to each file specifically, so having a directive in one file does not automatically give access to the whole namespace, but you have to give the directive in all the files you want the access.

[**You can find the documentation for directives from here.**](https://docs.microsoft.com/fi-fi/dotnet/csharp/language-reference/keywords/using-directive)

### Aliases

Aliases are used to make identification of namespaces and types easier. For example, in a larger project we might have multiple subparts with similar method names, and in our code we need to make sure, we are calling the correct methods. Aliases are created with the **using directive**.

```cpp
namespace MasterProject
{
  // Define an alias for the nested namespace.
  using Project = MasterProject.Developers.Project;
  class MasterClass
  {
    void Master()
    {
      // Use the alias
      Project.Builder bob = new Project.Builder();
    }
  }
  namespace Developers
  {
    namespace Project
    {
      public class Builder 
      { 
      }
    }
  }
}
```

There are restrictions to creating aliases. For example,

```cpp
// creating alias, works
using c = System.Collections;
// using alias does not work
using c.Generic;
```

will cause an error. When declaring **using directives**, you have to use the **fully qualified names**.

[**You can read more about alias documentation from here.**](https://docs.microsoft.com/fi-fi/dotnet/csharp/programming-guide/namespaces/using-namespaces#namespace-aliases)


## Using statement

Another way of using **using** is the **using statement**. Compared to the directive, the statement allows us to have certain things in our use for a short period of time.

The using statement is meant for objects which inherit the [**IDisposable interface**](https://docs.microsoft.com/en-us/dotnet/api/system.idisposable), and ensures the correct use of said objects.

For example, the using statement has been used in our exercise test since the beginning. Let's take a look:

```cpp
[Fact]
public void TestExercise01()
{
  using (StringWriter sw = new StringWriter())
  { // Start the using block

    // Our test's content would be here

  } // End the using block
}
```

We do not have to worry about the functionality of the test itself, our focus is on the line **using (StringWriter sw = new StringWriter())**. This is our **using statement**.

* The statement is located inside our method, as the first line. This means the StringWriter we create, exists only in this method. When the method (or in this case, the test) has been executed, the StringWriter object seises to exist.

* When we declare the statement, we declare the object like in any other situation: we define which object to use, give it a variable name, and call its constructor.

* We can use the variable "sw" inside our method's code. After the method has been run, the "sw" does not exist anymore.

* The statement has a code block of its own, called the **using block**. You can notice the brackets after the statement, and its closing pair at the end. If there would be code after this block in the method, that code could not access the statement.

When you only need an object for a very short period of time, you should use the **using statement**. This ensures the correct disposal of the object and saves up memory.

[**You can read more about the statement documentation from here.**](https://docs.microsoft.com/fi-fi/dotnet/csharp/language-reference/keywords/using-statement)

# Exercises

<Note> Exercises will be published 8.12.2021 at the latest!</Note>