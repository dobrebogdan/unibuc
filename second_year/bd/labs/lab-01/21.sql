select first_name || ' ' || last_name as "Nume",
       salary,
       commission_pct
from employees
order by salary desc, commission_pct desc;
