---
title: "Interfaces"
nav_order: 92
hidden: false
---

# Interfaces

We can use interfaces to define behavior that's required from a class, i.e., its methods. They're defined the same way that regular C# classes are, but **"public interface I..."** is used instead of **"public class ... "** at the beginning of the class. Interfaces define behavior through method names and their return values. However, they don't always include the actual implementations of the methods. A visibility attribute on interfaces is not marked explicitly as they're always public. Let's examine a **IReadable** interface that describes readability.

```cpp
namespace Exercise001
{
  public interface IReadable
  {
    string Read();
  }
}
```

<Note>
Notice how we started the name of the interface with a capital I? 
That's a naming convention for C#, and all the interfaces should start with one.
</Note>

The IReadable interface declares a Read() method, which returns a string-type object. IReadable defines certain behavior: for example, a text message or an email may be readable.

The classes that implement the interface decide how the methods defined in the interface are implemented. A class implements the interface by adding the keyword implements after the class name followed by the name of the interface being implemented. Let's create a class called **TextMessage** that implements the IReadable interface.

```cpp
namespace Exercise001
{
  public class TextMessage : IReadable
  {
    public string sender { get; }
    private string content;

    public TextMessage(string sender, string content)
    {
      this.sender = sender;
      this.content = content;
    }

    public string Read()
    {
      return this.content;
    }
  }
}
```

Since the **TextMessage** class implements the Readable interface (**public class TextMessage : Readable**), the TextMessage class must contain an implementation of the **public string Read()** method. Implementations of methods defined in the interface must always have public as their visibility attribute, and are public by default.

When a class implements an interface, it signs an agreement. The agreement dictates that the class will implement the methods defined by the interface. If those methods are not implemented in the class, the program will not function.

The interface defines only the names, parameters, and return values ​​of the required methods. The interface, however, does not have a say on the internal implementation of its methods. It is the responsibility of the programmer to define the internal functionality for the methods.

In addition to the TextMessage class, let's add another class that implements the **IReadable** interface. The **EBook** class is an electronic implementation of a book that containing the title and pages of a book. The ebook is read page by page, and calling the **public String read()** method always returns the next page as a string.

```cpp
namespace Exercise001
{
  using System.Collections.Generic;
  public class EBook : IReadable
  {
    public string name { get; }
    private List<string> pages;
    private int pageNumber;

    public EBook(string name, List<string> pages)
    {
      this.name = name;
      this.pages = pages;
      this.pageNumber = 0;
    }

    public int Pages()
    {
      return this.pages.Count;
    }

    public string Read()
    {
      string page = this.pages[this.pageNumber];
      NextPage();
      return page;
    }

    private void NextPage()
    {
      this.pageNumber = this.pageNumber + 1;
      if (this.pageNumber % this.pages.Count == 0)
      {
        this.pageNumber = 0;
      }
    }
  }
}
```

Objects can be instantiated from interface-implementing classes just like with normal classes. They're also used in the same way, for instance, as an List's type.

```cpp
TextMessage message = new TextMessage("teacher", "It's going great!");
Console.WriteLine(message.Read());

List<TextMessage> txtmsg = new List<TextMessage>();
txtmsg.Add(new TextMessage("private number", "I hid the body."));
```

```console
It's going great!
```

```cpp
List<string> pages = new List<string>();
pages.Add("Split your method into short, readable entities.");
pages.Add("Seperate the user-interface logic from the application logic.");
pages.Add("Always program a small part initially that solves a part of the problem.");
pages.Add("Practice makes the master. Try different out things for yourself and work on your own projects.");

EBook book = new EBook("Tips for programming.", pages);

int page = 0;
while (page < book.Pages())
{
  Console.WriteLine(book.Read());
  page = page + 1;
}
```

```console
Split your method into short, readable entities.
Seperate the user-interface logic from the application logic.
Always program a small part initially that solves a part of the problem.
Practice makes the master. Try different out things for yourself and work on your own projects.
```

