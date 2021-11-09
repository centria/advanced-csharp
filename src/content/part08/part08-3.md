---
title: "Grouping Data Using Dictionaries"
nav_order: 3
hidden: false
---



A dictionary has at most one value per each key. In the following example, we store the phone numbers of people into the dictionary.

```cpp
static void Main(string[] args)
{
  Dictionary<string, string> phoneNumbers = new Dictionary<string, string>();
  
  phoneNumbers["Pekka"] = "040-12348765";
  Console.WriteLine("Pekka's number " + phoneNumbers["Pekka"]);

  phoneNumbers["Pekka"] = "09-111333";
  Console.WriteLine("Pekka's number " + phoneNumbers["Pekka"]);
}
```

```console
Pekka's number 040-12348765
Pekka's number 09-111333
```

<Note> The way we handled the dictionary is now a bit different. Rather than using the **Add** method, we put the values in by directly addressing the key, this time "Pekka". This way we could also update the value to which the key points to. This works when we assign a value to the key, even though the key does not yet exist in the dictionary.</Note>

If we were to search for a value with a key that does not exist, however, we get an error:

```cpp
static void Main(string[] args)
{
  Dictionary<string, string> phoneNumbers = new Dictionary<string, string>();

  Console.WriteLine("Pekka's number " + phoneNumbers["Pekka"]);

  phoneNumbers["Pekka"] = "09-111333";
  Console.WriteLine("Pekka's number " + phoneNumbers["Pekka"]);
}
```

```console
Unhandled exception. System.Collections.Generic.KeyNotFoundException: The given key 'Pekka' was not present in the dictionary.

[. . .]
```

Be careful, when handling data!

What if we wanted to assign multiple values ​​to a single key, such as multiple phone numbers for a given person?

Since keys and values ​​in a dictionary can be any variable, it is also possible to use lists as values in a dictionary. You can add more values ​​to a single key by attaching a list to the key. Let's change the way the numbers are stored in the following way:

```cpp
Dictionary<string, List<string>> phoneNumbers = new Dictionary<string, List<string>>();

// Add Pekka to the Dictionary with a new List for numbers
phoneNumbers["Pekka"] = new List<string>();
// Get Pekka's list and add a number to the list
phoneNumbers["Pekka"].Add("040-12348765");
// Get Pekka's list and add a number to the list
phoneNumbers["Pekka"].Add("09-111333");

Console.WriteLine("Pekka's numbers:");
// Get Pekka's list and use the list's ForEach to print content
phoneNumbers["Pekka"].ForEach(Console.WriteLine);
```

This exactly the same as

```cpp
Dictionary<string, List<string>> phoneNumbers = new Dictionary<string, List<string>>();

// Add Pekka to the Dictionary with a new List for numbers
phoneNumbers.Add("Pekka", new List<string>());
// Get Pekka's list and add a number to the list
phoneNumbers["Pekka"].Add("040-12348765");
// Get Pekka's list and add a number to the list
phoneNumbers["Pekka"].Add("09-111333");

Console.WriteLine("Pekka's numbers:");
// Get Pekka's list and use the foreach loop to print content
foreach (string phone in phoneNumbers["Pekka"]) {
  Console.WriteLine(phone);
}

```

```console
Pekka's numbers:
040-12348765
09-111333
```

We define the type of the phone number as Dictionary\<string, List\<string\>\>. This refers to a dictionary that uses a string as a key and a list containing strings as its value. As such, the values added to the dictionary are concrete lists.

```cpp
// Add Pekka to the Dictionary with a new List for numbers
phoneNumbers.Add("Pekka", new List<string>());
```

We can implement, for instance, an exercise point tracking program in a similar way. The example below outlines the **TaskTracker** class, which involves user-specific tracking of points from tasks. The user is represented as a string and the points as integers.

