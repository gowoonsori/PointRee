package gowoo.pointree.users;

import gowoo.pointree.errors.UnauthorizedException;
import gowoo.pointree.security.JwtAuthentication;
import gowoo.pointree.security.JwtAuthenticationToken;
import gowoo.pointree.users.login.LoginRequest;
import gowoo.pointree.users.login.LoginResult;
import gowoo.pointree.users.signup.SignUpRequest;
import gowoo.pointree.utils.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static gowoo.pointree.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/users", produces = "application/json; charset=UTF-8")
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ApiResult<User.Info> signUp(@Valid @RequestBody SignUpRequest signUpRequest){
        return success(User.Info.createFromUser(userService.signUp(signUpRequest)));
    }

    @PostMapping("/login")
    public ApiResult<LoginResult> login(@Valid @RequestBody LoginRequest request) throws UnauthorizedException {
        return success(userService.login(request.getEmail(),request.getPassword()));
    }

    @GetMapping("/me")
    public ApiResult<User.Info> getMyInfo(@AuthenticationPrincipal JwtAuthentication authentication){
        return success(User.Info.createFromUser(userService.getUser(authentication.id)));
    }

    @PatchMapping("/me")
    public ApiResult<User.Info> updateMyInfo(@Valid @RequestBody UpdateInfoRequest updateInfoRequest,
                                             JwtAuthenticationToken authentication){
        User user = (User)authentication.getDetails();
        return success(User.Info.createFromUser(userService.update(user,updateInfoRequest)) );
    }
}
