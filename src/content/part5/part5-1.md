---
title: "Object Oriented revision"
nav_order: 1
hidden: false
---


What is object-oriented programming all about? We'll rewind a little.

Let's inspect how a clock works. The clock has three hands: hours, minutes and seconds. The second hand increments once every second, the minute hand once every sixty seconds, and the hour hand once in sixty minutes. When the value of the second hand is 60, its value is set to zero and the value of the minute hand is incremented by one. When the minute hand's value is 60, its value is set to zero and the hour hand value is incremented by one. When the hour hand value is 24, it is set to zero.

Time is always printed in the form **hours: minutes: seconds**, where the hours are represented by two digits (eg. 01 or 12), minutes by two digits, and seconds also by two digits.

Below is an implementation of the clock with integer type variables (the printing could be isolated into its own method, but that has not been done here).


```cpp
static void Main(string[] args)

int hours = 0;
int minutes = 0;
int seconds = 0;

while (true)
{
  // 1. Printing the time
  if (hours < 10)
  {
    Console.Write("0");
  }
  Console.Write(hours);

  Console.Write(":");

  if (minutes < 10)
  {
    Console.Write("0");
  }
  Console.Write(minutes);

  Console.Write(":");

  if (seconds < 10)
  {
    Console.Write("0");
  }
  Console.Write(seconds);
  Console.WriteLine();

  // 2. The second hand's progress
  seconds = seconds + 1;

  // 3. The other hand's progress when necessary
  if (seconds > 59)
  {
    minutes = minutes + 1;
    seconds = 0;

    if (minutes > 59)
    {
      hours = hours + 1;
      minutes = 0;

      if (hours > 23)
      {
        hours = 0;
      }
    }
  }
}
```


