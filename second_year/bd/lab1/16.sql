-- format default
select sysdate as "Default",
       to_char(sysdate, 'DD/MM/YYYY') as "Format EURO",
       to_char(sysdate, 'DD/MM/YY') as "Format EURO (an pe 2 cifre)",
       to_char(sysdate, 'MM/DD/YYYY') as "Format US",
       to_char(sysdate, 'MM/DD/YY') as "Format US (an pe 2 cifre)"
from dual;
