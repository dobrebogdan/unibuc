-- varianta 1
select first_name || ' ' || last_name as "Nume",
       hire_date
from employees
where hire_date like '%87%';

-- varianta 2
select first_name || ' ' || last_name as "Nume",
       hire_date
from employees
where to_char(hire_date, 'YYYY') = 1987;

-- varianta 3
select first_name || ' ' || last_name as "Nume",
       hire_date
from employees
where extract(year from hire_date) = 1987;
