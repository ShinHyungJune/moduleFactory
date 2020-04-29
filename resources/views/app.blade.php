<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{config("app.name")}}</title>

    <link rel="stylesheet" href="/css/default.css?{{\Illuminate\Support\Carbon::now()}}">
    <link rel="stylesheet" href="/css/animate.css?{{\Illuminate\Support\Carbon::now()}}">
    <link rel="stylesheet" href="/css/common.css?{{\Illuminate\Support\Carbon::now()}}">
    <link rel="stylesheet" href="/css/style.css?{{\Illuminate\Support\Carbon::now()}}">
</head>
<body>
<div id="app">

</div>
<script src="{{mix('/js/app.js')}}"></script>
</body>
</html>
