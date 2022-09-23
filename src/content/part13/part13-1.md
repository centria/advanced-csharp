---
title: "Graphical user interfaces"
nav_order: 1
hidden: false
---


So far, all our programs have used the console, or terminal, as their interface. But in modern operating systems, **graphical user interfaces** (GUIs) are more common. C# has a variety of choices built in for creating graphical programs for Windows environment, and on this course, we'll take a quick glance of one of the options.

## Creating a new Windows Forms project

When we created our console projects, we used the command **dotnet new ...**. We can create a graphical project in the same manner. This time, the command is **dotnet new winforms**. 

<Note> If you are unable to create a project with the command above, you might have to change your Terminal in VSC to be **PowerShell**. Windows Forms programs can only be created and run through a Windows based terminal. </Note>

The program can be run with same commands as a console program, i.e. **dotnet run**. One major difference is in our **csproj** file, where we decide we are creating a Windows application.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net6.0-windows</TargetFramework>
    <UseWindowsForms>true</UseWindowsForms>
  </PropertyGroup>

</Project>
```

We have to modify this a little bit, and add

```xml
<GenerateAssemblyInfo>false</GenerateAssemblyInfo>
```

To our property group. This is because .NET functionality has changed a somewhat in versions 5 and newer. For reference, you can find more information [in here](https://docs.microsoft.com/en-us/dotnet/desktop/winforms/migration/?view=netdesktop-5.0).

With this, the file will look like follows:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net6.0-windows</TargetFramework>
    <UseWindowsForms>true</UseWindowsForms>
    <GenerateAssemblyInfo>false</GenerateAssemblyInfo>
  </PropertyGroup>

</Project>
```

As you can see, the OutputType is now **WinExe**, meaning a Windows Executable file, and will have a file type **.exe**. With this, we will also find an executable file from our folders.

Windows Forms is one type of graphical interface that can be created with C#. We will be using it in our examples in this course.

Let's create our first project.

<Note> This, and all the examples in this part, only work on Windows! </Note>

* Create a folder where you want your project. The example will be in a folder called **GuiProject**.

* To keep the folder structure neat, create a folder **src** in the project folder, and navigate there.

* Run the command **dotnet new winforms** inside the src folder.

You will get a project structure something like this:

```console
.
└── src
    ├── Form1.Designer.cs
    ├── Form1.cs
    ├── Program.cs
    ├── obj
    └── src.csproj
```

You can now test out your project, with **dotnet run**. You should get an program that looks like this:

