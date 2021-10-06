---
title: "Handling strings"
nav_order: 2
hidden: false
---

# StringBuilder and Regular Expressions

We'll now take a look at some useful programming techniques and classes.

## StringBuilder

Let's look at the following program

```cs
string numbers = "";
for (int i = 1; i < 5; i++)
{
  numbers = numbers + i;
}
Console.WriteLine(numbers);
```

```console
1234
```

The program structure is straightforward. A string containing the number 1234 is created, and the string is then outputted.

The program works, but there is a small problem invisible to the user. Calling **numbers + i** creates actually a new string. Let's inspect the program line-by-line with the repetition block unpacked.

```cs
string numbers = ""; // creating a new string: ""
int i = 1;
numbers = numbers + i; // creating a new string: "1"
i++;
numbers = numbers + i; // creating a new string: "12"
i++;
numbers = numbers + i; // creating a new string: "123"
i++;
numbers = numbers + i; // creating a new string: "1234"
i++;

Console.WriteLine(numbers); // printing the string
```

In the previous example, five strings were created in total.

Let's look at the same program where a new line is added after each number.

```cs
string numbers = "";
for (int i = 1; i < 5; i++)
{
  numbers = numbers + i + "\n";
}
Console.WriteLine(numbers);
```

```console
1
2
3
4
```

Each **+-operation** forms a new string. On the line numbers + i + "\n"; a string is first created, after which another string is created joining a new line onto the previous string. Let's write this out as well.

```cs
int i = 1;
// first creating the string "1" and then the string "1\n"
numbers = numbers + i + "\n";
i++;
// first creating the string "1\n2" and then the string "1\n2\n"
numbers = numbers + i + "\n"
i++;
// first creating the string "1\n2\n3" and then the string "1\n2\n3\n"
numbers = numbers + i + "\n"
i++;
// and so on
numbers = numbers + i + "\n"
i++;

Console.WriteLine(numbers); // printing the string
```

In the previous example, a total of nine strings is created.

String creation - although unnoticeable at a small scale - is not a quick operation. Space is allocated in memory for each string where the string is then placed. If the string is only needed as part of creating a larger string, performance should be improved.

C#'s ready-made **StringBuilder** from **System.Text** class provides a way to concatenate strings without the need to create them. A new StringBuilder object is created with a new StringBuilder() call, and content is added to the object using the overloaded append method, i.e., there are variations of it for different types of variables. Finally, the StringBuilder object provides a string using the ToString method.

In the example below, only one string is created.

```cs
namespace sandbox
{
  using System;
  using System.Text;
  class Program
  {
    static void Main(string[] args)
    {
      StringBuilder numbers = new StringBuilder();
      for (int i = 1; i < 5; i++)
      {
        numbers.Append(i);
      }
      Console.WriteLine(numbers.ToString());
    }
  }
}
```

Using StringBuilder is more performant that creating strings with the + operator.


NOTICE! We need **using System.Text;** for the StringBuilder to work.

## Regular expressions

A **regular expression** defines a set of strings in a compact form. Regular expressions are used, among other things, to verify the correctness of strings. We can assess the whether or not a string is in the desired form by a regular expression that defines the strings considered correct.

Let's look at a problem where we need to check if a student number entered by the user is in the correct format. A student number (in Helsinki University) should begin with "01" followed by 7 digits between 0–9.

You could verify the format of the student number, for instance, by going through the character string representing the student number using the string\[index\] method. Another way would be to check that the first character is "0" and call the Convert.ToInt32 method to convert the string to a number. You could then check that the number returned by the Convert.ToInt32 method is less than 20000000.

Checking correctness with the help of regular expressions is done by first defining a suitable regular expression. We can then use the **IsMatch** method of the Regex class, which checks whether the string contains the regular expression given as the regex constructor parameter. For the student number, the appropriate regular expression is "^01\[0-9\]\{7\}\$", and checking the student number entered by a user is done as follows:

```cs
namespace sandbox
{
  using System;
  using System.Text.RegularExpressions;

  class Program
  {
    static void Main(string[] args)
    {
      Regex regex = new Regex("^01[0-9]{7}$");
      Console.Write("Provide a student number: ");
      string number = Console.ReadLine();

      if (regex.IsMatch(number))
      {
        Console.WriteLine("Correct format.");
      }
      else
      {
        Console.WriteLine("Incorrect format.");
      }
    }
  }
}
```

You might notice the regular expression starting with a circumflex and ending in a dollar sign. Let's get to that in a moment. First, let's go through the most common characters used in regular expressions.

### Alternation (Vertical Line)

A vertical line indicates that parts of a regular expressions are optional. For example, **00\|111\|0000** defines the strings 00,111 and 0000. The respond method returns true if the string matches any one of the specified group of alternatives.

