---
title: "Polymorphism"
nav_order: 3
hidden: true
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