<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PREVIEW</title>
    <style>
        {!! $preview ? $preview["css"] : "" !!}
    </style>
</head>
<body>
    {!! $preview ? $preview["html"] : "" !!}

    <script>
        {!! $preview ? $preview["js"] : "" !!}
    </script>
</body>
</html>
