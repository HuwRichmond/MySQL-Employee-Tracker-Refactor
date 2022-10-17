// required modules
const inquirer = require('inquirer');
const db = require('./config/querries');
const connection = require('./config/connection');
require('console.table');

// start the app in console
const init = () => {
  inquirer.prompt([
    {
      name: 'inquiry',
      type: 'list',
      message: 'Welcome to Employee Tracker, select from the menu below',
      choices: [
        'View all departments', 
        'View all roles', 
        'View all employees', 
        'View all employees by manager', 
        'Add a department', 
        'Add a role', 
        'Add an employee', 
        'Update employee\'s role', 
        'Update employee\'s manager', 
        'Remove a department', 
        'Remove a role', 
        'Remove an employee', 
        'View total salary of department', 
        'Exit program'
      ]
    }
  ]).then((response) => {
    switch (response.inquiry) {
      case 'View all departments':
          viewAllDepartments();    
          break;
      case 'View all roles':
          viewAllRoles();
          break;
      case 'View all employees':
          viewAllEmployees();
          break;
      case 'View all employees by manager':
          viewAllEmployeesByManager();
      break;
      case 'Add a department':
          addADepartment();
      break;
      case 'Add a role':
          addARole();
      break;
      case 'Add an employee':
          addAnEmployee();
      break;
      case 'Update employee\'s role':
          updateEmployeeRole();
      break;
      case 'Update employee\'s manager':
          updateEmployeesManager();
      break;
      case 'Remove a department':
          removeADepartment();
      break;
      case 'Remove a role':
          removeARole();
      break;
      case 'Remove an employee':
          removeAnEmployee();
      break;
      case 'View total salary of department':
          viewDepartmentSalary();
      break;
      case 'Exit program':
          connection.end();
          console.log('\n Bye \n');
          return;
      default:
          break;
    }
  })
}

// display all departments in the database on the console
const viewAllDepartments = async () => {
  try {
    const departments = await db.getAllDepartments();
    console.table('\n', departments);
    init();
  } catch (err) {
    // state "error" when there is an error
    console.error(err);
  }
};

// display all roles in the database on the console
const viewAllRoles = async () => {
  try {
    const role = await db.getAllRoles();
    console.table('\n', role);
    init();
  } catch (err) {
    // state "error" when there is an error
    console.error(err);
  }
};

// display all employees in the database
const viewAllEmployees = async () => {
  try {
    const employees = await db.getAllEmployees();
    console.table('\n', employees);
    init();
  } catch (err) {
    // state "error" when there is an error
    console.error(err);
  }
};

// display all employees associated with the selected manager
// ask the user to choose a manager and then display associated employees
const viewAllEmployeesByManager = async () => {
  try {
    const managerOptions = await db.getAllManagers();

    const managerChoicesList = managerOptions.map((m) => m.first_name + ' ' + m.last_name);

    const { managerName } = await inquirer.prompt([
      {
      name: 'managerName',
      type: 'list',
      message: 'select manager',
      choices: managerChoicesList   
      },
    ]);
    
    // first name + last name = manager name using the 'hard equals' or === function"
    const { id: managerId } = managerOptions.find((m) => m.first_name + ' ' + m.last_name === managerName);
  
    // show the employees with the selected manager ID
    const employeeList = await db.getEmployeesByManager(managerId);
  
    // log as the team of the selected manager
    console.log(`\n ${managerName}'s team \n`);
  
    console.table(employeeList);
    init();  
  } catch (err) {
    // state "error" when there is an error
    console.error(err);
  }
}

// function to add a department in the database
const addADepartment = async () => {
  try {
    const department_name = await inquirer.prompt([
      {
        name: 'department_name',
        type: 'input',
        message: 'type the new department to add to the database'   
      }
    ]);
    await db.addDepartment(department_name);
    console.log(`\n new department has been added to the database \n`);
    init();
  } catch (err) {
    // state "error" when there is an error
    console.error(err);
  }
};

// function to add a role in the database
const addARole = async () => {
  try {
    const departments = await db.getAllDepartments();
    const departmentsList = departments.map(({ id, department_name }) => ({ 
      name: department_name, 
      value: id 
    }));
  
    const roleToAdd = await inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: 'type the new role to add to the database'   
      },
      {
        name: 'salary',
        type: 'input',
        message: 'specify the salary of the new role'   
      },
      {
        name: 'department_id',
        type: 'list',
        message: 'state the department to add the new role to',
        choices: departmentsList
      },
    ]);
  
    await db.addRole(roleToAdd);
    console.log(`\n the new role has been added to the database \n`);
    init();
  } catch (err) {
    // state "error" when there is an error
    console.error(err);
  }
};

