<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('pseudo')->after('id')->unique();
            $table->string('firstname')->after('name')->nullable();
            $table->date('birthday')->after('email')->nullable();
            $table->string('avatar')->after('birthday')->nullable();
            $table->unsignedBigInteger('created_by')->after('remember_token')->nullable();
            $table->unsignedBigInteger('updated_by')->after('created_by')->nullable();
            $table->unsignedBigInteger('deleted_by')->after('created_by')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('pseudo');
            $table->dropColumn('firstname');
            $table->dropColumn('birthday');
            $table->dropColumn('avatar');
            $table->dropColumn('created_by');
            $table->dropColumn('updated_by');
            $table->dropColumn('deleted_by');
            $table->dropSoftDeletes();
        });
    }
};
