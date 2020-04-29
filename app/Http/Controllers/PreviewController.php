<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Preview;
use Illuminate\Http\Request;

class PreviewController extends Controller
{

    public function index(Request $request)
    {
        $preview = auth()->user()->preview;

        return view("preview", ["preview" => $preview]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "css" => "nullable|string|max:100000",
            "html" => "nullable|string|max:100000",
            "js" => "nullable|string|max:100000",
        ]);

        auth()->user()->preview()->truncate();

        auth()->user()->preview()->create([
            "css" => $request->css,
            "html" => $request->html,
            "js" => $request->js
        ]);
    }
}
