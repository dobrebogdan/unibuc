select first_name || ' ' || last_name as "Nume",
       salary,
       commission_pct
from employees
where commission_pct is not null
order by salary desc, commission_pct desc;
