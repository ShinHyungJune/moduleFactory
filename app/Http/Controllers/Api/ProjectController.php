<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ModuleCollection;
use App\Http\Resources\ModuleResource;
use App\Http\Resources\ProjectCollection;
use App\Http\Resources\ProjectResource;
use App\Module;
use App\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends ApiController
{
    public function index(Request $request)
    {
        $take = 30;

        $items = auth()->user()->projects()->latest()->paginate($take);

        return new ProjectCollection($items);
    }

    public function store(Request $request)
    {
        $this->validator($request);

        $item = DB::transaction(function () use ($request) {
            $item = auth()->user()->projects()->create([
                "title" => $request->title,
                "body" => $request->body,
                "css" => $request->css,
                "js" => $request->js
            ]);

            if($request->img)
                $item->addMedia($request->img)->toMediaCollection("img", "s3");

            return $item;
        });

        return $this->respondCreated(ProjectResource::make($item));
    }

    public function update(Request $request, $id)
    {
        $this->validator($request);

        $item = Project::find($id);

        if (!$item)
            return $this->respondNotFound();

        if (!$item->users->contains(auth()->id()))
            return $this->respondForbidden();

        $item = DB::transaction(function () use ($request, $item) {
            $item->update([
                "title" => $request->title,
                "body" => $request->body,
                "css" => $request->css,
                "js" => $request->js
            ]);

            if ($request->img)
                $item->addMedia($request->img)->toMediaCollection("img", "s3");

            return $item;
        });

        return $this->respondUpdated(ProjectResource::make($item));
    }

    public function show($id)
    {
        $item = Project::find($id);

        if (!$item)
            return $this->respondNotFound();

        if (!$item->users->contains(auth()->id()))
            return $this->respondForbidden();

        return $this->respond(ProjectResource::make($item));
    }

    public function destroy(Request $request, $id)
    {
        $item = Project::find($id);

        if (!$item)
            return $this->respondNotFound();

        if (!$item->users->contains(auth()->id()))
            return $this->respondForbidden();

        $item->delete();

        return $this->respondDeleted();
    }

    public function validator(Request $request)
    {
        return $request->validate([
            "img" => "nullable|image",
            "title" => "required|string|max:500",
            "body" => "required|string|max:5000",
            "css" => "nullable|string|max:20000",
            "js" => "nullable|string|max:20000",
        ]);
    }
}
