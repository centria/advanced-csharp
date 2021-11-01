---
title: "Processing files"
nav_order: 3
hidden: true
---

# Processing files

We have already learned some strategies to read text files. If your memories of the subject are hazy, take a look at the relevant parts of the **fourth part of the course material**. In that material, we used **ReadAllLines** and **ReadAllText** methods. They have writing versions as well, [**you can read more about those in here**](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/file-system/how-to-write-to-a-text-file). In this section how ever, we concentrate on **StreamReader and StreamWriter**.


## StreamReader and StreamWriter

Next, let's take a look at writing data to files. The [**StreamWriter **](https://docs.microsoft.com/en-us/dotnet/api/system.io.streamwriter?view=netframework-4.8) class offers the functionality to write to files. The constructor of the StreamWriter class receives as its parameter a string that represents the location of the target file.

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

NOTICE! Both of these methods loaded the original file into the system memory, with **ReadAllLines** and **ReadAllText**. This is completely fine for small files, but with larger files, you will quickly end up filling up the memory and crashing the system.