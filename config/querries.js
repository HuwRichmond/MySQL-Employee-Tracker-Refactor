
const { query } = require("./connection");

const db = require("./connection");
class dbQuerry {
  constructor(db) {
    this.db = db;
  }
  //show or "get" the entries under "employees"
  getAllEmployees() {
    return this.db.query(`
    SELECT e.id, e.first_name, e.last_name, role.title, department.department_name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager
    FROM employee m 
    RIGHT JOIN employee e 
    ON e.manager_id = m.id 
    JOIN role ON e.role_id = role.id 
    JOIN department 
    ON department.id = role.department_id 
    ORDER BY e.id ASC;`);
  }

  //show or "get" the entries under "managers"
  getAllManagers(){
    return this.db.query(`
    SELECT e.id, e.first_name, e.last_name, title, department_name AS department, salary, CONCAT(m.first_name, ' ',m.last_name) manager 
    FROM employee e 
    INNER JOIN role r 
    ON e.role_id = r.id 
    INNER JOIN department d 
    ON r.department_id = d.id 
    LEFT JOIN employee m 
    ON e.manager_id = m.id 
    WHERE e.id IN (SELECT e.manager_id FROM employee e LEFT JOIN employee m ON e.manager_id = m.id)
    ORDER BY e.id;`);
  }
  // this shows all employees linked to the selected manager
  getEmployeesByManager(managerID){
    return this.db.query(`
    SELECT e.id, e.first_name, e.last_name, title 
    FROM employee e 
    INNER JOIN role r 
    ON e.role_id = r.id 
    INNER JOIN department d
    ON r.department_id = d.id
    LEFT JOIN employee m
    ON e.manager_id = m.id
    WHERE e.manager_id = ?;`, managerID);
  }

  //select by role
  getAllRoles() {
    return this.db.query(`
    SELECT r.id, r.title, d.department_name AS department, r.salary
    FROM role r
    INNER JOIN department d
	ON r.department_id = d.id
	ORDER BY r.id;`);
  }

  //select by department
  getAllDepartments() {
    return this.db.query(`SELECT * FROM department ORDER BY id ASC;`);
  }

  // display total salary of selected department
  getDepartmentSalary(departmentId) {
    return this.db.query(`
    SELECT d.department_name AS 'department', SUM(salary) AS 'total utilized budget'            
	FROM employee e
	INNER JOIN role r
	ON e.role_id = r.id
	INNER JOIN department d
	ON r.department_id = d.id
	WHERE r.department_id = ?;`, departmentId);
  }	
  
  // add an employee to the database
  addEmployee(employee) {
    return this.db.query("INSERT INTO employee SET ?", employee);
  }

  // add a department to the database
  addDepartment(department) {
    return this.db.query("INSERT INTO department SET ?", department);
  }

  // add a new role to the database
  addRole(newRole) {
    return this.db.query("INSERT INTO role SET ?", newRole);
  }

  // modify or update details for an employee
  updateEmployee() {
    return this.db.query(`
    UPDATE employee 
    SET role_id = role_id 
    WHERE first_name = name;`);
  }

  // update or assign a new manager to an employee
  updateEmployeeManager(manager_id, employee_id) {
    return this.db.query(`UPDATE employee SET manager_id = ? WHERE id = ?`, [manager_id, employee_id]);
  }

  // update or modify an employee's role
  updateEmployeeRole(employeeId, newRoleId) {
    console.log("inside query");
    return this.db.query("UPDATE employee SET role_id = ? WHERE id = ?", [newRoleId, employeeId]);
  }

  // remove or delete an employee from the database
  removeEmployee(id) {
    return this.db.query("DELETE FROM employee WHERE ?", id);
  }

  // remove or delete a role from the database
  removeRole(id) {
    return this.db.query("DELETE FROM role WHERE ?", id);
  }

  // remove or delete a department from the database
  removeDepartment(id) {
    return this.db.query("DELETE FROM department WHERE id = ?", id);
  }
}

module.exports = new dbQuerry(db);