## Interface as Variable Type

The type of a variable is always stated as its introduced. There are two kinds of type, the value-type variables (int, double, ...) and reference-type variables (all objects). We've so far used an object's class as the type of a reference-type variable.

```cpp
string str = "string-object";
TextMessage message = new TextMessage("teacher", "many types for the same object");
```

An object's type can be other than its class. For example, the type of the **EBook** class that implements the **IReadable** interface is both **EBook** and **IReadable**. Similarly, the text message also has multiple types. Because the **TextMessage** class implements the **IReadable** interface, it has a **IReadable** type in addition to the **TextMessage** type.

```cpp
TextMessage message = new TextMessage("teacher", "Something cool's about to happen");
IReadable readable = new TextMessage("teacher", "The text message is IReadable!");
```

You cannot, however, do this:

```cpp
List<string> pages = new List<string>();
pages.Add("A method can call itself.");

IReadable book = new EBook("Introduction to Recursion", pages);

int page = 0;
while (page < book.Pages())
{
  Console.WriteLine(book.Read());
  page = page + 1;
} 
```

```console
Program.cs(16,26): error CS1061: 'IReadable' does not contain a definition for 'Pages' and no accessible extension method 'Pages' accepting a first argument of type 'IReadable' could be found (are you missing a using directive or an assembly reference?) [. . .]

The build failed. Fix the build errors and run again.
```

As the interface **IReadable** does not have the method **Pages()** from the class **EBook**, the example above does not work. The inheritance of methods only goes one way... This would work:

```cpp
List<IReadable> readingList = new List<IReadable>();

readingList.Add(new TextMessage("teacher", "never been programming before..."));
readingList.Add(new TextMessage("teacher", "gonna love it i think!"));
readingList.Add(new TextMessage("teacher", "give me something more challenging! :)"));
readingList.Add(new TextMessage("teacher", "you think i can do it?"));
readingList.Add(new TextMessage("teacher", "up here we send several messages each day"));


List<string> pages = new List<string>();
pages.Add("A method can call itself.");

readingList.Add(new EBook("Introduction to Recursion.", pages));

foreach (IReadable readable in readingList)
{
  Console.WriteLine(readable.Read());
}
```

```console
never been programming before...
gonna love it i think!
give me something more challenging! :)
you think i can do it?
up here we send several messages each day
A method can call itself.
```

Note that although the **EBook** class that inherits the **IReadable** interface class is always of the interface's type, not all classes that implement the IReadable interface are of type EBook. You can assign an object created from the EBook class to a IReadable-type variable, but it does not work the other way without a separate type conversion.

```cpp
IReadable readable = new TextMessage("teacher", "TextMessage is Readable!"); // works
TextMessage message = readable; // doesn't work

TextMessage castMessage = (TextMessage)readable; // works if, and only if, readable is of text message type
```

Type conversion succeeds if, and only if, the variable is of the type that it's being converted to. Type conversion is not considered good practice, and one of the few situation where it's use is appropriate is in the implementation of the **Equals** method.

## Interfaces as Method Parameters

The true benefits of interfaces are reaped when they are used as the type of parameter provided to a method. Since an interface can be used as a variable's type, it can also be used as a parameter type in method calls. For example, the **Print** method in the **Printer** class of the class below gets a variable of type read.

```cpp
public class Printer
{
  public void Print(IReadable readable)
  {
    Console.WriteLine(readable.Read());
  }
}
```

The value of the **Print** method of the printer class lies in the fact that it can be given any class that implements the **IReadable** interface as a parameter. Were we to call the method with any object instantiate from a class that inherits the IReadable class, the method would function as desired.

