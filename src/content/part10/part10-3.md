---
title: "Enum"
nav_order: 3
hidden: true
---

# Enumerated Type - Enum

If we know the possible values ​​of a variable in advance, we can use a class of type **enum**, i.e., enumerated type to represent the values. Enumerated types are their own type in addition to being normal classes and interfaces. An enumerated type is defined by the keyword **enum**. For example, the following Suit enum class defines four constant values: Diamond, Spade, Club and Heart.

```cpp
namespace Exercise001
{
  public enum Suit
  {
    Diamond,
    Spade,
    Club,
    Heart
  }
}
```

In its simplest form, enum lists the constant values ​​it declares, separated by a comma. Enum types, i.e., constants, are conventionally written with capital first letters.

An Enum is (usually) written in its own file, much like a class or interface.

The following is a Card class where the suit is represented by an enum:

```cpp
namespace Exercise001
{
  public class Card
  {
    public int value { get; }
    public Suit suit { get; }

    public Card(int value, Suit suit)
    {
      this.value = value;
      this.suit = suit;
    }

    public override string ToString()
    {
      return suit + " " + value;
    }
  }
}
```

The card is used in the following way:

```cpp
namespace Exercise001
{
  using System;

  class Program
  {
    static void Main(string[] args)
    {
      Card first = new Card(10, Suit.Heart);

      Console.WriteLine(first);

      if (first.suit == Suit.Spade)
      {
        Console.WriteLine("is a spade");
      }
      else
        Console.WriteLine("is not a spade");
    }
  }
}
```

```console
Heart 10
is not a spade
```

We see that the Enum values are outputted nicely! You can find out more about Enum from this [**Microsoft documentation**](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/enum).

Each enum field gets a unique number code, and they can be compared using the equals sign. Just as other classes in c#, these values also inherit the Object class and its Equals method. The Equals method compares this numeric identifier in enum types too.

The numeric identifier of an enum field value can be found by casting them into integers. The method actually returns an order (or indexing) number - if the enum value is presented first, its order number is 0. If its second, the order number is 1, and so on. For example

```cpp
Console.WriteLine((int)Suit.Spade);
Console.WriteLine((int)Suit.Diamond);
```

```console
1
0
```

