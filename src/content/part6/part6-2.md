---
title: "Static and non-static"
nav_order: 2
hidden: false
---

# Class and object methods: static

In the beginning, most of our methods had the modifier **static**, but with objects we quit using it all together. Why?

In C#, methods can be divided into two groups, defined with the modifier **static**. Methods without the modifier are **object methods** belong to the specific object, rather than to the class.

 In classes, you may add the static modifier to fields, methods, properties, operators, events, and constructors.

 Object methods are methods which belong to objects, and in whose code object variables and other object methods can be handled. In object methods you can use **this** keyword, which refers to the exact object's methods and variables.

 Below is an example of a class **Item**, which has three object methods. Each method can handle object's variables.

 ```cpp
 public class Item
 {
   private string name;

   public Item(string name) 
   {
     this.name = name;
   }
   
  // In C# this could also be done with { get; set; for the varible}
  // That way the variable would be public
  // For this example, we want to protect it and keep it private
  public string GetName()
  {
    return this.name;
  }

  public string SetName(string name) 
  {
    this.name = name;
  }

  public override string ToString()
  {
    return this.name;
  }
}
```

Unlike object methods, class methods are methods, which can only handle parameters given as parameters, or created inside the method. Below is an example of the class **Printer**, which has two class methods. The first one prints the given string with underscore, and the second one prints lines with the amount given as a parameter.

```cpp
public class Printer
{
  // class methods
  public static void PrintUnderscored(string input)
  {
    Console.WriteLine(input);
    PrintLine(input.Length);
  }

  public static void PrintLine(int length)
  {
    for (int i = 0; i < length; i++)
    {
      Console.Write("-");
    }
    Console.WriteLine();
  }
}
```

To call object methods, we need an object, for whom the the method is called (in the form of **objectName.MethodName**). Class methods can be called without an object (call in the form **MethodName**). If we want to call for a class method from outside the class, the call is in form **className.MethodName**.

Let's examine the examples above in a class **Program**. In the example below we use the class **Printer**'s class methods, and from the class **Item** we create an object and use its methods.

```cpp
public class Program 
{
  public static void Main(string[] args)
  {
    Printer.PrintUnderscored("Hello World!");

    Item chair = new Item("Kartell Louis Ghost");
    Printer.PrintLine(chair.GetName().Length);
    Printer.PrintUnderscored(chair.ToString());
  }
}
```

```console
Hello World!
------------
-------------------
Kartell Louis Ghost
-------------------
```

## Objects as a class method parameter

Let's examine a program which handles lists. In the **Main** method is functionality which handles integers in a list. Also the class has a class method **ZeroList** which works according to its name, setting a zero to each value of the list it gets as a parameter.

```cpp
public class Program 
{
  public static void Main(string[] args)
  {
    List<int> numbers = new List<int>();
    numbers.Add(1);
    numbers.Add(2);
    numbers.Add(3);
    numbers.Add(4);
    numbers.Add(5);

    foreach (int number in numbers)
    {
      Console.Write(number + " "); // Prints 1 2 3 4 5
    }
    Console.WriteLine();

    ZeroList(numbers);

    foreach (int number in numbers)
    {
      Console.Write(number + " "); // Prints 0 0 0 0 0
    }
  }

  public static void ZeroList(List<int> list)
  {
    for (int i = 0; i < list.Count; i++)
    {
      list[i] = 0;
    }
  }
}
```

In the example above, the method **ZeroList** has the modifier **static** and it is called without an object reference before it.

To a class method (or a **static method**) we can give an object as a parameter (which we have been doing for quite a while, now, already). Class method, however, cannot handle any other numbers, strings or objects than those given to it as a parameter, or which it creates itself.

In other words, The code using the class method needs to support the method by giving it the values and objects, which the class method uses.

Since the class method is not connected to any object, it is not called the way an object method would be called (**objectName.MethodName()**), but to call it (inside the same class) we only use the method name. If the class method is called from outside the class, it can be called in the format **ClassName.StaticMethodName()**.

Below is the same example, varied in a way that the Main program and the method are in their own classes:

```cpp
public class Program 
{
  public static void Main(string[] args)
  {
    List<int> numbers = new List<int>();
    numbers.Add(1);
    numbers.Add(2);
    numbers.Add(3);
    numbers.Add(4);
    numbers.Add(5);

    foreach (int number in numbers)
    {
      Console.Write(number + " "); // Prints 1 2 3 4 5
    }
    Console.WriteLine();

    Lists.ZeroList(numbers);

    foreach (int number in numbers)
    {
      Console.Write(number + " "); // Prints 0 0 0 0 0
    }
  }
}
```

```cpp
public class Lists 
{
  public static void ZeroList(List<int> list)
  {
    for (int i = 0; i < list.Count; i++)
    {
      list[i] = 0;
    }
  }
}
```

Static method defined in another class, here the class is called **Lists**, is called above in the format of **Lists.ZeroList(** parameters **);**.

