select last_name,
       hire_date,
       to_char(hire_date, 'Day') as "Zi"
from employees
order by to_char(hire_date, 'D');