```cs
Regex regex = new Regex("00|111|0000");
string str = "00";

if (regex.IsMatch(str))
{
  Console.WriteLine("The string contained one of the three alternatives");
}
else
{
  Console.WriteLine("The string contained none of the alternatives");
}
```

```console
The string contained one of the three alternatives
```

The regular expression 00\|111\|0000 is actually searching for a substring from a string. This would work as well:

```cs
Regex regex = new Regex("00|111|0000");
string str = "1111111";

if (regex.IsMatch(str))
{
  Console.WriteLine("The string contained one of the three alternatives");
}
else
{
  Console.WriteLine("The string contained none of the alternatives");
}
```

Since "1111" contains a substring of "111", the **regex.IsMatch** returns true.

### Affecting Part of a String (Parentheses)

You can use parentheses to determine which part of a regular expression is affected by the rules inside the parentheses. Say we want to allow the strings 00000 and 00001. We can do that by placing a vertical bar in between them this way 00000\|00001. Parentheses allow us to limit the option to a specific part of the string. The expression 0000(0\|1) specifies the strings 00000 and 00001.

Similarly, the regular expression car(s) defines the singular (car) and plural (cars) forms of the word car. However, as we are searching for substrings with **IsMatch**, also "carssssss" would return true.

### Quantifiers

What is often desired is that a particular sub-string is repeated in a string. The following expressions are available in regular expressions:

* The quantifier **\*** repeats 0 ... times, for example;

```cs
Regex regex = new Regex("^trolo(lo)*$");
string str = "trolololololo";

if (regex.IsMatch(str))
{
  Console.WriteLine("Correct form.");
}
else
{
  Console.WriteLine("Incorrect form.");
}
```

```console
Correct form.
```


* The quantifier **\+** repeats 1... times, for example;

```cs
Regex regex = new Regex("^trolo(lo)+$");
string str = "trolololololo";

if (regex.IsMatch(str))
{
  Console.WriteLine("Correct form.");
}
else
{
  Console.WriteLine("Incorrect form.");
}
```

```console
Correct form.
```

* The quantifier **?** repeats 0 or 1 times, for example;

```cs
Regex regex = new Regex("^trolo(lo)+$");
string str = "trololo";

if (regex.IsMatch(str))
{
  Console.WriteLine("Correct form.");
}
else
{
  Console.WriteLine("Incorrect form.");
}
```

```console
Correct form.
```

* The quantifier **{a}** repeats a times, for example:

```cs
Regex regex = new Regex("^trolo(lo){3}$");
string str = "trololololo";

if (regex.IsMatch(str))
{
  Console.WriteLine("Correct form.");
}
else
{
  Console.WriteLine("Incorrect form.");
}
```

```console
Correct form.
```

* The quantifier **{a,b}** repeats a ... b times, for example:


```cs
Regex regex = new Regex("^trolo(lo){3,6}$");
string str = "trololololololololo";

if (regex.IsMatch(str))
{
  Console.WriteLine("Correct form.");
}
else
{
  Console.WriteLine("Incorrect form.");
}
```

```console
Incorrect form.
```

* The quantifier **{a,}** repeats a ... times, for example:

```cs
Regex regex = new Regex("^trolo(lo){3,}$");
string str = "trololololololololo";

if (regex.IsMatch(str))
{
  Console.WriteLine("Correct form.");
}
else
{
  Console.WriteLine("Incorrect form.");
}
```

```console
Correct form.
```


You can use more than one quantifier in a single regular expression. For example, the regular expression ^5{3}(1\|0)*5{3}$ defines strings that begin and end with three fives. An unlimited number of ones and zeros are allowed in between.


```cs
Regex regex = new Regex("^5{3}(1|0)*5{3}$");
string str = "5551101000011010555";

if (regex.IsMatch(str))
{
  Console.WriteLine("Correct form.");
}
else
{
  Console.WriteLine("Incorrect form.");
}
```

```console
Correct form.
```

### Character Classes (Square Brackets)

A character class can be used to specify a set of characters in a compact way. Characters are enclosed in square brackets, and a range is indicated with a dash. For example, \[145\] means \(1\|4\|5\) and \[2-36-9\] means \(2\|3\|6\|7\|8\|9\). Similarly, the entry \[a-c\]\* defines a regular expression that requires the string to contain only a, b and c.

```cs
Regex regex = new Regex("[145][2-36-9][a-c]*$");
string str = "49acbc";

if (regex.IsMatch(str))
{
  Console.WriteLine("Correct form.");
}
else
{
  Console.WriteLine("Incorrect form.");
}
```

```console
Correct form.
```

### Finding exact matches

Our examples all started with **^** and ended with **\$**. These characters have special meanings in regular expressions.

* ^	: Begin the match at the beginning of the line. Without this character in the beginning, we would search for the reqular expression substring from any part of the compared string.

* $	: End the match at the end of the line. Without this character, the rest of the string could be anything, and we would still get a match. With our string ending to a dollar sign, we make sure the string matches our regex exactly.
