package pl.sekankodev.hoidleusermanagement.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.sekankodev.hoidledata.model.HoidleUser;
import pl.sekankodev.hoidledata.model.Role;
import pl.sekankodev.hoidledata.repositories.IRepositoryCatalog;
import pl.sekankodev.hoidleusermanagement.mapper.IUserMapper;
import pl.sekankodev.hoidleusermanagement.model.AuthenticationResponse;
import pl.sekankodev.hoidleusermanagement.model.HoidleAppUserDetails;
import pl.sekankodev.hoidleusermanagement.model.HoidleUserRequestDTO;
import pl.sekankodev.hoidleusermanagement.model.HoidleUserResponseDTO;
import pl.sekankodev.hoidleusermanagement.user_exceptions.AuthenticationRefusedException;
import pl.sekankodev.hoidleusermanagement.user_exceptions.UserAlreadyRegisteredException;
import pl.sekankodev.hoidleusermanagement.user_exceptions.UserNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements  IUserService, UserDetailsService {
    private final IRepositoryCatalog db;
    private final IUserMapper mapper;
    private final BCryptPasswordEncoder encoder;
    private final AuthenticationManager authManager;
    private final JWTService JWTService;

    @Override
    public Long createUser(HoidleUserRequestDTO requestUser) {

        if (db.getHoidleUserRepository().existsByEmail(requestUser.getEmail())){
            throw new UserAlreadyRegisteredException();
        }

        requestUser.setPassword(encoder.encode(requestUser.getPassword()))
                .setUsername("New User")
                .setRole(Role.USER);
        HoidleUser user = mapper.toEntity(requestUser);
        db.getHoidleUserRepository().save(user);

        return user.getId();
    }

    @Override
    public Long updateUser(HoidleUserRequestDTO requestUser) {
        HoidleUser user = db.getHoidleUserRepository().findByEmail(requestUser.getEmail());

        if (user == null){
            throw new UserNotFoundException();
        }

//        if (!encoder.matches(requestUser.getPassword(), user.getPassword())){
//            throw new AuthenticationRefusedException();
//        }
        requestUser.setPassword(null);
        requestUser.setLongestStreak(Math.max(requestUser.getLongestStreak(), requestUser.getStreak()));
        HoidleUser updatedUser = mapper.toEntity(requestUser, user);
        db.getHoidleUserRepository().save(updatedUser);

        return updatedUser.getId();
    }

    @Override
    public Long deleteUser(HoidleUserRequestDTO requestUser) {

        HoidleUser user = db.getHoidleUserRepository().findByEmail(requestUser.getEmail());

        if (user == null){
            throw new UserNotFoundException();
        }

        if (!encoder.matches(requestUser.getPassword(), user.getPassword())){
            throw new AuthenticationRefusedException();
        }

        db.getHoidleUserRepository().delete(user);

        return user.getId();
    }

    @Override
    public AuthenticationResponse logInUser(HoidleUserRequestDTO requestUser) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(requestUser.getEmail(), requestUser.getPassword())
            );

            HoidleUser user = db.getHoidleUserRepository().findByEmail(requestUser.getEmail());

            return new AuthenticationResponse()
                    .setUser(mapper.toResponseDTO(user))
                    .setToken(JWTService.generateToken(user.getEmail(), user.getRole()));

        } catch (AuthenticationException e) {
            throw new AuthenticationRefusedException();
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        HoidleUser user = db.getHoidleUserRepository().findByEmail(email);

        if (user == null){
            throw new UserNotFoundException();
        }

        return new HoidleAppUserDetails(user);
    }

    @Override
    public List<HoidleUserResponseDTO> getTop5UsersAttempts() {

        List<HoidleUser> users = db.getHoidleUserRepository().findTop5Attempts();

        return users.stream().map(user -> mapper.toResponseDTO(user).setEmail(null)).toList();
    }

    @Override
    public List<HoidleUserResponseDTO> getTop5UsersLongestCurrentStreak() {
        List<HoidleUser> users = db.getHoidleUserRepository().findTop5WithLongestCurrentStreak();
        return users.stream().map(user -> mapper.toResponseDTO(user).setEmail(null)).toList();
    }

}
