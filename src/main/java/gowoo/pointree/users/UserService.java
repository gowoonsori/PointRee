package gowoo.pointree.users;

import gowoo.pointree.errors.ConflictException;
import gowoo.pointree.errors.UnauthorizedException;
import gowoo.pointree.security.Jwt;
import gowoo.pointree.security.Role;
import gowoo.pointree.users.login.LoginResult;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.stream.Stream;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final Jwt jwt;

    @Transactional
    public User signUp(User user){
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        if(optionalUser.isPresent()) throw new ConflictException("존재하는 Email입니다.");
        return userRepository.save(user);
    }

    public LoginResult login(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(()-> new UnauthorizedException("사용자가 존재하지 않습니다."));
        if (!passwordEncoder.matches( password, user.getPassword())) throw new UnauthorizedException("비밀번호가 틀렸습니다.");
        String token = jwt.create(new Jwt.Claims(user.getId(), user.getName(),
                                    Stream.of(Role.USER.name()).toArray(String[]::new)));

        return new LoginResult(token, User.Info.createFromUser(user));
    }

    public User getUser(Long id){
        return userRepository.findById(id).orElseThrow(() -> new AccessDeniedException("유효하지 않은 토큰입니다.")); //무슨 에러처리로 할지?
    }

    //paswword수정은 나중에 별도 분리
    @Transactional
    public User update(User user){
        return userRepository.save(user);
    }

    @Transactional
    public void delete(User user){
        userRepository.delete(user);
    }

}
