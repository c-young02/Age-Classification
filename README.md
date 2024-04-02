<br/>
<p align="center">
  <a href="https://github.com/c-young02/Age-classification">
    <img src="website/public/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Age Classification</h3>

  <p align="center">
    <a href="https://github.com/c-young02/Age-classification/issues">Report Bug</a>
    .
    <a href="https://github.com/c-young02/Age-classification/issues">Request Feature</a>
  </p>
</p>



## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [How to Run](#how-to-run)
* [Roadmap](#roadmap)

## About The Project

![Screenshot](website/public/images/site.png)

This project represents the culmination of my endeavors within my honors computing program, where the objective was to develop an age classification system tailored for facial analysis. Leveraging the robust capabilities of machine learning, the model is constructed upon the foundation of the ResNet50 architecture. Trained meticulously on the  UTKFace dataset, the model strives for exceptional accuracy and inclusivity in predicting ages.

## Built With

* [Python](https://www.python.org/)
* [TensorFlow](https://www.tensorflow.org/)
* [Flask](https://flask.palletsprojects.com/en/3.0.x/)
* [JavaScript](https://www.javascript.com/)
* [React](https://react.dev/)
* [Bootstrap](https://getbootstrap.com/)

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites


* node
* Python

### Installation

1. Clone the repo

```sh
git clone https://github.com/c-young02/Age-Classification
```
2. Change into the website directory
```sh
cd age-classification/website
```

3. Install NPM packages

```sh
npm install
```
4. Install the required PIP packages

## How to Run
1. Change into the website directory
```sh
cd age-classification/website
```

2. Run the website
```sh
npx serve build -s
```

3. Run the backend by executing the Flask script
```sh
python scripts/app.py
```

## Roadmap

See the [open issues](https://github.com/c-young02/Age-classification/issues) for a list of proposed features (and known issues).
