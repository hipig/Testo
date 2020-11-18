<?php

use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;

/**
 * 返回 Tailwind CSS 版本化 MIX 文件 的路径
 * @param $path
 * @param string $manifestDirectory
 * @return HtmlString|string
 * @throws Exception
 * @author zhujiapeng
 * @date 2020/11/18
 */
function mix_tailwind($path, $manifestDirectory = '')
{
    static $manifests = [];

    if (! Str::startsWith($path, '/')) {
        $path = "/{$path}";
    }

    if ($manifestDirectory && ! Str::startsWith($manifestDirectory, '/')) {
        $manifestDirectory = "/{$manifestDirectory}";
    }

    if (file_exists(public_path($manifestDirectory.'/hot'))) {
        $url = rtrim(file_get_contents(public_path($manifestDirectory.'/hot')));

        if (Str::startsWith($url, ['http://', 'https://'])) {
            return new HtmlString(Str::after($url, ':').$path);
        }

        return new HtmlString("//localhost:8080{$path}");
    }

    $manifestPath = public_path($manifestDirectory.'/tailwind-mix-manifest.json');

    if (! isset($manifests[$manifestPath])) {
        if (! file_exists($manifestPath)) {
            throw new Exception('The Mix manifest does not exist.');
        }

        $manifests[$manifestPath] = json_decode(file_get_contents($manifestPath), true);
    }

    $manifest = $manifests[$manifestPath];

    if (! isset($manifest[$path])) {
        $exception = new Exception("Unable to locate Mix file: {$path}.");

        if (! app('config')->get('app.debug')) {
            report($exception);

            return $path;
        } else {
            throw $exception;
        }
    }

    return new HtmlString(app('config')->get('app.mix_url').$manifestDirectory.$manifest[$path]);
}
