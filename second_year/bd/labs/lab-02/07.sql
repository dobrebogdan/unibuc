select last_name as "Nume angajat",
       rpad(hire_date, 20) as "Data angajarii"
from employees
where commission_pct is not null;