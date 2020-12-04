<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BankRequest;
use App\Http\Resources\Admin\BankItemResource;
use App\Http\Resources\Admin\BankResource;
use App\Http\Resources\Admin\BankShowResource;
use App\Models\Bank;
use Illuminate\Http\Request;

class BanksController extends Controller
{
    public function index(Request $request)
    {
        $banks = Bank::query()
            ->with('subject', 'children', 'children.subject')
            ->whereNull('parent_id')
            ->latest()
            ->paginate($request->page_size ?? config('api.page_size'));

        return BankResource::collection($banks);
    }

    public function store(BankRequest $request)
    {
        $bank = Bank::create($request->only([
            'title', 'subject_id', 'parent_id', 'type',
            'is_free', 'price', 'is_group', 'time_limit',
            'source', 'remark'
        ]));

        return BankResource::make($bank);
    }

    public function show(Request $request, Bank $bank)
    {
        $bank->load('items');
        return BankShowResource::make($bank);
    }

    public function showItems(Request $request, Bank $bank)
    {
        $query = $bank->is_group ? $bank->groups()->with('items') : $bank->items();
        $bankItems = $query->paginate($request->page_size ?? config('api.page_size'));
        return BankItemResource::collection($bankItems);
    }

    public function update(BankRequest $request, Bank $bank)
    {
        $bank->fill($request->only([
            'title', 'subject_id', 'parent_id', 'type',
            'is_free', 'price', 'is_group', 'time_limit',
            'source', 'remark'
        ]));
        $bank->save();

        return BankResource::make($bank);
    }

    public function destroy($id, Bank $bank)
    {
        $bank->delete();

        return response(null, 204);
    }
}
