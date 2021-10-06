---
title: "Inheritance"
nav_order: 1
hidden: false
---

# Inheritance

Classes are used to clarify the concepts of the problem domain in object-oriented programming. Every class we create adds functionality to the programming language. This functionality is needed to solve the problems that we encounter. An essential idea behind object-oriented programming is that **solutions rise from the interactions between objects which are created from classes**. An object in object-oriented programming is an independent unit that has a state, which can be modified by using the methods that the object provides. Objects are used in cooperation; each has its own area of responsibility.

Every C# class extends the class **Object**, which means that every class we create has at their disposal all the methods defined in the Object class. If we want to change how these methods defined in Object function, they must be overriden by defining a new implementation for them in the newly created class. The objects we create receive methods **Equals** and **GetHashCode**, among others, from the **Object** class.

Ever class derives from **Object**, but it's also possible to defire from other classes than that. If we examine the API (Application Programming Interface) of C#'s [**Int32**](https://docs.microsoft.com/en-us/dotnet/api/system.int32?view=netframework-4.8) (or integer, as we know it), we notice that **Int32** has **base class** called **ValueType**. ValueType, in turn, has the class **Object** as its base class.

```console
Inheritance
Object --> ValueType --> Int32
```

Each class can directly extend only one class. However, a class indirectly inherits all the properties of the class it extends. So the Int32 class derives from the class ValueType, and indirectly derives from the class Object. So Int32 has at its disposal variables and methods of the classes ValueType and Object.

We use the **:** (or colon) notation to inherit a class. The class that receives the properties is called the **derived class**, and the class whole properties are inherited is called the **base class**.

Let's take a look at a car manufacturing system that manages car parts. A basic component of part management is the class **Part**, which defines the identifier, the manufacturer, and the description.

```cpp
namespace sandbox
{
  public class Part
  {

    public string identifier { get; }
    public string manufacturer { get; }
    public string description { get; }

    public Part(string identifier, string manufacturer, string description)
    {
      this.identifier = identifier;
      this.manufacturer = manufacturer;
      this.description = description;
    }
  }
}
```

One part of the car is the engine. As is the case with all parts, the engine, too, has a manufacturer, an identifier, and a description. In addition each engine has a type: for instance, an internal combustion engine, an electric motor, or a hybrid engine.

The traditional way to implement the class **Engine**, without using inheritance, would be this.

```cpp
namespace sandbox
{
  public class Engine
  {
    public string engineType { get; }
    public string identifier { get; }
    public string manufacturer { get; }
    public string description { get; }

    public Engine(string engineType, string identifier, string manufacturer, string description)
    {
      this.engineType = engineType;
      this.identifier = identifier;
      this.manufacturer = manufacturer;
      this.description = description;
    }
  }
}
```

We notice a significant amount of overlap between the contents of Engine and Part. It can confidently be said the **Engine** is a special case of **Part**. Engine is Part, but it also has properties that a Part does not have, which in this case means the engine type.

Let's recreate the class Engine, and this time use inheritance in our implementation. We'll create the class **Engine** which inherits the class **Part**: an engine is a special case of a part.

```cpp
namespace sandbox
{
  public class Engine : Part
  {
    public string engineType { get; }

    public Engine(string engineType, string identifier, string manufacturer, string description) : 
      base(identifier, manufacturer, description)
    {
      this.engineType = engineType;
    }
  }
}
```

The class definition **public class Engine : Part** indicates that the class **Engine** inherits the functionality of the class **Part**. We also define an object variable **engineType** in the class **Engine**.

The constructor of the Engine class is worth some interest. On its declaration line we use the keyword **base** to call the constructor of the baseclass. The call **base(identifier, manufacturer, description)** calls the constructor **public Part(string identifier, string manufacturer, string description)** which is defined in the class **Part**. Through this process the object variables defined in the base class are initiated with their initial values. After calling the basecalls constuctor, in the code block of the Engine constructor we set the proper value for the object variable **engineType**.


*The **base** call bears some resemblance to the **this** call in a constructor (i.e. when overloading a constructor); **this** is used to call a constructor of this class, while **base** is used to call a constructor of the base class. If a constructor uses the constructor of the base class, so **base** is called in it, the base call must be on the definition line of the constructor. This is similar to the case with calling **this** (must also be the definition line of the constructor).*

Since the class Engine extends the class Part, it has at its disposal all the methods that the class Part offers. You can create instances of the class Engine the same way you can of any other class.

```cpp
static void Main(string[] args)
{
  Engine engine = new Engine("combustion", "hz", "volkswagen", "VW GOLF 1L 86-91");
  Console.WriteLine(engine.engineType);
  Console.WriteLine(engine.identifier);
  Console.WriteLine(engine.manufacturer);
  Console.WriteLine(engine.description);
}
```

```console
combustion
hz
volkswagen
VW GOLF 1L 86-91
```

As you can see, the class **Engine** has all the methods that are defined in the class **Part**.

## Access modifiers private, protected, and public

Private members are visible only in derived classes that are nested in their base class. Otherwise, they are not visible in derived classes. So, from the Engine class there would be no way to directly access the variables identifier, manufacturer, and description,if they were defined private in the base class Part. Now they are public, and as such usable from the derived class.

NOTICE! We have not defined **set** for our variables in **Part**. This means, that the derived class **Engine** cannot set the values for the variables, only **get** them.

A derived class sees everything that is defined with the **public** modifier in the base class. IF we want to define some variables or methods that are visible to the derived classes but invisible to everything else, we can use the access modifier **protected** to achieve this.

## Calling the constructor of the base class

You use the keyword **base** to call the constructor of the base class. The call receives as parameters the types of values that the base class constructor requires. If there are multiple constructors in the base class, the parameters of the base call dictate which of them is used.

When the constructor (of the derived class) is called, the variables defined in the base class are initialized. The events that occur during the constructor call are practically identical to what happens with a normal constructor call. If the base class doesn't provide a non-parameterized constructor, there must always be an explicit call to the constructor of the base class in the constructors of the derived class.

We demonstrate in the example below how to call **this** and **base**. The class **Baseclass** includes an object variable and two constructors. One of them calls the other constructor with the **this** keyword. The class DerivedClass includes a parameterized constructor, but it has no object variables. The constructor of DerivedClass calls the parameterized constructor of the base class.

```cpp
namespace sandbox
{
  public class BaseClass
  {
    private string objectVariable;

    public BaseClass() : this("Example")
    {
    }

    public BaseClass(string value)
    {
      this.objectVariable = value;
    }

    public override string ToString()
    {
      return this.objectVariable;
    }
  }
}
```

```cpp
namespace sandbox
{
  public class DerivedClass : BaseClass
  {
    public DerivedClass() : base("Derived Class")
    {
    }
  }
}
```

```cpp
BaseClass bas = new BaseClass();
DerivedClass der = new DerivedClass();

Console.WriteLine(bas);
Console.WriteLine(der);
```

```console
Example
Derived Class
```

## Calling a base class method

You can call the methods defined in the base class by prefixing the call with base, just as you can call the methods defined in this class by prefixing the call with this. For example, when overriding the ToString method, you can call the base class's definition of that method in the following manner:

```cpp
public override string ToString()
{
  return "override: " + base.ToString();
}
```

This would make our previous example print look like this: 

```console
Example
override: Derived Class
```

## The actual type of an object dictates which method is executed

An object's type decides what the methods provided by the object are. Let's create a couple of examples for this.

```cpp
namespace sandbox
{
  public class Person
  {
    public string name { get; set; }
    public string address { get; set; }

    public Person(string name, string address)
    {
      this.name = name;
      this.address = address;
    }

    public override string ToString()
    {
      return this.name + ", " + this.address;
    }
  }
}
```

```cpp
namespace sandbox
{
  public class Student : Person
  {
    public int credits { get; set; }
    public Student() : base(name, address)
    {
      this.credits = 0;
    }

    public void Study()
    {
      this.credits++;
    }
  }
}
```
 If a reference to a **Student** type object is stored in a **Person type variable**, only the methods defined in the Person class (and its base class and interfaces) are available:

```cpp
Person ollie = new Student("Ollie", "6381 Hollywood Blvd. Los Angeles 90028");

Console.WriteLine(ollie.credits);       // DOESN'T WORK!
ollie.Study();              // DOESN'T WORK!
Console.WriteLine(ollie);   // ollie.ToString() WORKS
```

We get an error for the first two calls to **ollie**.

So an object has at its disposal the methods that relate to its type, and also to its base classes and interfaces. The Student object above offers the methods defined in the the classes Person and Object.

Let's give the Student their own ToString:

```cpp
public override string ToString()
{
  return base.ToString() + " credits: " + this.credits;
}
```

The class Person had already overriden the ToString method it inherited from the class Object, and now we override the ToString from the Person class. If we handle an object by some other type than its actual type, which version of the object's method is called?

In the following example, we'll have students that we refer to by variables of different types. Which version of the ToString method will be executed: the one defined in Objecct, Person, or Student?


```cpp
Student ollie = new Student("Ollie", "6381 Hollywood Blvd. Los Angeles 90028");
Console.WriteLine(ollie);
Person olliePerson = new Student("Ollie", "6381 Hollywood Blvd. Los Angeles 90028");
Console.WriteLine(olliePerson);
Object ollieObject = new Student("Ollie", "6381 Hollywood Blvd. Los Angeles 90028");
Console.WriteLine(ollieObject);

Object alice = new Student("Alice", "177 Stewart Ave. Farmington, ME 04938");
Console.WriteLine(alice);
```

```console
Ollie, 6381 Hollywood Blvd. Los Angeles 90028 credits: 0
Ollie, 6381 Hollywood Blvd. Los Angeles 90028 credits: 0
Ollie, 6381 Hollywood Blvd. Los Angeles 90028 credits: 0
Alice, 177 Stewart Ave. Farmington, ME 04938 credits: 0
```

The method to be executed is chosen based on the actual type of the object, which means the class whose constructor is called when the object is created. If the method has no definition in that class, the version of the method is chosen from the class that is closest to the actual type in the inheritance hierarchy.

Regardless of the type of the variable, the method that is executed is always chosen based on the actual type of the object. Objects are polymorphic, which means that they can be used via many different variable types. The executed method always relates to the actual type of the object. This phenomenon is called polymorphism.

Let's examine polymorphism with another example.

You could represent a point in two-dimensional coordinate system with the following class:

```cpp
namespace sandbox
{
  using System;
  public class Point
  {

    private int x;
    private int y;

    public Point(int x, int y)
    {
      this.x = x;
      this.y = y;
    }

    public int ManhattanDistanceFromOrigin()
    {
      return Math.Abs(x) + Math.Abs(y);
    }

    protected string Location()
    {
      return x + ", " + y;
    }

    public override string ToString()
    {
      return "(" + this.Location() + ") distance " + this.ManhattanDistanceFromOrigin();
    }
  }
}
```

The **Location** method is not meant for external use, which is why it is defined as protected. Derived classes will still be able to access the method. [**Manhattan distance**](http://en.wiktionary.org/wiki/Manhattan_distance) means the distance between two points if you can only travel in the direction of the coordinate axes. It is used in many navigation algorithms, for example.

A colored point is otherwise identical to a point, but it contains also a color that expressed as a string. Due to the similarity, we can create a new class by extending the class Point.

```cpp
namespace sandbox
{
  public class ColorPoint : Point
  {

    private string color;

    public ColorPoint(int x, int y, string color) : base(x, y)
    {
      this.color = color;
    }

    public override string ToString()
    {
      return base.ToString() + " color: " + color;
    }
  }
}
```

The class defines an object variable in which we store the color. The coordinates are already defined in the base class. We want the string representation to be the same as with points, but to also include information about the color. The overriden ToString method calls the ToString method of the base class, and adds to it the color of the point.

Next we'll add a few points to a list. Some of them are "normal" while others are color points. At the end of the example we'll print the points on the list. For each point, the ToString to be executed is determined by the actual type of the point, even though the list knows all the points by the Point type.

```cpp
static void Main(string[] args)
{
  List<Point> points = new List<Point>();
  points.Add(new Point(4, 8));
  points.Add(new ColorPoint(1, 1, "green"));
  points.Add(new ColorPoint(2, 5, "blue"));
  points.Add(new Point(0, 0));

  foreach (Point p in points)
  {
    Console.WriteLine(p);
  }
}
```

```console
(4, 8) distance 12
(1, 1) distance 2 color: green
(2, 5) distance 7 color: blue
(0, 0) distance 0
```

We also want to include a three-dimensional point in our program. Since it has no color information, let's derive it from the class **Point**.

```cpp
namespace sandbox
{
  using System;
  public class Point3D : Point
  {

    private int z;

    public Point3D(int x, int y, int z) : base(x, y)
    {
      this.z = z;
    }
    new protected string Location()
    {
      return base.Location() + ", " + z;    // the resulting string has the form "x, y, z"
    }
    new public int ManhattanDistanceFromOrigin()
    {
      // first ask the base for the distance based on x and y
      // and add the effect of the z coordinate to that result
      return base.ManhattanDistanceFromOrigin() + Math.Abs(z);
    }

    public override string ToString()
    {
      return "(" + this.Location() + ") distance " + this.ManhattanDistanceFromOrigin();
    }
  }
}
```

NOTICE! In our methods **Location** and **ManhattanDistanceFromOrigin** we use the keyword **new**, because we are overriding the methods from the base class. Without the keyword, we would get a warning.

```cpp
static void Main(string[] args)
{
  List<Point> points = new List<Point>();
  points.Add(new Point(4, 8));
  points.Add(new ColorPoint(1, 1, "green"));
  points.Add(new ColorPoint(2, 5, "blue"));
  points.Add(new Point3D(5, 2, 8));
  points.Add(new Point(0, 0));

  foreach (Point p in points)
  {
    Console.WriteLine(p);
  }
}
```

```console
(4, 8) distance 12
(1, 1) distance 2 color: green
(2, 5) distance 7 color: blue
(5, 2, 8) distance 15
(0, 0) distance 0
```

We notice that the **ToString** method in **Point3D** is exactly the same as the ToString of **Point**. Could we save some effort and not override ToString? The answer happens to be yes! The Point3D class is refined into this:

```cpp
namespace sandbox
{
  using System;
  public class Point3D : Point
  {

    private int z;

    public Point3D(int x, int y, int z) : base(x, y)
    {
      this.z = z;
    }
    new protected string Location()
    {
      return base.Location() + ", " + z;    // the resulting string has the form "x, y, z"
    }
    new public int ManhattanDistanceFromOrigin()
    {
      return base.ManhattanDistanceFromOrigin() + Math.Abs(z);
    }
  }
}
```

What happens in detail when we call the ToString method of a three-dimensional point? The execution advances in the following manner.

1. Look for a definition of ToString in the class Point3D. It does not exist, so the base class is next to be examined.
2. Look for a definition of ToString in the base class point. It can be found, so the code inside the implementation of the method is executed
  * so the exact code to be executed is **return "("+this.Location()+") distance " + this.ManhattanDistanceFromOrigin();**
  * the method Location is executed first
  * look for a definition of Location in the class Point3D. It can be found, so its code is executed.
  * This location calls the Location of the base class to calculate the result
  * next we look for a definition of **ManhattanDistanceFromOrigin** in the Point3D class. It's found and its code is then executed
  * Again, the method calls the similarly named method of the base class during its execution


As we can see, the sequence of events caused by the method call has multiple steps. The principle, however, is clear: The definition for the method is first searched for in the class definition of the actual type of the object. If it is not found, we next examine the base class. If the definition cannot be found there, either, we move on to the base class of this base class, etc...

## When is inheritance worth using?

Inheritance is a tool for building and specializing hierarchies of concepts; a derived class is always a special case of the base class. If the class to be created is a special case of an existing class, this new class could be created by extending the existing class. For example, in the previously discussed car part scenario an engine is a part, but an engine has extra functionality that not all parts have.

When inheriting, the derived class receives the functionality of the base class. If the derived class doesn't need or use some of the inherited functionality, inheritance is not justifiable. Classes that inherit will inherit all the methods and interfaces from the base class, so the derived class can be used in place of the base class wherever the base class is used. It's a good idea to keep the inheritance hierarchy shallow, since maintaining and further developing the hierarchy becomes more difficult as it grows larger. Generally speaking, if your inheritance hierarchy is more than 2 or 3 levels deep, the structure of the program could probably be improved.

Inheritance is not useful in every scenario. For instance, extending the class Car with the class Part (or Engine) would be incorrect. A car includes an engine and parts, but an engine or a part is not a car. More generally, if an object owns or is composed of other objects, inheritance should not be used.

When using inheritance, you should take care to ensure that the [**Single Responsibility Principle**](https://en.wikipedia.org/wiki/Single_responsibility_principle) holds true. There should only be one reason for each class to change. If you notice that inheriting adds more responsibilities to a class, you should form multiple classes of the class.

### Example of misusing inheritance

Let's consider a postal service and some related classes. **Customer** includes the information related to a customer, and the class **Order** that inherits from the Customer class and includes the information about the ordered item. The class Order also has a method called **PostalAddress** which represents the postal address that the order is shipped to.

```cpp
public class Customer
{
  public string name { get; set; }
  public string address { get; set; }

  public Customer(string name, string address)
  {
    this.name = name;
    this.address = address;
  }
}
``` 

```cpp
public class Order : Customer
{

  private string product;
  private string count;

  public Order(string product, string count, string name, string address) : base(name, address)
  {
    this.product = product;
    this.count = count;
  }

  public string PostalAddress()
  {
    return this.name + "\n" + this.address;
  }
}
```

Above inheritance is not used correctly. When inheriting, the derived class must be a special case of the base class; an order is definitely not a special case of a customer. The misuse shows itself in how the code breaks the single responsibility principle: the Order class is responsible both for maintaining the customer information and the order information.

The problem becomes very clear when we think of what a change in a customer's address would cause.

In the case that an address changes, we would have to change every order object that relates to that customer. This is hardly ideal. A better solution would be to encapsulate the customer as an object variable of the Order class. Thinking more closely on the semantics of an order, this seems intuitive. An order has a customer.

Let's modify the Order class so that it includes a reference to a Customer object.

```cpp
public class Order
{

  private Customer customer;
  private string product;
  private string count;

  public Order(Customer customer, string product, string count)
  {
    this.customer = customer;
    this.product = product;
    this.count = count;
  }

  public string PostalAddress()
  {
    return this.customer.name + "\n" + this.customer.address;
  }
}
```

This version of the Order class is better. The method PostalAddress uses the customer reference to obtain the postal address instead of inheriting the class Customer. This helps both the maintenance of the program and its concrete functionality.

Now if we need to change customer information, we don't have to change the order itself.

## Abstract classes

Sometimes, when planning a hierarchy of inheritance, there are cases when there exists a clear concept, but that concept is not a good candidate for an object in itself. The concept would be beneficial from the point of view of inheritance, since it includes variables and functionality that are shared by all the classes that would inherit it. On the other hand, you should not be able to create instances of the concept itself.

An abstract class combines interfaces and inheritance. You cannot create instances of them -- you can only create instances of derived classes of an abstract class. They can include normal methods which have a method body, but it's also possible to define abstract methods that only contain the method definition. Implementing the abstract methods is the responsibility of derived classes. Generally, abstract classes are used in situations where the concept that the class represents is not a clear independent concept. In such a case you shouldn't be able to create instances of it.

To define an abstract class or an abstract method the keyword abstract is used. An abstract class is defined with the phrase **public abstract class *NameOfClass***; an abstract method is defined by **public abstract returnType NameOfMethod**. Let's take a look at the following abstract class called **Operation**, which offers a structure for operations and executing them.

```cpp
namespace sandbox
{
  public abstract class Operation
  {

    public string name { get; }

    public Operation(string name)
    {
      this.name = name;
    }

    public abstract void Execute();
  }
}
```

The abstract class **Operation** works as a basis for implementing different actions. For instance, you can implement the plus operation by extending the **Operation** class in the following manner.

```cpp
namespace sandbox
{
  using System;
  public class PlusOperation : Operation
  {
    public PlusOperation() : base("PlusOperation")
    {
    }

    public override void Execute()
    {
      Console.Write("First number: ");
      int first = Convert.ToInt32(Console.ReadLine());
      Console.Write("Second number: ");
      int second = Convert.ToInt32(Console.ReadLine());

      Console.WriteLine("The sum of the numbers is " + (first + second));
    }
  }
}
```

Since all the classes that inherit from Operation have also the type **Operation**, we can create a user interface by using Operation type variables. Next we'll show the class **UserInterface** that contains a list of operations. It's possible to add operations to the UI dynamically.

```cpp
namespace sandbox
{
  using System;
  using System.Collections.Generic;
  public class UserInterface
  {

    private List<Operation> operations;

    public UserInterface()
    {
      this.operations = new List<Operation>();
    }

    public void AddOperation(Operation operation)
    {
      this.operations.Add(operation);
    }

    public void Start()
    {
      while (true)
      {
        PrintOperations();
        Console.WriteLine("Choice: ");

        string choice = Console.ReadLine();
        if (choice == "0")
        {
          break;
        }

        ExecuteOperation(choice);
        Console.WriteLine();
      }
    }

    private void PrintOperations()
    {
      Console.WriteLine("\t0: Stop");
      int i = 0;
      while (i < this.operations.Count)
      {
        string operationName = this.operations[i].name;
        Console.WriteLine("\t" + (i + 1) + ": " + operationName);
        i = i + 1;
      }
    }

    private void ExecuteOperation(string choice)
    {
      int operation = Convert.ToInt32(choice);

      Operation chosen = this.operations[operation -1];
      chosen.Execute();
    }
  }
}
```

```cpp
UserInterface userInterface = new UserInterface();
userInterface.AddOperation(new PlusOperation());

userInterface.Start();
```

```console
        0: Stop
        1: PlusOperation
Choice:
> 1
First number: 4
Second number: 5
The sum of the numbers is 9

        0: Stop
        1: PlusOperation
Choice:
> 0
```

The greatest difference between interfaces and abstract classes is that abstract classes can contain object variables and constructors in addition to methods. Since you can also define functionality in abstract classes, you can use them to define e.g. default behavior. In the user interface above storing the name of the operation used the functionality defined in the abstract **Operation** class.