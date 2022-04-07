<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailVerification extends Mailable
{
    use Queueable, SerializesModels;

    protected $code;

    public $subject = 'Ваш код подтверждения для wing-ding';

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($code)
    {
        $this->code = $code;
    }

    /**
     * Build the message.
     *
     * @return $this
     */

    public function subject($subject)
    {
        return parent::subject($subject);
    }

    public function build()
    {
        return $this->view('mail.verification')->with([
            'code' => $this->code
        ]);
    }
}
