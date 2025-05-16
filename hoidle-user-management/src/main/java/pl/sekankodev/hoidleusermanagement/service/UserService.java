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
import pl.sekankodev.hoidledata.repositories.IRepositoryCatalog;
import pl.sekankodev.hoidleusermanagement.mapper.IUserMapper;
import pl.sekankodev.hoidleusermanagement.model.HoidleAppUserDetails;
import pl.sekankodev.hoidleusermanagement.model.HoidleUserRequestDTO;
import pl.sekankodev.hoidleusermanagement.model.HoidleUserResponseDTO;
import pl.sekankodev.hoidleusermanagement.user_exceptions.UserAlreadyRegisteredException;

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

        requestUser.setPassword(encoder.encode(requestUser.getPassword()));

        HoidleUser user = mapper.toEntity(requestUser);
        db.getHoidleUserRepository().save(user);

        return user.getId();
    }

    @Override
    public Long updateUser(HoidleUserRequestDTO requestUser) {
        return 0L;
    }

    @Override
    public Long deleteUser(HoidleUserRequestDTO requestUser) {
        return 0L;
    }

    @Override
    public HoidleUserResponseDTO logInUser(HoidleUserRequestDTO requestUser) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(requestUser.getEmail(), requestUser.getPassword())
            );

            return new HoidleUserResponseDTO().setUsername(JWTService.generateToken(requestUser.getEmail()));
        } catch (AuthenticationException e) {
            return new HoidleUserResponseDTO().setUsername(e.getLocalizedMessage());
        }

    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        HoidleUser user = db.getHoidleUserRepository().findByEmail(email);

        if (user == null){
            throw new UsernameNotFoundException("User with email: " + email + " not found");
        }

        return new HoidleAppUserDetails(user);
    }
}
