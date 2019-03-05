select employee_id,
       last_name,
       length(last_name),
       instr(lower(last_name), 'a')
from employees
where substr(last_name, -1) = 'e';
