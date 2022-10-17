INSERT INTO department (department_name)
VALUES  ('Admin'),
        ('Psyc Services'), 
        ('Support Services'), 
        ('Social Work Service Delivery'), 
        ('Innovation and Reform');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Business Support Officer', 65000, 1), 
        ('Social Worker', 90000, 4), 
        ('Project Officer', 80000, 5), 
        ('Project Lead', 120000, 5), 
        ('Clinical Practice Lead', 110000, 3),
        ('Senior Psychologist', 120000, 2), 
        ('Psychologist', 95000, 2), 
        ('Business Manager', 100000, 1), 
        ('Case Support Worker', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Angus', 'PATTON', 6, null), 
        ('Rosie', 'YOUNG', 4, null), 
        ('Toby', 'WILLS', 5, null), 
        ('Bubbles', 'SMITH', 8, null), 
        ('Carol', 'SHELBY', 9, 2), 
        ('Sean', 'PERCY', 1, 3),
        ('Scott', 'LUCAS', 3, 1),
        ('Loc', 'NGUYEN', 3, 1),
        ('Heidi', 'JONES', 9, 2),
        ('Courtney', 'BARKER', 1, 3),
        ('Emma', 'IRVING', 3, 1),
        ('Cameron', 'MCDONALD', 9, 2),
        ('Brett', 'LANE', 9, 2),
        ('Frank', 'BEDDISON', 1, 3),
        ('Harold', 'HOLT', 3, 1),
        ('Jackie', 'LAMBI', 9, 2),
        ('Geoff', 'GOLDSMITH', 1, 3),
        ('Will', 'HOLLINGSWORTH', 1, 3);