select first_name || ' ' || last_name as "nume",
       salary
from employees
where salary not between 1500 and 2850;
