<?php

namespace App\Controllers;

use App\Models;
use Klein\Exceptions\ValidationException;
use Hashids\Hashids;

class HwInfoController extends Controller
{
    public function create()
    {
        // allow json request only
        if ($this->request->headers()['Content-Type'] !== 'application/json') {
            return $this->response->code(400)->json(['error' => 'Bad Request']);
        }

        $input = json_decode($this->request->body());
        try {
            $this->service->validate($input->name)->notNull();
            $this->service->validate($input->smbios)->notNull();
            $this->service->validate($input->version)->notNull();
        } catch (ValidationException $e) {
            return $this->response->code(400)->json(['error' => 'Bad Request']);
        }

        $hwInfo = Models\HwInfo::save([
            'name' => $input->name,
            'smbios' => $input->smbios,
            'version' => $input->version,
        ]);

        $hashids = new Hashids($ENV['SALT']);

        return $this->response->code(200)->json([
            'result' => 'success',
            'token' => $hashids->encode($hwInfo->id, strtotime($hwInfo->created_at)),
        ])->send();
    }
}
