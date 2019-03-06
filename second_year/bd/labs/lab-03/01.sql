select e1.last_name,
       to_char(e1.hire_date, 'month') as "Luna",
       extract(year from e1.hire_date) as "An"
from employees e1
  join employees e2 on (e1.department_id = e2.department_id)
where lower(e1.last_name) like '%a%'
      and lower(e1.last_name) != 'gates'
      and lower(e2.last_name) = 'gates';

select e1.last_name,
       to_char(e1.hire_date, 'month') as "Luna", extract(year from e1.hire_date) as "An"
from employees e1
  join employees e2 on (e1.department_id = e2.department_id)
where instr(lower(e1.last_name), 'a') != 0
      and lower(e1.last_name) != 'gates'
      and lower(e2.last_name) = 'gates';
