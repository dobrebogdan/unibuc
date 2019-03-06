select last_name,
       job_id,
       salary,
       case job_id
         when 'IT_PROG' then salary + (20 / 100) * salary
         when 'SA_REP' then salary + (25 / 100) * salary
         when 'SA_MAN' then salary + (35 / 100) * salary
         else salary
       end as "Salariu renegociat"
from employees;
