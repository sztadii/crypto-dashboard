# crypto-dashboard

### Description
The UI dashboard to present useful information about crypto exchanges

### Setup
Please install `node manager` from `https://github.com/tj/n` <br>
Set up the node version ( specified in engines.node inside the package.json ) by running
```
n auto
```
After that you can install dependencies by running
```
npm install
```
Once you will download the dependencies then we can run the app by
```
npm start
```

### Production
To see production please visit this [link](https://crypto-dashboard-sztadii.vercel.app)

<br />
<br />
<br />
<br />

# The Task
Using the Coingecko public API (https://www.coingecko.com/en/api),
build an application that will serve as a directory of cryptocurrency exchanges.
The main page should be a list with pagination of the first ten exchanges
with some high-level information (name, country, URL, logo, trust rank).

When the user clicks on an exchange, show its details on a separate page.
Included in those details should be the name, country, trust rank, logo, year of establishment,
social media links, description, and a back-to-main-page button.

### Tech Stack
The solution should be built using React, and any other tools can be used
(at stakefish, we use Gatsby with styled components).

### Browser Support
The work should be tested in the latest version of Chrome.
If any features that are not supported by common browsers or IE 11 are used,
these features should be mentioned and suitable fallback experiences should be provided
if the code does not already do so.

### Dependencies
npm should be used for dependency management.
Any 3rd-party libraries can be used as necessary or desired,
but the use of minimal dependencies is preferred.

### Coding Standard
Styles should be responsive and mobile-first. ESLint and Prettier should be used to format the code.

### Evaluation
The React app should build without errors. If there are extra steps required to get it to compile,
they should be covered in the README.md.
The commit history is important, so meaningful commit messages that show progress should be used.
The code should be easy to understand and communicative (e.g., in comments, variable names, etc.).
Clean code principles, componentization, appropriate test coverage,
and code documentation are key factors and highly valued.
Bonus points for testing (stakefish ❤️ end-to-end testing with Cypress).
