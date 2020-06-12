<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ModuleCollection;
use App\Http\Resources\ModuleResource;
use App\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModuleController extends ApiController
{
    public function index(Request $request)
    {
        $take = 20;

        $modules = auth()->user()->modules()->latest()->paginate($take);

        return new ModuleCollection($modules);
    }

    public function store(Request $request)
    {
        $this->validator($request);

        $module = DB::transaction(function() use($request) {
            $module = auth()->user()->modules()->create([
                "title" => $request->title,
                "body" => $request->body,
                "html" => $request->html,
                "css" => $request->css,
                "js" => $request->js
            ]);

            $module->tags()->sync($request->tags);

            $module->addMedia($request->img)->toMediaCollection("images", "s3");

            return $module;
        });

        return $this->respond(ModuleResource::make($module));
    }

    public function update(Request $request, $id)
    {
        $this->validator($request);

        $module = Module::find($id);

        if(!$module)
            return $this->respondNotFound();

        if($module->user->id != auth()->id())
            return $this->respondForbidden();

        $module = DB::transaction(function() use($request, $module) {
            $module->update([
                "title" => $request->title,
                "body" => $request->body,
                "html" => $request->html,
                "css" => $request->css,
                "js" => $request->js
            ]);

            if($request->tags)
                $module->tags()->sync($request->tags);

            if($request->img)
               $module->addMedia($request->img)->toMediaCollection("images", "s3");

            return $module;
        });

        return $this->respondUpdated(ModuleResource::make($module));
    }

    public function delete(Request $request, $id)
    {
        $module = Module::find($id);

        if(!$module)
            return $this->respondNotFound();

        if($module->user->id != auth()->id())
            return $this->respondForbidden();

        $module->delete();

        return $this->respondDeleted();
    }

    public function validator(Request $request)
    {
        return $request->validate([
            "img" => "nullable|image",
            "title" => "required|string|max:500",
            "body" => "required|string|max:5000",
            "html" => "nullable|string|max:20000",
            "css" => "nullable|string|max:20000",
            "js" => "nullable|string|max:20000",
            "tags" => "nullable|array|max:5000"
        ]);
    }
}
