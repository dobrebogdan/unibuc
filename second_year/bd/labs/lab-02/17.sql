select last_name,
       employees.employee_id,
       departments.department_id
from employees, departments
where employees.department_id = departments.department_id;
