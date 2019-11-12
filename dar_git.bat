@echo off
git pull
git add .
set /P txt_commit=Digite um comentario para esse commit: 
git commit -m "%txt_commit%"
git push
pause