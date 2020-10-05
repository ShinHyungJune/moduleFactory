<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ModuleCollection;
use App\Http\Resources\ModuleResource;
use App\Module;
use App\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModuleController extends ApiController
{
    public function index(Request $request)
    {
        $take = 30;

        $modules = auth()->user()->modules()->latest()->paginate($take);

        return new ModuleCollection($modules);
    }

    public function store(Request $request)
    {
        $this->validator($request);

        $project = Project::find($request->project_id);

        if(!$project)
            return $this->respondNotFound();

        if(!$project->users->contains(auth()->id()))
            return $this->respondForbidden();

        $module = DB::transaction(function() use($request, $project) {
            $module = auth()->user()->modules()->create([
                "project_id" => $request->project_id,
                "title" => $request->title,
                "body" => $request->body,
                "html" => $request->html,
                "css" => $request->css,
                "js" => $request->js
            ]);

            $projectTags = $project->tags;

            $tags = [];

            foreach($request->tags as $tag) {
                $projectTags->contains("name", $tag) ? $tags[] = $project->tags()->where("name", $tag)->first()->id : $tags[] = $project->tags()->create(["name" => $tag])->id;
            }

            $module->tags()->sync($tags);

            if($request->img)
                $module->addMedia($request->img)->toMediaCollection("images", "s3");

            return $module;
        });

        return $this->respondCreated(ModuleResource::make($module));
    }

    public function update(Request $request, $id)
    {
        $this->validator($request);

        $module = Module::find($id);

        if(!$module)
            return $this->respondNotFound();

        if(!$module->project->users->contains(auth()->id()))
            return $this->respondForbidden();

        $module = DB::transaction(function() use($request, $module) {
            $module->update([
                "project_id" => $request->project_id,
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

    public function show($id)
    {
        $item = Module::find($id);

        if (!$item)
            return $this->respondNotFound();

        if (!$item->project->users->contains(auth()->id()))
            return $this->respondForbidden();

        return $this->respond(ModuleResource::make($item));
    }


    public function destroy(Request $request, $id)
    {
        $module = Module::find($id);

        if(!$module)
            return $this->respondNotFound();

        if(!$module->project->users->contains(auth()->id()))
            return $this->respondForbidden();

        $module->delete();

        return $this->respondDeleted();
    }

    public function validator(Request $request)
    {
        return $request->validate([
            "project_id" => "required|integer",
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
