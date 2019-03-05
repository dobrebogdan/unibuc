-- Varianta cu LIKE
select initcap(first_name) as "Prenume",
       upper(last_name) as "Nume",
       length(first_name) as "Lungime prenume"
from employees
where last_name like 'J%'
  or last_name like 'M%'
  or last_name like '__a%'
order by "Lungime prenume" desc;

-- Varianta cu SUBSTR
select initcap(first_name) as "Prenume",
       upper(last_name) as "Nume",
       length(first_name) as "Lungime prenume"
from employees
where substr(last_name, 1, 1) = 'J'
  or substr(last_name, 1, 1) = 'M'
  or substr(last_name, 3, 1) = 'a'
order by "Lungime prenume" desc;
