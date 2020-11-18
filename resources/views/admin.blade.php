<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{ config('app.name') }} 后台管理</title>

  <link rel="stylesheet" href="{{  mix_tailwind('css/app.css') }}">
</head>
<body class="bg-gray-100 antialiased text-gray-700 font-sans text-sm">
<div id="app">
  <router-view></router-view>
</div>

<script>
  window.config = @json($config);
</script>
<script src="{{ mix('js/admin.js') }}"></script>
</body>
</html>
