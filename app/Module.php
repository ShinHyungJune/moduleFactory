<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class Module extends Model implements HasMedia
{
    use SoftDeletes, HasMediaTrait;

    protected $fillable = ["title", "body", "html", "css", "js"];

    protected $appends = ["img"];

    public function registerMediaCollections(Media $media = null)
    {
        // 단일 이미지 파일이어야만 할 경우에는 끝에 singleFile() 추가
        $this->addMediaCollection("images")->useDisk("s3")->singleFile();
    }

    public function getImgAttribute()
    {
        if($this->hasMedia('images')) {
            $media = $this->getMedia('images')[0];

            return [
                "name" => $media->file_name,
                "url" => $media->getFullUrl()
            ];
        }

        return null;
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
