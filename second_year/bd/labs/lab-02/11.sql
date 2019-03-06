select last_name
         || ' '
         || first_name as "Nume si prenume",
       hire_date,
       next_day(add_months(hire_date, 6), 'Monday') as "Negociere"
from employees;
