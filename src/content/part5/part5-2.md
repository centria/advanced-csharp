---
title: "Overloading methdods and constructors"
nav_order: 2
hidden: false
---

Let's get back to the Person class once more. Let's look a bit different version of the class:

```cpp
public class Person
{
  private string name;
  private int age;
  private int weight;
  private int height;


  public Person(string name)
  {
    this.name = name;
    this.age = 0;
    this.weight = 0;
    this.height = 0;
  }

  public double BodyMassIndex()
  {
    double heigthPerHundred = this.height / 100.0;
    return this.weight / (heigthPerHundred * heigthPerHundred);
  }

  public bool IsAdult()
  {
    if (this.age < 18)
    {
      return false;
    }
    return true;
  }

  public void GrowOlder()
  {
    this.age++;
  }

  public override string ToString()
  {
    return this.name + ", age: " + this.age;
  }
}
```

Initially all person objects are 0 years old, because the constructor sets the value of the instance variable age to 0:

```cpp
public Person(string name)
{
  this.name = name;
  this.age = 0;
  this.weight = 0;
  this.height = 0;
}
```

## Constructor overloading

We would like to also be able to create Persons so that the constructor is given the age as well as the name as parameters. This is possible, because a class can have multiple constructors. Let's make an alternative constructor. You don't have to delete the old constructor.

```cpp
public Person(string name)
{
  this.name = name;
  this.age = 0;
  this.weight = 0;
  this.height = 0;
}

    public Person(string name, int age)
{
  this.name = name;
  this.age = age;
  this.weight = 0;
  this.height = 0;
}
```

Now we have two alternative ways to create objects:

```cpp
static void Main(string[] args)
{
  Person paul = new Person("Paul", 24);
  Person ada = new Person("Ada");
  
  Console.WriteLine(paul);
  Console.WriteLine(ada);
}
```

```console
Paul, age: 24
Ada, age: 0
```
This technique, where a class has two (or more) constructors, is called **constructor overloading**. A class can have multiple constructors which differ on the amount or type of their parameters. It is however not possible to have two constructor with exactly the same parameters. We cannot for example now add a constructor public **Person(String name, int weight)** because it is impossible for the compiler to differentiate this constructor with two parameters from the constructor where the int parameter means age.


## Calling your constructor

As you might have noticed, there is plenty of "copy-paste" code in our overloaded constructors, meaning that there is repetition of same lines over and over again. When you look at the overloaded constructors above, they have a lot of the same code. We are not happy with this. If we had even more constructors, we would have to have the lines **this.name...** in each constructor.

The first constructor, the one that is only given a name as a parameter,is actually a special case of the second constructor, which is given both name and age. What if the first constructor could call the second constructor?

That is no problem, because you can call a constructor from another constructor using the this keyword tied to this exact object!

Let's modify the first constructor so, that it does not do anything itself, but calls the second constructor and asks it to set the age to 0.


```cpp
//here the code of the second constructor is run, and the age is set to 0
public Person(string name) : this(name, 0)
{
}

public Person(string name, int age)
{
  this.name = name;
  this.age = age;
  this.weight = 0;
  this.height = 0;
}
```

The constructor call **this(name, 0)** might seem a bit weird. We can use **this** to have one constructor invocation call another constructor method, whic reduces "copy-paste code". In the example above, you could imagine the upper constuctor calling the lower one, with values **name** and **0**. As the lower constructor already defines how those values are to be treated, there is no need to separately define the variables in the upper constructor. This kind of constructor call does not change the code's behavior, and new objects can be created just like before:

```cpp
static void Main(string[] args)
{
  Person paul = new Person("Paul", 24);
  Person ada = new Person("Ada");
  
  Console.WriteLine(paul);
  Console.WriteLine(ada);
}
```

```console
Paul, age: 24
Ada, age: 0
```

## Method overloading

Like constructors, methods can also be overloaded, so you can have multiple versions of one method. Again, the parameters of the different versions must be different. Let's make another version of the **GrowOlder** method, which ages the person the amount of years given to it as a parameter.

```cpp
public void GrowOlder()
{
  this.age++;
}

public void GrowOlder(int years)
{
  this.age += years;
}
```
Below "Paul" is born 24 years old, first ages one year and then ages 10 years:

```cpp
static void Main(string[] args)
{
  Person paul = new Person("Paul", 24);
  Console.WriteLine(paul);
  paul.GrowOlder();
  Console.WriteLine(paul);
  paul.GrowOlder(10);
  Console.WriteLine(paul);

}
```

```console
Paul, age: 24
Paul, age: 25
Paul, age: 35
```

A Person now has two methods called **GrowOlder**. Which one is executed debends on the amount of parameters given.

We can also modify the program so, that the method without parameters is implemented using the method **GrowOlder(int years)**:

```cpp
public void GrowOlder()
{
  this.GrowOlder(1);
}

public void GrowOlder(int years)
{
  this.age += years;
}
```

The calling of an overloaded method is a bit different than that of an overloaded constructor. The idea is still exactly the same. Rather than having the same code in two places, we use **this** and tell what we are calling. 

<Note>You cannot use the same notation which we used on a constructor, nor can you use this notation on a constructor. You can try what happens (or which kind of errors you get).</Note>


# Exercises

<Exercise title={'004 Constructor overload'}>

The exercise template has a class Product, which represents a product in a shop. Every product has a name, location and weight.

Add the following three constructors to the Product class:

- `public Product(string name)` creates a product with the given name. Its location is set to "shelf" and its weight is set to 1.
- `public Product(string name, string location)` creates a product with the given name and the given location. Its weight is set to 1.
- `public Product(string name, int weight)` creates a product with the given name and the given weight. Its location is set to "warehouse".
You can test your program with the following code:

```cpp
Product tapeMeasure = new Product("Tape measure");
Product plaster = new Product("Plaster", "home improvement section");
Product tyre = new Product("Tyre", 5);

Console.WriteLine(tapeMeasure);
Console.WriteLine(plaster);
Console.WriteLine(tyre);
```

```console
Tape measure (1 kg) can be found from the shelf. 
Plaster (1 kg) can be found from the home improvement section. 
Tyre (5 kg) can be found from the warehouse.
```

</Exercise>

<Exercise title={'005 Overloaded counter'}>

Implement a class called `Counter`. The class contains a number, whichs value can be increased and decreased. The class must have the following constructors:

- `public Counter(int startValue)` sets the start value of the counter to startValue.

- `public Counter()` sets the start value of the counter to 0.

And the following methods and properties:

- `public int value { get; set; }`
- `public void Increase()` increases the value by 1
- `public void Decrease()` decreases the value by 1
- `public void Increase(int increaseBy)` increases the value of the counter by the value of increaseBy. If the value of increaseBy is negative, the value of the counter does not change.
- `public void Decrease(int decreaseBy)` decreases the value of the counter by the value of decreaseBy. If the value of decreaseBy is negative, the value of the counter does not change.

</Exercise>