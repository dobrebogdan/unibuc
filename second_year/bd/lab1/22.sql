select first_name || ' ' || last_name as "Nume"
from employees
where last_name like '__a%' or first_name like '__a%';