// function to add a new employee in the database
const addAnEmployee = async () => {
  try {
    const rolesOptions = await db.getAllRoles();
    const managerOptions = await db.getAllEmployees();
    
    const employeeToAdd = await inquirer.prompt([
      {
        name: 'first_Name',
        type: 'input',
        message: 'first name of new employee'
      },
      {
        name: 'last_Name',
        type: 'input',
        message: 'surname of new employee'
      },
    ]);
  
    const roleChoicesList = rolesOptions.map(({ id, title }) => ({ name: title, value: id }));
    const {role_Id} = await inquirer.prompt(
      {
        name: 'role_Id',
        type: 'list',
        message: 'role of new employee',
        choices: roleChoicesList
      }
    );
  
    employeeToAdd.role_id = role_Id;
  
    const managerChoicesList = managerOptions.map(({ first_name, last_name, id }) => ({ name: first_name + ' ' + last_name, value: id }));
    if (managerChoicesList && managerChoicesList.length > 0)
    {
      const {manager_Id} = await inquirer.prompt(
        {
          name: 'manager_Id',
          type: 'list',
          message: 'manager of new employee',
          choices: managerChoicesList.length === 0 ? ['none'] : [...managerChoicesList, 'none'],
        }
      );
      if (manager_Id === 'none') {
        employeeToAdd.manager_id = null;
      } else {
        employeeToAdd.manager_id = manager_Id;
      }  
    }
    await db.addEmployee(employeeToAdd);
    console.log('\n', employeeToAdd, 'was added as new employee \n')
    init();
  } catch (err) {
    console.error(err);
  }
};
// modify employee role
const updateEmployeeRole = async () => {
  try {
    const employeeOptions = await db.getAllEmployees();

    const rolesOptions = await db.getAllRoles();
  
    const employeeOptionsToChooseFrom = employeeOptions.map(({ id, first_name, last_name }) => ({
      name: first_name + ' ' + last_name,
      value: id,
    }));
  
    const rolesOptionsToChooseFrom = rolesOptions.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
  
    const { employeeId } = await inquirer.prompt([
  
      {
        name: 'employeeId',
        type: 'list',
        message: 'select employee to update role',
        choices: employeeOptionsToChooseFrom
      },
    ]);
  
    const { roleId } = await inquirer.prompt([
      {
        name: 'roleId',
        type: 'list',
        message: 'select employee new role',
        choices: rolesOptionsToChooseFrom
      },
    ]);
  
    await db.updateEmployeeRole(employeeId, roleId);
    console.log(`\n employee role has been updated \n`);
    init();
  } catch (err) {
    console.error(err);
  }
};

// change the manager associated with an employee
const updateEmployeesManager = async () => {
  try {
    const employeeOptions = await db.getAllEmployees();

    const employeeChoicesList = employeeOptions.map(({ id, first_name, last_name }) => ({
      name: first_name + ' ' + last_name,
      value: id,
    }));
  
    const { employeeId } = await inquirer.prompt([
      {
        name: 'employeeId',
        type: 'list',
        message: 'select the employee to change their manager',
        choices: employeeChoicesList
      },
    ]);
  
    // map manager names
    const managerChoicesList = employeeOptions.map(({ id, first_name, last_name }) => ({
      name: first_name + ' ' + last_name,
      value: id,
    }));
  
    const { managerId } = await inquirer.prompt([
      {
        name: 'managerId',
        type: 'list',
        message: 'select the new manager',
        choices: managerChoicesList
      },
    ]);
  
    //assign a new manager to an employee
    await db.updateEmployeeManager(managerId, employeeId);
    
    console.log(`\n employee manager updated \n`);
    init();
  } catch (err) {
    console.error(err);
  }
};

// delete a department
const removeADepartment = async () => {
  try {
    const departmentOptions = await db.getAllDepartments();

    const departmentOptionsToChooseFrom = departmentOptions.map(e => ({name: e.department_name, value: e.id }));
  
    const { departmentId } = await inquirer.prompt([
      {
        name: 'departmentId',
        type: 'list',
        message: 'select a department to delete',
        choices: departmentOptionsToChooseFrom
      },
    ]);
  
    db.removeDepartment(departmentId);
    console.log(`\n Department was removed from database \n`);
    init();
  } catch (err) {
    console.error(err);
  }  
};

// delete a role
const removeARole = async () => {
  try {
    const rolesOptions = await db.getAllRoles();

    const roleChoicesList = rolesOptions.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
  
    const id = await inquirer.prompt([
      {
        name: 'id',
        type: 'rawlist',
        message: 'select role to delete',
        choices: roleChoicesList
      },
    ]);
  
    await db.removeRole(id);
    console.log(`\n Role was deleted from database \n`);
    init();
  } catch (err) {
    console.error(err);
  }
};

// delete an employee
const removeAnEmployee = async () => {
  try {
    const employeeOptions = await db.getAllEmployees();

    const employeeChoicesList = employeeOptions.map(({ id, first_name, last_name }) => ({
      name: first_name + ' ' + last_name,
      value: id,
    }));
  
    const id =  await inquirer.prompt([
      {
          name: 'id',
          type: 'list',
          message: 'select employee to delete',
          choices: employeeChoicesList
      },
    ]);
    await db.removeEmployee(id);
    console.log('\n', id, 'was removed from database \n');
    init();
  } catch (err) {
    console.error(err);
  }
};

// display total salary of all members of a department
const viewDepartmentSalary = async () => {
  try {
    const departmentOptions = await db.getAllDepartments();

    const departmentsList = departmentOptions.map(department => ({name: department.department_name, value: department.id }));
  
    const { departmentName } = await inquirer.prompt([
      {
        name: 'departmentName',
        type: 'list',
        message: 'select department to display total salary of that department',
        choices: departmentsList
      },
    ]);
    const budget = await db.getDepartmentSalary(departmentName);
    console.log(`\n total of selected department is: \n`);
    console.table(budget);
    init();
  } catch (err) {
    console.error(err);
  }
};

init();