```cpp
TextMessage message = new TextMessage("ope", "Oh wow, this printer knows how to print these as well!");

List<string> pages = new List<string>();
pages.Add("Values common to both {1, 3, 5} and {2, 3, 4, 5} are {3, 5}.");
Ebook book = new Ebook("Introduction to University Mathematics.", pages);

Printer printer = new Printer();
printer.Print(message);
printer.Print(book);
```

```console
Oh wow, this printer knows how to print these as well!
Values common to both {1, 3, 5} and {2, 3, 4, 5} are {3, 5}.
```

Let's make another class called **ReadingList** to which we can ad interesting things to read. The class has a List instance as an instance variable, where the things to be read are added. Adding to the reading list is done using the add method, which receives a IReadable-type object as its parameter.


```cpp
public class ReadingList
{
  private List<IReadable> readables;

  public ReadingList()
  {
    this.readables = new List<IReadable>();
  }

  public void Add(IReadable readable)
  {
    this.readables.Add(readable);
  }

  public int ToRead()
  {
    return this.readables.Count;
  }
}
```

Reading lists are usually readable, so let's have the **ReadingList** class implement the **IReadable** interface. The **Read** method of the reading list reads all the objects in the readables list, and adds them to the string returned by the Read() method one-by-one.

```cpp
public class ReadingList : IReadable
{
  private List<IReadable> readables;

  public ReadingList()
  {
    this.readables = new List<IReadable>();
  }

  public void Add(IReadable readable)
  {
    this.readables.Add(readable);
  }

  public int ToRead()
  {
    return this.readables.Count;
  }

  public string Read()
  {
    string read = "";

    foreach (IReadable readable in this.readables)
    {
      read = read + readable.Read() + "\n";
    }

    // once the reading list has been read, we empty it
    this.readables.Clear();
    return read;
  }
}
```

```cpp
ReadingList jonisList = new ReadingList();
jonisList.Add(new TextMessage("heikki", "have you written the tests yet?"));
jonisList.Add(new TextMessage("heikki", "have you checked the submissions yet?"));

Console.WriteLine("Joni's to-read: " + jonisList.ToRead());
```

```console
Joni's to-read: 2
```

Because the **ReadingList** is of type **IReadable**, we're able to add **ReadingList** objects to the reading list. In the example below, Joni has a lot to read. Fortunately for him, Verna comes to the rescue and reads the messages on Joni's behalf.

```cpp
ReadingList jonisList = new ReadingList();
int i = 0;
while (i < 1000)
{
  jonisList.Add(new TextMessage("heikki", "did you test already?"));
  i = i + 1;
}

Console.WriteLine("Joni's to-read: " + jonisList.ToRead());
Console.WriteLine("Delegating the reading to Verna");

ReadingList vernasList = new ReadingList();
vernasList.Add(jonisList);
vernasList.Read();

Console.WriteLine();
Console.WriteLine("Joni's to-read: " + jonisList.ToRead());
```

```console
Joni's to-read: 1000
Delegating the reading to Verna

Joni's to-read: 0
```

The **Read** method called on Verna's list goes through all the **IReadable** objects and calls the Read method on them. When the Read method is called on Verna's list it also goes through Joni's reading list that's included in Verna's reading list. Joni's reading list is run through by calling its Read method. At the end of each Read method call, the read list is cleared. In this way, Joni's reading list empties when Verna reads it.

As you notice, the program already contains a lot of references. It's a good idea to draw out the state of the program step-by-step on paper and outline how the read method call of the vernasList object proceeds!

## Interface as a return type of a method


Let's create some classes and an interface for our next example. Our interface, **IStorable**, dictates a method **Weight**.

```cpp
public interface IStorable
{
  double Weight();
}
```

Then we can have a couple of items, which implement the interface.

```cpp
public class CD : IStorable
{
  public string artist;
  public string name;
  public double weight;
  public int year;
  public CD(string artist, string name, int year)
  {
    this.artist = artist;
    this.name = name;
    this.weight = 0.1;
    this.year = year;
  }

  public double Weight()
  {
    return this.weight;
  }

  public override string ToString()
  {
    return this.artist + " - " + this.name + " (" + this.year + ")";
  }
}
```

