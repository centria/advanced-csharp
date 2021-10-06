---
title: "Variable types"
nav_order: 3
hidden: false
---


There are two kinds of types in C#: **value types** and **reference types**. Variables of value types directly contain their data whereas variables of reference types store references to their data, the latter being known as **objects**. 

With reference types, it is possible for two variables to reference the same object and thus possible for operations on one variable to affect the object referenced by the other variable. 

With value types, the variables each have their own copy of the data, and it is not possible for operations on one to affect the other.

From the programmer's point of view, the data in a value variable is stored as the value of that variable, whereas the value of a reference type varible is a reference to the data. Let's examine these different types with two examples.

```cpp
int number = 10;
Console.WriteLine(number);
```

```console
10
```

```cpp
namespace Exercise001
{
  public class Name
  {
    private string name;

    public Name(string name)
    {
      this.name = name;
    }
  }
}
```

```cpp
  Name john = new Name("John");
  Console.WriteLine(john);
```


```console
Exercise001.Name
```

In the first example we create a simple **int** variable, and the number 10 is stored as its value. When we pass the variable to the **Console.WriteLine** method, the value 10 is printed. In the second example we create a **reference type** variable named john. A reference to an object, returned by the constructor of the **Name** class when we call it, is stored as the value of the variable. When this latter variable is printed, the string **Exercise001.Name** is what ends up being printed. What is the cause for this?

The method call **Console.WriteLine** prints the value of the variable. The value of a simple variable is concrete, whereas the value of a reference type variable is a reference. In the case of a reference type variable, what is printed is the ToString representation of the object. As the default method for any **Object.ToString** is to print in format **namespace.ClassName**, we get **Exercise001.Name**.

The previous example is the case when the programmer has not changed a variable's default print format. You can change the default print by defining the method **ToString** in the class of the object in question. The method indicates what string should be printed when an instance of the class is printed. In the example below, we have defined the method **public override string ToString()** in the class Name: it returns the instance variable name. Now when we print an object that is an instance of Name with the Console.WriteLine command, what is printed is the string returned by the ToString method.

```cpp
namespace Exercise001
{
  public class Name
  {
    private string name;

    public Name(string name)
    {
      this.name = name;
    }

    public override string ToString() {
      return this.name;
    }
  }
}
```

```cpp
Name john = new Name("John");
Console.WriteLine(john);
```

```console
John
```

## Value types

A value type is either a **struct type** or an **enumeration type**. C# provides a set of predefined struct types called the **simple types**. The simple types are identified through reserved words.

A variable of a value type contains an instance of the type. This differs from a variable of a reference type, which contains a reference to an instance of the type. By default, on assignment, passing an argument to a method, or returning a method result, variable values are copied. In the case of value-type variables, the corresponding type instances are copied.

The most interesting (and maybe most important for us) are the **simple type**. Most of the variables we have handled so far are part of the simple type: int, bool and double are all simple types. It means that they are actually **keywords** that are **reserved** to represent certain types from the **System namespace**. 

Because a simple type aliases a struct type, every simple type has members. For example, **int** has the members declared in **System.Int32** and the members inherited from **System.Object**, and the following statements are permitted:

```cpp
int i = int.MaxValue;    // System.Int32.MaxValue constant
string s = i.ToString(); // System.Int32.ToString() instance method
string t = 123.ToString(); // System.Int32.ToString() instance method
```

In other words, all the basic variables we have been using, are actually just easier way of using methods that are hidden inside the System.

Introducing a value variable reserves a memory location of fixed size from the memory. The size is determined by the type of the variable, and the memory location is where the value of the variable stored at. In the example below we create three variables. Each one has its own memory location, to where the assigned value is copied.

```cpp
int first = 10;
int second = first;
int third = second;
Console.WriteLine(first + " " + second + " " + third);
second = 5;
Console.WriteLine(first + " " + second + " " + third);
```

```console
10 10 10
10 5 10
```

The name of the variable tells the memory location where its value is stored. When you assign a value to a value variable with an equality sign, the value on the right side is copied to the memory location indicated by the name of the variable. For example, the statement **int first = 10** reserves a location called first for the variable, and then copies to value 10 into it.

Similarly, the statement **int second = first;** reserves a location called second for the created variable, and then copies the value stored in the location of first into it.

The values of variables are also copied when they are used in method calls. In practice this means that the value of a variable that is passed as a method parameter is not changed in the method that did the passing / called the other method. 

## Reference types

C#’s reference type is a class type, an interface type, an array type, or a delegate type. 

A reference type value is a reference to an **instance** of the type, the latter known as an **object**. The special value **null** is compatible with all reference types and indicates the absence of an instance. The programmer is also free to create their own variable types by defining new classes. In practice any object instanced from a class is a reference variable.

Let's re-examine the example at the beginning of the chapter, where we created a variable called john of type Name.

```cpp
Name john = new Name("John");
```

The call consists of the following parts:

* When introducing any new variable, we must first define the type of that variable. Below we introduce a variable of type **Name**. In order for the execution of the program to succeed, there must be a class called **Name** available.

```cpp
Name ...
```

* In the introduction of a variable its name must be included. You can later use the name of the variable to reference its value. Below, the variable name is defined as luke.

```cpp
Name john ...
```

* You can store a value in a variable. You can create an instance object from a class by calling the class constructor, which defines the values that are placed in the instance variables of the object that is created. Below we assume that the class **Name** has a constructor that takes a string as parameter.

```cpp
... new Name("John");
```

* The constructor call returns a value that is a reference to the created object. The equality signs tells the program that the value of the right-side expression is to be copied as the value of the variable on the left side. The reference to the newly-created object, which is returned by the constructor call, is copied as the value of the **john** variable.

