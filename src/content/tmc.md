---
title: 'TMC Instructions'
nav_order: 9999
hidden: false
---

# Prerequisits for the course


To do the exercises for this course, you need to install a few software to your computer.

## .NET
You need to have `.NET` (also called `Dotnet`) installed. You can install it from here: [https://dotnet.microsoft.com/download](https://dotnet.microsoft.com/download). 

<Note>Dotnet 5.0 has met its End of Life. Course with dotnet 6.0 online now!</Note>

## Visual Studio Code

The editor used during this course is `Visual Studio Code`. You can fid the instruvtions from example here: [https://www.mooc.fi/en/installation/vscode/#installing-vscode](https://www.mooc.fi/en/installation/vscode/#installing-vscode) or the direct installation link from here: [https://code.visualstudio.com/download](https://code.visualstudio.com/download)

## C# and TMC Plugin

Once you have installed the Visual Studio Code, you need to install `Test My Code` or `TMC` plugin to it. You can find the instructions from here: [https://www.mooc.fi/en/installation/vscode/#installing-tmc](https://www.mooc.fi/en/installation/vscode/#installing-tmc)

You also need the `C#` plugin: [https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)


# How to do the exercises

## Registering to the course

Once you have everything installed, you need to download the exercises to your computer. To do that, you need to have a `MOOC.fi account`. You can read the instructions from here: [https://www.mooc.fi/en/installation/vscode/#mooc.fi-create-account](https://www.mooc.fi/en/installation/vscode/#mooc.fi-create-account). Follow the instructions to `login`.

<Note>
Register with your university (or school) email, if you have one!
Also, register with same email to TMC and to Open University, if you want credits!
</Note>

### Centria students

When you have the account, follow the instructions for:
- Selecting your organization: *Centria University of Applied Sciences*
- Selecting your course according to time of attendance, for example *Advanced Programming in C# Fall 1*
    - The correct course name can also be found from Itslearning.


When you have the account, follow the instructions for:
- Selecting your organization: *Centria University of Applied Sciences*
- Selecting your course: *Advanced Programming in C# Open University*


## Doing the exercises

You can find the exercises for each part at the end of each chapter. In some chapters, there might be no exercises.

You can follow these instructions (to a point) on how to submit exercises: 
[https://www.mooc.fi/en/installation/vscode/#first-programming-exercise](https://www.mooc.fi/en/installation/vscode/#first-programming-exercise)

<Note>
At this point, you might encounter a bug, and the exercises do not show up.

In this case, you have to choose again the Extensions menu, select the TMC extension, and enable it.

After enabling, VSCode will ask if you trust the extension and the files, say YES to both questions.
</Note>

## Running the exercises

<Note>
The part of "Running the source code" does not unfortunately work yet.

We have to run our exercises manually, if we want to do so.
</Note>

In Visual Studio Code, select `Terminal` and then `New Terminal`

![Terminal menu](https://github.com/centria/advanced-csharp/raw/master/src/images/new-terminal.png)

A selection of options will pop up. The selections contain all the open exercises. In the example, I am doing part 6, so I have those open.

![Folder selection](https://github.com/centria/advanced-csharp/raw/master/src/images/select-folder.png)

* Select the exercise you are doing
* A new terminal opens at the bottom of Visual Studio Code.

* write the command `cd src/Exercise000` , but instead of the zeros, use the actual exercise number. Press `Enter`.

![Selecting source folder](https://github.com/centria/advanced-csharp/raw/master/src/images/exercise003.png)

* In the example, I am doing exercise 003 of the part, so my command is `cd src/Exercise003`
* Now you are in the actual exercise folder, and can run the program.
* Run the program with the command `dotnet run`. 

![Dotnet run](https://github.com/centria/advanced-csharp/raw/master/src/images/dotnet-run.png)

* If your program works as it should, you can see the output in the console. The next example is from Part 6, exercise 003:

![Dotnet run](https://github.com/centria/advanced-csharp/raw/master/src/images/dotnet-print.png)

<Note>The dollar sign in the pictures is NOT part of the command! </Note>

### Alternative way

In Visual Studio Code,
* Click on the exerice folder with right mouse button, and choose `Open in integrated terminal`.
* Run the program with the command `dotnet run`.

## Testing your exercises

Follow the instructions here: [https://www.mooc.fi/en/installation/vscode/#test-source-code](https://www.mooc.fi/en/installation/vscode/#test-source-code)

## Submitting your exercises

Follow the instructions here: [https://www.mooc.fi/en/installation/vscode/#submit-solution](https://www.mooc.fi/en/installation/vscode/#submit-solution)

## Checking your points

Follow the instructions here: [https://www.mooc.fi/en/installation/vscode/#check-your-points](https://www.mooc.fi/en/installation/vscode/#check-your-points)

## Errors in the material?

Did you find an error? A typo perhaps? Please make a pull request at [GitHub](https://github.com/centria/advanced-csharp/tree/master/src/content) and help us make the material better!