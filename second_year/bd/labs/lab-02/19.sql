select employees.last_name,
       departments.department_name,
       locations.city
from employees,
     departments,
     locations
where employees.department_id = departments.department_id
  and departments.location_id = locations.location_id;
