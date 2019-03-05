select employee_id,
       last_name,
       salary,
       round(salary * 1.15, 2) as "Salariu nou",
       round(salary * 1.15 / 100, 2) as "Numar sute"
from employees
where mod(salary, 1000) != 0;