```cpp
public class Book : IStorable
{
  public string author;
  public string name;
  public double weight;
  public Book(string author, string name, double weight)
  {
    this.author = author;
    this.name = name;
    this.weight = weight;
  }

  public double Weight()
  {
    return this.weight;
  }

  public override string ToString()
  {
    return this.author + ": " + this.name;
  }
}
```

We could use them like this:

```cpp
Book book1 = new Book("Fedor Dostojevski", "Crime and Punishment", 2);
Book book2 = new Book("Robert Martin", "Clean Code", 1);
Book book3 = new Book("Kent Beck", "Test Driven Development", 0.5);

CD cd1 = new CD("Pink Floyd", "Dark Side of the Moon", 1973);
CD cd2 = new CD("Wigwam", "Nuclear Nightclub", 1975);
CD cd3 = new CD("Rendezvous Park", "Closer to Being Here", 2012);

Console.WriteLine(book1);
Console.WriteLine(book2);
Console.WriteLine(book3);
Console.WriteLine(cd1);
Console.WriteLine(cd2);
Console.WriteLine(cd3);
```

```console
Fedor Dostojevski: Crime and Punishment
Robert Martin: Clean Code
Kent Beck: Test Driven Development
Pink Floyd - Dark Side of the Moon (1973)
Wigwam - Nuclear Nightclub (1975)
Rendezvous Park - Closer to Being Here (2012)
```

But that's not very interesting, and we already know that. Let's do something more fun.

Interfaces can be used as return types in methods -- just like any other "regular" variable types. In the next example is a class **Factory** that can be asked to construct differerent objects that implement the **IStorable** interface.

```cpp
public class Factory
{

  public Factory()
  {
    // Note that there is no need to write an empy constructor without
    // paramatesr if the class doesn't have other constructors.
    // In these cases C# automatically creates a default constructor for
    // the class which is an empty constructor without parameters.
  }

  public IStorable ProduceNew()
  {
    // The Random-object used here can be used to draw random numbers.
    Random ticket = new Random();
    // Draws a number from the range [0, 4[. The number will be 0, 1, 2, or 3.
    int number = ticket.Next(0, 4);

    if (number == 0)
    {
      return new CD("Pink Floyd", "Dark Side of the Moon", 1973);
    }
    else if (number == 1)
    {
      return new CD("Wigwam", "Nuclear Nightclub", 1975);
    }
    else if (number == 2)
    {
      return new Book("Robert Martin", "Clean Code", 1);
    }
    else
    {
      return new Book("Kent Beck", "Test Driven Development", 0.7);
    }
  }
}
```

The Factory can be used without excatly knowing what differend kind of IStorable classes exist. In the next example there is a class Packer that gives a list of things. A packer knows a factory which is used to create the things:

```cpp
public class Packer
{
  private Factory factory;

  public Packer()
  {
    this.factory = new Factory();
  }

  public List<IStorable> GiveAListOfThings()
  {
    List<IStorable> list = new List<IStorable>();

    int i = 0;
    while (i < 10)
    {
      IStorable newThing = factory.ProduceNew();
      list.Add(newThing);

      i = i + 1;
    }

    return list;
  }
}
```

Because the packer does not know the classes that implement the interface **IStorable**, one can add new classes that impement the interface without changing the packer. The next example creates a new class that implements the **IStorable** interface ChocolateBar. The factory has been changed so that it creates chocolate bars in addition to books and cds. The class **Packer** works without changes with the updated version of the factory.

```cpp
public class ChocolateBar : IStorable
{
  // Because C#'s automatically generated default constructor is enough,
  // we don't need a constructor

  public double Weight()
  {
    return 0.2;
  }

  public override string ToString()
  {
    return "Candybar, weight: " + Weight();
  }
}
```

