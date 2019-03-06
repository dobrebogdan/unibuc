select e.last_name as "Angajat",
       e.hire_date as "Data_ang",
       manager.last_name as "Manager",
       manager.hire_date as "Date_mgr"
from employees e, employees manager
where e.manager_id = manager.employee_id
  and e.hire_date < manager.hire_date;
