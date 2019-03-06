select d.department_id,
       d.department_name,
       e.last_name,
       j.job_title
from departments d
  join employees e on d.department_id = e.department_id
  join jobs j on e.job_id = j.job_id
where lower(d.department_name) like '%ti%'
order by department_name;
