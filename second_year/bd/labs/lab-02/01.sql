select concat(concat(first_name, ' '), last_name)
         || ' castiga '
         || salary
         || ' lunar, dar doreste '
         || (3 * salary)
          as "Salariu ideal"
from employees;
