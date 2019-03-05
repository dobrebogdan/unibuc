select first_name || ' ' || last_name as "Nume",
       employee_id
from employees
where department_id in (10, 30, 50)
order by "Nume";
