<?php

namespace App\Http\Middleware;

use RuntimeException;
use Illuminate\Routing\Middleware\ThrottleRequests as BaseThrottleRequests;

class ThrottleRequests extends BaseThrottleRequests
{
    protected function resolveRequestSignature($request)
    {
        $route = $request->route();
        if ($user = $request->user()) {
            return sha1($user->getAuthIdentifier().'|'.$route->getName());
        }

        if ($route) {
            return sha1($route->getDomain().'|'.$request->ip().'|'.$route->getName());
        }

        throw new RuntimeException('Unable to generate the request signature. Route unavailable.');
    }
}