```cpp
public class Factory
{
  public IStorable ProduceNew()
  {
    Random ticket = new Random();
    // increase the range by one
    int number = ticket.Next(0, 5);

    if (number == 0)
    {
      return new CD("Pink Floyd", "Dark Side of the Moon", 1973);
    }
    else if (number == 1)
    {
      return new CD("Wigwam", "Nuclear Nightclub", 1975);
    }
    else if (number == 2)
    {
      return new Book("Robert Martin", "Clean Code", 1);
    }
    else if (number == 3)
    {
      return new Book("Kent Beck", "Test Driven Development", 0.7);
    }
    else
    {
      return new ChocolateBar();
    }
  }
}
```

Using interfaces in programming enables reducing dependencies between classes. In the previous example the Packer does not depend on the classes that implement the **IStorable** interface. Instead, it just depends on the interface. This makes possible to add new classes that implement the interface without changing the **Packer** class. What is more, adding new **IStorable** classes doesn't affect the classes that use the **Packer** class.

Our could works something like this now:

```cpp
Packer packer = new Packer();

foreach (IStorable item in packer.GiveAListOfThings())
{
  Console.WriteLine(item);
}
```

```console
Kent Beck: Test Driven Development
Pink Floyd - Dark Side of the Moon (1973)
Pink Floyd - Dark Side of the Moon (1973)
Wigwam - Nuclear Nightclub (1975)
Pink Floyd - Dark Side of the Moon (1973)
Wigwam - Nuclear Nightclub (1975)
Candybar, weight: 0.2
Wigwam - Nuclear Nightclub (1975)
Wigwam - Nuclear Nightclub (1975)
Candybar, weight: 0.2
```

## Interfaces and properties

So far, we have had only methods in our interfaces. What if we wanted to dictate properties? They work quite similarly as the methods, and for example our IStorable could be much cleaner with a property, rather than with a method. Let's take a look:

```cpp
public interface IStorable
{
  double weight { get; set; }
}
```

As we now implement classes which are IStorable, they need to have a property of double weight, with get and set defined. Now our Book, for example, would look like this:

```cpp
public class Book : IStorable
{
  public string author;
  public string name;
  public double weight {get; set;}
  public Book(string author, string name, double weight)
  {
    this.author = author;
    this.name = name;
    this.weight = weight;
  }

  public override string ToString()
  {
    return this.author + ": " + this.name;
  }
}
```

How do you know, which one to use in which case? This comes with practice. For example, our books are quite fine with just having the public property. But what if we needed a more complex weighing system? For example, we could have a container which holds only a certain amount of weight. In such a case, we would need some logic and a method could be justified.

## Generic Interfaces and more reading.

The C# offers multiple interfaces that are built-in, and we have actually used them. You can read more about them [**from here**](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/generics/generic-interfaces) or [**even more from here**](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic?view=net-5.0). Both links lead to Microsoft documentation site, and give a glimpse on how some of the generic interfaces are implemented.


# Exercises


<Exercise title={'005 Taco Boxes'}>

In the exercise template you'll find **Interface ITacoBox** ready for your use. It has the following methods:

the method **int TacosRemaining()** return the number of tacos remaining in the box.
the method **void Eat()** reduces the number of tacos remaining by one. The number of tacos remaining can't become negative.

* Implement the class **TripleTacoBox**, that implements the TacoBox interface. TripleTacobox has a constructor with no parameters. TripleTacobox has an object variable tacos which is initialized at 3 when the constructor is called.

* Implement the class **CustomTacoBox**, that implements the TacoBox interface. CustomTacoBox has a constructor with one parameter defining the initial number of tacos in the **CustomTacoBox(int tacos)**.

