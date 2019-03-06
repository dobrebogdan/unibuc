select e.last_name,
       j.job_title,
       d.department_name
from employees e,
     jobs j,
     departments d,
     locations l
where e.department_id = d.department_id
  and e.job_id = j.job_id
  and d.location_id = l.location_id
  and l.city = 'Oxford';
