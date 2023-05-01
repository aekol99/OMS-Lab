<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
    </head>
    <body class="antialiased">
        <form action="/api/task/newTask" method="POST">
            @csrf
            <input type="text" name="name" placeholder="name"><br>
            <input type="text" name="userid" placeholder="userid"><br>
            <input type="text" name="projectid" placeholder="projectid"><br>
            <input type="text" name="boardid" placeholder="boardid"><br>
            <input type="text" name="status" placeholder="status"><br>
            <input type="text" name="order" placeholder="order"><br>
            <input type="submit" value="submit">
        </form>
        <br>
        Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{ PHP_VERSION }})
    </body>
</html>