```cpp
using System;
using System.Collections.Generic;

namespace Exercise001
{
  public class TaskTracker
  {
    private Dictionary<string, List<int>> completedExercises;

    public TaskTracker()
    {
      this.completedExercises = new Dictionary<string, List<int>>();
    }

    public void Add(string user, int exercise)
    {
      // an empty list has to be added for a new user if one has not already been added
      if (!this.completedExercises.ContainsKey(user)) {
        this.completedExercises.Add(user, new List<int>());
      }

      // let's first retrieve the list containing the exercises completed by the user and add to it
      List<int> completed = this.completedExercises[user];
      completed.Add(exercise);

      // the previous would also work without the helper variable as follows
      // this.completedExercises[user].Add[exercise];
    }

    public void Print()
    {
      Dictionary<string, List<int>>.KeyCollection keys = this.completedExercises.Keys;

      foreach (string name in keys)
      {
        foreach (int completed in this.completedExercises[name]) {
          Console.WriteLine(name + ": " + completed);
        }
      }
    }
  }
}
```

```cpp
TaskTracker tracker = new TaskTracker();
tracker.Add("Ada", 3);
tracker.Add("Ada", 4);
tracker.Add("Ada", 2);
tracker.Add("Ada", 1);

tracker.Add("Pekka", 4);
tracker.Add("Pekka", 3);

tracker.Add("Matti", 1);
tracker.Add("Matti", 2);

tracker.Print();
```

```console
Ada: 3
Ada: 4
Ada: 2
Ada: 1
Pekka: 4
Pekka: 3
Matti: 1
Matti: 2
```



# Exercises

<Exercise title={'008 Dictionary of Many Translations'}>

Your assignment is to create the class **DictionaryOfManyTranslations**. In it can be stored one or more translations for each word. The class is to implement the following methods:

* **public void Add(string word, string translation)** adds the translation for the word and preserves the old translations.
* **public List<string\> Translate(string word)** returns a list of the translations added for the word. If the word has no translations, the method should return an empty list.
* **public void Remove(string word)** removes the word and all its translations from the dictionary.
It's probably best to add the translations to an object variable that is of the type **Dictionary<string, List<string\> >**

An example:

```cpp
DictionaryOfManyTranslations dictionary = new DictionaryOfManyTranslations();
dictionary.Add("lie", "maata");
dictionary.Add("lie", "valehdella");

dictionary.Add("bow", "jousi");
dictionary.Add("bow", "kumartaa");

foreach (string translation in dictionary.Translate("bow"))
{
  Console.WriteLine(translation);
}
Console.WriteLine();

foreach (string translation in dictionary.Translate("lie"))
{
  Console.WriteLine(translation);
}

dictionary.Remove("bow");
foreach (string translation in dictionary.Translate("bow"))
{
  Console.WriteLine(translation);
}
```

```console
jousi
kumartaa

maata
valehdella
```


</Exercise>

<Exercise title={'009 Storage Facility'}>

Your task is creating a class called **StorageFacility** that can be used to keep track of storage units and their contents. The class is to implement the following methods:

* **public void Add(string unit, string item)** adds the parameter item to the storage unit that is also given as a parameter.

* **public List<string\> Contents(string storageUnit)** returns a list that contains all the items in the storage unit indicated by the parameter. If there is no such storage unit or it contains no items, the method should return an empty list.

* **public void Remove(string storageUnit, string item)**  removes the given item from the given storage unit. 

<Note>Only removes one item -- if there are several items with the same name, the rest still remain. If the storage unit would be empty after the removal, the method also removes the unit.</Note>

* **public List<string\> StorageUnits()**  returns the names of the storage units as a list. 

<Note>Only the units that contain items are listed</Note>

Here's an example:

```cpp
StorageFacility facility = new StorageFacility();
facility.Add("a14", "ice skates");
facility.Add("a14", "ice hockey stick");
facility.Add("a14", "ice skates");

facility.Add("f156", "rollerblades");
facility.Add("f156", "rollerblades");

facility.Add("g63", "six");
facility.Add("g63", "pi");

foreach (string unit in facility.StorageUnits())
{
  Console.WriteLine(unit);
}

foreach (string item in facility.Contents("a14"))
{
  Console.WriteLine(item);
}

foreach (string item in facility.Contents("f156"))
{
  Console.WriteLine(item);
}
facility.Remove("f156", "rollerblades");

foreach (string item in facility.Contents("f156"))
{
  Console.WriteLine(item);
}

facility.Remove("f156", "rollerblades");

foreach (string unit in facility.StorageUnits())
{
  Console.WriteLine(unit);
}
```

```console
a14
f156
g63
ice skates
ice hockey stick
ice skates
rollerblades
rollerblades
rollerblades
a14
g63
```


</Exercise>