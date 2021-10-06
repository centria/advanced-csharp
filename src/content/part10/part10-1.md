---
title: "IComparable Interface"
nav_order: 1
hidden: false
---

# IComparable

In the previous section, we looked at interfaces in more general terms - let's now familiarize oruselves with one of C#'s ready interfaces. The [**IComparable interface**](https://docs.microsoft.com/en-us/dotnet/api/system.icomparable-1?view=netframework-4.8) defines the [**CompareTo**](https://docs.microsoft.com/en-us/dotnet/api/system.icomparable-1.compareto?view=netframework-4.8#System_IComparable_1_CompareTo__0_) method used to compare objects. If a class implements the IComparable interface, objects created from that class can be **Sort** using C#'s sorting algorithms.

The **CompareTo** method required by the IComparable interface gets as its parameter the object to which the "this" object is compared. If the "this" object comes before the object received as a parameter in terms of sorting order, the method should return a negative number. If, on the other hand, id "this" object comes after the object received as a parameter, the method should return a positive number. Otherwise, 0 is returned. The sorting resulting from the CompareTo method is called natural ordering.

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

Since returning a negative number from the **CompareTo()** is enough if the this object is smaller than the parameter object, and zero when the lengths are the same, the CompareTo method described above can also be implemented as follows.

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
public interface IIdentifiable {
    string getId();
}
```

We want to create a Person who is both identifiable and sortable. This can be achieved by implementing both of the interfaces. An example is provided below.

```cpp
public class Person : IIdentifiable, IComparable<Person> {
    public string name { get; }
    public string socialSecurityNumber { get; }

    public Person(string name, string socialSecurityNumber) {
        this.name = name;
        this.socialSecurityNumber = socialSecurityNumber;
    }

    public override string getId() {
        return this.socialSecurityNumber;
    }

    public int CompareTo(Person another) {
        return this.getId().CompareTo(another.getId());
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

    public override string getId() {
        return this.socialSecurityNumber;
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

    public override string getId() {
        return this.socialSecurityNumber;
    }

    public int CompareTo(Person another) {
      if (this.name == another.name)
      {
        return this.getId().CompareTo(another.getId());
      }
      return this.name.CompareTo(another.name);
    }
}
```

This way we can first check for the name equality and sort by name first, only after that by our socialSecurityNumber (in Finland that's also the birthday).