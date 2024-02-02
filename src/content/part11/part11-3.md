---
title: "Processing files"
nav_order: 113
hidden: false
---

# Processing files

We have already learned some strategies to read text files. If your memories of the subject are hazy, take a look at the relevant parts of the [**fourth part of the Basic course material**](https://centria.github.io/basic-csharp/part4/part4-3). In that material, we used **ReadAllLines** and **ReadAllText** methods. They have writing versions as well, [**you can read more about those in here**](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/file-system/how-to-write-to-a-text-file). In this section how ever, we concentrate on **StreamWriter** for writing into files.


## StreamWriter

Next, let's take a look at writing data to files. The [**StreamWriter**](https://docs.microsoft.com/en-us/dotnet/api/system.io.streamwriter?view=net-5.0) class offers the functionality to write to files. The constructor of the StreamWriter class receives as its parameter a string that represents the location of the target file.

```cpp
namespace Exercise001
{
  using System;
  using System.IO;

  class Program
  {
    public static void Main(string[] args)
    {
      StreamWriter writer = new StreamWriter("file.txt");
      writer.WriteLine("Hello file!"); //writes the string "Hello file!" and line change to the file
      writer.WriteLine("More text");
      writer.Write("And a little extra"); // writes the string "And a little extra" to the file without a line change
      writer.Close(); // closes the file
    }
  }
}
```

In the example above we write to the file "file.txt" the string "Hello file!", followed by a line change and some additional text. Take notice that when writing to the file the method **Write** does not add line changes, and you have to add them yourself. In contrast, the method **WriteLine** adds a new line change at the end of the parameter string it receives.

The constructor of the **StreamWriter** class might throw an exception that must be either handled or thrown so that it is the responsibility of the calling method. Here is what a method that receives as its parameters a file name and the text contents to write into it could look like.

```cpp
namespace Exercise001
{
  using System;
  using System.IO;
  public class Storer
  {

    public void WriteToFile(string fileName, string text)
    {
      try
      {
        StreamWriter writer = new StreamWriter(fileName);
        writer.WriteLine(text);
        writer.Close();
      }
      catch (Exception e)
      {
        Console.WriteLine(e.Message);
      }
    }
  }
}
```

In the **WriteToFile** method above we begin by creating a **StreamWriter** object. It writes data the the file that is located at the path that the string **fileName** indicates. After this we write the text to the file by calling the **WriteLine** method. The possible exception that the constructor throws has to be handled with a try-catch block or the handling responsibility has to be transferred elsewhere. In the WriteToFile method we have used the try-catch block.

Let's create a **Main** method that calls the WriteToFile of a Storer object.

```cpp
Storer storer = new Storer();
storer.WriteToFile("diary.txt", "Dear diary, today was a good day.");
```

By calling the method above we create a file called "diary.txt" and write the text "Dear diary, today was a good day." into it. If the file already exists, the earlier contents are erased when we store the new text.

### Appending information to a file

In our **Storer** class above, we call the basic constructor for **StreamWriter** with **new StreamWriter(fileName)**. By doing this everytime we call the method **WriteToFile**, we open the file, write into it, and close the file. We end up overwriting our file content each and every time.

Of course, having our file open all the time would be one option, but quite unreasonable. If we want to append information to the file, we can also use an [**overloaded constructor**](https://docs.microsoft.com/en-us/dotnet/api/system.io.streamwriter.-ctor?view=netframework-4.8#overloads) for the StreamWriter.

This time we are using [**StreamWriter(String, Boolean)**](https://docs.microsoft.com/en-us/dotnet/api/system.io.streamwriter.-ctor?view=netframework-4.8#System_IO_StreamWriter__ctor_System_String_System_Boolean_), where the Boolean value determinates, if we want to append the information to a file, rather than overwrite every time. Let's update our Storer class:

```cpp
namespace Exercise001
{
  using System;
  using System.IO;
  public class Storer
  {

    public void WriteToFile(string fileName, string text)
    {
      try
      {
        // Notice the change in the parameters
        StreamWriter writer = new StreamWriter(fileName, true);
        writer.WriteLine(text);
        writer.Close();
      }
      catch (Exception e)
      {
        Console.WriteLine(e.Message);
      }
    }
  }
}
```

With this change, we can call the method more than once, and the diary will update with all the information:

```cpp
Storer storer = new Storer();
storer.WriteToFile("diary.txt", "Dear diary, today was a good day.");
storer.WriteToFile("diary.txt", "Dear diary, today was a bad day.");
```

## Replacing certain parts of a file

Sometimes we want to make changes to the files we have saved already. The easiest way is just to write over the data we already have in our files. But what if we only want to replace certain, already known parts of the text? Let's look at that a bit closer.

```cpp
string str = File.ReadAllText("diary.txt");
str = str.Replace("Dear diary, today was a bad day.", "Dear diary, today was an exceptional day.");
File.WriteAllText("diary.txt", str);
```

In our example above, we are using the same "diary.txt" as earlier, and our bad day turned into an exceptional day. 

We can load the whole file into a string, this time variable "str", with the familiar **ReadAllText**. 

On the next line, we use the method **Replace** from String class. This method searches for the first string given as a parameter, and replaces it with the string given as the second parameter.

In our example, we want to make sure we replace the whole line, but the method could be used to replace just parts of a line, as well.

On the third line, we use the method **WriteAllText** from the File class, and write the information back to the file. Just like StremWriter, this also over writes the content of the file, but also closes the file on its own.


Let's say we have a larger file, or we would want to go through our file with a loop. In the next example, we do the same task, but with StreamWriter and a for-loop.


```cpp
public static void Main(string[] args)
{
  string diary = "diary.txt";
  string[] lines = File.ReadAllLines(diary);
  StreamWriter sw = new StreamWriter(diary);
  for (int i = 0; i < lines.Length; i++)
  {
    string line = lines[i];
    if (lines[i].Contains("an exceptional"))
    {
      line = "Dear diary, today was an ordinary day.";
    }
    sw.WriteLine(line);
  }
  sw.Close();
}
```

On the first line we save the path of the file into a variable, so we don't have to write it out every time we need it. Extremely handy, especially if your file is not in the same folder as your program.

On the second line we save the content of the file into a string array, with **File.ReadAllLines**. With this we get an iterable version of the file content.

Next, we create a new StreamWriter, and give the file as a parameter, so it can now handle the writing and saving the file.

In our loop, we go through the file line by line. If the line should now contain "an exceptional", we will change the content of the line. We then use the **WriteLine** method for the line, to save it in the StreamWriter stream.

After the loop, we use the **Close()** method to save the stream into the file, and close the file.

<Note> Both of these methods loaded the original file into the system memory, with **ReadAllLines** and **ReadAllText**. This is completely fine for small files, but with larger files, you will quickly end up filling up the memory and crashing the system.</Note>

# Exercises

<Exercise title={'005 Saveable Dictionary'}>

In this exercise we will create a dictionary so, that it can read words from a file and write words to a file. The dictionary must also be able to translate both from one to another language and back (in this exercise we ignore the fact that some words might be written the same in Finnish and in other languages). Your mission is to create a dictionary in the class **SaveableDictionary**.

* Section 1

For the dictionary, implement the following:
* public SaveableDictionary(), i.e. a construrctor with no parameters
* public SaveableDictionary(string file) , i.e. a constructor with filename as parameter. We will use this in later sections of the exercise.
* public void Add(string words, string translation) adds a word to the dictionary. Every word has just one translation, and if the same word is added for the second time, nothing happens.
* public string Translate(string word) returns the translation for the given word. If the word is not in the dictionary, returns null.  

In this phase, the dictionary should work as follows:

```cpp
SaveableDictionary dictionary = new SaveableDictionary();
dictionary.Add("apina", "monkey");
dictionary.Add("banaani", "banana");
dictionary.Add("apina", "apfe");

Console.WriteLine(dictionary.Translate("apina"));
Console.WriteLine(dictionary.Translate("monkey"));
Console.WriteLine(dictionary.Translate("ohjelmointi"));
Console.WriteLine(dictionary.Translate("banana"));      
```

```console
monkey
apina

banaani
```

As can be seen from the output, after a translation has been added to the dictionary, it can translate the word to and from.

<Note>The methods Add and Translate do not read from a file or write to a file! The constructors do not touch the file either.</Note>

* Section 2

Add the dictionary method **public void Delete(string word)** which deletes the given word and its translation from the dictionary.

```cpp
SaveableDictionary dictionary = new SaveableDictionary();
dictionary.Add("apina", "monkey");
dictionary.Add("banaani", "banana");
dictionary.Add("apina", "apfe");
dictionary.Add("ohjelmointi", "programming");

dictionary.Delete("apina");
dictionary.Delete("banana");

Console.WriteLine(dictionary.Translate("apina"));
Console.WriteLine(dictionary.Translate("monkey"));
Console.WriteLine(dictionary.Translate("banana"));
Console.WriteLine(dictionary.Translate("banaani"));
Console.WriteLine(dictionary.Translate("ohjelmointi"));
```

```console
  
  
  
  
programming
```

Deleting also works both ways: Both the word and its translation are removed if either the word or the translation are deleted.

* Section 3

Let's start using the constructor **public SaveableDictionary(string file)**.
Also create a method **public bool Load()**, which loads the dictionary from the file given to the constructor as a parameter. If the program is unable to open the file or read from it, the method returns false, otherwise it returns true.

<Note>The constructor only tells the dictionary the name of the file to load the dictionary from. The constructor does not read the file. Only the method Load reads the file.</Note>

In the dictionary file one line contains a word and its translation separated by ":". The exercise template contains a file words.txt which contains the following:

```console
apina:monkey
alla oleva:below
olut:beer
```

You can split a line using the string method **Split** like so:

```cpp
string[] parts = line.split(":");   // split the line based on the ':' character

Console.WriteLine(parts[0]);     // part of line before :
Console.WriteLine(parts[1]);     // part of line after :
```

The dictionary can be used as follows:

```cpp
SaveableDictionary dictionary = new SaveableDictionary("words.txt");
bool wasSuccessful = dictionary.Load();

if (wasSuccessful) 
{
  Console.WriteLine("Successfully loaded the dictionary from file");
}

Console.WriteLine(dictionary.Translate("apina"));
Console.WriteLine(dictionary.Translate("ohjelmointi"));
Console.WriteLine(dictionary.Translate("alla oleva"));
```

```console
Successfully loaded the dictionary from file
monkey

below
```

* Sections 4 and 5

Create the method **public bool Save()**, which saves the dictionary to the file given to the dictionary as a parameter to the constructor. If the program cannot save to the file, the method returns false. Otherwise it returns true. The dictionary files have to be saved in the form described above, so the program has to be able to read the files it has written.

<Note>Only the method Save() writes to the file.</Note>

<Note>
Removing the ready given files, such as words.txt, may break some tests locally. 
If this happens, recreate the files with the correct content.
</Note>

<Note>Even though the dictionary can translate both ways, the dictionary file should only contain one way. So if the dictionary for example knows, that computer = tietokone, the file should contain:

```console
tietokone:computer
```

or

```console
computer:tietokone
```

but not both!

</Note>

It is best to handle the saving to, that the whole dictionary is written again on top of the previously saved version, rather than appending the new words.

The final version of the dictionary works as follows:

```cpp
// assume the words.txt contains the original content.
SaveableDictionary dictionary = new SaveableDictionary("words.txt");
dictionary.Load();

// Translate all the words in the file both ways
Console.WriteLine(dictionary.Translate("apina"));
Console.WriteLine(dictionary.Translate("monkey"));
Console.WriteLine(dictionary.Translate("beer"));
Console.WriteLine(dictionary.Translate("olut"));
Console.WriteLine(dictionary.Translate("below"));
Console.WriteLine(dictionary.Translate("alla oleva"));

// Try adding, translating and removing a word, this should not affect the file
dictionary.Add("poista", "remove");
Console.WriteLine(dictionary.Translate("remove"));
dictionary.Delete("remove");

// Save the file
dictionary.Save();
```

```console
monkey
apina
olut
beer
alla oleva
below
poista
```

So in the beginning the dictionary is loaded from a file, and in the end it is saved back to the file, so that changes made to the dictionary are kept for the next time the dictionary is used.

</Exercise>