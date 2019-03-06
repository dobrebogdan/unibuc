select e.last_name as "Nume angajat",
       e.department_id,
       co.last_name as "Nume coleg"
from employees e,
     employees co
where e.department_id = co.department_id
  and e.employee_id < co.employee_id;
