# MySQL Employee Tracker Refactor

## Description

The application is a database for companies or businesses to use as a register of employees. The application allows users to enter employee details and them store the details in the database or use the application to access employee details. The application uses NodeJS, Inquirer and MySQL. The database contains company/employee data for departments, roles and employee details such as line manager and salary. Users can also add, modify and delete data recorded in the database through the console.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Video Recording

[Link to walkthrough video](https://drive.google.com/file/d/1fP7U1wyRgLkOq--SW548SFneHmUduhgH/view?usp=sharing)

## Required Packages

The following packages are required to use the application

    * MySQL

    * Inquirer

    * NPM console table package

## Use

```md
Create .env file using the example template
Source the schema.sql in MySQL
Run npm i && npm start in terminal to run application
```

## License 
   
   None

## Github Repository
 [github.com/HuwRichmond/MySQL-Employee-Tracker-Refactor](https://github.com/HuwRichmond/MySQL-Employee-Tracker-Refactor)

## Contact

Created by Huw Richmond

[Github.com/HuwRichmond](https://github.com/HuwRichmond)


