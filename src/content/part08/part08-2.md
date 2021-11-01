---
title: "Similarity of Objects"
nav_order: 2
hidden: true
---

# Similarity of Objects

Let's revise the **Equals** method used to compare object, and become familiar with the **GetHashCode** method used in making approximate comparisons.

## Method to Test For Equality - "Equals"

The [**Equals method**](https://docs.microsoft.com/en-us/dotnet/api/system.object.Equals?view=netframework-4.8) checks by default whether the object given as a parameter has the same reference as the object its being compared to. In other words, the default behaviour checks whether the two objects are the same. If the reference is the same, the method returns true, and false otherwise.

This can be illustrated with the following example. The Book class does not have its own implementation of the Equals method, so it falls back on the default implementation provided by C#.

```cpp
Book bookObject = new Book("Book object", 2000, "...");
Book anotherBookObject = bookObject;

if (bookObject.Equals(anotherBookObject))
{
  Console.WriteLine("The books were the same");
}
else
{
  Console.WriteLine("The books weren't the same");
}

// we now create an object with the same content that's nonetheless its own object
anotherBookObject = new Book("Book object", 2000, "...");

if (bookObject.Equals(anotherBookObject))
{
  Console.WriteLine("The books were the same");
}
else
{
  Console.WriteLine("The books weren't the same");
}
```

```console
The books were the same
The books weren't the same
```
The internal structure of the book objects (i.e., the values of their instance variables ) in the previous example is the same, but only the first comparison prints "The books were the same". This is because the references are the same in the first case, i.e., the object is compared to itself. The second comparison is about two different entities, even though the variables have the same values.

If we want to compare our own classes using the Equals method, then it must be defined inside the class. The method created accepts an Object-type reference as a parameter, which can be any object. The comparison first looks at the references. This is followed by checking the parameter object's type with the instanceof operation - if the object type does not match the type of our class, the object cannot be the same. We then create a version of the object that is of the same type as our class, after which the object variables are compared against each other.

```cpp
public override bool Equals(object compared)
{
  // if the variables are located in the same position, they are equal
  if (this == compared)
  {
    return true;
  }

  // if the compared object is null or not of type Book, the objects are not equal
  if ((compared == null) || !this.GetType().Equals(compared.GetType()))
  {
    return false;
  }
  else
  {
    // convert the object to a Book object
    Book comparedBook = (Book)compared;

    // if the values of the object variables are equal, the objects are, too
    return this.name == comparedBook.name && this.published == comparedBook.published && this.content == comparedBook.content;
  }
}
```

The Book-class in it's entirety.

```cpp
namespace Exercise001
{
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

    public override string Tostring()
    {
      return "Name: " + this.name + " (" + this.published + ")\n"
          + "Content: " + this.content;
    }

    public override bool Equals(object compared)
    {
      // if the variables are located in the same position, they are equal
      if (this == compared)
      {
        return true;
      }

      // if the compared object is null or not of type Book, the objects are not equal
      if ((compared == null) || !this.GetType().Equals(compared.GetType()))
      {
        return false;
      }
      else
      {
        // convert the object to a Book object
        Book comparedBook = (Book)compared;

        // if the values of the object variables are equal, the objects are, too
        return this.name == comparedBook.name && this.published == comparedBook.published && this.content == comparedBook.content;
      }
    }
  }
}
```

Now the book comparison returns **true** if the instance variables of the books are the same.

```cpp
Book bookObject = new Book("Book object", 2000, "...");
Book anotherBookObject = new Book("Book object", 2000, "...");

if (bookObject.Equals(anotherBookObject))
{
  Console.WriteLine("The books were the same");
}
else
{
  Console.WriteLine("The books weren't the same");
}
```

```console
Book.cs(3,16): warning CS0659: 'Book' overrides Object.Equals(object o) but does not override Object.GetHashCode() [/mnt/c/Users/HeikkiHei/Documents/coding-exercises/Exercise001/Exercise001.csproj]

The books were the same
```

We also get the very familiar warning. Finally in this section, we will do something about it.

The List also uses the Equals method in its internal implementation. If we don't define the Equals method in our objects, the contains method of the List does not work properly. If you try out the code below with two Book classes, one with the Equals method defined, and another without it, you'll see the difference.

```cpp
List<Book> books = new List<Book>();
Book bookObject = new Book("Book Object", 2000, "...");
books.Add(bookObject);

if (books.Contains(bookObject))
{
  Console.WriteLine("Book Object was found.");
}

bookObject = new Book("Book Object", 2000, "...");

if (!books.Contains(bookObject))
{
  Console.WriteLine("Book Object was not found.");
}
```

This reliance on default methods such as Equals is actually the reason why C# demands that variables added to List and Dictionary are of reference type. Each reference type variable comes with default methods, such as Equals, which means that you don't need to change the internal implementation of the List class when adding variables of different types. 

## Approximate Comparison With Dictionary

In addition to Equals, the GetHashCode method can also be used for approximate comparison of objects. The method creates from the object a "hash code", i.e, a number, that tells a bit about the object's content. If two objects have the same hash value, they may be equal. On the other hand, if two objects have different hash values, they are certainly unequal.

Hash codes are used in Dictionariss, for instance. Dictionary's internal behavior is based on the fact that key-value pairs are stored in an array of lists based on the key's hash value. Each array index points to a list. The hash value identifies the array index, whereby the list located at the array index is traversed. The value associated with the key will be returned if, and only if, the exact same value is found in the list (equality comparison is done using the Equals method). This way, the search only needs to consider a fraction of the keys stored in the hash map.

So far, we've only used string objects as Dictionary keys, which have conveniently had ready-made GetHashCode methods implemented. Let's create an example where this is not the case: we'll continue with the books and keep track of the books that are on loan. We'll implement the book keeping with a Dictionary. The key is the book and the value attached to the book is a string that tells the borrower's name:

```cpp
Dictionary<Book, string> borrowers = new Dictionary<Book, string>();

Book bookObject = new Book("Book Object", 2000, "...");
borrowers.Add(bookObject, "Pekka");
borrowers.Add(new Book("Test Driven Development", 1999, "..."), "Arto");

Console.WriteLine(borrowers[bookObject]);
Console.WriteLine(borrowers[new Book("Book Object", 2000, "...")]);
Console.WriteLine(borrowers[new Book("Test Driven Development", 1999, "...")]);
```

```console
Pekka
Unhandled exception. System.Collections.Generic.KeyNotFoundException: The given key 'Name: Book Object (2000) 
[. . .]
```

We get an error, as the object created in the second Console.WriteLine does not match any key (neither does the third one, but the program quits on the first error).

We find the borrower when searching for the same object that was given as a key to the dictionarys's Add method. However, when searching by the exact same book but with a different object,a borrower isn't found, and we get the error instead. The reason lies in the default implementation of the GetHashCode method in the Object class. The default implementation creates a HashCode value based on the object's reference, which means that books having the same content that are nonetheless different objects get different results from the GetHashCode method. As such, the object is not being searched for in the right place.

For the Dictionary to work in the way we want it to, that is, to return the borrower when given an object with the correct content (not necessarily the same object as the original key), the class that's the key must overwrite the GetHashCode method in addition to the Equals method. The method must be overwritten so that it gives the same numerical result for all objects with the same content. Also, some objects with different contents may get the same result from the GetHashCode method. However, with the Dictionary's performance in mind, it is essential that objects with different contents get the same hash value as rarely as possible.

We've previously used string objects as Dictionary keys, so we can deduce that the string class has a well-functioning GetHashCode implementation of its own. We'll Delegate, i.e., transfer the computational responsibility to the string object.

```cpp
public override int GetHashCode()
{
  return this.name.GetHashCode();
}
```

The above solution is quite good. However, if name is null, we see a NullReferenceException error. Let'fix this by defining a condition: if the value of the name variable is null, we'll return the year of publication as the hash value.

```cpp
public override int GetHashCode()
{
  if (this.name == null)
  {
    return this.published;
  }
  return this.name.GetHashCode();
}
```

Now, all of the books that share a name are bundleded into one group. Let's improve it further so that the year of publiciation is also taken into account in the hash value calculation that's based on the book title.

```cpp
public override int GetHashCode()
{
  if (this.name == null)
  {
    return this.published;
  }
  return this.published + this.name.GetHashCode();
}
```

It's now possible to use the book as the hash map's key. This way the problem we faced earlier gets solved and the book borrowers are found:

```cpp
Dictionary<Book, string> borrowers = new Dictionary<Book, string>();

Book bookObject = new Book("Book Object", 2000, "...");
borrowers.Add(bookObject, "Pekka");
borrowers.Add(new Book("Test Driven Development", 1999, "..."), "Arto");

Console.WriteLine(borrowers[bookObject]);
Console.WriteLine(borrowers[new Book("Book Object", 2000, "...")]);
Console.WriteLine(borrowers[new Book("Test Driven Development", 1999, "...")]);
```

Prints

```console
Pekka
Pekka
Arto
```

**Let's revise the ideas once more:** for a class to be used as a Dictionary's key, we need to define for it:

* method Equals , so that all equal or apporiximately equal objects cause the comparison to return true and all false for all the rest
* method GetHashCode , so that as few objects as possible end up with the same hash value