```cpp
Name john = new Name("John");
```

The greatest difference between value and reference varibales is that the value ones (almost without exception) are unchanging. Conversely, the inner state of reference variables can typically be changed. This phenomenon is explained by the fact that the value of a value variable is directly stored in the variable, whereas the value of a reference variable is a reference to the variable data, i.e. the variable's internal state.

Arithmetic operations, such as addition, subtraction, multiplication, can be used with value variables -- these operations do not change the original values of the variables. Arithmetic expressions create new values, which are stored into variables when needed. Notice that the values of reference variables cannot be changed by these arithmetic expressions.

The value of a reference variable -- i.e. a reference -- points to a location that contains the information that relates to that variable. Let's assume we have the class Person available, and it contains a definition for the instance variable age. If a person object has been instanced of the class, you can find the variable age by following the object's reference. The value of this age variable can be changed, if so needed.

[**You can read more about variable types from here**](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/types). This rabbit hole of information is *very deep* and might take some time to understand.

## Value or reference type variable as a method parameter

We stated earlier that the value of a value variable is directly stored in that variable, whereas the value of a reference variable contains the reference to an object. We also mentioned that assigning a value with the equality sign copies the value on the right (possibly the value of some variable), and stores it as the value of the left-side variable.

A similar copying occurs when a method is called. Regardless of whether the variable is value or reference type, the value given as a method parameter is copied for the method to use. In the case of value variables, the value of the variable is given to the method; with reference type variables, the method receives a reference.

Let's take a practical look at the phenomenon. Let's assume we have the following **Person** class available.

```cpp
public class Person
{
  private string name;
  public int birthYear { get; set; }

  public Person(string name)
  {
    this.name = name;
    this.birthYear = 1970;
  }

  public override string ToString()
  {
    return this.name + " (" + this.birthYear + ")";
  }
}
```

Let's take a look at the operation of the program step by step.

```cpp
static void Main(string[] args)
{

  Person first = new Person("First");

  Console.WriteLine(first);
  MakeYounger(first);
  Console.WriteLine(first);

  Person second = first;
  MakeYounger(second);

  Console.WriteLine(first);
}

public static void MakeYounger(Person person)
{
  person.birthYear++;
}
```

```console
First (1970)
First (1971)
First (1972)
```

The execution of the program begins on the first line of the Main method. On the first row of the Main, a **Person type variable** first is introduced, and the value returned by the constructor of the Person class is copied as its value. The constructor creates an object whose birth year is set as 1970, and whose name is set to be the value received as the paramter. After the execution of this first row the state of the program is the following -- a Person object has been created in the memory, and there is a reference to it from the first variable defined in the Main method.


![Step one](https://github.com/centria/basic-csharp/raw/master/src/images/part5-3-first-1-tm.png)

On the third row of the Main method we print the value of the variable first. The method call **Console.WriteLine** searches for the method ToString from the reference variable that it is given as the parameter. The Person class has the method ToString, so that method is called on the object that is referenced by the first variable. The value of the name variable in that object is "First", and the value of the birth year variable is 1970. What is printed is the string "First (1970)".

On the fourth row the program calls the MakeYounger method, and the variable first is passed as a parameter to it. When the method MakeYounger is called, the value of the variable passed as the parameter is copied for the method MakeYounger to use. The execution of the Main method remains waiting in the call stack. As the variable first is reference type, the reference created earlier is copied for the method's use. At the end of the method execution the situation is the following -- the method increments by one the birth year of the object it receives as a parameter.

![Step two](https://github.com/centria/basic-csharp/raw/master/src/images/part5-3-first-2-tm.png)

When the execution of the method MakeYounger ends, we return back to the Main method. The information related to the execution of the MakeYounger disappear from the call stack.

![Step three](https://github.com/centria/basic-csharp/raw/master/src/images/part5-3-first-3-tm.png)

After returning from the method call we again execute the printing of the variable first. The object pointed at by the variable first has been modified in the course of executing the method call **MakeYounger**: the **birthYear** variable of the object was incremented by one. The final value that is printed is "First (1971)".

Then the program introduces a new Person type variable called second. The value of the variable first is copied into the variable second: in other words, the value of the variable second is a reference to the already existing Person object.

![Step four](https://github.com/centria/basic-csharp/raw/master/src/images/part5-3-first-4-tm.png)

After this the program calls the method MakeYounger, which is given the variable second as the parameter. The value of the given variable is copied as the value of a method variable when the method is called. At the end of the method execution there has been an increment of one in the object referenced by the method variable.

![Step five](https://github.com/centria/basic-csharp/raw/master/src/images/part5-3-first-5-tm.png)

Finally the method execution ends and the program returns to the Main method. In the Main method the value of the variable first is printed one more time. The final result of the print is "First(1972)".

In the course material the concrete details concerning variables and computer memory are presented simplistically. We introduce memory-related topics on the suitable abstaction level for learning how to program. For instance, from the point of view of the course goals, the following sentence is good enough: **statement int number = 5** reserves a **location** for the variable number **in the memory**, and **copies the value 5 into it**.

From the point of view of the computer operation, there are a great deal more occuring during the execution of the statement int number = 5. The execution calls for reserving a 32-bit location from the memory for the value 5, and another 32-bit location for the variable number. The size of the location is determined by the variable type. After this the contents of the memory location that includes the value 5 are copied into the memory location of the variable number.

In addition to the above, the variable number is not a straightforward memory location or a box. The value of the variable number is a memory address -- the information about the variable type, included in the variable, tells how much data should be retrieved from the specified address. In the case of an integer this amount is 32 bits, for instance.