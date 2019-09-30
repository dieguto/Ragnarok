DEL /F/Q package-lock.json >nul 2>&1
del /q node_modules\* >nul 2>&1
for /d %%x in (node_modules\*) do @rd /s /q "%%x" >nul 2>&1