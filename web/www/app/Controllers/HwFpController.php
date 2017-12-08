<?php

namespace App\Controllers;

use App\Models;
use Klein\Exceptions\ValidationException;
use Hashids\Hashids;

class HwFpController extends Controller
{
    public function index($token)
    {
        $this->service->render('../app/Views/thanks.phtml', ['token' => $token]);
        return $this->response->code(200)->send();
    }

    public function create()
    {
        // allow json request only
        if ($this->request->headers()['Content-Type'] !== 'application/json') {
            return $this->response->code(400)->json(['error' => 'Bad Request']);
        }

        $input = json_decode($this->request->body());
        try {
            $this->service->validate($input->userAgent)->notNull();
            $this->service->validate($input->math)->notNull();
            $this->service->validate($input->worker)->notNull();
            $this->service->validate($input->aes)->notNull();
            $this->service->validate($input->endian)->notNull();
            $this->service->validate($input->memory)->notNull();
            $this->service->validate($input->gpu)->notNull();
            $this->service->validate($input->gpgpu)->notNull();
            $this->service->validate($input->version)->notNull();
            $this->service->validate($input->token)->notNull();
        } catch (ValidationException $e) {
            return $this->response->code(400)->json(['error' => 'Bad Request']);
        }

        $hashids = new Hashids($ENV['SALT']);
        $hwInfoHash = $hashids->decode($input->token);
        if (!$hwInfoHash) {
            return $this->response->code(400)->json(['error' => 'Bad Request']);
        }

        $hwInfo = Models\HwInfo::find($hwInfoHash[0]);
        if (!$hwInfo && $hwInfoHash[1] !== strtotime($hwInfo->created_at)) {
            return $this->response->code(400)->json(['error' => 'Bad Request']);
        }

        $hwFp = Models\HwFp::where('hwInfoId', $hwInfo->id)[0];
        if (!is_null($hwFp)) {
            return $this->response->code(400)->json(['error' => 'Bad Request']);
        }

        $hwFp = Models\HwFp::save([
            'userAgent' => $input->userAgent,
            'math' => json_encode((array)$input->math),
            'worker' => json_encode($input->worker),
            'aes' => $input->aes,
            'endian' => $input->endian,
            'memory' => json_encode($input->memory),
            'gpu' => json_encode((array)$input->gpu),
            'gpgpu' => json_encode($input->gpgpu),
            'version' => $input->version,
            'hwInfoId' => $hwInfo->id,
        ]);

        return $this->response->code(200)->json([
            'result' => 'success',
            'hwFp' => $hwFp
        ])->send();
    }
}
