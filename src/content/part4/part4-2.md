---
title: "Objects in a list"
nav_order: 2
hidden: false
---

The type parameter used in creating a list defines the type of the variables that are added to the list. For instance, List<string\> includes strings, List<int\> integers, and List<double\> floating point numbers.

In the example below we first Add strings to a list, after which the strings in the list are printed one by one.

```cpp
List<string> names = new List<string>();

// string can first be stored in a variable
string betty = "Betty Jennings";
// then Add it to the list
names.Add(betty);

// strings can also be directly added to the list:
names.Add("Betty Snyder");
names.Add("Frances Spence");
names.Add("Kay McNulty");
names.Add("Marlyn Wescoff");
names.Add("Ruth Lichterman");

// several different repeat statements can be
// used to go through the list elements

// 1. while loop
int index = 0;
while (index < names.Count)
{
  Console.WriteLine(names[index]);
  index = index + 1;
}

// 2. for loop with index
for (int i = 0; i < names.Count; i++)
{
  Console.WriteLine(names[i]);
}

Console.WriteLine();
// 3. for each loop (no index)
foreach (string name in names)
{
  Console.WriteLine(name);
}
```

## Adding object to a list

Strings are objects, so it should come as no surprise that other kinds of objects can also be found in lists. Next, let's examine the cooperation of lists and objects in more detail.

Let's assume we have access to the class defined below, describing a person.

```cpp
public class Person
{
  public string name { get; }
  public int age { get; set; }
  public int weight { get; set; }
  public int height { get; set; }

  public Person(string name)
  {
    this.age = 0;
    this.weight = 0;
    this.height = 0;
    this.name = name;
  }

  public double BodyMassIndex()
  {
    double heigthPerHundred = this.height / 100.0;
    return this.weight / (heigthPerHundred * heigthPerHundred);
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


  public override string ToString()
  {
    return this.name + ", age " + this.age + " years";
  }
}
```

Handling objects in a list is not really different in any way from the previous experience we have with lists. The essential difference is only to define the type for the stored elements when you create the list.

In the example below we first create a list meant for storing Person type object, after which we add persons to it. Finally the person objects are printed one by one.

```cpp
static void Main(string[] args)
{
  List<Person> persons = new List<Person>();

  // a person object can be created first
  Person john = new Person("John");
  // and then added to the list
  persons.Add(john);

  // person objects can also be created "in the same sentence" that they are added to the list
  persons.Add(new Person("Matthew"));
  persons.Add(new Person("Martin"));

  foreach (Person person in persons)
  {
    Console.WriteLine(person);
  }
}
```

```console
John, age 0 years
Matthew, age 0 years
Martin, age 0 years
```

## Adding user-inputted objects to a list

The structure we have learned earlier for reading inputs is still very useful.

```cpp
static void Main(string[] args)
{
  List<Person> persons = new List<Person>();

  // Read the names of persons from the user
  while (true)
  {
    Console.Write("Enter a name, empty will stop: ");
    String name = Console.ReadLine();
    if (name == "")
    {
      break;
    }


    // Add to the list a new person
    // whose name is the previous user input
    persons.Add(new Person(name));
  }

  // Print the number of the entered persons, and their individual information
  Console.WriteLine();
  Console.WriteLine("Persons in total: " + persons.Count);
  Console.WriteLine("Persons: ");

  foreach (Person person in persons)
  {
    Console.WriteLine(person);
  }
}
```

```console
Enter a name, empty will stop: Matt
Enter a name, empty will stop: Mike
Enter a name, empty will stop: Bob
Enter a name, empty will stop: 

Persons in total: 3
Persons: 
Matt, age 0 years
Mike, age 0 years
```

## Multiple constructor parameters

If the constructor demands more than one parameters, you can query the user for more information. Let's assume we have the following constructor for the class **Person**.

```cpp
public class Person
{
  public string name { get; }
  public int age { get; set; }
  public int weight { get; set; }
  public int height { get; set; }

  public Person(string name, int age)
  {
    this.age = age;
    this.name = name;
    this.weight = 0;
    this.height = 0;
  }

  // Rest of the Person
}
```

In this case, an object is created by calling the two-parameter constructor.

If we want to query the user for this kind of objects, they must be asked for each parameter separately. In the example below, name and age parameters are asked separately from the user. Entering an empty name will end the reading part.

The persons are printed after they have been read.

```cpp
static void Main(string[] args)
{
  List<Person> persons = new List<Person>();

  // Read the names of persons from the user
  while (true)
  {
    Console.Write("Enter a name, empty will stop: ");
    String name = Console.ReadLine();
    if (name == "")
    {
      break;
    }

    Console.Write("Enter the age of the person " + name + ": ");

    int age = Convert.ToInt32(Console.ReadLine());

    // Add to the list a new person
    // whose name is the previous user input
    persons.Add(new Person(name, age));
  }

  // Print the number of the entered persons, and their individual information
  Console.WriteLine();
  Console.WriteLine("Persons in total: " + persons.Count);
  Console.WriteLine("Persons: ");

  foreach (Person person in persons)
  {
    Console.WriteLine(person);
  }
}
```

```console
Enter a name, empty will stop: Mike Modeler 
Enter the age of the person Mike Modeler: 42
Enter a name, empty will stop: Nelson M
Enter the age of the person Nelson M: 1000
Enter a name, empty will stop: Harry Booter
Enter the age of the person Harry Booter: 1
Enter a name, empty will stop: 

Persons in total: 3
Persons: 
Mike Modeler, age 42 years
Nelson M, age 1000 years
Harry Booter, age 1 years
```

In the example below, the required information was entered line by line. By no means is it impossible to ask for input in a specific format, e.g. separated by a comma.

