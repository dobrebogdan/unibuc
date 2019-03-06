select distinct jobs.job_id,
                jobs.job_title
from jobs,
     employees
where employees.department_id = 30;
