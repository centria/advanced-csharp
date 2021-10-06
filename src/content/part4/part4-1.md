---
title: "Object Oriented Programming"
nav_order: 1
hidden: false
---

We'll now begin our journey in to the world of object-oriented programming. We'll start with focusing on describing concepts and data using objects. From there on, we'll learn how to add functionality, i.e., methods to our program.

Object-oriented programming is concerned with isolating concepts of a problem domain into separate entities and then using those entities to solve problems. Concepts related to a problem can only be considered once they've been identified. In other words, we can form abstractions from problems that make those problem easier to approach.

Once concepts related to a given problem have been identified, we can also begin to build constructs that represent them them into programs. These constructs, and the individual instances that are formed from them, i.e., objects, are used in solving the problem. The statement "programs are built from small, clear, and cooperative objects" may not make much sense yet. However, it will appear more sensible as we progress through the course, perhaps even self-evident.

## Classes and objects

We've already used some of the classes and objects provided by C#. A class defines the attributes of objects, i.e., the information related to them (instance variables and properties), and their commands, i.e., their methods. The values of instance (i.e., object) variables define the internal state of an individual object, whereas methods define the functionality it offers.

A **Method** is a piece of source code written inside a class that's been named and has the ability to be called. A method is always part of some class and is often used to modify the internal state of an object instantiated from a class.

As an example, List is a class offered by C#, and we've made use of objects instantiated from it in our programs. Below, an List object named integers is created and some integers are added to it.

```cpp
// we create an object from the List class named integers
List<int> integers = new List<int>();

// let's add the values 15, 34, 65, 111 to the integers object
integers.Add(15);
integers.Add(34);
integers.Add(65);
integers.Add(111);

// we print the size of the integers object
Console.WriteLine(integers.Count);
```

An object is always instantiated by calling a method that created an object, i.e., a constructor by using the new keyword.

A class lays out a blueprint for any objects that are instantiated from it. Let's draw from an analogy from outside the world of computers. Detached houses are most likely familiar to most, and we can safely assume the existence of drawings somewhere that determine what exactly a detached house is to be like. A class is a blueprint. In other words, it specifies what kinds of objects can be instantiated from it:

![House blueprints](https://github.com/centria/basic-csharp/raw/master/src/images/houses.jpg)

Individual objects, detached houses in this case, are all created based on the same blueprints - they're instances of the same class. The states of individual objects, i.e., their attributes (such as the wall color, the building material of the roof, the color of its foundations, the doors' materials and color, ...) may all vary, however. The following is an "object of a detached-house class":

