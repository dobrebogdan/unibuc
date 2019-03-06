-- data de peste 12 ore
select to_char(sysdate + 12 / 24, 'dd/mm/yyyy hh:mi')
from dual;

-- data de peste 5 minute
select to_char(sysdate + 5 / (24 * 60 * 60), 'dd/mm/yyyy hh:mi')
from dual;