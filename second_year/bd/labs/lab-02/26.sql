select e.last_name,
       e.hire_date
from employees e,
     employees gates
where lower(gates.last_name) = 'gates'
  and e.hire_date > gates.hire_date;
