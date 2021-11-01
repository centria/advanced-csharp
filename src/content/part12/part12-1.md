---
title: "Namespaces"
nav_order: 1
hidden: true
---

# Namespaces

We have used **namespaces** in our exercises and examples since the beginning of the course. But what are they, exactly?

Namespaces have two main functions in C# programming. First, they are used to organize classes into coherent groups. Second, they are used to control the scope and visibility of class and method names in large programs.

## Using namespaces

The most common namespace so far, is the **System** namespace. In our programs, we call it as follows:

```cpp
using System;
```

With this **using directive** we tell our program, it should have access to the System namespace, and it can use classes, methods, and even nested namespaces, from System. For example, when we print in our code something to the console:

```cpp
Console.WriteLine("text to be printed");
```

We are actually calling:

```cpp
System.Console.WriteLine("text to be printed");
```

With the **using System**, we don't have to write the long form of the classes (Console) and methods (WriteLine) called, so we can keep our code cleaner and shorter. Or how do you feel, creating for example a list every time with...

```cpp
System.Collections.Generic.List<string> list = new System.Colletions.Generic.List<string>();
```

## Scoping with namespaces

The keyword **namespace** can be used to declare a scope for classes and methods within your project. This is crucial in especially large projects, but can be used to organize projects of any size. Let's look at an example:

```cpp
namespace OuterNamespace
{
  using System;
  class Example
  {
    public void ExampleMethod()
    {
      Console.WriteLine("ExampleMethod in OuterNamespace");
    }
  }

  // Create a nested namespace, and define another class.
  namespace InnerNamespace
  {
    class Example
    {
      public void ExampleMethod()
      {
        Console.WriteLine("ExampleMethod in InnerNamespace");
      }
    }
  }
}
```

```cpp
namespace Exercise001
{
  class Program
  {
    static void Main(string[] args)
    {
      // Displays "ExampleMethod in OuterNamespace."
      OuterNamespace.Example outer = new OuterNamespace.Example();
      outer.ExampleMethod();

      // Displays "ExampleMethod in InnerNamespace."
      OuterNamespace.InnerNamespace.Example inner = new OuterNamespace.InnerNamespace.Example();
      inner.ExampleMethod();
    }
  }
}
```

What just happened?

* First, we create a namespace called **OuterNamespace**. This namespace contains all the code in our example namespace.

* We define **using System** to be available for all the classes in that namespace. Even though we have nested namespaces and multiple classes, System is available for all of them.

* We define a class **Example**, and for it a method **ExampleMethod**, which prints an informative text.

* Next, we define *a namespace inside a namespace*, or a **nested namespace**.

* Inside this namespace we have a class called **Example**. As it is defined inside the nested namespace, it can have the same name, as the class in the outer namespace. In the class, we define a method to print information.

* In our **Main**, we call our classes and their methods. Notice, that we are not using "using", but the long names of the namespaces. Also, the Main is in different namespace.

Let's move our Main to the same namespace as the classes:

```cpp
namespace OuterNamespace
{

  class Program
  {
    static void Main(string[] args)
    {
      // Displays "ExampleMethod in "
      Example outer = new Example();
      outer.ExampleMethod();

      // Displays "ExampleMethod in InnerNamespace."
      InnerNamespace.Example inner = new InnerNamespace.Example();
      inner.ExampleMethod();
    }
  }
}
```

As you can see, the code is already quite much clearer, as the Main is now **in the same scope**, or in the same namespace as the classes: The Main can "see" the classes and methods inside the OuterNamespace directly, as it is also part of it.

## Hierarchy and fully qualified names

Namespaces and Types have **fully qualified names**, or **unique title**, which indicate the hierarchy of said items. In our example above, we use the statement **OuterNamespace.InnerNamespace.Example**. This shows us a hierarchy structure: 

* **OuterNamespace** is the name of the outmost namespace (or type, this time namespace)
  * **InnerNamespace** is the name of the second namespace (or type)
    * **Example** is nested inside the namespace above
      * Etc, etc, etc...

So, with the **.** (dot) we indicate a hierachy of items. Let's look at another example:

```cpp
namespace Outmost     // Outmost
{
  class ExampleClass      // Outmost.ExampleClass
  {
    class ExampleInnerClass   // Outmost.ExampleClass.ExampleInnerClass
    {
    }
  }
  namespace Inner  // Outmost.Inner
  {
    class ExampleInnerClass   // Outmost.Inner.ExampleInnerClass
    {
    }

    class ExampleOtherClass  // Outmost.Inner.ExampleOtherClass
    {
    }
  }
}
```

In the example above:

* The namespace **Outmost** has a fully qualified name **Outmost**.
* The namespace **Inner** is a member of **Outmost**, and has a fully qualified name **Outmost.Inner**.
* The class **ExampleClass** is a member of **Outmost**, and has fully qualified name **Outmost.ExampleClass**
* The class name **ExampleInnerClass** can be seen twice in our code. As they are declared in different unique locations, they have unique fully qualified names:
  * The first one is **Outmost.ExampleClass.ExampleInnerClass**
  * The second one **Outmost.Inner.ExampleInnerClass**
* Just like previously, we can of course have other classes in our namespaces as well. Here, we have the class **ExampleOtherClass**, with the fully qualified name **Outmost.Inner.ExampleOtherClass**.

Just by looking at the fully qualified names, we can know if a type or a namespace is part of a larger whole, and how the structure above has been created.
