<?php

namespace App\Console\Commands;

use App\Models\AdminUser;
use Illuminate\Console\Command;

class AdminCreate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create an administrator account';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $username = $this->ask('Please enter a username for login');
        $password = $this->secret('Please enter the password for login');
        $name = $this->ask('Please enter the account nickname for login', 'Administrator');

        AdminUser::create(compact('username', 'name', 'password'));

        $this->info("User [$name] created successfully.");
    }
}
