select last_name,
       salary,
       commission_pct * salary as "Comision"
from employees
where salary + nvl(commission_pct, 0) * salary > 10000;
