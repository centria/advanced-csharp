---
title: "Dictionaries"
nav_order: 1
hidden: false
---

# Dictionaries

One of the most commonly used data structures among lists is  a **dictionary**. In C#, the [**Dictionary<TKey,TValue> Class**](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2?view=netframework-4.8) is located in the **System.Collections.Generic** Namespace. But what does it do?

Data in dictionaries is stored as **key-value pairs**, where values can be added, retrieved, and deleted using keys. 

In the example below, a Dictionary object has been created to search for cities by their postal codes, after which four postal code-city pairs have been added to the Dictionary object. At the end of it, the postal code "00710" is retrieved from the dictionary. Both the postal code and the city are represented as strings.

```cs
using System;
using System.Collections.Generic;

namespace sandbox
{
  class Program
  {
    static void Main(string[] args)
    {
      Dictionary<string, string> postalCodes = new Dictionary<string, string>();
      postalCodes.Add("00710", "Helsinki");
      postalCodes.Add("90014", "Oulu");
      postalCodes.Add("33720", "Tampere");
      postalCodes.Add("33014", "Tampere");

      Console.WriteLine(postalCodes["33720"]);
    }
  }
}
```

```console
Tampere
```

The internal state of the dictionary created above looks like this. Each key refers to some value.

![Dictionary](https://github.com/centria/basic-coding/raw/master/assets/images/part8-1-dict.png)

If the dictionary does not contain the key used for search, we get a **KeyNotFoundException**.

```cs
Dictionary<string, string> postalCodes = new Dictionary<string, string>();
postalCodes.Add("00710", "Helsinki");
postalCodes.Add("90014", "Oulu");
postalCodes.Add("33720", "Tampere");
postalCodes.Add("33014", "Tampere");

Console.WriteLine(postalCodes["67100"]);
```

```console
Unhandled exception. System.Collections.Generic.KeyNotFoundException: The given key '67100' was not present in the dictionary.
   at System.Collections.Generic.Dictionary`2.get_Item(TKey key)
   at sandbox.Program.Main(String[] args) in /mnt/c/Users/HeikkiHei/Documents/coding-exercises/sandbox/Program.cs:line 17
```

Two type parameters are required when creating a dictionary - the type of the key and the type of the value added. If the keys of the dictionary are of type string, and the values of type integer, the dictionary is created with the following statement 

```cs
Dictionary<string, integer> dict = new Dictionary<string, integer>();
```

Adding to the dictionary is done through the **Add(*key*, *value*)** method that has two parameters, one for the key, the other for the value. Retrieving from a dictionary is done with the familiar **dictionary[*key*]** syntax. How ever, this time we are looking for a value with a key, and not with an index.

## Dictionary Keys Correspond to a Single Value at Most

The dictionary has a maximum of one value per key. If a new key-value pair is added to the dictionary, but the key has already been associated with some other value stored in the dictionary, we will get an ArgumentException:

```cs
Dictionary<string, string> postalCodes = new Dictionary<string, string>();
postalCodes.Add("67100", "Kokkola");
postalCodes.Add("67100", "Karleby");
```

```console
Unhandled exception. System.ArgumentException: An item with the same key has already been added. Key: 67100
   at System.Collections.Generic.Dictionary`2.TryInsert(TKey key, TValue value, InsertionBehavior behavior)
   at System.Collections.Generic.Dictionary`2.Add(TKey key, TValue value)
```

For this, we can prepare ourselves, by checking if a value already exists in the dictionary, and only if it does not, we add the new value:

```cs
Dictionary<string, string> postalCodes = new Dictionary<string, string>();
postalCodes.Add("00710", "Helsinki");
postalCodes.Add("90014", "Oulu");
postalCodes.Add("33720", "Tampere");
postalCodes.Add("33014", "Tampere");
postalCodes.Add("67100", "Kokkola");
postalCodes.Add("99999", null);

if (!postalCodes.ContainsKey("67100"))
{
  postalCodes.Add("67100", "Karleby");
}
```

This way our program does not crash, when we try to change the value for "67100". To see what our dictionary contains, we can use a foreach-loop for **KeyValuePair** objects:

```cs
foreach (KeyValuePair<string, string> kvp in postalCodes)
{
  Console.WriteLine("Key = {0}, Value = {1}",
      kvp.Key, kvp.Value);
}
```

And it prints like this:

```console
Key = 00710, Value = Helsinki
Key = 90014, Value = Oulu
Key = 33720, Value = Tampere
Key = 33014, Value = Tampere
Key = 67100, Value = Kokkola
Key = 99999, Value = 
```

As you can see, we can also give a **null** as a value. We cannot, however, give null as a key, or we will get **ArgumentNullException**.

## A Reference Type Variable as a Dictionary Value

Let's take a look at how a spreadsheet works using a library example. You can search for books by book title. If a book is found with the given search term, the library returns a reference to the book. Let's begin by creating an example class Book that has its name, content and the year of publication as instance variables.

```cs
public class Book
{
  public string name { get; set; }
  public string content { get; set; }
  public int published { get; set; }

  public Book(string name, int published, string content)
  {
    this.name = name;
    this.published = published;
    this.content = content;
  }

  public override string ToString()
  {
    return "Name: " + this.name + " (" + this.published + ")\n"
        + "Content: " + this.content;
  }
}
```

Let's create a dictionary that uses the book's name as a key, i.e., a string-type object, and the book we've just created as the value.

```cs
Dictionary<string, Book> directory = new Dictionary<string, Book>();
```

The dictionary above uses **string** as a key. Let's expand the example so that two books are added to the dictionary, "Sense and Sensibility" and "Pride and Predujice".

```cs
Book senseAndSensibility = new Book("Sense and Sensibility", 1811, "...");
Book prideAndPredujice = new Book("Pride and Prejudice", 1813, "....");

Dictionary<string, Book> directory = new Dictionary<string, Book>();
directory.Add(senseAndSensibility.name, senseAndSensibility);
directory.Add(prideAndPredujice.name, prideAndPredujice);
```

Books can be retrieved from the directory by book name. A search for "Persuasion" will not produce any results, in which case the dictionary gives an error. The book "Pride and Prejudice" is found, however. Let's play it safe, and put both inside an if:

```cs
if (directory.ContainsKey("Persuation"))
{
  Console.WriteLine(directory["Persuasion"]);
}
else
{
  Console.WriteLine("Book not found!");
}

Console.WriteLine();
if (directory.ContainsKey("Pride and Prejudice"))
{
  Console.WriteLine(directory["Pride and Prejudice"]);
}
```

```console
Book not found!

Name: Pride and Prejudice (1813)
Content: ....
```

## When Should Dictionaries Be Used?

The dictionary is implemented in such a way that searching by a key is very fast. The dictionary  generates a "hash value" from the key, i.e., a piece of code, which is used to store the value a specific location. When a key is used to retrieve information from a dictionary, this particular code identifies the location where the value associated with the key is. In practice, it's not necessary to go through all the key-value pairs in the dictionary when searching for a key; the set that's checked is significantly smaller. 

Consider the library example that was introduced above. The whole program could just as well have been implemented using a list. In that case, the books would be placed on the list instead of the directory, and the book search would happen by iterating over the list.

In the example below, the books have been stored in a list and searching for them is done by going through the list.

```cs
List<Book> books = new List<Book>();
Book senseAndSensibility = new Book("Sense and Sensibility", 1811, "...");
Book prideAndPrejudice = new Book("Pride and Prejudice", 1813, "....");
books.Add(senseAndSensibility);
books.Add(prideAndPrejudice);

// searching for a book named Persuasion
foreach (Book book in books)
{
  if (book.name == "Persuation")
  {
    Console.WriteLine(book);
    break;
  }
}

Console.WriteLine();
// searching for a book named Sense and Sensibility
foreach (Book book in books)
{
  if (book.name == "Sense and Sensibility")
  {
    Console.WriteLine(book);
    break;
  }
}
```

```console

Name: Sense and Sensibility (1811)
Content: ...
```

Now the program works quite the same as our Dictionary version, right?

Functionally, yes. Let's however, consider the performance of the program. C#'s DateTime() has property **Ticks**, which represents the given date and time of a DateTime instance. A Tick is one hundred nanoseconds.

```cs
List<Book> books = new List<Book>();

// Add 10 million books to the list

Book senseAndSensibility = new Book("Sense and Sensibility", 1811, "...");
Book prideAndPrejudice = new Book("Pride and Prejudice", 1813, "....");
books.Add(senseAndSensibility);
books.Add(prideAndPrejudice);

DateTime start = DateTime.Now;

// searching for a book named Persuasion
foreach (Book book in books)
{
  if (book.name == "Persuation")
  {
    Console.WriteLine(book);
    break;
  }
}

Console.WriteLine();

// searching for a book named Sense and Sensibility
foreach (Book book in books)
{
  if (book.name == "Sense and Sensibility")
  {
    Console.WriteLine(book);
    break;
  }
}
DateTime end = DateTime.Now;
Console.WriteLine("Time elapsed: " + (end.Ticks - start.Ticks)/10000.0 + " milliseconds");
``` 

```console
Name: Sense and Sensibility (1811)
Content: ...
Time elapsed: 390.5467 millisecond
```

With 10 million (and 2) books, it takes almost half a second to find two books. Of course, the way in which the list is ordered has an effect. If the book being searched was first on the list, the program would be faster. On the other hand, if the book were not on the list, the program would have to go through all of the books in the list before determining that such book does not exist.

Let's consider the same program using a dictionary.

```cs

Dictionary<string, Book> directory = new Dictionary<string, Book>();

// Add 10 million books to the dictionary

Book senseAndSensibility = new Book("Sense and Sensibility", 1811, "...");
Book prideAndPredujice = new Book("Pride and Prejudice", 1813, "....");
directory.Add(senseAndSensibility.name, senseAndSensibility);
directory.Add(prideAndPredujice.name, prideAndPredujice);

DateTime start = DateTime.Now;

if (directory.ContainsKey("Persuation"))
{
  Console.WriteLine(directory["Persuasion"]);
}
else
{
  Console.WriteLine("Book not found!");
}

Console.WriteLine();
if (directory.ContainsKey("Pride and Prejudice"))
{
  Console.WriteLine(directory["Pride and Prejudice"]);
}

DateTime end = DateTime.Now;
Console.WriteLine("Time elapsed: " + (end.Ticks - start.Ticks)/10000.0 + " milliseconds");
```


```console
Book not found!

Name: Pride and Prejudice (1813)
Content: ....
Time elapsed: 5.8134 milliseconds
```

As we can see, the dictionary is quite much faster, and that's with only 2 books. What if we needed to search for 3? Or 100?

## Dictionary as an Instance Variable

The example considered above on storing books is problematic in that the book's spelling format must be remembered accurately. Someone may search for a book with a lowercase letter, another may, for example, enter a space to begin typing a name. Let's take a look at a slightly more forgiving search by book title.

We make use of the tools provided by the string-class to handle strings. The **ToLower()** method creates a new string with all letters converted to lowercase. The **Trim()** method, on the other hand, creates a new string where empty characters such as spaces at the beginning and end have been removed.

```cs
string text = "Pride and Prejudice     ";
text = text.ToLower(); // text currently "pride and prejudice     "
text = text.Trim(); // text now "pride and prejudice"
```

The conversion of the string described above will result in the book being found, even if the user happens to type the title of the book with lower-case letters.

Let's create a Library class that encapsulates a dictionary containing books, and enables you to case-independent search for books. We'll add methods for adding, retrieving and deleting to the Library class. Each of these is based on a sanitized name - this involves converting the name to lowercase and removing extrenous spaces from the beginning and end.

Let's first outline the method for adding. The book is added to the dictionary with the book name as the key and the book itself as the value. Since we want to allow for minor misspellings, such as capitalized or lower-cased strings, or ones with spaces at the beginning and/or end, the key - the title of the book - is converted to lowercase, and spaces at the beginning and end are removed.

```cs
public class Library
{
  private Dictionary<string, Book> directory;

  public Library()
  {
    this.directory = new Dictionary<string, Book>();
  }

  public void AddBook(Book book)
  {
    string name = book.name;
    if (name == null)
    {
      name = "";
    }

    name = name.ToLower();
    name = name.Trim();

    if (this.directory.ContainsKey(name))
    {
      Console.WriteLine("Book is already in the library!");
    }
    else
    {
      directory.Add(name, book);
    }
  }
}
```

The **ContainsKey** method of the directory is being used above to check for the existence of a key. The method returns true if any value has been added to the directory with the given key. Otherwise, the method returns false.

We can already see that code dealing with string sanitizion is needed in every method that handles a book, which makes it a good candiate for a separate helper method. The method is implemented as a class method since it doesn't handle object variables.

```cs
public static string SanitizedString(string input)
{
  if (input == null)
  {
    return "";
  }

  input = input.ToLower();
  return input.Trim();
}
```

The implementation is much neater when the helper method is used.

```cs
using System;
using System.Collections.Generic;

namespace sandbox
{
  public class Library
  {
    private Dictionary<string, Book> directory;

    public Library()
    {
      this.directory = new Dictionary<string, Book>();
    }

    public void AddBook(Book book)
    {
      string name = SanitizedString(book.name);

      if (this.directory.ContainsKey(name))
      {
        Console.WriteLine("Book is already in the library!");
      }
      else
      {
        directory.Add(name, book);
      }
    }

    public Book GetBook(string bookTitle)
    {
      bookTitle = SanitizedString(bookTitle);
      if (this.directory.ContainsKey(bookTitle))
      {
        return this.directory[bookTitle];
      }
      else
      {
        return null;
      }
    }

    public void RemoveBook(string bookTitle)
    {
      bookTitle = SanitizedString(bookTitle);

      if (this.directory.ContainsKey(bookTitle))
      {
        this.directory.Remove(bookTitle);
      }
      else
      {
        Console.WriteLine("Book was not found, cannot be removed!");
      }
    }


    public static string SanitizedString(string input)
    {
      if (input == null)
      {
        return "";
      }

      input = input.ToLower();
      return input.Trim();
    }
  }
}
```

Let's see this in action

```cs
Book senseAndSensibility = new Book("Sense and Sensibility", 1811, "...");
Book prideAndPredujice = new Book("Pride and Prejudice", 1813, "....");

Library library = new Library();
library.AddBook(senseAndSensibility);
library.AddBook(prideAndPredujice);

Console.WriteLine(library.GetBook("pride and prejudice"));
Console.WriteLine();

Console.WriteLine(library.GetBook("PRIDE AND PREJUDICE"));
Console.WriteLine();

Console.WriteLine(library.GetBook("SENSE"));
```

```console
Name: Pride and Prejudice (1813)
Content: ....

Name: Pride and Prejudice (1813)
Content: ....
```

In the above example, we adhered to the **DRY (Don't Repeat Yourself)** principle according to which code duplication should be avoided. Sanitizing a string, i.e., changing it to lowercase, and trimming, i.e., removing empty characters from the beginning and end, would have been repeated many times in our library class without the **SanitizedString** method. Repetitive code is often not noticed until it has already been written, which means that it almost always makes it's way into the code. There's nothing wrong with that - the important thing is that the code is cleaned up so that places that require tidying up are noticed.

## Going Through A Directory's Keys

We may sometimes want to search for a book by a part of it's title. The get method (dictionary\[key\]) in the dictionary is not applicable in this case as it's used to search by a specific key. Searching by a part of a book title is not possible with it.

We can go through the values ​​of a dictionary by using a for-each loop on the set returned by the keySet() method of the dictionary.

Below, a search is performed for all the books whose names contain the given string.

```cs
public List<Book> GetBooksByPart(string titlePart)
{
  List<Book> books = new List<Book>();
  titlePart = SanitizedString(titlePart);
  Dictionary<string, Book>.KeyCollection keys = this.directory.Keys;

  foreach (string bookTitle in keys)
  {
    if (bookTitle.Contains(titlePart))
    {
      books.Add(this.directory[bookTitle]);
    }
  }
  return books;
}
```

This way, however, we lose the speed advantage that comes with the dictionary. The dictionary is implemented in such a way that searching by a single key is extremely fast. The example above goes through all the book titles when looking for the existence of a single book using a particular key.

## Going Through A Dictionary's Values

The preceding functionality could also be implemented by going through the dictionary's values. The set of values can be retrieved with the dictionary's Values​​() property. This set of values can also be iterated ober ​​with a for-each loop.

```cs
public List<Book> GetBooksByPart(string titlePart)
{
  List<Book> books = new List<Book>();
  titlePart = SanitizedString(titlePart);
  Dictionary<string, Book>.ValueCollection values = this.directory.Values;

  foreach (Book book in values)
  {
    if (book.name.Contains(titlePart))
    {
      books.Add(book);
    }
  }
  return books;
}
```

As with the previous example, the speed dvantage that comes with the dictionary is lost.