![Single house](https://github.com/centria/basic-csharp/raw/master/src/images/singlehouse.jpg)

## Creating Classes

A class specifies what the objects instantiated from it are like.

* The **object's variables (instance variables)** specify the internal state of the object
* The **object's methods** specify what the object does

We'll now familiarize ourselves with creating our own classes and defining the variable that belong to them.

A class is defined to represent some meaningful entity, where a "meaningful entity" often refers to a real-world object or concept. If a computer program had to process personal information, it would perhaps be meaningful to define a seperate class Person consisting of methods and attributes related to an individual.

Let's begin. The example is using the **Exercise001** from the exercises, so you can follow the instructions along. We'll assume that we have a project template that has an empty main program, called 
**Program.cs**. 

```cpp
using System;
namespace Exercise001
{
  class Program
  {
    public static void Main(string[] args)
    {

    }
  }
}
```

The next part is meant for creating new classes in Visual Studio Code. You can, of course, use any editor you wish. This course material is intended for Visual Studio Code.

### Creating a new class

1. To add a new class, right click in the VSCode Explorer and select New File. This adds a new file to the folder you have open in VSCode.

As with variables and methods, the name of a class should be as descriptive as possible. It's usual for a class to live on and take on a different form as a program develops. As such, the class may have to be renamed at some later point

2. Name your file **Person.cs**. You must save it with a .cs extension at the end for it to be recognized as a csharp file.

Make sure the file Person.cs is in the same folder as **Program.cs**

3. Make sure to include the correct **namespace** so you can reference it from your Program.cs file. 

We'll get to namespaces later. For now, whenever you create a new class, **use the same namespace as existing classes**.

4. Add this code to your file:

```cpp
using System;

namespace Exercise001
{
  public class Person
  {
    
  }
}
```

A class defines the attributes and behaviors of objects that are created from it. Let's decide that each person object has a name and an age. It's natural to represent the name as a string, and the age as an integer. We'll go ahead and add these to our blueprint:

```cpp
public class Person {
    private string name;
    private int age;
}
```

We specify above that each object created from the Person class has a name and an age. Variables defined inside a class are called instance variables, or object fields or object attributes. Other names also seem to exist.

Instance variables are written on the lines following the class definition **public class Person {**. Each variable is preceded by the keyword private. The keyword private means that the variables are "hidden" inside the object. This is known as encapsulation.

In the class diagram, the variables associated with the class are defined as "variableName: variableType". The minus sign before the variable name indicates that the variable is encapsulated (it has the keyword private).

![Class Diagram](https://github.com/centria/basic-csharp/raw/master/src/images/person.jpg)

We have now defined a blueprint -- a class -- for the person object. Each new person object has the variables **name** and **age**, which are able to hold object-specific values. The "state" of a person consists of the values assigned to their name and age.

The person doesn't do anything yet, but we'll get there.

## Defining a Constructor

We want to set an initial state for an object that's created. Custom objects are created the same way as objects from pre-made classes, such as List, using the **new** keyword. It'd be convenient to pass values ​​to the variables of that object as it's being created. For example, when creating a new person object, it's useful to be able to provide it with a name:

```cpp
    public static void Main(string[] args)
    {
      Person ada = new Person("Ada");
      // ...
    }
```

This is achieved by defining the method that creates the object, i.e., its **constructor**. The constructor is defined after the instance variables. In the following example, a constructor is defined for the Person class, which can be used to create a new Person object. The constructor sets the age of the object being created to 0, and the string passed to the constructor as a parameter as its name:


```cpp
public class Person
{
  private string name;
  private int age;

  public Person(string initialName) {
    this.age = 0;
    this.name =  initialName;
  }
}
```

The constructor's name is always the same as the class name. The class in the example above is named Person, so the constructor will also have to be named Person. The constructor is also provided, as a parameter, the name of the person object to be created. The parameter is enclosed in parentheses and follows the constructor's name. The parentheses that contain optional parameters are followed by curly brackets. In between these brackets is the source code that the program executes when the constructor is called (e.g., new Person ("Ada")).

**Objects are always created using a constructor.**

A few things to note: the constructor contains the expression **this.age = 0**. This expression sets the instance variable age of the newly created object (i.e., "this" object's age) to 0. The second expression **this.name = initialName** likewise assigns the string passed as a parameter to the instance variable name of the object created.

![Class Diagram With Constructror](https://github.com/centria/basic-csharp/raw/master/src/images/personconstructor.jpg)

If the programmer does not define a constructor for a class, the C# compiler automatically creates a default one for it. A default constructor is a constructor that doesn't do anything apart from creating the object. The object's variables remain uninitialized (generally, the value of any object references will be null, meaning that they do not point to anything).

For example, an object can be created from the class below by making the call **new Person()**

```cpp
public class Person
{
  private string name;
  private int age;
}
```

If a constructor has been defined for a class, no default constructor exists. For the class below, calling new Person would cause an error, as the compiler cannot find a constructor in the class that has no parameters.

```cpp
public class Person
{
  private string name;
  private int age;

  public Person(string initialName) {
    this.age = 0;
    this.name =  initialName;
  }
}
```

## Defining Methods For an Object

We know how to create an object and initialize its variables. However, an object also needs methods to be able to do anything. As we've learned, a **method** is a named section of source code inside a class which can be invoked.

```cpp
public class Person
{
  private string name;
  private int age;

  public Person(string initialName) {
    this.age = 0;
    this.name =  initialName;
  }

  public void PrintPerson() {
    Console.WriteLine(this.name + ", age " + this.age + " years");
  }
}
```

A method is written inside of the class beneath the constructor. The method name is preceded by **public void**, since the method is intended to be visible to the outside world (**public**), and it does not return a value (**void**).

We've used the modifier **static** in some of the methods that we've written. The static modifier indicates that the method in question does not belong to an object and thus cannot be used to access any variables that belong to objects.

Going forward, our methods **will not include the static keyword** if they're used to process information about objects created form a given class. If a method receives as parameters all the variables whose values ​​it uses, it can have static modifier.

In addition to the class name, instance variables, and constructor, the class diagram now also includes the method PrintPerson. Since the method comes with the **public** modifier, the method name is prefixed with a plus sign. No parameters are defined for the method, so nothing is put inside the method's parentheses. The method is also marked with information indicating that it does not return a value, here **void**.

![Class Diagram With Print](https://github.com/centria/basic-csharp/raw/master/src/images/printperson.jpg)

The method **PrintPerson** contains one line of code that makes use of the instance variables **name** and **age** -- the class diagram says nothing about its internal implementations. Instance variables are referred to with the prefix this. All of the object's variables are visible and available from within the method.

Let's create three persons in the main program and request them to print themselves:

```cpp
class Program
{
  static void Main(string[] args)
  {
    Person ada = new Person("Ada");
    Person antti = new Person("Antti");
    Person martin = new Person("Martin");

    ada.PrintPerson();
    antti.PrintPerson();
    martin.PrintPerson();
  }
}
```

Prints:

```console
Ada, age 0 years
Antti, age 0 years
Martin, age 0 years
```

## Changing an Instance Variable's Value in a Method

Let's add a method to the previously created person class that increments the age of the person by a year.

```cpp
public class Person
{
  private string name;
  private int age;

  public Person(string initialName)
  {
    this.age = 0;
    this.name = initialName;
  }

  public void PrintPerson()
  {
    Console.WriteLine(this.name + ", age " + this.age + " years");
  }

  public void GrowOlder()
  {
    this.age = this.age + 1;
  }
}
```

The method is written inside the Person class just as the printPerson method was. The method increments the value of the instance variable age by one.

The class diagram also gets an update.

![Class Diagram With Growth](https://github.com/centria/basic-csharp/raw/master/src/images/persongrow.jpg)

Let's call the method and see what happens:

```cpp
static void Main(string[] args)
{
  Person ada = new Person("Ada");
  Person antti = new Person("Antti");
  Person martin = new Person("Martin");

  ada.PrintPerson();
  antti.PrintPerson();
  martin.PrintPerson();

  Console.WriteLine();

  ada.GrowOlder();
  antti.GrowOlder();
  antti.GrowOlder();

  ada.PrintPerson();
  antti.PrintPerson();
  martin.PrintPerson();
}
```

Prints

```console
Ada, age 0 years
Antti, age 0 years
Martin, age 0 years

Ada, age 1 years
Antti, age 2 years
Martin, age 0 years
```

That is to say that when the two objects are "born" they're both zero-years old (**this.age = 0**; is executed in the constructor). The **ada** object's GrowOlder method is called once, and **antti** object's GrowOlder is called twice.. As the print output demonstrates, the age of Ada is 1 years after growing older, for Antti it is 2. Calling the method on an object corresponding to Ada or Antti has no impact on the age of the other person object since each object instantiated form a class has its own instance variables, as can be seen from Martin.

The method can also contain conditional statements and loops. The GrowOlder method below limits aging to 100 years.

```cpp
public class Person
{
  private string name;
  private int age;

  public Person(string initialName)
  {
    this.age = 0;
    this.name = initialName;
  }

  public void PrintPerson()
  {
    Console.WriteLine(this.name + ", age " + this.age + " years");
  }

  public void GrowOlder()
  {
    if (this.age < 100)
    {
      this.age = this.age + 1;
    }
  }
}
```

## Returning a Value From a Method

A method can return a value. The methods we've created in our objects haven't so far returned anything. This has been marked by typing the keyword **void** in the method definition.

```cpp
public class Door 
{
  public void Knock() 
  {
      // ...
  }
}
```

The keyword **void** means that the method does not return a value.

If we want the method to return a value, we need to replace the void keyword with the type of the variable to be returned. In the following example, the Teacher class has a method **Grade** that always returns an integer-type (**int**) variable (in this case, the value 10). The value is always returned with the **return** command:

```cpp
public class Teacher 
{
  public int Grade() 
  {
      return 10;
  }
}
```

The method above returns an **int** type variable of value 10 when called. For the return value to be used, it needs to be assigned to a variable. This happens the same way as regular value assignment, i.e., by using the equals sign:

```cpp
class Program
{
  static void Main(string[] args)
  {
  Teacher teacher = new Teacher();

  int grading = teacher.Grade();

  Console.WriteLine("The grade received is " + grading);
  }
}
```

```console
The grade received is 10
```

The method's return value is assigned to a variable of type **int** value just as any other int value would be. The return value could also be used to form part of an expression.

```cpp
static void Main(string[] args)
{
Teacher first = new Teacher();
Teacher second = new Teacher();
Teacher third = new Teacher();

double average = (first.Grade() + second.Grade() + third.Grade()) / 3.0;

Console.WriteLine("Grading average " + average);
}
```

```console
Grading average 10
```

All the variables we've encountered so far can also be returned by a method. To sum:

* A method that returns nothing has the **void** modifier as the type of variable to be returned.

```cpp
public void MethodThatReturnsNothing() {
  // the method body
}
```

* A method that returns an integer variable has the **int** modifier as the type of variable to be returned.

```cpp
public int MethodThatReturnsAnInteger() {
  // the method body, requires a return statement
}
```

* A method that returns a string has the **string** modifier as the type of the variable to be returned

```cpp
public string MethodThatReturnsAString() {
  // the method body, requires a return statement
}
```

* A method that returns a double-precision number has the **double** modifier as the type of the variable to be returned.

```cpp
public double MethodThatReturnsADouble() {
  // the method body, requires a return statement
}
```


Let's continue with the Person class and add a **ReturnAge** method that returns the person's age.

```cpp
public class Person
{
  private string name;
  private int age;

  public Person(string initialName)
  {
    this.age = 0;
    this.name = initialName;
  }

  public void PrintPerson()
  {
    Console.WriteLine(this.name + ", age " + this.age + " years");
  }

  public void GrowOlder()
  {
    if (this.age < 100)
    {
      this.age = this.age + 1;
    }
  }

  // the added method
  public int ReturnAge()
  {
    return this.age;
  }
}
```

![Class Diagram With Return](https://github.com/centria/basic-csharp/raw/master/src/images/personreturn.jpg)

Let's illustrate how the method works:

```cpp
static void Main(string[] args)
{
  Person pekka = new Person("Pekka");
  Person antti = new Person("Antti");

  pekka.GrowOlder();
  pekka.GrowOlder();

  antti.GrowOlder();

  Console.WriteLine("Pekka's age: " + pekka.ReturnAge());
  Console.WriteLine("Antti's age: " + antti.ReturnAge());
  int combined = pekka.ReturnAge() + antti.ReturnAge();

  Console.WriteLine("Pekka's and Antti's combined age " + combined + " years");
}
```

```console
Pekka's age: 2
Antti's age: 1
Pekka's and Antti's combined age 3 years
```

As we came to notice, methods can contain source code in the same way as other parts of our program. Methods can have conditionals or loops, and other methods can also be called from them.

Let's now write a method for the person that determines if the person is of legal age. The method returns a boolean - either **true** or **false**:

```cpp
class Person
{
  //... The existing code could be up here

  public bool IsOfLegalAge()
  {
    if (this.age < 18)
    {
      return false;
    }

    return true;
  }

  /*
  The method could have been written more succintly in the following way:

  public bool IsOfLegalAge() 
  {
    return this.age >= 18;
  }
  */
}
```

And let's test it out:

```cpp
static void Main(string[] args)
{
  Person pekka = new Person("Pekka");
  Person antti = new Person("Antti");

  int i = 0;
  while (i < 27)
  {
    pekka.GrowOlder();
    i = i + 1;
  }

  antti.GrowOlder();

  if (antti.IsOfLegalAge())
  {
    Console.Write("of legal age: ");
    antti.PrintPerson();
  }
  else
  {
    Console.Write("underage: ");
    antti.PrintPerson();
  }

  if (pekka.IsOfLegalAge())
  {
    Console.Write("of legal age: ");
    pekka.PrintPerson();
  }
  else
  {
    Console.Write("underage: ");
    pekka.PrintPerson();
  }
}
```

```console
underage: Antti, age 1 years
of legal age: Pekka, age 27 years
```

Let's fine-tune the solution a bit more. In its current form, a person can only be "printed" in a way that includes both the name and the age. Situations exist, however, where we may only want to know the name of an object. 

In many programming languages, you would write a **get method** for this. In C#, properties, such as our Person's **age** and **name**, can be used with [**Auto Implementation Property**](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/auto-implemented-properties). 

```cpp
public string name { get; }
```

Let's open this up a bit. "Under the hood", the code above tells our **C# compiler** that our property **name** has kind of "built-in" methods for getting an setting the value. The code above is equal in functionality to:

```cpp
string _name;
public string name
{
  get
  {
    return _name;
  }
}
```

In this example, there is now also a line **string _name;**, and on both our original **string name** is now **public**. The **string _name;** is known as a [**Backing field**](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties#properties-with-backing-fields), you can read more about them from the link. We do not have to worry about them now.


Rather than having a method like we did with our **age**:

```cpp
public string ReturnAge() {
  return age;
}
```

We have a very short solution

```cpp
public string name { get; }
```

<Note> We have to change our string name into public (from private), so it can be accessed from the Main program, or any other class. There are ways of protecting the property, but we'll get to that later. </Note>

Let's use this way of getting age:

```cpp
static void Main(string[] args)
{
  Person pekka = new Person("Pekka");
  Person antti = new Person("Antti");

  int i = 0;
  while (i < 27)
  {
    pekka.GrowOlder();
    i = i + 1;
  }

  antti.GrowOlder();

  if (antti.IsOfLegalAge())
  {
    Console.WriteLine(antti.name + " is of legal age");
  }
  else
  {
    Console.WriteLine(antti.name + " is underage");
  }

  if (pekka.IsOfLegalAge())
  {
    Console.WriteLine(pekka.name + " is of legal age");
  }
  else
  {
    Console.WriteLine(pekka.name + " is underage ");
  }
}
```

```console
Antti is underage
Pekka is of legal age
```

You can see, that now we can call our **Person's** name with simply adding **.name** after the object, such as **antti.name**. Let's update our **age** to have a **get method** as well, and remove the old ReturnAge-method. Now our class looks like this:


```cpp
public class Person
{
  public string name { get; }
  public int age { get; set; }

  public Person(string initialName)
  {
    this.age = 0;
    this.name = initialName;
  }

  public void PrintPerson()
  {
    Console.WriteLine(this.name + ", age " + this.age + " years");
  }

  public void GrowOlder()
  {
    if (this.age < 100)
    {
      this.age = this.age + 1;
    }
  }

  public bool IsOfLegalAge() 
  {
    return this.age >= 18;
  }
}
```

You can see that **age** has also a method for **set**. This is because we are changing the age of **Person** in our method **GrowOlder**. We will get into **set method** later.

## A string representation of an object and the ToString-method

We are guilty of programming in a somewhat poor style by creating a method for printing the object, i.e., the **PrintPerson** method. A preferred way is to define a method for the object that returns a "string representation" of the object. The method returning the string representation is always **ToString** in C#. Let's define this method for the person in the following example:

```cpp
public class Person
{
  // ..
  public override string ToString() 
  {
      return this.name + ", age " + this.age + " years";
  }
}
```

The **ToString** functions as **PrintPerson** does. However, it doesn't itself print anything but instead **returns** a string representation, which the calling method can execute for printing as needed.

The method is used in a somewhat surprising way:

```cpp
static void Main(string[] args)
{
  Person pekka = new Person("Pekka");
  Person antti = new Person("Antti");

  int i = 0;
  while (i < 27)
  {
    pekka.GrowOlder();
    i = i + 1;
  }

  antti.GrowOlder();

  Console.WriteLine(pekka); // Same as Console.WriteLine(pekka.ToString() )
  Console.WriteLine(antti); // Same as Console.WriteLine(antti.ToString() )
}
```

In principle, the **Console.WriteLine** method requests the object's string representation and prints it. The call to the **ToString** method returning the string representation does not have to be written explicitly, as C# adds it automatically. When a programmer writes:

```cpp
Console.WriteLine(antti);
```

C# extends the call at run time to the following form:

```cpp
Console.WriteLine(antti.ToString());
```

As such, the call **Console.WriteLine(antti)** calls the **ToString** method of the **antti object** and prints the string returned by it.

We can remove the now obsolete printPerson method from the Person class.

## Method parameters

Let's continue with the **Person** class once more. We've decided that we want to calculate people's body mass indexes. To do this, we write methods for the person to set both the height and the weight, and also a method to calculate the body mass index. The new and changed parts of the Person object are as follows:

```cpp
public class Person
{
  public string name { get; }
  public int age { get; set; }
  public int weight { get; set; }
  public int height { get; set; }

  public Person(string initialName)
  {
    this.age = 0;
    this.weight = 0;
    this.height = 0;
    this.name = initialName;
  }

  public double BodyMassIndex()
  {
    double heigthPerHundred = this.height / 100.0;
    return this.weight / (heigthPerHundred * heigthPerHundred);
  }

  // ...
}
```
The instance variables **height** and **weight** were added to the person. We can now see the **{ get; set; };** on both of these new variables. We will use them next to be able to tell our program, how tall or heavy a person is.

```cpp
static void Main(string[] args)
{
  Person matti = new Person("Matti");
  Person juhana = new Person("Juhana");

  matti.height = 180;
  matti.weight = 86;

  juhana.height = 175;
  juhana.weight = 64;

  Console.WriteLine(matti.name + ", body mass index is " + matti.BodyMassIndex());
  Console.WriteLine(juhana.name + ", body mass index is " + juhana.BodyMassIndex());

}
```

This prints us 

```console
Matti, body mass index is 26.54320987654321
Juhana, body mass index is 20.897959183673468
```

## A parameter and instance variable having the same name!

In our constructor, we use the variable **initialName** rather than just **name**.

```cpp
public Person(string initialName)
{
  this.age = 0;
  this.weight = 0;
  this.height = 0;
  this.name = initialName;
}
```

The parameter's name could also be the same as the instance variable's, so the following would also work:

```cpp
public Person(string name)
{
  this.age = 0;
  this.weight = 0;
  this.height = 0;
  this.name = name;
}
```

In this case, **name** in the method refers specifically to a parameter named **name** and this.name to an instance variable of the same name. For example, the following example would not work as the code does not refer to the instance variable **name** at all. What the code does in effect is set the **name** variable received as a parameter to the value it already contains:

```cpp
public Person(string name)
{
  this.age = 0;
  this.weight = 0;
  this.height = 0;
  // DO NOT DO THIS!
  name = name;
}
```

```cpp
public Person(string name)
{
  this.age = 0;
  this.weight = 0;
  this.height = 0;
  // DO THIS INSTEAD!
  this.name = name;
}
```

## Calling an internal method

The object may also call its methods. For example, if we wanted the string representation returned by ToString to also tell of a person's body mass index, the object's own BodyMassIndex method should be called in the ToString method:

```cpp
public override string ToString()
{
      return this.name + ", age " + this.age + " years, my body mass index is " + this.BodyMassIndex();
}
```

So, when an object calls an internal method, the **name of the method** and **this** prefix suffice. An alternative way is to call the object's own method in the form BodyMassIndex(), whereby no emphasis is placed on the fact that the object's own bodyMassIndex method is being called:

```cpp
public override string ToString()
{
      return this.name + ", age " + this.age + " years, my body mass index is " + BodyMassIndex();
}
```

# Exercises

<Note>
When creating own classes, make sure to include the correct namespace so you can reference it from your Program.cs file. We'll get to namespaces later. For now, whenever you create a new class, use the same namespace as the Program.cs has.

Some of the exercises require you to make changes to the Main program. Be sure to read the instructions carefully!
</Note>

<Exercise title={'001 First account'}>

The exercise template comes with a ready-made class named Account. The Account object represents a bank account that has balance (i.e. one that has some amount of money in it). The accounts could be used as follows:

```cpp
Account heikkisAccount = new Account("Heikki's account", 100.00);
Account heikkisSwissAccount = new Account("Heikki's account in Switzerland", 1000000.00);

Console.WriteLine("Intial state");
Console.WriteLine(heikkisAccount);
Console.WriteLine(heikkisSwissAccount);

heikkisAccount.Withdrawal(20);
Console.WriteLine("The balance of Heikki's account is now: " + heikkisAccount.balance);
heikkisSwissAccount.Deposit(200);
Console.WriteLine("The balance of Heikki's other account is now: " + heikkisSwissAccount.balance);

Console.WriteLine("End state");
Console.WriteLine(heikkisAccount);
Console.WriteLine(heikkisSwissAccount);
```

Write a program that 
- creates an account with a balance of 100.0, 
- deposits 20.0 in it, 
- and finally prints the balance. 

```console
120
```

<Note>Perform all the operations in this exact order.</Note>

</Exercise>

<Exercise title={'002 First transfer'}>

The Account from the previous exercise class is also available in this exercise.

Write a program that:

- Creates an account named "Heikki's account" with the balance 1000.0
- Creates an account named "Personal account" with the balance 0
- Withdraws 100.0 from Heikki's account
- Deposits 100.0 to its own personal account
- Prints account information (ToString) on both, first Heikki's, then Personal:

```console
Heikki's account balance: 900
Personal account balance: 100
```

</Exercise>

<Exercise title={'003 First class'}>

In this exercise, you'll practice creating a class.

Name the class `Dog` (and the file `Dog.cs`)

You have now created a class called `Dog`. 
Add the variables 
- private string name,
- private string breed and 
- private int age   
to the class. As a class diagram, the class looks like this:

![Dog class diagram](https://github.com/centria/basic-csharp/raw/master/src/images/dogclass.jpg)


</Exercise>

<Exercise title={'004 Classroom'}>

Create a class named `Room` (and file `Room.cs`). Add the variables `private string code` and `private int seats` to the class. Then create a constructor `public Room(string classCode, int numberOfSeats)` through which values are assigned to the instance variables.

![Room class diagram](https://github.com/centria/basic-csharp/raw/master/src/images/roomclass.jpg)


</Exercise>

<Exercise title={'005 Whistle'}>

Create a class named `Whistle`. Add the variable `private string sound` to the class. After that, create the constructor `public Whistle(string whistleSound)`, which is used to create a new whistle that's given a sound. After that, create a method `public void Sound()` which prints out the sound (using Console.WriteLine).

```cpp
Whistle duckWhistle = new Whistle("Kvaak");
Whistle roosterWhistle = new Whistle("Peef");

duckWhistle.Sound();
roosterWhistle.Sound();
duckWhistle.Sound();
```

```console
Kvaak 
Peef 
Kvaak
```

</Exercise>

<Exercise title={'006 Product'}>

Create a class `Product` that represents a store product. The product should have a `price (double)`, a `quantity (int)` and a `name (string)`.

The class should have:

- the constructor `public Product(string name, double price, int quantity)`
- a method `public void PrintProduct()` that prints product information in the following format:

```console
Banana: price 1.1: 13 pcs
```

The output above is based on the product being assigned the name banana, with a price of 1.1, and a quantity of 13 .

</Exercise>

<Exercise title={'007 Counter'}>

This exercise consists of multiple sections. Each section corresponds to one exercise point.

The exercise template comes with a partially executed class DecreasingCounter:

```cpp
using System;

namespace Exercise007
{
  public class DecreasingCounter
  {
    private int value;   // a variable that remembers the value of the counter

    public DecreasingCounter(int initialValue)
    {
      this.value = initialValue;
    }

    public void PrintValue()
    {
      Console.WriteLine("value: " + this.value);
    }

    public void decrement()
    {
      // write the method implementation here
      // the aim is to decrement the value of the counter by one
    }

    // and the other methods go here
  }
}
```

The following is an example of how the main program uses the decreasing counter:

```cpp
public static void Main(string[] args)
{
  DecreasingCounter counter = new DecreasingCounter(10);
  counter.PrintValue();

  counter.Decrement();
  counter.PrintValue();

  counter.Decrement();
  counter.PrintValue();
}
```

```console
value: 10
value: 9
value: 8
```

* *Section 1 : Implementation of the Decrement() method

Implement the `Decrement()` method in the class body in such a way that it decrements the value variable of the object it's being called on by one. Once you're done with the Decrement() method, the main program of the previous example should work to produce the example output.

* Section 2 : The counter's value cannot be negative

Improve the Decrement() in such a way that the counter's value never becomes negative. This means that if the value of the counter is 0, it cannot be decremented. A conditional statement is useful here.

```cpp
public static void Main(string[] args)
{

  DecreasingCounter counter = new DecreasingCounter(2);
  counter.PrintValue();

  counter.Decrement();
  counter.Decrement();
  counter.PrintValue();

  counter.Decrement();
  counter.PrintValue();
}
```

```console
value: 2
value: 0
value: 0
```

* Section 3: Resetting the counter value

Create the method `public void Reset()` for the counter that resets the value of the counter to 0. For example:

```cpp
public static void Main(string[] args)
{

  DecreasingCounter counter = new DecreasingCounter(20);
  counter.PrintValue();

  counter.Reset();
  counter.PrintValue();
}
```

```console
value: 20
value: 0
```

</Exercise>

<Exercise title={'008 Debt'}>

Create the class `Debt` that has double-typed instance variables of `balance` and `interestRate`. The balance and the interest rate are passed to the constructor as parameters `public Debt(double initialBalance, double initialInterestRate)`.

In addition, create the methods `public void PrintBalance()` and `public void WaitOneYear()` for the class. The method PrintBalance prints the current balance, and the WaitOneYear method grows the debt amount.

The debt is increased by multiplying the balance by the interest rate.

The class should do the following:

```cpp
public static void Main(string[] args)
{

  Debt mortgage = new Debt(120000.0, 1.01);
  mortgage.PrintBalance();

  mortgage.WaitOneYear();
  mortgage.PrintBalance();

  // Wait 20 years
  int years = 0;
  while (years < 20)
  {
    mortgage.WaitOneYear();
    years = years + 1;
  }

  mortgage.PrintBalance();
}
```

The example above illustrates the development of a mortgage with an interest rate of one percent.

Prints:

```console
120000
121200
147887.0328416936
```

</Exercise>

<Exercise title={'009 Dalmatian'}>

Create a class called `Dalmatian`. The dalmatian has instance variables `string name` and `int spots`. Both are set in the `public Dalmatian(string name, int spots)` constructor. 

<Note>
Also, give the variables ability for get and set:

Make the variables public rather than private, and add \{ get; set; \} on the declaring lines!
</Note>

```cpp
Dalmatian spotty = new Dalmatian("Spot", 306);
Console.WriteLine(spotty.name + " is a very good dog. He has " + spotty.spots + " darker spots in his fur");
```

```console
Spot is a very good dog. He has 306 darker spots in his fur
```

</Exercise>

<Exercise title={'010 Gauge'}>

Create the class `Gauge`. The gauge has the instance `public int value`, a constructor without parameters (sets the initial value of the meter variable to 0), and also the following three methods:

- Method `public void Increase()` grows the value instance variable's value by one. It does not grow the value beyond five.
- Method `public void Decrease()` decreases the value instance variable's value by one. It does not decrease the value to negative values.
- Method `public bool Full()` returns `True` if the instance variable value has the value five. Otherwise, it returns `False`.

<Note>
Also, give the value ability for get and set:

Make the value public rather than private, and add \{ get; set; \} on the declaring lines!
</Note>

An example of the class in use.

```cpp
public static void Main(string[] args)
{
  Gauge g = new Gauge();

  while (!g.Full())
  {
    Console.WriteLine("Not full! Value: " + g.value);
    g.Increase();
  }

  Console.WriteLine("Full! Value: " + g.value);
  g.Decrease();
  Console.WriteLine("Not full! Value: " + g.value);
}
```

```console
Not full! Value: 0
Not full! Value: 1
Not full! Value: 2
Not full! Value: 3
Not full! Value: 4
Full! Value: 5
Not full! Value: 4
```

</Exercise>

<Exercise title={'011 Agent'}>

The exercise template defines an Agent class, having a first name and last name. The Main method tries to print the introduction for mister Bond, but with no luck. This is what is should do:

```cpp
public static void Main(string[] args)
{
  Agent bond = new Agent("James", "Bond");
  Console.WriteLine(bond);

  Agent bourne = new Agent("Jason", "Bourne");
  Console.WriteLine(bourne);
}
```

```console
My name is Bond. James Bond.
My name is Bourne. Jason Bourne.
```

Agent's ToString now returns an empty string. Fix it to introduce international agents in their proper form.

</Exercise>

<Exercise title={'012 Multiplier'}>

Create a class `Multiplier` that has a:

Constructor `public Multiplier(int number)`
Method `public int Multiply(int number)` which returns the value number passed to it multiplied by the number provided to the constructor.
You also need to create an instance variable in this exercise. When you call the method Multiply, store the changed value into the instance variable!

An example of the class in use:

```cpp
public static void Main(string[] args)
{
  Multiplier multiplyByThree = new Multiplier(3);

  Console.WriteLine("multiplyByThree.Multiply(2): " + multiplyByThree.Multiply(2));

  Multiplier multiplyByFour = new Multiplier(4);

  Console.WriteLine("multiplyByFour.Multiply(2): " + multiplyByFour.Multiply(2));
  Console.WriteLine("multiplyByThree.Multiply(1): " + multiplyByThree.Multiply(1));
  Console.WriteLine("multiplyByFour.Multiply(1): " + multiplyByFour.Multiply(1));
  Console.WriteLine("multiplyByFour.Multiply(3): " + multiplyByFour.Multiply(3));
}
```

```console
multiplyByThree.Multiply(2): 6
multiplyByFour.Multiply(2): 8
multiplyByThree.Multiply(1): 6
multiplyByFour.Multiply(1): 8
multiplyByFour.Multiply(3): 24
```

<Note>The value stored in the objects is changed during the first calls!</Note>

The calculations are actually ( in order):  
3 * 2 = 6  
4 * 2 = 8  
6 * 1 = 6  
8 * 1 = 8  
8 * 3 = 24

</Exercise>

<Exercise title={'013 Statistics'}>

The exercise template includes class `Statistics`

```cpp
namespace Exercise013
{
  public class Statistics
  {
    public int count {get; set;}
    public int sum { get; set; }

    public NumberStatistics()
    {
      // initialize the variable count here
    }

    public void AddNumber(int number) {
        // write code here
    }
  }
}
```

The following program introduces the class' use:

```cpp
Statistics statistics = new Statistics();
statistics.AddNumber(3);
statistics.AddNumber(5);
statistics.AddNumber(1);
statistics.AddNumber(2);
Console.WriteLine("Count: " + statistics.count);
Console.WriteLine("Sum: " + statistics.sum);
```

```console
Count: 4
Sum: 11
```

Expand the program as follows:
- When a number is added, `count` is increased by one
- When a number is added, `sum` is increased by the number's value

</Exercise>

<Exercise title={'014 Payment card'}>

In this exercise, a class called PaymentCard is created which aims to mimic a cafeteria's payment process.

* Section 1

The template includes the `Program.cs` and `PaymentCard.cs` files.

- Add a new class to the project called `PaymentCard` in the correct file.
- Fill in the PaymentCard object's constructor, which is passed the opening balance of the card, and which then stores that balance in the object's internal variable. 
- Fill in the ToString method, which will return the card's balance in the form "The card has a balance of X euros".

Here is the template for the PaymentCard:

```cpp
namespace Exercise014
{
  public class PaymentCard
  {
    private double balance;

    public PaymentCard(double openingBalance)
    {
      // write code here
    }

    public override string ToString()
    {
      // write code here
    }
  }
}
```
The following main program tests the class:

```cpp
public static void Main(string[] args)
{
  PaymentCard card = new PaymentCard(50);
  Console.WriteLine(card);
}
```

```console
The card has a balance of 50 euros
```

* Section 2

Expand your answer from the exercise 106 by adding two methods:
- Method `public void EatLunch()`
- Method `public void DrinkCoffee()`

The method `EatLunch` should decrease the card's balance by 10.60 euros. The method `DrinkCoffee` should decrease the card's balance by 2.0 euros.

The following main program tests the class:

```cpp
public static void Main(string[] args)
{
  PaymentCard card = new PaymentCard(50);
  Console.WriteLine(card);

  card.EatLunch();
  Console.WriteLine(card);
  
  card.DrinkCoffee();
  Console.WriteLine(card);
}
```

```console
The card has a balance of 50 euros
The card has a balance of 39.4 euros
The card has a balance of 37.4 euros
```

* Section 3

xpand your previous answers, so that when an item is bought the balance is checked. If there is not enough money to buy, the balance does not change.

```cpp
public static void Main(string[] args)
{
  PaymentCard card = new PaymentCard(10);
  Console.WriteLine(card);

  card.EatLunch();
  Console.WriteLine(card);
  
  card.DrinkCoffee();
  Console.WriteLine(card);
}
```

```console
The card has a balance of 10 euros
The card has a balance of 10 euros
The card has a balance of 8 euros
```

Notice how EatLunch did not change the balance, as there was not enough money. DrinkCoffee still worked, as it should.

* Section 4

Expand your previous answers, so that you can charge money on your card:

```cpp
public void AddMoney(double amount) {
    // write code here
}
```

The purpose of the method is to increase the card's balance by the amount of money given as a parameter. However, the card's balance may not exceed 150 euros. As such, if the amount to be topped up exceeds this limit, the balance should, in any case, become exactly 150 euros.

The following main program tests the class:

```cpp
public static void Main(string[] args)
{
  PaymentCard card = new PaymentCard(100);
  Console.WriteLine(card);

  card.AddMoney(49.99);
  Console.WriteLine(card);

  card.AddMoney(10000.0);
  Console.WriteLine(card);

  card.AddMoney(-10);
  Console.WriteLine(card);
}
```

```console
The card has a balance of 100 euros
The card has a balance of 149.99 euros
The card has a balance of 150 euros
The card has a balance of 150 euros
```

<Note>You cannot add negative money!</Note>

</Exercise>