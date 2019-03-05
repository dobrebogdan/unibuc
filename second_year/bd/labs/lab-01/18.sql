select first_name,
       last_name,
       hire_date
from employees
where extract(day from hire_date) = extract(day from sysdate);
