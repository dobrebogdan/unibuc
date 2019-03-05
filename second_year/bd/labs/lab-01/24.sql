select last_name, job_id, salary
from employees
where (lower(job_id) like '%clerk%' or lower(job_id) like '%rep%')
      and salary not in (1000, 2000, 3000);
