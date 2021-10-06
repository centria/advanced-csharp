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

 This is not a very reasonable way to create or maintain projects. When the projects start to grow, the structure is soon hard to follow, and even harder to maintain. The following is adapted [**from this .NET Documentation**](https://docs.microsoft.com/en-us/dotnet/core/tutorials/testing-with-cli).

[//]: # (Should not derive from there, as it might be copyrighted.)


## Organizing and testing using the NewTypes Pets Sample

### Building the sample

For the following steps, create your own files and folders if you wish to test creating the example.

The animal types are logically organized into a folder structure that permits the addition of more types later, and tests are also logically placed in folders permitting the addition of more tests later.

The sample contains two types, **Dog** and **Cat**. For the NewTypes project, your goal is to organize the pet-related types into a Pets folder. If another set of types is added later, **WildAnimals** for example, they're placed in the NewTypes folder alongside the Pets folder. The WildAnimals folder may contain types for animals that aren't pets, such as Squirrel and Rabbit types. In this way as types are added, the project remains well organized.

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
    <TargetFramework>netcoreapp3.1</TargetFramework>
  </PropertyGroup>

</Project>
```

### Testing the sample

The NewTypes project is in place, and you've organized it by keeping the pets-related types in a folder. Let's put in some tests. In our exercises, we've used [**NUnit tests**](https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-nunit). Unit testing allows you to automatically check the behavior of your pet types to confirm that they're operating properly.

We'll create our tests now a bit manually. Navigate back to the root folder and create a **test** folder with a **NewTypesTests** folder within it. At a command prompt from the **NewTypesTests** folder, execute **dotnet new nunit**. This produces two files: NewTypesTests.csproj and UnitTest1.cs.

The test project cannot currently test the types in NewTypes and requires a project reference to the NewTypes project. To add a project reference, use the dotnet add reference command:

```console
dotnet add reference ../../src/NewTypes/NewTypes.csproj
```

If you get an error, or if you just want to do it manually, you can also add this to the **NewTypesTest.csproj** yourself:

```xml
<ItemGroup>
  <ProjectReference Include="../../src/NewTypes/NewTypes.csproj" />
</ItemGroup>
```

NOTICE! On some devices, the slashes between folders need to be **\\** rather than **/**. If you get an error after adding the Project Reference, try the other version of slash (just like below); 

Now our **NewTypesTest.csproj** should look something like this:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>

    <IsPackable>false</IsPackable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="nunit" Version="3.12.0" />
    <PackageReference Include="NUnit3TestAdapter" Version="3.15.1" />
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.4.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\..\src\NewTypes\NewTypes.csproj" />
  </ItemGroup>

</Project>
```

The **NewTypesTest.csproj** file contains the following:

* Package reference to nunit, the NUnit testing framework
* Package reference to NUnit3TestAdapter, so we can test with VSC
* Package reference to Microsoft.NET.Test.Sdk, the .NET testing infrastructure
* Project reference to **NewTypes**, the code to test

Change the name of **UnitTest1.cs** to **PetTests.cs** and replace the code in the file with the following:

```cpp
using System;
using NUnit.Framework;
using Pets;

public class PetTests
{
  [Test]
  public void DogTalkToOwnerReturnsWoof()
  {
    string expected = "Woof!";
    string actual = new Dog().TalkToOwner();

    Assert.AreNotEqual(expected, actual);
  }

  [Test]
  public void CatTalkToOwnerReturnsMeow()
  {
    string expected = "Meow!";
    string actual = new Cat().TalkToOwner();

    Assert.AreNotEqual(expected, actual);
  }
}
```

```console
Although you expect that the expected and actual values are equal, an initial assertion with the Assert.AreNotEqual check specifies that these values are not equal. Always initially create a test to fail in order to check the logic of the test. After you confirm that the test fails, adjust the assertion to allow the test to pass. We'll get to testing just in a bit.
```

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
   |__NewTypesTests
      |__PetTests.cs
      |__NewTypesTests.csproj
```

Run the **dotnet test** command in the **NewTypesTests** folder.

As expected, testing fails, and the console displays the following output:

```console
Starting test execution, please wait...

A total of 1 test files matched the specified pattern.

  X CatTalkToOwnerReturnsMeow [64ms]
  Error Message:
     Expected: not equal to "Meow!"
  But was:  "Meow!"

  Stack Trace:
     at PetTests.CatTalkToOwnerReturnsMeow() in /mnt/c/Users/HeikkiHei/Documents/coding-exercises/project_example/NewTypes/test/NewTypesTest/PetTests.cs:line 22


  X DogTalkToOwnerReturnsWoof [1ms]
  Error Message:
     Expected: not equal to "Woof!"
  But was:  "Woof!"

  Stack Trace:
     at PetTests.DogTalkToOwnerReturnsWoof() in /mnt/c/Users/HeikkiHei/Documents/coding-exercises/project_example/NewTypes/test/NewTypesTest/PetTests.cs:line 13


Test Run Failed.
Total tests: 2
     Failed: 2
 Total time: 1.2262 Seconds
```

Change the assertions of your tests from **Assert.AreNotEqual** to **Assert.AreEqual** and rerun the tests with **dotnet test**:

```console
Starting test execution, please wait...

A total of 1 test files matched the specified pattern.

Test Run Successful.
Total tests: 2
     Passed: 2
 Total time: 1.0976 Seconds
```

Now we have created a well organized project. We are able to run our tests and the project itself. You might have noticed, that we ran the commands **dotnet run** and **dotnet test** in different folders. That's because when we run the commands, we actually check the **.csproj** file what we are running. 

The commands cannot now be run from the same folder as such, but require some parameters. For example, if we are at the **NewTypesTest** folder, we can run **dotnet test**, plain and simple, as the file **NewTypesTest.csproj** is in that folder. 

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
   |__NewTypesTests <-- WE ARE HERE
      |__PetTests.cs
      |__NewTypesTests.csproj
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
   |__NewTypesTests
      |__PetTests.cs
      |__NewTypesTests.csproj
```

 The dotnet test requires some information.  We do not have the option of project now, just the path to project file:

```console
dotnet run
dotnet test ../../test/NewTypesTest/NewTypesTest.csproj
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
   |__NewTypesTests
      |__PetTests.cs
      |__NewTypesTests.csproj
```


```console
dotnet run -p src/NewTypes/NewTypes.csproj
dotnet test test/NewTypesTest/NewTypesTest.csproj
```


**NOTICE!** The exercises will be in this structure from part 7 onwards!