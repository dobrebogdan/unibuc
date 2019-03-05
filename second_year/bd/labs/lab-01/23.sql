select first_name || ' ' || last_name as "Nume"
from employees
where first_name || ' ' || last_name like '%l%l%'
  and (department_id = 30
    or manager_id = 102);
