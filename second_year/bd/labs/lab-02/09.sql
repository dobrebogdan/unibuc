select to_date('01-Jan-' || (extract(year from sysdate) + 1), 'dd-mm-yyyy') - trunc(sysdate) - 1
        as "Zile ramase"
from dual;

select to_date('31-12-' || extract(year from sysdate), 'dd-mm-yyyy') - trunc(sysdate)
        as "Zile ramase"
from dual;
