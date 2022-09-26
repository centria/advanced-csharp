---
title: "Enum"
nav_order: 103
hidden: false
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

# Exercises

<Exercise title={'005 Sort Them Cards!'}>

The exercise template has a class that represents a playing card. Each card has a value and a suit. 

* Section 1

Card's value is represented as a number *2, 3, ..., 14* and its suit as *Club, Diamond, Heart or Spade*. Ace's value is 14. The value is represented with an integer, and the suit as an enum. Cards also have a method **ToString**, which can be used to print the value and the suit in a readable form.

New cards can be created like this:

```cpp
Card first = new Card(2, Suit.Diamond);
Card second = new Card(14, Suit.Spade);
Card third = new Card(12, Suit.Heart);

Console.WriteLine(first);
Console.WriteLine(second);
Console.WriteLine(third);
```

```console
Diamond 2
Spade A
Heart Q
```

<Note>In the ToString, make sure you have special returns for values 11 to 14 (J, Q, K and A).</Note>

* Section 2

Change the Card class to implement the **IComparable**. Implement the **CompareTo** method so that using it sorts the cards ascending by their value. If the cards being compared have the same value, they are sorted by *club first, diamond next, heart third, and spade last*, i.e. in the order of enums.

So, for this sorting, the least valuable card is two of clubs, and highest the ace of spades.

```cpp
Card first = new Card(2, Suit.Club);
Card second = new Card(14, Suit.Spade);
Card third = new Card(12, Suit.Heart);
Card fourth = new Card(14, Suit.Heart);
Card fifth = new Card(12, Suit.Diamond);

List<Card> list = new List<Card> { first, second, third, fourth, fifth };
list.Sort();
list.ForEach(Console.WriteLine);
```

```console
Club 2
Diamond Q
Heart Q
Heart A
Spade A
```

* Section 3

Create a class **Hand** to represent the cards in player's hand. Add the following to the class:

* **private List<Card\>** to store the cards
* **public void Add(Card card)** adds a card to the hand. If the card is already in the hand, someone is cheating, and the card should not be added. **Use a List to store the cards.**
* **public void Print()** prints the cards in hand as shown in the example below

```cpp
Hand hand = new Hand();

hand.Add(new Card(2, Suit.Diamond));
hand.Add(new Card(14, Suit.Spade));
hand.Add(new Card(12, Suit.Heart));
hand.Add(new Card(2, Suit.Spade));

hand.Print();
```

```console
Diamond 2
Spade A
Heart Q
Spade 2
```

* Section 4

Add a method **public void Sort()** to Hand class, which sorts the cards in the hand. After sorting, the cards are printed out in order:

```cpp
Hand hand = new Hand();

hand.Add(new Card(2, Suit.Diamond));
hand.Add(new Card(14, Suit.Spade));
hand.Add(new Card(12, Suit.Heart));
hand.Add(new Card(2, Suit.Spade));

hand.Sort();
hand.Print();
```

```console
Diamond 2
Spade 2
Heart Q
Spade A
```

* Section 5

In a card game, hands are ranked based on the sum of values of its cards. Modify the Hand class to be comparable based on this criteria, i.e. change the class so that interface **IComparable\<Hand\>** applies to it.

Here's an example of a program that compares the hands:

```cpp
Hand hand1 = new Hand();

hand1.Add(new Card(2, Suit.Diamond));
hand1.Add(new Card(14, Suit.Spade));
hand1.Add(new Card(12, Suit.Heart));
hand1.Add(new Card(2, Suit.Spade));

Hand hand2 = new Hand();

hand2.Add(new Card(11, Suit.Diamond));
hand2.Add(new Card(11, Suit.Spade));
hand2.Add(new Card(11, Suit.Heart));

int comparison = hand1.CompareTo(hand2);

if (comparison < 0)
{
  Console.WriteLine("better hand is");
  hand2.Print();
}
else if (comparison > 0)
{
  Console.WriteLine("better hand is");
  hand1.Print();
}
else
{
  Console.WriteLine("hands are equal");
}
```

```console
better hand is
Diamond J
Spade J
Heart J
```


</Exercise>