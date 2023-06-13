# OMS-Lab
a project management system with laravel and reactjs.

## follow the project setup steps:

### step 1:
if you have xampp or wampp, go to phpmyadmin and create a database "omslab_db" with a user "root" and the password "" (empty password).

### step 2:
extract the "project management tool.rar" archive file.

### step 3:
with cmd, open the folder "backend" located in the folder "project management too" and run the command "php artisan migrate" to create the database tables.
after that in phpmyadmin select th database "omslab_db" go to the table "users" and create a new "admin" user.
finally run the commend "php artisan serve" to run the backend server.

### step 4:
intall Node.js
with cmd, open the folder "frontend" located in the folder "project management tool" and run the command "npm start" to the frontend server.

### step 5:
in your browser, go to "http://localhost:3000"
