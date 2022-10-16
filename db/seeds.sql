INSERT INTO department (department_name)
VALUES ("Admin"),
       ("Psyc Services"),
       ("Support Services"),
       ("Social Work Service Delivery"),
       ("Innovation and Development");

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Project Officer", 90000, 5),
       ('Business Support Officer', 70000, 2),
       ('Senior Business Support Officer', 80000, 2),
       ('Clinical Practice Lead', 120000, 3),
       ('Social Worker', 75000, 4),
       ('Senior Social Worker', 95000, 4),
       ('Supervisor', 110000, 4),
       ('Project Officer', 80000, 5),
       ('Project Lead', 130000, 5),
       ('Managing Director', 200000, 5),
       ('Executive Director', 300000, 5),
       ('Regional Manager', 150000, 5),
       ('Chief Financial Officer', 250000, 2),
       ("HR Manager", 120000, 2),
       ("Business Analyst", 75000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Angus', 'PATTON', 12, NULL),
       ('Rosie', 'YOUNG', 13, 1),
       ('Toby', 'WILLS', 14, 1),
       ('Bubbles', 'YEATES', 3, 2),
       ('Holly', 'THOMPSON', 9, 2),
       ('Sean', 'PERCY', 11, 2),
       ('Dean', 'LORENZ', 6, 2),
       ('Heidi', 'JONES', 1, 4),
       ('Courtney', 'BARKER', 1, 4),
       ('Emma', 'IRVING', 2, 4),
       ('Cameron', 'MCDONALD', 4, 7),
       ('Brett', 'LANE', 5, 7),
       ('Frank', 'BEDDISON', 5, 7),
       ('Harold', 'HOLT', 7, 5),
       ('Jackie', 'LAMBI', 8, 5),
       ('Geoff', 'GOLDSMITH', 10, 6),
       ('Will', 'HOLLINGSWORTH', 10, 6);