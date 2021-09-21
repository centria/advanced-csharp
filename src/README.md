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
      <a href="#usage">Getting Started</a>
      <ul>
        <li><a href="#replace-document-content">Replace document content</a></li>
        <li><a href="#document-content-structure">Document content structure</a></li>
        <li><a href="#config-content-files-front-matter">Config content files front matter</a></li>
        <li><a href="#apllication-styling">Application styling</a></li>
        <li><a href="#syntax-highlighting">Syntax highlighting</a></li>
        <li><a href="#deploy-the-application-on-github-pages">Deloy the application on Github Pages</a></li>
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

5. Test application with Cypress

```sh
npm run test:e2e
yarn run test:e2e
```

6. Build application code with

```sh
npm run build
yarn run build
```

<!-- USAGE EXAMPLES -->

## Usage

### Replace document content

To replace document content, you need to delete the content folder in _./src_ folder then replace your own document content folder.

![src folder structure](https://i.imgur.com/Ps2C6CM.png)

### Document content structure

Basically, all the markdown files in your content folder will be displayed in the side navbar, except the index file. It will be the main page to display when you visit the application, or you can revisit it by clicking on the Centria's logo. For example, the image bellow is a content folder with three main part, each will have a main folder and a index markdown file corresponding, folder _part 1_ will have _part1.md_ as its index page. And you can have many single page as you want like _exam_, _exercises_, ...

![content folder structure](https://i.imgur.com/PNoUh8b.png)

### Config content files front matter

In order to display the content from the files, we need to config the front matter data so the app can get its necessary information. Two compulsory fields need to have for each file are title and nav_order. Title will be used to display the part's name in the navbar and anv_order will be used for sorting those name in navbar. Bellow is the frontmatter of part 1.

![content folder structure](https://i.imgur.com/PNoUh8b.png)

About numbering the nav*order, it will work base on each folder layer. For example, if you are in the \_content* folder, you should number the contents' order as : 1, 2, 3... But if you in a subfolder like part1, or part2 you also need to number the subcontain as 1, 2, 3...So each layer will have a separate ordering and will not overlap each others.

### Application styling

You can adjust the styles of the application by modifying the file _src/gatsby-plugin-theme-ui/color_ .

### Syntax highlighting

Codeblook highlighting functionality of this app is boostrapping with [theme-ui](https://theme-ui.com/guides/syntax-highlighting/). Althought this is the most popular choice for supporting syntax highlight with Gatsby, it still have its limit and cannot cover all programming languages. However, it can be supported with Prismjs to have more languages withhighlight support, the config can be found [here](https://theme-ui.com/packages/prism/).

[List of supported languages](https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js) by theme-ui.

### Deloy the application on Github Pages

To deploy the application on your own Github Pages, you need to push these code on your Github repo, then create and save a Github TEMPLATE*API secret key. After that got to the \_gatsby-config.js* file on the root folder and adjust the pathPrefix field with your Github repo name. For example, if your app repo name is _my-repo_ then it should be _pathPrefix: '/template'_. You also can watch [this tutorial](https://www.youtube.com/watch?v=JIMord7-G10) if you need more help on this.

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