## When to use class methods

All methods which handle the state of an object, must be defined as object methods, i.e. without the modifier static. In the previous parts we have defined classes like **Person, SimpleDate, Item, ...** all methods should be defined without static.

Let's return to the class **Person**. Following is a part of the class. All the object variables are referred with the keyword **this** to highlight, that the methods are using the object variables "inside" the object itself.

```cpp
public class Person
{
  private string name;
  private int age;

  public Person(string givenName) 
  {
    this.name = givenName;
    this.age = 0;
  }

  public bool IsOfAge()
  {
    return (this.age >= 18);
  }

  public void GrowOlder()
  {
    this.age++;
  }

  public override string ToString()
  {
    return this.name;
  }
}
```

Since the methods are handling the object, they cannot be defined as static, or "independent of objects". If we try to do so, the method will not work. For example, the method below does not work:

```cpp
public static void GrowOlder()
{
  this.age++;
}
```

As a result, we get an error:

```console
Member 'Exercise001.Person.GrowOlder()' cannot be accessed with an instance reference; qualify it with a type name instead
(38:5) Keyword 'this' is not valid in a static property, static method, or static field initializer
```

This means the static method cannot handle the object variable.

So, when should we use static methods? Let's look at the next example, where we have person objects. In the program, we create persons, grow them older, and eventually print information if they are of age.

```cpp
public class Program
{
  public static void Main(string[] args)
  {
    Person ada = new Person("Ada");
    Person jack = new Person("Jack");
    Person mike = new Person ("Mike");

    for (int i = 0; i < 30; i++)
    {
      ada.GrowOlder();
      mike.GrowOlder();
    }

    jack.GrowOlder();

    if (ada.IsOfAge())
    {
      Console.WriteLine(ada + " is of age");
    }
    else
    {
      Console.WriteLine(ada + " is under age");
    }

        if (ada.IsOfAge())
    {
      Console.WriteLine(mike + " is of age");
    }
    else
    {
      Console.WriteLine(mike + " is under age");
    }

        if (ada.IsOfAge())
    {
      Console.WriteLine(jack + " is of age");
    }
    else
    {
      Console.WriteLine(jack + " is under age");
    }
  }
}
```

We can already see, that the code to tell each persons' of age has been copy-pasted three times. That's ugly!

This is a good opportunity to use a static method. Let's rewrite the program, using the method:

```cpp
public class Program
{
  public static void Main(string[] args)
  {
    Person ada = new Person("Ada");
    Person jack = new Person("Jack");
    Person mike = new Person ("Mike");

    for (int i = 0; i < 30; i++)
    {
      ada.GrowOlder();
      mike.GrowOlder();
    }

    jack.GrowOlder();

    TellIfOfAge(ada);
    TellIfOfAge(mike);
    TellIfOfAge(jack);
  }

  public static void TellIfOfAge(Person person) 
  {
    if (person.IsOfAge())
    {
      Console.WriteLine(person + " is of age");
    }
    else
    {
      Console.WriteLine(person + " is under age");
    }
  }
}
```

The method **TellIfOfAge** has been defined static, so it is not attached to any object, **BUT** the the method gets an object as a parameter. Method has not been defined inside the person class, even though it handles Persons. It is a helper method for the main program, which made our main program more readable.

# Exercises

<Exercise title={'003 How many names'}>

Our template has the `Person` class and some use for it in Main. create a `public static void HowManyNames(Person person)` for the Main Program, which prints the name and the amount of names as follows:

```cpp
public static void Main(string[] args)
{
  Person ada = new Person("Ada Lovelace");
  Person jack = new Person("Jack The Ripper");
  Person mike = new Person("Mike The Incredible Magic Mouse");

  HowManyNames(ada);
  HowManyNames(jack);
  HowManyNames(mike);
}
```

```console
Ada Lovelace has 2 names.
Jack The Ripper has 3 names.
Mike The Incredible Magic Mouse has 5 names.
```

<Note> The Console.WriteLine is called from inside the method this time!</Note>

</Exercise>

<Exercise title={'004 How many names in person'}>

Our template has the `Person` class and some use for it in Main. create a `public int HowManyNames()` in the `Person` class, which returns the name and the amount of names as follows:

```cpp
public static void Main(string[] args)
{
  Person ada = new Person("Ada Lovelace");
  Person jack = new Person("Jack The Ripper");
  Person mike = new Person("Mike The Incredible Magic Mouse");

  Console.WriteLine(ada + " has " ada.HowManyNames() + " names.");
  Console.WriteLine(jack + " has " jack.HowManyNames() + " names.");
  Console.WriteLine(mike + " has " mike.HowManyNames() + " names.");
}
```

```console
Ada Lovelace has 2 names.
Jack The Ripper has 3 names.
Mike The Incredible Magic Mouse has 5 names.
```

<Note> The Console.WriteLine is called from inside the method this time!</Note>

</Exercise>