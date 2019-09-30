del /q fotos\* >nul
for /d %%x in (fotos\*) do @rd /s /q "%%x" >nul
Xcopy /E /I bkp\fotos fotos >nul