```cpp
TripleTacoBox trip = new TripleTacoBox();
Console.WriteLine(trip.TacosRemaining());
trip.Eat();
Console.WriteLine(trip.TacosRemaining());
trip.Eat();
Console.WriteLine(trip.TacosRemaining());
trip.Eat();
Console.WriteLine(trip.TacosRemaining());
// Try to Eat one too much
trip.Eat();
Console.WriteLine(trip.TacosRemaining());

Console.WriteLine();

CustomTacoBox custom = new CustomTacoBox(2);
Console.WriteLine(custom.TacosRemaining());
custom.Eat();
Console.WriteLine(custom.TacosRemaining());
custom.Eat();
Console.WriteLine(custom.TacosRemaining());
// Try to Eat one too much
custom.Eat();
Console.WriteLine(custom.TacosRemaining());
```

```console
3
2
1
0
0

2
1
0
0
```

</Exercise>

<Exercise title={'006 Interface in a Box'}>

Moving houses requires packing all your belongings into boxes. Let's imitate that with a program. The program will have boxes, and items to pack into those boxes. All items must implement the following Interface:

```cpp
public interface IPackable {
    int Weight();
}
```
* Section 1

Create classes **Book** and **Furniture**. Book has a constructor in which is given the author (string), name of the book (string) and the publication year (int). The weight of all books is 1 kg. Furniture has a constructor in which is given the type of furniture (string), color (string) and weight (int). Both of these should implement the interface **IPackable**. They also need a ToString each.

The classes should work as following:

```cpp
Book book1 = new Book("Fedor Dostojevski", "Crime and Punishment", 1866);
Book book2 = new Book("Robert Martin", "Clean Code", 2008);
Book book3 = new Book("Kent Beck", "Test Driven Development", 2000);

Furniture sofa = new Furniture("Sofa", "Red", 20);
Furniture bed = new Furniture("Twin bed", "White", 15);
Furniture table = new Furniture("Dining room table", "Oak", 30);

List<IPackable> packages = new List<IPackable>();
packages.Add(book1);
packages.Add(book2);
packages.Add(book3);
packages.Add(sofa);
packages.Add(bed);
packages.Add(table);

packages.ForEach(Console.WriteLine);
```

```console
Fedor Dostojevski: Crime and Punishment (1866)
Robert Martin: Clean Code (2008)
Kent Beck: Test Driven Development (2000)
Red Sofa - weight 20 kg
White Twin bed - weight 15 kg
Oak Dining room table - weight 30 kg
```

Notice that the weight for books is not printed.

* Section 2

Create a class called **Box**.  Items implementing the **IPackable** interface can be packed into a box. The Box constructor takes the maximum capacity of the box in kilograms as a parameter. The combined weight of all items in a box cannot be more than the maximum capacity of the box. **Box should also implement IPackable**, so you could have boxes inside boxes!

Below is an example of using a box:

```cpp
Book book1 = new Book("Fedor Dostojevski", "Crime and Punishment", 1866);
Book book2 = new Book("Robert Martin", "Clean Code", 2008);
Book book3 = new Book("Kent Beck", "Test Driven Development", 2000);

Furniture sofa = new Furniture("Sofa", "Red", 20);
Furniture bed = new Furniture("Twin bed", "White", 15);
Furniture table = new Furniture("Dining room table", "Oak", 30);

Box box = new Box(40);
box.Add(book1);
box.Add(book2);
box.Add(book3);
box.Add(sofa);
box.Add(bed);
box.Add(table);

Console.WriteLine(box);
```

```console
5 items, total weight 38 kg
```

<Note>The table did not fit in the box, as the maximum capacity of the box is 40.</Note>

Let's try some boxes inside boxes, as well:

