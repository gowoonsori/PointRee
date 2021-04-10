package gowoo.pointree.users;

import gowoo.pointree.errors.UnauthorizedException;
import gowoo.pointree.security.Jwt;
import gowoo.pointree.security.Role;
import gowoo.pointree.users.login.LoginResult;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Jwt jwt;

    public User insert(User user){
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public Optional<User> findById(Long userId){
        return userRepository.findById(userId);
    }

    @Transactional(readOnly = true)
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional(readOnly = true)
    public LoginResult login(String email, String password) {
        User user = findByEmail(email).orElseThrow(()-> new UnauthorizedException("사용자가 존재하지 않습니다."));
        if (!passwordEncoder.matches( password, user.getPassword())) throw new UnauthorizedException("Bad credential");
        String token = jwt.create(new Jwt.Claims(user.getId(), user.getName(),
                            Stream.of(Role.USER.name()).toArray(String[]::new)));

        return new LoginResult(token, User.Info.of(user));
    }


}
