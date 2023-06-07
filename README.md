WalletApp

WalletApp is a comprehensive application designed to manage your financial portfolio. 
With WalletApp, you can create, update, and delete wallets, enabling you to organize and track your various financial accounts seamlessly. 
The application also allows you to add transactions to your wallets, providing a detailed record of your income and expenses. 
It consists of a REST API and a client-side web application.

User Authentication

WalletApp includes user authentication and registration functionality using JSON Web Token (JWT). Users can create an account and log in to access the application's features.
To register a new user account, click on the "Sign Up" button on the login page and follow the instructions.
To log in to an existing account, enter your email and password in the login form.

Technologies used in the project:
- <b>Frontend:</b> <br>
  [![](https://skills.thijs.gg/icons?i=react,bootstrap,&theme=dark)](https://skills.thijs.gg)
- <b>Backend:</b> <br>
  [![](https://skills.thijs.gg/icons?i=spring,mongo,&theme=dark)](https://skills.thijs.gg)

To get started with WalletApp follow these steps:
1. Clone the repository:

      git clone https://github.com/grzegorzsz24/spring-react-wallet-app.git

2. Set up the backend:
- In application.yml file change database properties according to yours
- Run the project ( by building pom.xml file or right click and run main class WalletAppApplication.java)

3. Set up frontend:
- Open terminal
- Navigate to the folder you clone repository
- Navigate to the frontend driectory:
- Install dependencies:

      npm install

- Start frontend development server:

      npm start
5. Access the application by opening your browser and visiting:

       htttp://localhost:3000