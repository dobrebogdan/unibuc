select first_name || ' ' || last_name as "Angajat",
       salary as "Salariu lunar"
from employees
where department_id in (10, 30, 50)
  and salary >= 1500;
