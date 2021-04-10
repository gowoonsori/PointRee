package gowoo.pointree.users;

import gowoo.pointree.errors.ConflictException;
import gowoo.pointree.errors.NotFoundException;
import gowoo.pointree.errors.UnauthorizedException;
import gowoo.pointree.security.JwtAuthentication;
import gowoo.pointree.users.login.LoginRequest;
import gowoo.pointree.users.login.LoginResult;
import gowoo.pointree.users.signup.SignUpRequest;
import gowoo.pointree.utils.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

import static gowoo.pointree.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/users", produces = "application/json; charset=UTF-8")
public class UserController {
    private final UserService userService;
    private final ModelMapper modelMapper;

    @PostMapping("/signup")
    public ApiResult<User.Info> signUp(@Valid @RequestBody SignUpRequest signUpRequest){
        Optional<User> optionalUser = userService.findByEmail(signUpRequest.getEmail());
        if(optionalUser.isPresent()) throw new ConflictException("존재하는 Email입니다.");
        User user = userService.insert(modelMapper.map(signUpRequest, User.class));
        return success(User.Info.of(user));
    }

    @PostMapping("/login")
    public ApiResult<LoginResult> login(@Valid @RequestBody LoginRequest request) throws UnauthorizedException {
        return success(userService.login(request.getEmail(),request.getPassword()));
    }

    @GetMapping("/me")
    public ApiResult<User.Info> getMyInfo(@AuthenticationPrincipal JwtAuthentication authentication){
        return success(userService.findById(authentication.id).map(User.Info::new)
                .orElseThrow(() -> new NotFoundException("해당 사용자를 찾을 수 없습니다.")));
    }

    @PatchMapping("/me")
    public ApiResult<User.Info> updateMyInfo(@Valid @RequestBody UpdateInfoRequest updateInfoRequest,
                                             @AuthenticationPrincipal JwtAuthentication authentication){
        User user = modelMapper.map(updateInfoRequest, User.class);
        user.setId(authentication.id);
        return success(User.Info.of(userService.insert(user)) );
    }
}
