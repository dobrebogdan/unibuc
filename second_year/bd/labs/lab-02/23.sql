select e.employee_id as "Ang#",
       e.last_name "Angajat",
       m.employee_id as "Mgr#",
       m.last_name "Manager"
from employees e,
     employees m
where e.manager_id = m.employee_id (+);
