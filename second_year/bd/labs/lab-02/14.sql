select last_name as "Nume",
       nvl(to_char(commission_pct), 'Fara comision') as "Comision"
from employees;
