---
title: "Polymorphism"
nav_order: 93
hidden: false
---

# Polymorphism

We've encountered situations where reference-type variables have other types besides their own one. For example, all objects are of type Object, i.e., any given object can be represented as a Object-type variable in addition to its own type.

```cpp
string text = "text";
Object textString = "another string";
```

```cpp
string text = "text";
Object textString = text;
```

In the examples above, a string variable is represented as both a String type and an Object type. Also, a String-type variable is assigned to an Object-type variable. However, assignment in the other direction, i.e., setting an Object-type variable to a String type, will not work. This is because Object-type variables are not of type String.

```cpp
Object textString = "another string";
string text = textString; // WON'T WORK!
```

What is this all about?

In addition to each variable's original type, each variable can also be represented by the types of interfaces it implements and classes that it inherits. The String class inherits the Object class and, as such, String objects are always of type Object. The Object class does not inherit a String class, so Object-type variables are not automatically of type String. If we look at the [**API Documentation**](https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netframework-4.8) for string, we can see that it inherits the Object class:

```console
Object --> String
```

The inheritance hierarchy lists all the classes that the given class has inherited. Inherited classes are listed in the order of inheritance, with class being inspected always at the bottom. In the inheritance hierarchy of the String class, we see that the String class inherits the Object class. In C#, *each class can inherit one class at most*. On the other hand, the inherited class may have inherited another class. As such, a class may indirectly inherit more than a single class.

The inheritance hierarchy can also be thought of as a list of the different types that the class implements.

Knowledge of the fact that objects can be of many different types -- of type Object, for instance -- makes programming simpler. If we only need methods defined in the Object class, such as **ToString**, **Equals** and **GetHashCode** in a method, we can simply use Object as the type of the method parameter. In that case, you can pass the method *any* object as a parameter. Let's take a look at this with the **PrintManyTimes** method. The method gets an Object-type variable and the number of print operations as its parameters.

```cpp
public void PrintManyTimes(Object obj, int times)
{
  int i = 0;
  while (i < times)
  {
    Console.WriteLine(obj.ToString());

    i = i + 1;
  }
}
```

The method can be given any type of object as a parameter. Within the PrintManyTimes method, the object only has access to the methods defined in the Object class because the object is known in the method to be of type Object. The object may, in fact, be of another type.

```cpp
Printer printer = new Printer();

string str = " o ";
List<string> words = new List<string>();
words.Add("polymorphism");
words.Add("inheritance");
words.Add("encapsulation");
words.Add("abstraction");

printer.PrintManyTimes(str, 2);
printer.PrintManyTimes(words, 3);
```

```console
 o 
 o
System.Collections.Generic.List`1[System.String]
System.Collections.Generic.List`1[System.String]
System.Collections.Generic.List`1[System.String]
```

Let's continue to look at the API description of the String class. The inheritance hierarchy in the description is followed by a list of interfaces implemented by the class.

```cpp
[System.Runtime.InteropServices.ComVisible(true)]
[System.Serializable]
public sealed class String : ICloneable, IComparable, IComparable<string>, IConvertible, IEquatable<string>, System.Collections.Generic.IEnumerable<char>
```

The **String** class implements multiple interfaces, such as **IComparable**, **IConvertible** and **ICloneable**.

```cpp
ICloneable cloneableString = "string";
IComparable comparableString = "string";
IConvertible convertibleString = "string";
```

Since we're able to define the type of a method's parameter, we can declare methods that receive an object that *implements a specific interface*. When a method's parameter is an interface, any object that implements that interface can be passed to it as an argument.

## Implementing multiple abstract classes and interfaces

As stated earlier, a class can only inherit a single class directly, but can inherit an interface, or actually multiple interfaces, as well. How do we do that in code?

The answer is simple, we just list them separated with a comma. For example a class from our exercises:

```cpp
public class Cat : Animal, INoiseCapable
{
  // All the code a Cat needs
}
```

Now we have a class **Cat**, which implements the **abstract class** called **Animal**. At the same time, we also use the **interface** called **INoiseCapable**. 

Now you might also notice, why the capital "I" is very convenient in front of the interfaces: With it we can directly distinguish the difference between the two, and don't have to see their code to know, which is which.


# Exercises

<Exercise title={'008 Animals'}>

In this exercise you'll demonstrate how to use both inheritance and interfaces.

* First implement an **abstract class** called **Animal**. The class should have a constructor that takes the animal's name as a parameter. The Animal class also has non-parameterized methods **Eat** and **Sleep** that return nothing (void).

* The Sleep method should print "(name) sleeps", and the Eat method should print "(name) Eats". Here (name) is the name of the animal in question.

* Implement a class called **Dog** that inherits from Animal. Dog should have a **parameterized constructor** that can be used to name it. The class should also have a **non-parameterized constructor**, which gives the dog the name "Dog". Another method that Dog must have is the non-parameterized **Bark**, and it should not return any value (void). Like all animals, Dog needs to have the methods Eat and Sleep.

* Next to implement is the class **Cat**, that also inherits from the Animal class. Cat should have **two constructors**: one with a parameter, used to name the cat according to the parameter, and one without parameters, in which case the name is simply "Cat". Another methd for Cat is a non-parameterized method called Purr that returns no value (void). Cats should be able to Eat and Sleep like in the first part.

* Finally, create an **interface** called **INoiseCapable**. It should define a non-parameterized method **MakeNoise** that returns no value (void). *Implement the interface in the classes Dog and Cat*. The interface should take use of the Bark and Purr methods you've defined earlier.

Below is an example of the expected functionality of all the parts.

```cpp
Dog dog = new Dog();
dog.Bark();
dog.Eat();
dog.Sleep();

Dog fido = new Dog("Fido");
fido.Bark();

Cat cat = new Cat();
cat.Purr();
cat.Eat();
cat.Sleep();

Cat garfield = new Cat("Garfield");
garfield.Purr();

INoiseCapable doggy = new Dog();
doggy.MakeNoise();

INoiseCapable catty = new Cat("Garfield");
catty.MakeNoise();

Cat c = (Cat) catty;
c.Purr();
```

```console
Dog barks
Dog eats
Dog sleeps
Fido barks
Cat purrs
Cat eats 
Cat sleeps
Garfield purrs
Dog barks 
Garfield purrs 
Garfield purrs
```

<Note>This exercise is worth 2 points, and requires all the classes implemented to work</Note>

</Exercise>