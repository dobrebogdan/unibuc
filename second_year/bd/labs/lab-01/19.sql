select first_name || ' ' || last_name as "Nume",
       job_id
from employees
where manager_id is null;
