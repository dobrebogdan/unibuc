select employee_id, last_name, department_id
from employees
where trim(lower(first_name)) = 'steven';