As demonstrated by reading the example above, the functioning of a  clock made up of three **int** variables is not very clear to someone reading through the source code. It's difficult to "see" what's going on. A famous [**Programmer**](https://en.wikipedia.org/wiki/Kent_Beck) remarked *"Any fool can write code that a computer can understand .Good Programmers write code that humans can understand"*.

The aim is to make the program more comprehensible.

Since a clock hand is a clear concept in and of itself, a good idea with regard to the program's understandability would be to turn it into its own class. Let's create a **ClockHand** class describing a clock hand, which contains information about its value, upper limit (i.e. the point at which the value of the hand returns to zero), and provides methods for advancing the hand, viewing its value and printing the value in string form.

```cpp
public class ClockHand
{
  public int value { get; set; }
  public int limit { get; set; }

  public ClockHand(int limit)
  {
    this.limit = limit;
    this.value = 0;
  }

  public void Advance()
  {
    this.value = this.value + 1;

    if (this.value >= this.limit)
    {
      this.value = 0;
    }
  }

  public override string ToString()
  {
    if (this.value < 10)
    {
      return "0" + this.value;
    }

    return "" + this.value;
  }
}
```

Once we've created the ClockHand class, our clock becomes clearer. Now, printing the clock, i.e. the clock hand, is straightforward, and the hand's progression is hidden away in the ClockHand class. Since the hand's return to the beginning happens automatically with the help of the upper-limit variable defined by the ClockHand class, the way the hands work together is slightly different than in the program implementation that uses integers. The program that used integers looked at whether the value of the integer that represented the clock hand exceeded the upper limit, after which its value was set to zero and the value of the integer representing the next clock hand was incremented. Using clock-hand objects, the minute hand advances when the second hand's value is zero, and the hour hand advances when the minute hand's value is zero.

```cpp
static void Main(string[] args)
{
  ClockHand hours = new ClockHand(24);
  ClockHand minutes = new ClockHand(60);
  ClockHand seconds = new ClockHand(60);

  while (true)
  {
    // 1. Printing the time
    Console.WriteLine(hours + ":" + minutes + ":" + seconds);

    // 2. Advancing the second hand
    seconds.Advance();

    // 3. Advancing the other hands when required
    if (seconds.value == 0)
    {
      minutes.Advance();

      if (minutes.value == 0)
      {
        hours.Advance();
      }
    }
  }
```

**Object-oriented programming is mainly about isolating concepts into their own entities or, in other words, creating abstractions.** Despite the previous example, one might see it pointless to create an object containing only a number, since the same could be done directly with int variables. However, that is not always the case.

Separating a concept into its own class is a good idea in many ways. Firstly, certain details (such as rotating the hand) can be hidden inside the class (i.e. **abstracted**). Instead of typing an if-statement and an assignment operation, it's enough for the user of the clock hand to call a clearly-named method **Advance()**. The produced clock hand may be used as a building block for other programs as well - the class could be named **CounterLimitedFromTop** for instance. That is, a class created from a distinct concept can serve multiple purposes. Another massive advantage is that since the details of the implementation of the clock hand are not visible to its user, they can be changed if desired.

We realized that the clock contains three hands, i.e. it consists of three concepts. In fact, the clock is a concept in and of itself. That is, we can create a class of it as well. Next, we create a class called "Clock" that hides the hands inside of it.

```cpp
public class Clock
{
  private ClockHand hours;
  private ClockHand minutes;
  private ClockHand seconds;

  public Clock()
  {
    this.hours = new ClockHand(24);
    this.minutes = new ClockHand(60);
    this.seconds = new ClockHand(60);
  }

  public void Advance()
  {
    this.seconds.Advance();

    if (this.seconds.value == 0)
    {
      this.minutes.Advance();

      if (this.minutes.value == 0)
      {
        this.hours.Advance();
      }
    }
  }

  public override string ToString()
  {
    return hours + ":" + minutes + ":" + seconds;
  }
}
```

The way the program functions becomes increasingly clear. When you compare the program below to the original one composed of integers, you'll find that the program's readability is on a completely different level.

```cpp
static void Main(string[] args)
{
  Clock clock = new Clock();

  while (true)
  {
    Console.WriteLine(clock);
    clock.Advance();
  }
}
```

The clock we implemented above is an object whose functionality is based on "simpler" objects, i.e., the hands. This is exactly **the great idea behind ​​object-oriented programming: a program is built from small and distinct objects that work together.**

## Object

An **Object** refers to an independent entity that has data (instance variables) and behavior (methods) attached to it. Objects can differ a lot in structure and function: some may describe concepts of a problem domain, and others coordinate the interaction between various objects. Objects interact with one another through method calls - method calls are used to both request information from objects and give instructions to them. In general, each object has clearly defined boundaries and behaviors, and each object knows only about the objects it needs to perform its task. In other words, the object hides its internal operations and provides access to behavior through clearly defined methods. Also, the object is independent of any objects that it doesn't need to accomplish its task.

In the previous section, we dealt with objects depicting people whose structure was defined in a "Person" class. For review, it's a good idea to remember the purpose of a class: a **class** contains the blueprint needed to create objects, and also defines the objects' variables and methods. An object is instantiated based on the constructor in the class.

Our person objects had a name, age, weight and height, and a few methods. If we thought about the structure of the person object more, we could probably come up with more person-related variables, such as a personal ID number, telephone number, address, and eye color.

In reality, we can relate all kinds of different information and things to a person. However, when building an application that deals with people, the **functionality and features related to a person are gathered based on the application's use case**. For example, a life-management application could keep track of the previously-mentioned age, weight, and height, and provide the ability to calculate body mass index and maximum heart rate. On the other hand, an application focused on communication would store people's email addresses and phone numbers, but would not need information such as weight or height.

**The state of an object** is the value of its internal variables at any given point in time.

In our example, a Person object that keeps track of name, age, weight, and height, and provides the ability to calculate body mass index and maximum heart rate would look like the following. Below, the height and weight are expressed as doubles - the unit of length is one meter.

```cpp
public class Person
{
  private string name;
  private int age;
  private double weight;
  private double height;

  public Person(string name, int age, double weight, double height)
  {
    this.age = age;
    this.name = name;
    this.weight = weight;
    this.height = height;
  }

  public double BodyMassIndex()
  {
    return this.weight / (this.height * this.height);
  }

  public double MaximumHeartRate()
  {
    return 206.3 - (0.711 * this.age);
  }

  public void GrowOlder()
  {
    if (this.age < 100)
    {
      this.age = this.age + 1;
    }
  }

  public override string ToString()
  {
    return this.name + ", BMI: " + this.BodyMassIndex()
          + ", maximum heart rate: " + this.MaximumHeartRate();
  }
}
```

Determining the maximum heart rate and body mass index of a given person is straightforward using the Person class described above.

```cpp
static void Main(string[] args)
{
  Console.WriteLine("What's your name?");
  string name = Console.ReadLine();
  Console.WriteLine("What's your age?");
  int age = Convert.ToInt32(Console.ReadLine());
  Console.WriteLine("What's your weight?");
  double weight = Convert.ToDouble(Console.ReadLine());
  Console.WriteLine("What's your height?");
  double height = Convert.ToDouble(Console.ReadLine());

  Person person = new Person(name, age, weight, height);
  Console.WriteLine(person);
}
```

```console
What's your name?
Laura Palmer
What's your age?
21
What's your weight?
50.4
What's your height?
173.4
Laura Palmer, BMI: 0.0016762251409825073, maximum heart rate: 191.369
```

## Class

A class defines the types of objects that can be created from it. It contains instance variables describing the object's data, a constructor or constructors used to create it, and methods that define its behavior. A rectangle class is detailed below which defines the functionality of a rectangle:

```cpp
// class
public class Rectangle
{

  // instance variables
  private int width;
  private int height;

  // constructor
  public Rectangle(int width, int height)
  {
    this.width = width;
    this.height = height;
  }

  // methods
  public void Widen()
  {
    this.width = this.width + 1;
  }

  public void Narrow()
  {
    if (this.width > 0)
    {
      this.width = this.width - 1;
    }
  }

  public int SurfaceArea()
  {
    return this.width * this.height;
  }

  public override string ToString()
  {
    return "(" + this.width + ", " + this.height + ")";
  }
}
```

Some of the methods defined above do not return a value (methods that have the keyword void in their definition), while others do (methods that specify the type of variable to be returned). The class above also defines the toString method, which returns the string used to print the object.

Objects are created from the class through constructors by using the new command. Below, you'll create two rectangles and print information related to them.

```cpp
static void Main(string[] args)
{
  Rectangle first = new Rectangle(40, 80);
  Rectangle rectangle = new Rectangle(10, 10);
  Console.WriteLine(first);
  Console.WriteLine(rectangle);

  first.Narrow();
  Console.WriteLine(first);
  Console.WriteLine(first.SurfaceArea());
}
```

```console
(40, 80)
(10, 10)
(39, 80)
3120
```

# Exercises

<Exercise title={'001 One minute'}>

The exercise template comes with the `ClockHand` class described in the course material. Implement a `Timer` class based on the material's Clock class.

The timer has two hands, one for hundredths of a second and one for seconds. As it progresses, the number of hundredths of a second grows by one. When the hand corresponding to hundredths of a second reaches a value of 100, its value is set to zero, and the number of seconds grows by one. In the same way, when the value of the hand corresponding to seconds reaches the value of sixty, its value is set to zero.

- `public Timer()` creates a new timer.
- `public override string ToString()` returns a string representation of the timer. The string representation should be in the form "seconds: hundredths of a second", where both the seconds and the hundredths of a second are represented by two numbers. For example, "19:83" would represent the time 19 seconds, 83 hundredths of a second.
- `public void Advance()` moves the timer forward by a hundredth of a second.

You can test out the timer's functionality in the main program whenever you like. The example code below provides you with a program where the timer is printed and it advances once every hundredth of a second.

```cpp
static void Main(string[] args)
{
  // create new timer
  Timer timer = new Timer();
  // Loop until you cancel the loop.
  // You can cancel with the CTRL + C
  while (true)
  {
    Console.WriteLine(timer);
    timer.Advance();
    // Some error proving, we'll talk about this later.
    // Known as try-catch.
    try
    {
      // Wait 100th of a second. 
      // Sleep(1000) waits one second, if you want to test at slower pace.
      System.Threading.Thread.Sleep(10);
    }
    // Other half of try-catch pair. 
    catch (Exception e)
    {
      Console.WriteLine("Error happened: +" + e);
    }
  }
}
```

</Exercise>

<Exercise title={'002 Cube'}>

create a `Cube` class that represents a cube (i.e., a standard hexahedron). create a `public Cube (int edgeLength)` constructor for the class, that takes the length of the cube's edge as its parameter.

Make a `public int Volume()` method for the cube, which calculates and returns the cube's volume. The volume of the cube is calculated with the formula `edgeLength * edgeLength * edgeLength`. Moreover, make a `public override string ToString()` method for the cube, which returns a string representation of it. The string representation should take the form "The length of the edge is l and the volume v", where `l` is the length and `v` the volume - both the length and volume must be represented as integers.

</Exercise>

<Exercise title={'003 Fitbyte'}>

[**The Karvonen method**](https://en.wikipedia.org/wiki/Heart_rate#Karvonen_method) allows you to calculate your target heart rate for physical exercise. The target heart rate is calculated with the formula `(maximum heart rate - resting heart rate) * (target heart rate percentage) + resting heart rate`, where the target heart rate is given as a percentage of the maximum heart rate.

For example, if a person has a maximum heart rate of 200, a resting heart rate of 50, and a target heart rate of 75% of the maximum heart rate, the target heart rate should be about ((200-50) * (0.75) + 50), i.e., 162.5 beats per minute.

create an "exercise assistant" class called `Fitbyte`. Its constructor takes both an age and a resting heart rate as its parameters. The exercise assistant should provide a method `TargetHeartRate`, which is passed a number of type double as a parameter that represents a percentual portion of the maximum heart rate. The proportion is given as a number between zero and one. The class should have:

- A constructor `public Fitbyte(int age, int restingHeartRate)`
- A method `public double TargetHeartRate(double percentageOfMaximum)` that calculates and returns the target heart rate.

Use the formula 206.3 - (0.711 \* age) to calculate the maximum heart rate.
Use the formula (maxHeartRate - restingHeartRate) \* percentageOfMaximum + restingHeartRate to calculate the target heart rate.

Use case:

```cpp
public static void Main(string[] args)
{
  Fitbyte assistant = new Fitbyte(30, 60);
  double percentage = 0.5;

  while (percentage < 1.0)
  {
    double target = assistant.TargetHeartRate(percentage);
    Console.WriteLine("Target " + (percentage * 100) + "% of maximum: " + target);
    percentage = percentage + 0.1;
  }
}
```

```console
Target 50% of maximum: 122.48500000000001
Target 60% of maximum: 134.98200000000003
Target 70% of maximum: 147.479
Target 80% of maximum: 159.976
Target 89.99999999999999% of maximum: 172.473
Target 99.99999999999999% of maximum: 184.97000000000003
```

</Exercise>