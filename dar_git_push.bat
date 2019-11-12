@echo off
git add .
set /P txt_commit=Digite um comentario para esse commit: 
git commit -m "%txt_commit%"
git pull
git push
pause