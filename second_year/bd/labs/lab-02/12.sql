select last_name,
       round(months_between(sysdate, hire_date)) as "Luni lucrate"
from employees
order by "Luni lucrate";
