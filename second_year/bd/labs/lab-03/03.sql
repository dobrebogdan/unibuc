select e.last_name,
       e.salary,
       j.job_title,
       l.city,
       c.country_name
from employees e
  join employees m on e.manager_id = m.employee_id
  join jobs j on e.job_id = j.job_id
  join departments d on e.department_id = d.department_id
  join locations l using(location_id)
  join countries c using(country_id)
where m.last_name = 'King';