If the name and age were separated by a comma, the program could work in the following manner.

```cpp
static void Main(string[] args)
{
  List<Person> persons = new List<Person>();

  // Read the names of persons from the user
  while (true)
  {
    Console.WriteLine("Enter the person details separated by a comma, e.g.: Randall, 2");
    string details = Console.ReadLine();
    if (details == "")
    {
      break;
    }

    string[] parts = details.Split(",");
    string name = parts[0];
    int age = Convert.ToInt32(parts[1]);
    persons.Add(new Person(name, age));
  }

  // Print the number of the entered persons, and their individual information
  Console.WriteLine();
  Console.WriteLine("Persons in total: " + persons.Count);
  Console.WriteLine("Persons: ");

  foreach (Person person in persons)
  {
    Console.WriteLine(person);
  }
}
```



```console
Enter the person details separated by a comma, e.g.: Randall, 2
Matt, 23
Enter the person details separated by a comma, e.g.: Randall, 2
Mike Pence, 3
Enter the person details separated by a comma, e.g.: Randall, 2


Persons in total: 2
Persons: 
Matt, age 23 years
Mike Pence, age 3 years
```

## Filtered printing from the list

You can also examine the objects on the list as you go through it. In the example below, we first ask the user for an age restriction, after which we print all the objects whose age is at least the number given by the user.


```cpp
// Let's make a list with couple of entries
List<Person> persons = new List<Person>();
persons.Add(new Person("Martin", 11));
persons.Add(new Person("Matthew", 12));

// Ask for age limit
Console.Write("What is the age limit? ");
int ageLimit = Convert.ToInt32(Console.ReadLine());

// Print only those who are above the limit
foreach (Person person in persons) {
  if (person.age >= ageLimit)
  { 
    Console.WriteLine(person);
  }
}
```

```console
What is the age limit? 12
Matthew, age 12 years
```

# Exercises

<Exercise title={'015 Main class'}>

Implement the class `Main` described here.

<Note>Do not modify the class Item.</Note>

Write a program that reads names of items from the user. If the name is empty, the program stops reading. Otherwise, the given name is used to create a new item, which you will then add to the items list.

Having read all the names, print all the items by using the ToString method of the Item class. The implementation of the Item class keeps track of the time of creation, in addition to the name of the item.

NOTICE! The list has to be called "items" for the tests to work!

Example print:
```console
Name: Hammer
Name: Radio
Name: Hot Potato
Name: 

Hammer (created at: 9.2.2020 13.48.16)
Radio (created at: 9.2.2020 13.48.18)
Hot Potato (created at: 9.2.2020 13.48.21)
```

</Exercise>

<Exercise title={'016 Personal information'}>

The program described here should be implemented in the class `Main`. 

<Note>Do not modify the class PersonalInformation.</Note>

After the user has entered the last set of details (they enter an empty first name), exit the repeat statement. 

Print one empty line here for reading clarity.

Then print the collected personal information so that each entered object is printed in the following format: first and last names separated by a space (you don't print the identification number). An example of the working program is given below:

```console
First name: 
> Jean 
Last name: 
> Bartik 
Identification number: 
> 271224 
First name: 
> Betty 
Last name: 
> Holberton 
Identification number: 
> 070317 
First name:
>

Jean Bartik 
Betty Holberton
```

You can (and should) ask the identification number as a string.

</Exercise>

<Exercise title={'017 Television guide'}>

In the exercise template there is a ready-made class `TelevisionProgram`, representing a television program. The class has object variables name and duration, a constructor, and a few methods.

Implement a program (in the `Main` class) that begins by reading television programs from the user. When the user inputs an empty string as the name of the program, the program stops reading programs.

After this the user is queried for a maximum duration. Once the maximum is given, the program proceeds to list all the programs whose duration is smaller or equal to the specified maximum duration.

```console
Name: Rick and Morty 
Duration: 25 
Name: Two and a Half Men 
Duration: 30 
Name: Love it or list it 
Duration: 60 
Name: House 
Duration: 60
Name:

Program's maximum duration? 30 
Rick and Morty, 25 minutes 
Two and a Half Men, 30 minutes
```

</Exercise>

<Exercise title={'018 Book class'}>

This exercise is worth 2 points, without separate sections.

Write a program which first reads book information from the user. The details to be asked for each book include the title, the number of pages, and the publication year. Entering an empty string as the name of the book ends the reading process.

After this the user is asked for what is to be printed. If the user inputs "everything", all the details are printed: the book titles, the numbers of pages, and the publication years. However, if the user enters the string "title", only the book titles are printed. If something else than "everything" or "title" is given, the program should not print anything.

- Implement the class Book.
- Implement the functionality in the Main method.

Example of how the program in Main should work:

```console

Name: To Kill a Mockingbird 
Pages: 281 
Publication year: 1960 
Name: A Brief History of Time 
Pages: 256 
Publication year: 1988 
Name: Beautiful Code 
Pages: 593 
Publication year: 2007 
Name: The Name of the Wind 
Pages: 662 
Publication year: 2007 
Name:

What information will be printed? everything 
To Kill a Mockingbird, 281 pages, 1960 
A Brief History of Time, 256 pages, 1988 
Beautiful Code, 593 pages, 2007 
The Name of the Wind, 662 pages, 2007
```

```console
Name: To Kill a Mockingbird 
Pages: 281 
Publication year: 1960 
Name: A Brief History of Time 
Pages: 256 
Publication year: 1988 
Name: Beautiful Code 
Pages: 593 
Publication year: 2007 
Name: The Name of the Wind 
Pages: 662 
Publication year: 2007 
Name:

What information will be printed? title 
To Kill a Mockingbird 
A Brief History of Time 
Beautiful Code 
The Name of the Wind
```
</Exercise>