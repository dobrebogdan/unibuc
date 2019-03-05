select first_name || ' ' || last_name as "Nume",
       job_id,
       hire_date
from employees
where hire_date between '20-FEB-1987' and '1-MAY-1989'
order by hire_date;
