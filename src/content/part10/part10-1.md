---
title: "IComparable Interface"
nav_order: 1
hidden: false
---

# IComparable

In the previous section, we looked at interfaces in more general terms - let's now familiarize oruselves with one of C#'s ready interfaces. The [**IComparable interface**](https://docs.microsoft.com/en-us/dotnet/api/system.icomparable-1?view=net-5.0) defines the [**CompareTo**](https://docs.microsoft.com/en-us/dotnet/api/system.icomparable-1.compareto?view=net-5.0) method used to compare objects. If a class implements the IComparable interface, objects created from that class can be **Sort** using C#'s sorting algorithms.

The **CompareTo** method required by the IComparable interface gets as its parameter the object to which the "this" object is compared. If the "this" object comes before the object received as a parameter in terms of sorting order, the method should return a negative number. If, on the other hand, if "this" object comes after the object received as a parameter, the method should return a positive number. Otherwise, 0 is returned. The sorting resulting from the CompareTo method is called natural ordering.

Let's take a look at this with the help of a **Member** class that represents a child or youth who belongs to a club. Each club member has a name and height. The club members should go to eat in order of height, so the Member class should implement the IComparable interface. The IComparable interface takes as its type parameter the class that is the subject of the comparison. We'll use the same Member class as the type parameter.


```cpp
namespace Exercise001
{
  // IComparable is in System
  using System;
  // Implement IComparable<Member>
  // Explicit comparison to Member, not other objects
  public class Member : IComparable<Member>
  {
    public string name { get; }
    public int height { get; }

    // Basic constructor
    public Member(string name, int height)
    {
      this.name = name;
      this.height = height;
    }

    // CompareTo Member
    // For this we implement IComparable<Member>
    // With just IComparable, we would compare objects
    // With CompareTo(object obj)
    public int CompareTo(Member member)
    {
      // If compared member is null, return 1
      // "this" comes after null
      if (member == null)
      {
        return 1;
      }
      // If height is equal, return 0
      // They are now equal in comparison
      if (this.height == member.height)
      {
        return 0;
      }
      // If this height is more
      // Return 1
      // "this" comes after compared member
      else if (this.height > member.height)
      {
        return 1;
      }
      // As all other options have been done
      // Return -1
      // "this" comes before compared member
      else
      {
        return -1;
      }
    }

    // Basic ToString
    public override string ToString()
    {
      return this.name + " (" + this.height + ")";
    }
  }
}
```

The CompareTo method required by the interface returns an integer that informs us of the order of comparison.

Since returning a negative number from the **CompareTo()** is enough if the this object is smaller than the parameter object, and zero when the heights are the same, the CompareTo method described above can also be implemented as follows.

```cpp
public int CompareTo(Member member)
{
  return this.height - member.height;
}
```

Since the Member class now implements the IComparable interface, it is possible to sort a list of members by using the **Sort** method. In fact, objects of any class that implements the IComparable interface can be sorted using the **Sort** method. For example, strings and integers implement IComparable.

Sorting club members is straightforward now.

```cpp
// List of Members
List<Member> member = new List<Member>();
// Add three regular members
member.Add(new Member("mikael", 182));
member.Add(new Member("matti", 187));
member.Add(new Member("ada", 184));
// Add null to show the sorting of null
member.Add(null);

// Print each member
member.ForEach(Console.WriteLine);

Console.WriteLine("Let's sort the members:");

// Sort the list
member.Sort();

// Print each member
member.ForEach(Console.WriteLine);
```

```console
mikael (182)
matti (187)
ada (184)

Let's sort the members:

mikael (182)
ada (184)
matti (187)
```

A class can implement multiple interfaces. Multiple interfaces are implemented by separating the implemented interfaces with commas (public class ... : *IFirstInterface*, *ISecondInterface* ...). Implementing multiple interfaces requires us to implement all the of the methods whose implementations are required by the interfaces.

Say we have the following **IIdentifiable** interface.

```cpp
public interface IIdentifiable
{
    string socialSecurityNumber { get; }
}
```

We want to create a Person who is both identifiable and sortable. This can be achieved by implementing both of the interfaces. An example is provided below.

```cpp
public class Person : IIdentifiable, IComparable<Person>
{
    public string name { get; }
    public string socialSecurityNumber { get; }

    public Person(string name, string socialSecurityNumber)
    {
        this.name = name;
        this.socialSecurityNumber = socialSecurityNumber;
    }

    public int CompareTo(Person another)
    {
        return this.socialSecurityNumber.CompareTo(another.socialSecurityNumber);
    }
}
```

Let us examine a situation, where we had bit of an erronous way of comparing items, i.e. by their name:

```cpp
public class Person : IIdentifiable, IComparable<Person> {
    public string name { get; }
    public string socialSecurityNumber { get; }

    public Person(string name, string socialSecurityNumber) {
        this.name = name;
        this.socialSecurityNumber = socialSecurityNumber;
    }

    public int CompareTo(Person another) {
        return this.name.CompareTo(another.name)
    }
}
```

This is not of course reasonable, as there are people with the same name. The logic is still quite repairable, as we could have a secondary comparison. If we want to stick as the name being the first sorting point and the socialSecurityNumber as secondary, we could do the following:


```cpp
public class Person : IIdentifiable, IComparable<Person> {
    public string name { get; }
    public string socialSecurityNumber { get; }

    public Person(string name, string socialSecurityNumber) {
        this.name = name;
        this.socialSecurityNumber = socialSecurityNumber;
    }

    public int CompareTo(Person another) {
      if (this.name == another.name)
      {
        return this.socialSecurityNumber.CompareTo(another.socialSecurityNumber);
      }
      return this.name.CompareTo(another.name);
    }
}
```

This way we can first check for the name equality and sort by name first, only after that by our socialSecurityNumber (in Finland that's also the birthday).

# Exercises

<Exercise title={'001 Wage Order'}>

You are provided with the class **Human**. A human has a name and wage information. Implement the interface **IComparable** in a way, that the **CompareTo**-method sorts the humans according to wage from biggest to smallest salary. The Program.cs already contains the following code for trying out your method.

```cpp
List<Human> humans = new List<Human>();
humans.Add(new Human("Merja", 500));
humans.Add(new Human("Pertti", 80));
humans.Add(new Human("Matti", 150000));

// Sorts the list when your ComparedTo works
// Sort uses CompareTo internally
humans.Sort();
humans.ForEach(Console.WriteLine);
```

```console
Matti 150000
Merja 500
Pertti 80
```


</Exercise>

<Exercise title={'002 Students in Alphabetical Order'}>

The exercise template includes the class **Student**, which has a name. Implement the **IComprable**-interface in the Student-class in a way, that the CompareTo-method sorts the students in alphabetical order based on their names.

<Note>
The name of the Student is a string, which implements Comparable itself. You may use it's CompareTo-method for your advantage when implementing the method for the Student-class. Note that string.CompareTo is case sensitive, but at this exercise, we don't have to worry about it.
</Note>

```cpp
Student first = new Student("jamo");
Student second = new Student("jamo1");

// Should print -1
Console.WriteLine(first.CompareTo(second));
``` 

</Exercise>

<Exercise title={'003 Literacy Comparison'}>

Write a program that reads user input for books and their age recommendations.

The program asks for new books until the user gives an empty string (only presses enter). After this, the program will print the amount and names of the books.

* Section 1

Implement the reading and printing the books first in the **TextInterface**, the ordering of them doesn't matter yet.

```console
Input the name of the book, empty stops: 
> The Ringing Lullaby Book 
Input the age recommendation:
> 0
Input the name of the book, empty stops:
> The Exiting Transpotation Vehicles 
Input the age recommendation:
> 0
Input the name of the book, empty stops:
> The Snowy Forest Calls 
Input the age recommendation:
> 12
Input the name of the book, empty stops: 
> Litmanen 10 
Input the age recommendation:
> 10
Input the name of the book, empty stops:

4 books in total.

Books: 
The Ringing Lullaby Book (recommended for 0 year-olds or older) 
The Exiting Transpotation Vehicles (recommended for 0 year-olds or older) 
The Snowy Forest Calls (recommended for 12 year-olds or older) 
Litmanen 10 (recommended for 10 year-olds or older)
```

* Section 2

Expand your program so, that the books are sorted based on their age recommendations when they are printed. If two (or more) books share the same age recommendations the order between them does not matter. (i.e. create ComparedTo in Book class)


```console
Input the name of the book, empty stops: 
> The Ringing Lullaby Book 
Input the age recommendation:
> 0
Input the name of the book, empty stops:
> The Exiting Transpotation Vehicles 
Input the age recommendation:
> 0
Input the name of the book, empty stops:
> The Snowy Forest Calls 
Input the age recommendation:
> 12
Input the name of the book, empty stops: 
> Litmanen 10 
Input the age recommendation:
> 10
Input the name of the book, empty stops:

4 books in total.

Books: 
The Ringing Lullaby Book (recommended for 0 year-olds or older) 
The Exiting Transpotation Vehicles (recommended for 0 year-olds or older) 
Litmanen 10 (recommended for 10 year-olds or older) 
The Snowy Forest Calls (recommended for 12 year-olds or older)
```

* Section 3

Expand your program, so that it sorts the books with the same age recommendation based on their name alphabetically. 

<Note>
HINT! Use an if for the age recommendations!
</Note>

```console
Input the name of the book, empty stops: 
> The Ringing Lullaby Book 
Input the age recommendation:
> 0
Input the name of the book, empty stops:
> The Exiting Transpotation Vehicles 
Input the age recommendation:
> 0
Input the name of the book, empty stops:
> The Snowy Forest Calls 
Input the age recommendation:
> 12
Input the name of the book, empty stops: 
> Litmanen 10 
Input the age recommendation:
> 10
Input the name of the book, empty stops:

4 books in total.

Books: 
The Exiting Transpotation Vehicles (recommended for 0 year-olds or older) 
The Ringing Lullaby Book (recommended for 0 year-olds or older) 
Litmanen 10 (recommended for 10 year-olds or older) 
The Snowy Forest Calls (recommended for 12 year-olds or older)
```

</Exercise>