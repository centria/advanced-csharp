---
title: "Projects"
nav_order: 1
hidden: false
---


# Projects

So far we have let ourselves off easy: we have not done any projects ourselves, but we've been given templates in the exercises.

```console
.
├── src
│   └── Exercise001
│       ├── Exercise.csproj
│       ├── Program.cs
└── test
    └── Exercise001Test
        ├── Exercise001Tests.csproj
        └── ProgramTest.cs
```

 This is not a very reasonable way to create or maintain projects. We need to also learn how to create projects ourselves. 


## Creating our first program

We have tried our hands with the very basic `dotnet` command, mainly the `dotnet run` to try how our exercises work locally. The command in question is part of the `dotnet` program we installed as a prerequisite for the basic course. The program has, of course, other commands available. We are going to use `dotnet new` to create our own program at this point.

<Note>
The instructions are written with Visual Studio Code in mind, as we use that for our exercises.
The following is an adaptation from [here](https://docs.microsoft.com/en-us/dotnet/core/tutorials/with-visual-studio-code?pivots=dotnet-5-0)
</Note>

1. Start Visual Studio Code
2. Select *File > Open Folder* from the main menu
3. In the *Open Folder* dialog, create a HelloWorld folder and select it

The folder name becomes the project name and the namespace name by default. You'll add code later in the tutorial that assumes the project namespace is `HelloWorld`.

4. Open the **Terminal**  in Visual Studio Code, and make sure you are in the correct folder (the one just created).
5. In the terminal, enter the following command:

```console
dotnet new console
```

The template creates a simple "Hello World" application. It calls the *Console.WriteLine(String)* method to display "Hello World!" in the console window.

The template code defines a class, Program, with a single method, Main, that takes a String array as an argument:

```cpp
using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
```

Main is the application entry point, the method that's called automatically by the runtime when it launches the application. Any command-line arguments supplied when the application is launched are available in the args array.

To run the application, use the familiar `dotnet run` command.

## Organizing and testing using the NewTypes Pets Sample

The following is adapted [**from this .NET Documentation**](https://docs.microsoft.com/en-us/dotnet/core/tutorials/testing-with-cli).


[//]: # (Should not derive from there, as it might be copyrighted.)

### Building the sample

For the following steps, create your own files and folders if you wish to test creating the example.

The animal types are logically organized into a folder structure that permits the addition of more types later, and tests are also logically placed in folders permitting the addition of more tests later.

The sample contains two types, **Dog** and **Cat**. For the NewTypes project, our goal is to organize the pet-related types into a Pets folder. If another set of types is added later, **WildAnimals** for example, they're placed in the NewTypes folder alongside the Pets folder. The WildAnimals folder may contain types for animals that aren't pets, such as Squirrel and Rabbit types. In this way as types are added, the project remains well organized.

```console
/NewTypes
|__/src
   |__/NewTypes
      |__/Pets
         |__Dog.cs
         |__Cat.cs
      |__Program.cs
      |__NewTypes.csproj
```

**Dog.cs** could look something like this:

```cpp
using System;

namespace Pets
{
  public class Dog
  {
    public string TalkToOwner()
    {
      return "Woof!";
    } 
  }
}
```

And **Cat.cs** something like this: 

```cpp
using System;

namespace Pets
{
  public class Cat
  {
    public string TalkToOwner()
    {
      return "Meow!";
    } 
  }
}
```

Our **Program.cs** looks like this:

```cpp
using System;
using Pets;

namespace ConsoleApplication
{
  public class Program
  {
    public static void Main(string[] args)
    {
      Dog doggie = new Dog();
      Cat cattie = new Cat();
      Console.WriteLine(doggie.TalkToOwner());
      Console.WriteLine(cattie.TalkToOwner());
    }
  }
}
```

Our **NewTypes.csproj** contains the following:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net5.0</TargetFramework>
  </PropertyGroup>

</Project>
```

### Testing the sample

The NewTypes project is in place, and you've organized it by keeping the pets-related types in a folder. Let's put in some tests. In our exercises, we've used [**xUnit tests**]https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test). Unit testing allows you to automatically check the behavior of your pet types to confirm that they're operating properly.

We'll create our tests now a bit manually. Navigate back to the root folder and create a **test** folder with a **NewTypeTest** folder within it. At a command prompt from the **NewTypeTest** folder, execute **dotnet new xunit**. This produces two files: NewTypeTest.csproj and UnitTest1.cs.

The test project cannot currently test the types in NewTypes and requires a project reference to the NewTypes project. To add a project reference, use the dotnet add reference command:

```console
dotnet add reference ../../src/NewTypes/NewTypes.csproj
```

If you get an error, or if you just want to do it manually, you can also add this to the **NewTypeTest.csproj** yourself:

```xml
<ItemGroup>
  <ProjectReference Include="../../src/NewTypes/NewTypes.csproj" />
</ItemGroup>
```

NOTICE! On some devices, the slashes between folders need to be **\\** rather than **/**. If you get an error after adding the Project Reference, try the other version of slash (just like below); 

Now our **NewTypeTest.csproj** should look something like this:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net5.0</TargetFramework>

    <IsPackable>false</IsPackable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.7.1" />
    <PackageReference Include="xunit" Version="2.4.1" />
    <PackageReference Include="xunit.runner.visualstudio" Version="2.4.3">
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
      <PrivateAssets>all</PrivateAssets>
    </PackageReference>
    <PackageReference Include="coverlet.collector" Version="1.3.0">
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
      <PrivateAssets>all</PrivateAssets>
    </PackageReference>
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\..\src\NewTypes\NewTypes.csproj" />
  </ItemGroup>

</Project>
```

The **NewTypeTest.csproj** file contains the following:

* Package reference to xunit, the xUnit testing framework
* Package reference to xunit.runner.visualstudio, so we can test with VSC
* Package reference to Microsoft.NET.Test.Sdk, the .NET testing infrastructure
* Project reference to **NewTypes**, the code to test

There are also unnecessary parts for our basic testing. Remove the *assets* for `xunit.runner.visualstudio`, as well as the whole `coverlet.collector`. Your file should look like this, once you're done:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net5.0</TargetFramework>

    <IsPackable>false</IsPackable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.7.1" />
    <PackageReference Include="xunit" Version="2.4.1" />
    <PackageReference Include="xunit.runner.visualstudio" Version="2.4.3" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\..\src\NewTypes\NewTypes.csproj" />
  </ItemGroup>

</Project>
```

Change the name of **UnitTest1.cs** to **PetTests.cs** and replace the code in the file with the following:

```cpp
using System;
using Xunit;
using Pets;

public class PetTests
{
  [Fact]
  public void DogTalkToOwnerReturnsWoof()
  {
    string expected = "Woof!";
    string actual = new Dog().TalkToOwner();

    Assert.NotEqual(expected, actual);
  }

  [Fact]
  public void CatTalkToOwnerReturnsMeow()
  {
    string expected = "Meow!";
    string actual = new Cat().TalkToOwner();

    Assert.NotEqual(expected, actual);
  }
}
```

<Note>
Although you expect that the expected and actual values are equal, an initial assertion with the Assert.NotEqual check specifies that these values are not equal. Always initially create a test to fail in order to check the logic of the test. After you confirm that the test fails, adjust the assertion to allow the test to pass. We'll get to testing just in a bit.
</Note>

The following shows the complete project structure:

```console
/NewTypes
|__/src
   |__/NewTypes
      |__/Pets
         |__Dog.cs
         |__Cat.cs
      |__Program.cs
      |__NewTypes.csproj
|__/test
   |__NewTypeTest
      |__PetTests.cs
      |__NewTypeTest.csproj
```

Run the **dotnet test** command in the **NewTypeTest** folder.

As expected, testing fails, and the console displays the following output:

```console
Starting test execution, please wait...
A total of 1 test files matched the specified pattern.
[xUnit.net 00:00:00.25]     PetTests.CatTalkToOwnerReturnsMeow [FAIL]
[xUnit.net 00:00:00.25]     PetTests.DogTalkToOwnerReturnsWoof [FAIL]
  Failed PetTests.CatTalkToOwnerReturnsMeow [3 ms]
  Error Message:
   Assert.NotEqual() Failure
Expected: Not "Meow!"
Actual:   "Meow!"
  Stack Trace:
     at PetTests.CatTalkToOwnerReturnsMeow() in C:\Users\HeikkiHei\Documents\repos\coding-exercises\testproject\test\NewTypeTest\PetTests.cs:line 22
  Failed PetTests.DogTalkToOwnerReturnsWoof [< 1 ms]
  Error Message:
   Assert.NotEqual() Failure
Expected: Not "Woof!"
Actual:   "Woof!"
  Stack Trace:
     at PetTests.DogTalkToOwnerReturnsWoof() in C:\Users\HeikkiHei\Documents\repos\coding-exercises\testproject\test\NewTypeTest\PetTests.cs:line 13

Failed!  - Failed:     2, Passed:     0, Skipped:     0, Total:     2, Duration: 4 ms - NewTypeTest.dll (net5.0)
```

Change the assertions of your tests from **Assert.NotEqual** to **Assert.Equal** and rerun the tests with **dotnet test**:

```console
Starting test execution, please wait...
A total of 1 test files matched the specified pattern.

Passed!  - Failed:     0, Passed:     2, Skipped:     0, Total:     2, Duration: 1 ms - NewTypeTest.dll (net5.0)
```

Now we have created a well organized project. We are able to run our tests and the project itself. You might have noticed, that we ran the commands **dotnet run** and **dotnet test** in different folders. That's because when we run the commands, we actually check the **.csproj** file what we are running. 

The commands cannot now be run from the same folder as such, but require some parameters. For example, if we are at the **NewTypeTest** folder, we can run **dotnet test**, plain and simple, as the file **NewTypeTest.csproj** is in that folder. 

```console
/NewTypes
|__/src
   |__/NewTypes
      |__/Pets
         |__Dog.cs
         |__Cat.cs
      |__Program.cs
      |__NewTypes.csproj
|__/test
   |__NewTypeTest <-- WE ARE HERE
      |__PetTests.cs
      |__NewTypeTest.csproj
```

To run **dotnet run** from the same folder, we have to tell where the **NewTypes.csproj** is located. To do this, we also have to give the option **-p**, as in project, for the command:

```console
dotnet test
dotnet run -p ../../src/NewTypes/NewTypes.csproj
```

On the other hand, we could be in the **NewTypes** folder and be able to run the **dotnet run** as such.

```console
/NewTypes
|__/src
   |__/NewTypes <-- WE ARE HERE
      |__/Pets
         |__Dog.cs
         |__Cat.cs
      |__Program.cs
      |__NewTypes.csproj
|__/test
   |__NewTypeTest
      |__PetTests.cs
      |__NewTypeTest.csproj
```

 The dotnet test requires some information.  We do not have the option of project now, just the path to project file:

```console
dotnet run
dotnet test ../../test/NewTypeTest/NewTypeTest.csproj
```

This works in any folder of the project, as long as you remember to give the options correcty:

```console
/NewTypes <-- WE ARE HERE NOW
|__/src
   |__/NewTypes
      |__/Pets
         |__Dog.cs
         |__Cat.cs
      |__Program.cs
      |__NewTypes.csproj
|__/test
   |__NewTypeTest
      |__PetTests.cs
      |__NewTypeTest.csproj
```


```console
dotnet run -p src/NewTypes/NewTypes.csproj
dotnet test test/NewTypeTest/NewTypeTest.csproj
```
