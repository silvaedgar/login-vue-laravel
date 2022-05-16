//  Controlador Laravel que realiza el login de los usuarios
public function login(Request $request) {
        $user = Auth::attempt(['email' => $request->email, 'password' => $request->password]);
        if ($user) {
            $user_rol =  Role::select('roles.name')->join('model_has_roles','roles.id','model_has_roles.role_id')
                ->where('model_has_roles.model_id',Auth::user()->id)->get();
           return response()->json([
               "status" => "Ok",
               "message" => "Usuario Logueado",
               "token" => $user,
               "rol" => $user_rol[0]->name  // aqui para guardarlo en el localstorage
           ], 200);

        }
        return response()->json([
            "status" => "Error",
            "message" => "Login Fallido"
        ], 200);
}

//  Controlador Laravel que realiza el registro de los usuarios
public function store(Request $request) {

$request->validate ([
    'name' => 'required|string|max:30',
    'email' => 'required|string|email|unique:users',
    'password' => 'required|string|min:4'
    // en password se puede colocar confirmed y el name del field debe ser password_confirmation o password_confirmed
    ]);
return User::create([
    'name' =>$request->name,
    'email' =>$request->email,
    'password' => bcrypt($request->password),
]);
}

// funcion que retorna los datos del usuario logueado
Route::get('/user', function (Request $request) {
    // return $request->user();
    $user_rol =  Role::select('roles.name')->join('model_has_roles','roles.id','model_has_roles.role_id')
        ->where('model_has_roles.model_id',Auth::user()->id)->get();
    return response()->json([
        "status" => "Ok",
        "data" => $request->user(),
        "rol" => $user_rol[0]->name
    ]);
});

// funcion que realiza el logout del usuario en Laravel
public function logout() {
        Auth::logout();
        return response()->json([
            "status" => "Ok",
            "message" => "Sesion Cerrada"
        ], 200);
}

