package pl.sekankodev.hoidleusermanagement.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;
import pl.sekankodev.hoidleusermanagement.model.HoidleUserRequestDTO;
import pl.sekankodev.hoidleusermanagement.model.HoidleUserResponseDTO;
import pl.sekankodev.hoidleusermanagement.service.IUserService;

@RestController
@RequestMapping("/auth/")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    @PostMapping("register")
    public ResponseEntity<Void> registerUser(@RequestBody  HoidleUserRequestDTO user) {
        userService.createUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("update")
    public ResponseEntity<Void> updateUser(@RequestBody HoidleUserRequestDTO user) {
        userService.updateUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("delete")
    public ResponseEntity<Void> deleteUser(@RequestBody HoidleUserRequestDTO user) {
        userService.deleteUser(user);
        return new ResponseEntity<>(HttpStatus.GONE);
    }

    @PostMapping("login")
    public ResponseEntity<HoidleUserResponseDTO> logInUser(@RequestBody HoidleUserRequestDTO user){
        return new ResponseEntity<>(userService.logInUser(user) , HttpStatus.OK);
    }
}