![Winform1](https://raw.githubusercontent.com/centria/advanced-csharp/master/src/images/part12/winform1.png)

Hooray, the program opens! It does not do anything quite yet. Let's look into our files, and then start adding some functionality.

```cpp
// Program.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace src
{
  static class Program
  {
    /// <summary>
    ///  The main entry point for the application.
    /// </summary>
    [STAThread]
    static void Main()
    {
      Application.SetHighDpiMode(HighDpiMode.SystemAware);
      Application.EnableVisualStyles();
      Application.SetCompatibleTextRenderingDefault(false);
      Application.Run(new Form1());
    }
  }
}
```

Our **Main** now has quite much more than we have created with text interfaces. The concept is still quite the same: The main functionality of Main is to trigger the program into running. The last line is the most interesting, with **Application.Run(new Form1());**. Let's look at that Form1 now.

There are some parts of the code we have not handled yet, and won't handle in this course, such as the comments with \<summary\>. Those are parts for Windows Fields Designer and its comments, and we shall not worry about them.

We do have to care about [**[STAThread]**](https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-3.0/ms182351(v=vs.80)?redirectedfrom=MSDN). *"This attribute must be present on the entry point of any application that uses Windows Forms; if it is omitted, the Windows components might not work correctly. If the attribute is not present, the application uses the multithreaded apartment model, which is not supported for Windows Forms."*

```cpp
// Form1.cs
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace src
{
  public partial class Form1 : Form
  {
    public Form1()
    {
      InitializeComponent();
    }
  }
}
```

Nothing much happens in this file, except we call the method **InitializeComponent();**. You might notice, that the call is done as the class would call its own method, and that is quite true. This class is called a **partial class**, and it inherits **Form**. This means, that it implements some of the parts of Form, but not all. It is calling for a method from another partial class. This time, it is partial of **Form1** itself. Let's have a look.

```cpp
// Form1.Designer.cs
namespace src
{
  partial class Form1
  {
    /// <summary>
    ///  Required designer variable.
    /// </summary>
    private System.ComponentModel.IContainer components = null;

    /// <summary>
    ///  Clean up any resources being used.
    /// </summary>
    /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
    protected override void Dispose(bool disposing)
    {
      if (disposing && (components != null))
      {
        components.Dispose();
      }
      base.Dispose(disposing);
    }

    #region Windows Form Designer generated code

    /// <summary>
    ///  Required method for Designer support - do not modify
    ///  the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
      this.components = new System.ComponentModel.Container();
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.ClientSize = new System.Drawing.Size(800, 450);
      this.Text = "Form1";
    }

    #endregion
  }
}
```

Once again, we see quite much of the comments created by the designer, but also a different comment, starting with a **#**. Those are for collapsing code out of view if certain options are enabled, but for us, yet another part not to worry about. Let's clean up the file:

```cpp
namespace src
{
  partial class Form1
  {
    private System.ComponentModel.IContainer components = null;

    protected override void Dispose(bool disposing)
    {
      if (disposing && (components != null))
      {
        components.Dispose();
      }
      base.Dispose(disposing);
    }

    private void InitializeComponent()
    {
      this.components = new System.ComponentModel.Container();
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.ClientSize = new System.Drawing.Size(800, 450);
      this.Text = "Form1";
    }
  }
}
```

Much more readable. Now we can see we have two methods, **Dispose** and **InitializeComponent**, and we recognize the latter was called by the other partial. Let's look at that first.

The method contains several lines, which each have a specific function for creating our program window:
```cpp
this.components = new System.ComponentModel.Container();
```

* Is used for storing elements which do not have a visual representation during the runtime, but might be needed otherwise, such as a timer running in the background.

```cpp
this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
```

* Is used to define, which kind of method is used for scaling. By default, the scaling is Font, but could be also Dpi, Inherit or None.

```cpp
this.ClientSize = new System.Drawing.Size(800, 450);
```

* Is quite self-explanatory, defining the size of the window we draw.

```cpp
this.Text = "Form1";
```

* Defines the text in the up-left corner of our window.

Our other method, **protected override void Dispose(bool disposing)**, is automatically created, and takes care of disposing (or handing over to garbage collection) the elements of our program. It is used for example when we close the program window. For our intents and purposes, we don't have to touch it.

## First functionality - "Hello World"

As always, we start with a classic "Hello World" in our code. Let's add some content to our window.

```cpp
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace src
{
  public partial class Form1 : Form
  {
    // Added TextBox1
    private TextBox textBox1;
    public Form1()
    {
      InitializeComponent();
    }
  }
}

```

As our other form is a partial for this one, we want to create the priave TextBox here. We could, just as well, create it in the next file, and bring the correct namespace with it. Let's keep it here, though, for at least now.

```cpp
namespace src
{
  partial class Form1
  {

    private System.ComponentModel.IContainer components = null;
    protected override void Dispose(bool disposing)
    {
      if (disposing && (components != null))
      {
        components.Dispose();
      }
      base.Dispose(disposing);
    }

    private void InitializeComponent()
    {
      this.components = new System.ComponentModel.Container();
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.ClientSize = new System.Drawing.Size(800, 450);
      // More meaningful text
      this.Text = "Hello World Application";

      // Call this.textBox1 and initialize
      this.textBox1 = new System.Windows.Forms.TextBox();
      // Give the textbox some content
      this.textBox1.Text = "Hello World";
      // Make it ReadOnly, so it cannot be edited by the users
      this.textBox1.ReadOnly = true;
      // Center to the screen
      this.textBox1.Location = new System.Drawing.Point((this.Width - this.textBox1.Width) / 2, (this.Height - this.textBox1.Height) / 2);
      // Add to controls
      this.Controls.Add(this.textBox1);
    }
  }
}
```

That's a lot of code for a simple string.

```cpp
this.textBox1 = new System.Windows.Forms.TextBox();
```

* We initialize a standard textbox object by getting it from the correct namespace. As you might notice, we do not have any **using directives** in this part of the form, but we could just as well have them here.

```cpp
this.textBox1.Text = "Hello World";
```

* Creates the text content inside the textbox.

```cpp
this.textBox1.ReadOnly = true;
```

* Prevents the users from editing the textbox. You can take this line away and see what happens.

```cpp
this.textBox1.Location = new System.Drawing.Point((this.Width - this.textBox1.Width) / 2, (this.Height - this.textBox1.Height) / 2);
```

* Not required, but nice to have. We center an item by giving it a new **Point** as **Location**. Location is the top-left corner of the item.

```cpp
this.Controls.Add(this.textBox1);
```

* Earlier we mentioned components, which have the non-displayable components. In **Controls**, we store everything we want to show to the user.

![Winform2](https://raw.githubusercontent.com/centria/advanced-csharp/master/src/images/part12/winform2.png)

## More functionality - Button

Quite a lot of work has gone into getting a simple one-liner into our GUI. Let's create ourselves a button next:

```cpp
// Form1.cs

// plenty of usings

namespace src
{
  public partial class Form1 : Form
  {
    private TextBox textBox1;
    // Added the private Button
    private Button button1;

    public Form1()
    {
      InitializeComponent();
    }
  }
}
```

```cpp
namespace src
{
  partial class Form1
  {
    private System.ComponentModel.IContainer components = null;
    protected override void Dispose(bool disposing)
    {
      if (disposing && (components != null))
      {
        components.Dispose();
      }
      base.Dispose(disposing);
    }

    private void InitializeComponent()
    {
      this.components = new System.ComponentModel.Container();
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.ClientSize = new System.Drawing.Size(800, 450);
      this.Text = "Hello World Application";

      this.textBox1 = new System.Windows.Forms.TextBox();

      this.textBox1.Text = "Hello World";
      this.textBox1.ReadOnly = true;
      this.textBox1.Location = new System.Drawing.Point((this.Width - this.textBox1.Width) / 2, (this.Height - this.textBox1.Height) / 2);
      this.Controls.Add(this.textBox1);

      // Button
      this.button1 = new System.Windows.Forms.Button();
      this.button1.Text = "Click me!";
      this.button1.Click += new System.EventHandler(ShowMessage);
      Controls.Add(this.button1);


    }

    // Button function
    private void ShowMessage(object sender, System.EventArgs e)
    {
      this.textBox1.Text = "Button Clicked!";
    }
  }
}
```

Let's see what our button's code does:

```cpp
this.button1 = new System.Windows.Forms.Button();
```

* Initialize a new button object

```cpp
this.button1.Text = "Click me!";
```

* Give the button a text

```cpp
this.button1.Click += new System.EventHandler(ShowMessage);
```

* Button's functionality. On a Click, We Call an EventHandler, which takes as a parameter a method.

```cpp
Controls.Add(this.button1);
```

* Add to Controls so the button is visible

![Winform3](https://raw.githubusercontent.com/centria/advanced-csharp/master/src/images/part12/winform3.png)

```cpp
private void ShowMessage(object sender, System.EventArgs e)
{
  this.textBox1.Text = "Button Clicked!";
}
```

* Our method takes actually in two parameters, but we give it only one in our code. The second parameter, **System.EventArgs e** refers to Event Arguments, and in this case, it would be mouse click. As a crude simplification, as this is called inside the EventHandler, we can assume the event to be given (i.e. the mouse to be clicked), which triggers the method call.

* In our method, we change our textBox1 text.

![Winform4](https://raw.githubusercontent.com/centria/advanced-csharp/master/src/images/part12/winform4.png)

As we can see, now that we did not give our button any specific location, it will start in the top-left corner. What happens, if we create 2 buttons?

```cpp
// Very ugly copy-paste code
this.button1 = new System.Windows.Forms.Button();
this.button1.Text = "Click me!";
this.button1.Click += new System.EventHandler(ShowMessage);
Controls.Add(this.button1);

this.button2 = new System.Windows.Forms.Button();
this.button2.Text = "Click me instead!";
this.button2.Click += new System.EventHandler(ShowMessage);
Controls.Add(this.button2);
```

![Winform5](https://raw.githubusercontent.com/centria/advanced-csharp/master/src/images/part12/winform5.png)

We can see that only the first button is drawn. If we want to have the other button in another location, we have to define the new location. Let's also make some other adjustements to the code:

```cpp
this.button2 = new System.Windows.Forms.Button();
this.button2.Text = "Click me instead!";
this.button2.AutoSize = true;
this.button2.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowOnly;
this.button2.Location = new System.Drawing.Point(this.button1.Width+5, 0);
this.button2.Click += new System.EventHandler(ShowMessage); 
Controls.Add(this.button2);
```

```cpp
this.button2.AutoSize = true;
this.button2.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowOnly;
```

* With these we allow our button to grow in size, and make the whole text visible.

```cpp
this.button2.Location = new System.Drawing.Point(this.button1.Width+5, 0);
```

* We define our button location to start from the **button 1 width + 5 pixels**, but keeping the starting height the same. This way, we have our buttons side by side with a little gap between them:

![Winform6](https://raw.githubusercontent.com/centria/advanced-csharp/master/src/images/part12/winform6.png)

## EventHandling

We have now already done some event handling with our buttons. But what do events and event handling actually mean?

An event is a message sent by an object to signal the occurrence of an action. The action can be caused by **user interaction**, such as a **button click**, or it can result from some other program logic, such as changing a property’s value, like we did with our text field earlier. The object that raises the event is called the **event sender**. The event sender doesn't know which object or method will receive (handle) the events it raises. The event is typically a member of the event sender; for example, the **Click event** is a member of the **Button class**.

**To respond to an event**, you define an event handler method in the event receiver. This method must match the signature of the delegate for the event you are handling. In the event handler, you perform the actions that are required when the event is raised, such as collecting user input after the user clicks a button. To receive notifications when the event occurs, your event handler method must subscribe to the event.

The following example shows an event handler method named **ShowMessage** that matches the signature for the EventHandler delegate. The method subscribes to the **Button.Click** event.

```cpp
private void ShowMessage(object sender, System.EventArgs e)
{
  this.textBox1.Text = "Button Clicked!";
}
```

An event handler can also have options. For example, our two buttons can have same handler but different functionality:

```cpp
private void ShowMessage(object sender, System.EventArgs e)
{
  string buttonName = (sender as System.Windows.Forms.Button).Text;
  if (buttonName == "Click me!")
  {
    this.textBox1.Text = "Button Clicked!";
  }
  else
  {
    this.textBox1.Text = "Other Button Clicked!";
  }
}
```

## Our first actual program

Let's create something more meaningful with our new skills, like a simple Calculator. 

![Calculator](https://raw.githubusercontent.com/centria/advanced-csharp/master/src/images/part12/calculator.png)

Our project structure looks something like this:

```console
.
└── src
    ├── Calculators
    │   ├── Calculator.Designer.cs
    │   └── Calculator.cs
    ├── GuiCalculator.csproj
    ├── Program.cs
    ├── bin
    └── obj
```

[**And you can find the code from here!**](https://github.com/centria/csharp-calculator), so you don't have to write every bit yourself.

<Note>We shall not have the whole code here, but you can find it from the link above. </Note>

Let's take a look at some of the highlights:

```cpp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace GuiCalculator
{
  static class Program
  {
    [STAThread]
    static void Main()
    {
      Application.SetHighDpiMode(HighDpiMode.SystemAware);
      Application.EnableVisualStyles();
      Application.SetCompatibleTextRenderingDefault(false);
      Application.Run(new Calculator());
    }
  }
}
```

* Our Main class is still very nice and clean, as it should. Even though our program is larger, the Main has been kept simple.


```cpp
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace GuiCalculator
{
  public partial class Calculator : Form
  {
    // Calculation variables
    private double accumulator = 0;
    private string lastOperation;

    // All the buttons are already initialized here
    private Button button0 = new Button();
    private Button button1 = new Button();
    private Button button2 = new Button();
    /* 
    . . .

    ALL THE BUTTONS
    */
    private TextBox results = new TextBox();

    // Very clean constructor
    public Calculator()
    {
      InitializeComponent();
    }
  }
}
```

```cpp
private void InitializeComponent()
{
  this.components = new System.ComponentModel.Container();
  this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
  this.ClientSize = new System.Drawing.Size(300, 300);
  // Text at the top
  this.Text = "Calculator";

  // Button sizes
  int buttonWidth = 60;
  int buttonHeight = 60;

  // Results box
  this.results.Text = "0";
  this.results.Font = new System.Drawing.Font("Arial", 30);
  this.results.Width = 300;
  // Move text to right side
  this.results.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
  this.results.ReadOnly = true;
  this.results.Location = new System.Drawing.Point(0, 0);

  // Define button 7, top-left
  this.button7.Location = new System.Drawing.Point(0, buttonHeight);
  this.button7.Font = new System.Drawing.Font("Arial", 20);
  this.button7.Height = buttonHeight;
  this.button7.Width = buttonWidth;
  this.button7.Text = "7";
  this.button7.Click += new System.EventHandler(AddToString);
  
  /* 
  
  AND A LOT MORE CODE HERE 
  
  */
  
  // Add all the buttons to the Controls
  this.Controls.Add(this.results);

  this.Controls.Add(button0);
  this.Controls.Add(button1);
  /*
  Add all the items to the Controls. ALL OF THEM.
  */
```

* First we create our program window like previously
* Then we define couple of variables to be used in our layout
* Define the TextBox for results and calculations
  * Initial text is "0"
  * Larger font
  * Width set to whole program
  * Users cannot edit the text
  * Start from top-most-corner (default)
* Define the first button, as it starts from top-left after the results box
  * Start from below the TextBox
  * Larger font
  * Use the variables to make it a square
  * Define what reads on the button
  * Add a handler

You can read the rest of the button codes from the repository. They are all quite alike. Most interesting are our event handlers:

```cpp
private void AddToString(object sender, System.EventArgs e)
{
  string number = (sender as System.Windows.Forms.Button).Text;
  if ((results.Text.Contains(".") && number == ".") || (results.Text == "0" && number == "."))
  {
    return;
  }
  if (results.Text == "0")
  {
    results.Text = number;
  }
  else
  {
    results.Text += number;
  }
}
```

* With this event handler we add the numbers and decimals to our TextBox.Text.
  * To keep numbers clean, we check where we can add a decimal
    * Not in the beginning of the string, and only one per number
* If the TextBox.Text is 0, replace with the input number
* Else add to the end

```cpp
private void CalculateResult(object sender, System.EventArgs e)
{
  string operation = (sender as System.Windows.Forms.Button).Text;
  double currentValue = System.Convert.ToDouble(results.Text, System.Globalization.CultureInfo.InvariantCulture);
  if (operation == "C")
  {
    this.accumulator = 0;
  }
  else if (lastOperation == "+")
  {
    accumulator += currentValue;
  }
  else if (lastOperation == "-")
  {
    accumulator -= currentValue;
  }
  else if (lastOperation == "*")
  {
    accumulator *= currentValue;
  }
  else if (lastOperation == "/")
  {
    accumulator /= currentValue;
  }
  else
  {
    accumulator = currentValue;
  }

  lastOperation = operation;

  if (operation == "=")
  {
    results.Text = accumulator.ToString();
  }
  else
  {
    results.Text = "0";
  }
}
```

* This is more tricy. It goes through all our operations buttons.

```cpp
string operation = (sender as System.Windows.Forms.Button).Text;
```

* We save our operation name into a string, by parsing the name from the **Button.Text**. The **sender** is recognized from the method parameter.

```cpp
double currentValue = System.Convert.ToDouble(results.Text, System.Globalization.CultureInfo.InvariantCulture);
```

* We parse the variable **currentValue** from the **results.Text**, into a double.

```cpp
  if (operation == "C")
  {
    this.accumulator = 0;
  }
```

* If we want to reset our calculation, we press "C". It sets the accumulated total to 0.

```cpp
else if (lastOperation == "+")
{
  accumulator += currentValue;
}
```

* With "+" we add our **currentValue** to the accumulated total. Rest of the operations function similarly, according to their signs.

* We actually use the variable **lastOperation** instead of the **operation**, since we only want to show the result if there is already a previous operation done.
  * For example, if we input to our calculator

```console
1
2
+
3
+
3
=
```

We will see the **results** show us

```cpp
12
0
15
0
18
```

So the previous result is only shown when the next operation is pressed. Remember, that even the total is an operator.

```cpp
lastOperation = operation;

if (operation == "=")
{
  results.Text = accumulator.ToString();
}
else
{
  results.Text = "0";
}
```

* After the operation, we save our operation to the variable **lastOperation**, so we can check it for the next operation press.

* If the operation was "=", we show the total of the calculation so far. Otherwise, we show 0 when a operator is clicked, so we are waiting for another input.


## Conclusion

Graphical interfaces require quite much code to achieve even a simple program. The applications get quite complicated quite fast. This part was meant to demonstrate the possibilities of GUI, not be an exhaustive guide.

There are easier ways of doing GUI for C#, such as [**using Visual Basic**](https://docs.microsoft.com/en-us/visualstudio/ide/create-a-visual-basic-winform-in-visual-studio?view=vs-2019). Learning these is left for you.

# Exercises

<Note>No exercises for Graphical User Interfaces, as they only work on Windows!</Note>









