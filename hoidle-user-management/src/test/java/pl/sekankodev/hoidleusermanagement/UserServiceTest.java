package pl.sekankodev.hoidleusermanagement;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import pl.sekankodev.hoidledata.model.HoidleUser;
import pl.sekankodev.hoidledata.repositories.HoidleUserRepository;
import pl.sekankodev.hoidledata.repositories.IRepositoryCatalog;
import pl.sekankodev.hoidleusermanagement.mapper.IUserMapper;
import pl.sekankodev.hoidleusermanagement.mapper.UserMapper;
import pl.sekankodev.hoidleusermanagement.model.request.HoidleUserRequestDTO;
import pl.sekankodev.hoidleusermanagement.service.UserService;
import pl.sekankodev.hoidleusermanagement.user_exceptions.UserAlreadyRegisteredException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class UserServiceTest {
    private UserService userService;
    private IUserMapper userMapper;
    private IRepositoryCatalog db;

    @BeforeEach
    void setUp(){
        userMapper = Mockito.mock(UserMapper.class);
        db = Mockito.mock(IRepositoryCatalog.class);
        HoidleUserRepository hoidleUserRepository = Mockito.mock(HoidleUserRepository.class);
        when(db.getHoidleUserRepository()).thenReturn(hoidleUserRepository);

        userService = new UserService(db, userMapper);
    }

    @Test
    public void createUserWithUnusedEmailTest(){

        String mail = "mail@mail.com";
        HoidleUserRequestDTO newUser = new HoidleUserRequestDTO()
                .setEmail(mail)
                .setPassword("testPassword");

        HoidleUser dbUser = new HoidleUser();
        dbUser.setId(1L);
        when(db.getHoidleUserRepository().existsByEmail(mail)).thenReturn(false);
        when(db.getHoidleUserRepository().findByEmail(mail)).thenReturn(dbUser);

        Long result = userService.createUser(newUser);

        verify(db.getHoidleUserRepository().save(any()),times(1));
        assertEquals(1L,result);
    }

    @Test
    public void createUserWithUsedEmailTest(){
        String mail = "mail@mail.com";
        HoidleUserRequestDTO newUser = new HoidleUserRequestDTO()
                .setEmail(mail)
                .setPassword("testPassword");

        when(db.getHoidleUserRepository().existsByEmail(mail)).thenReturn(false);
        assertThrows(UserAlreadyRegisteredException.class, () -> userService.createUser(newUser) );
    }

    @Test
    public void updateUserWithCorrectData(){

        String existingUserMail = "mail@mail.com";
        HoidleUser existingUser = new HoidleUser();
        existingUser.setId(1L);
        existingUser.setEmail(existingUserMail);
        existingUser .setPassword("testPassword");


        String newMail = "mail@mail.com";
        HoidleUserRequestDTO newUser = new HoidleUserRequestDTO()
                .setEmail(newMail)
                .setPassword("testPassword");

        when(db.getHoidleUserRepository().existsByEmail(existingUserMail)).thenReturn(true);
        when(db.getHoidleUserRepository().findByEmail(existingUserMail)).thenReturn(existingUser);

        Long result = userService.updateUser(newUser);
        verify(db.getHoidleUserRepository().save(any()),times(1));
        assertEquals(1L,result);
    }
}
