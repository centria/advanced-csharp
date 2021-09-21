

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/centria/template">
    <img src="https://i.imgur.com/Ps2C6CM.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Document Template</h3>

  <p align="center">
   Document Template for Markdown content.
    <br />
    <a href="https://github.com/centria/template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://centria.github.io/template/">View Demo</a>
    ·
    <a href="https://github.com/centria/template/issues">Report Bug</a>
    ·
    <a href="https://github.com/centria/template/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#config-to-deploy-the-application-on-github-pages">Config to deploy the application on Github Pages</a></li>
        <li><a href="#replace-document-content">Replace document content</a></li>
        <li><a href="#types-of-content">Types of content</a></li>
        <li><a href="#about-hidden-content">About hidden content</a></li>
        <li><a href="#about-license">About license</a></li>
        <li><a href="#update-repositories-created-by-the-template">Update repositories created by the template</a></li>
        <li><a href="#document-content-structure">Document content structure</a></li>
        <li><a href="#config-content-files-front-matter">Config content files front matter</a></li>
        <li><a href="#application-styling">Application styling</a></li>
        <li><a href="#syntax-highlighting">Syntax highlighting</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

### Built With

- [Gatsby](https://www.gatsbyjs.com/)
- [Markdown](https://en.wikipedia.org/wiki/Markdown)
- [Github Pages](https://pages.github.com/)
- [React](https://reactjs.org/)

<!-- GETTING STARTED -->

### Installation

1. Clone the repo

```sh
git clone https://github.com/centria/template
```

2. Install NPM packages

```sh
npm install
yarn
```

3. Implement application on local server

```sh
npm start
yarn start
```

4. Lint application with ESLint

```sh
npm run lint
yarn run lint
```

5. Build application code with

```sh
npm run build
yarn run build
```

<!-- USAGE EXAMPLES -->

## Getting Started

### Config to deploy the application on Github Pages

To deploy the application on your own Github Pages, first you need create a secret key on your account by going to ***account setting** then **developer settings** and **personal access tokens** and **generate new token**, tick on **repo** option as the picture below:

![genetate token](https://i.imgur.com/444VSXd.png)

After that, clone this repo as a template for the new repo on your Github account, and make sure mark it as **PUBLIC**

![genetate token](https://i.imgur.com/P0CSauu.png)

then go to **SETTINGS**, choose **SECRETS**, create **New repository secret**, name it as **TEMPLATE_API** and paste the **personal access token** you created before then click **Add secret** as the image below:

![genetate token](https://i.imgur.com/QYIRxCE.png)

After that got to the **./gatsby-config.js** file on the root folder and adjust the pathPrefix field with your Github repo name. For example, if your app repo name is **my-repo** then it should be **pathPrefix: '/my-repo'**. 

![Change pathPrefix](https://i.imgur.com/e9O9wYs.png)

You also can watch [this tutorial](https://www.youtube.com/watch?v=JIMord7-G10) if you need more help on this.

### Replace document content

To replace document content, you need to delete the content folder in **./src** folder then replace your own document content folder.

### Types of content

At the moment, the template offers two types of content. The first one is created by the **template** file, these papges will have the same layout with the main content taken from markdown files in the **content** folder. Most pages of this template belong to this type. The second one, is the pages create by setup a new file in **pages** folder. This type of content will have different layouts (or behaviors) compare to the first one depends on the purpose of the developers. At this stage, 404 is the only one page belongs to this type.

### About hidden content

In the ***./src/content***, you will find a ***hidden-docs*** folder. This will be the folder contains all of the content that you want them to be hidden likes LICENSE, exercise instructions or exercise solutions. To turn a Markdown file into a hidden file, you just need to set the hidden field in its front matter to be ***true*** as below

![Hidden Content](https://i.imgur.com/wFpgBTm.png)

To access to a hidden file in a Markdown document you can add a Link component, for example, if you want to access to tmc file in the hidden folder, you can add a Link component as below

![Link Component](https://i.imgur.com/gKWOSj9.png)

### About License

In the project, you can find that we have two LICENSE files, one is in the foot directory, the other is in the hidden-docs directory. The first one is for Github, and the second one is the one you can access in the Footer section of the page. Both of them are supposed to have the same content.

### Update repositories created by the template

When the template get some new features and you also want to update repositories created with this, you can run the command below:

```sh
npx update-template https://github.com/centria/template
```

### Document content structure

Basically, all the markdown files in your content folder will be displayed in the side navbar, except the index file. It will be the main page to display when you visit the application, or you can revisit it by clicking on the Centria's logo. For example, the image bellow is a content folder with three main part, each will have a main folder and a index markdown file corresponding, folder **part 1** will have **part1.md** as its index page. And you can have many single page as you want like **exam**, **exercises**, ...

![content folder structure](https://i.imgur.com/BCddHmg.png)

### Config content files front matter

In order to display the content from the files, we need to config the front matter data so the app can get its necessary information. Two compulsory fields need to have for each file are title and nav_order. Title will be used to display the part's name in the navbar and anv_order will be used for sorting those name in navbar. Bellow is the frontmatter of part 1.

![Front matter](https://i.imgur.com/DJgGPsE.png)

About numbering the nav*order, it will work base on each folder layer. For example, if you are in the **./src/content** folder, you should number the contents' order as : 1, 2, 3... But if you in a subfolder like **part1**, or part2 you also need to number the subcontain as 1, 2, 3...So each layer will have a separate ordering and will not overlap each others.

### Application styling

The global style of this template take reference from [Benjamin De Cock](https://gist.github.com/bendc/ac03faac0bf2aee25b49e5fd260a727d) and you can find it in **./src/styles/global.js**.

To make the application's reponsiveness, the media queries take reference from [Gatsby theme Novela](https://github.com/narative/gatsby-theme-novela), you can adjust it by modifying **./src/styles/media.js**. All breakpoints can be found inside of theme.breakpoints and each is turned in to a min + 1 and max-width version.

You can adjust the styles of the application by modifying the file **src/gatsby-plugin-theme-ui** .

I recommend keep then setting as default since they will have effects to the responsiveness of the application on other platforms. However, you can still adjust the styles of the application by modifying **src/gatsby-plugin-theme-ui/color.js**

![Used application colors](https://i.imgur.com/2PKRqJ3.png)

### Syntax highlighting

Codeblook highlighting functionality of this app is boostrapping with [theme-ui](https://theme-ui.com/guides/syntax-highlighting/). Althought this is the most popular choice for supporting syntax highlight with Gatsby, it still have its limit and cannot cover all programming languages. However, it can be supported with Prismjs to have more languages withhighlight support, the config can be found [here](https://theme-ui.com/packages/prism/). For instance, if you want the support highlighting for R language, you can adjust the content of ***src/gatsby-plugin-theme-ui/components.js*** as

![R highlighting](https://i.imgur.com/g7zlA4p.png)

[List of supported languages](https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js) by theme-ui.

The defaut highlighting style used in this application is ocenic, you can choose different highlighting styles from [Theme-ui style list](https://theme-ui.com/packages/prism/)

![Highlighting styles](https://i.imgur.com/kZkM26m.png)

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/centria/template/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

**vu.nguyen101@gmail.com**

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