```cpp
Book book1 = new Book("Fedor Dostojevski", "Crime and Punishment", 1866);
Book book2 = new Book("Robert Martin", "Clean Code", 2008);
Book book3 = new Book("Kent Beck", "Test Driven Development", 2000);

Furniture sofa = new Furniture("Sofa", "Red", 20);
Furniture bed = new Furniture("Twin bed", "White", 15);
Furniture table = new Furniture("Dining room table", "Oak", 30);

Box bookBox = new Box(5);
bookBox.Add(book1);
bookBox.Add(book2);
bookBox.Add(book3);

Console.WriteLine(bookBox);
Console.WriteLine();

Box movingVan = new Box(800);
movingVan.Add(bookBox);
movingVan.Add(sofa);
movingVan.Add(bed);
movingVan.Add(table);

Console.WriteLine(movingVan);
Console.WriteLine();

Box shippingContainer = new Box(3000);
shippingContainer.Add(movingVan);

Console.WriteLine(shippingContainer);
```

```console
3 items, total weight 3 kg

4 items, total weight 68 kg

1 items, total weight 68 kg
```


</Exercise>




<Exercise title={'007 Herds'}>

In this exercise we are going to create organisms and herds of organisms that can move around. To represent the locations of the organisms we'll use a two-dimensional coordinate system. Each position involves two numbers: x and y coordinates. The x coordinate indicates how far from the (i.e. point zero, where x = 0, y = 0) that position is horizontally. The y coordinate indicates the distance from the origin vertically. If you are not familiar with using a coordinate system, you can study the basics from e.g. [**Wikipedia**](https://en.wikipedia.org/wiki/Cartesian_coordinate_system).


The exercise base includes the interface **IMovable**, which represents something that can be moved from one position to another. The interface includes the method void move(int dx, int dy). The parameter dx tells how much the object moves on the x axis, and dy tells the distance on the y axis.

This exercise consists of you implementing the classes **Organism** and **Herd**, both of which are movable.

* Section 1

Create a class called **Organism** that implements the interface **IMovable**. An organism should know its own location (as x, y coordinates). The API for the class Organism is to be as follows:

* public Organism(int x, int y)

The class constructor that receives the x and y coordinates of the initial position as its parameters.

* public override string ToString()

Creates and returns a string representation of the organism. That representation should remind the following: "x: 3; y: 6". Notice that a semicolon is used to separate the coordinates.

* public void Move(int dx, int dy)

Moves the object by the values it receives as parameters. The dx variable contains the change to coordinate x, and the dy variable ontains the change to the coordinate y. For example, if the value of dx is 5, the value of the object variable x should be incremented by five.


Use the following code snippet to test the Organism class.


```cpp
Organism organism = new Organism(20, 30);
Console.WriteLine(organism);
organism.Move(-10, 5);
Console.WriteLine(organism);
organism.Move(50, 20);
Console.WriteLine(organism);
```

```console
x: 20; y: 30 
x: 10; y: 35 
x: 60; y: 55
```

* Section 2

Create a class called **Herd** that implements the interface **IMovable**. A herd consists of multiple objects that implement the Movable interface. They must be stored in e.g. a list data structure.

The Herd class must have the following API.

* public override string ToString()


Returns a string representation of the positions of the members of the herd, each on its own line.

* public void AddToHerd(IMovable movable)

Adds an object that implements the Movable interface to the herd.

* public void Move(int dx, int dy)

Moves the herd with by the amount specified by the parameters. Notice that here you have to move each member of the herd.

Test out your program with the sample code below:

```cpp
Herd herd = new Herd();
herd.AddToHerd(new Organism(57, 66));
herd.AddToHerd(new Organism(73, 56));
herd.AddToHerd(new Organism(46, 52));
herd.AddToHerd(new Organism(19, 107));
Console.WriteLine(herd);
herd.Move(2,2);
Console.WriteLine(herd);
```

```console
x: 57; y: 66 
x: 73; y: 56 
x: 46; y: 52 
x: 19; y: 107

x: 59; y: 68 
x: 75; y: 58 
x: 48; y: 54 
x: 21; y: 109

```

<Note>The ToString of a herd might end in a line change, and that is totally fine!</Note>

</Exercise>