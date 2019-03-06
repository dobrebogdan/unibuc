select first_name,
       last_name,
       hire_date
from employees
where mod(round(sysdate - hire_date), 7) = 0;
