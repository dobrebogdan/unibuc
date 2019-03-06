select e.last_name,
       e.job_id,
       j.job_title,
       e.department_id,
       d.department_name
from employees e, departments d, jobs j
where e.department_id = d.department_id (+)
  and e.job_id = j.job_id;
