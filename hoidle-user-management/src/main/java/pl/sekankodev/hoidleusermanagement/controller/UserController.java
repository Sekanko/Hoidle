package pl.sekankodev.hoidleusermanagement.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.sekankodev.hoidleusermanagement.model.request.HoidleUserRequestDTO;
import pl.sekankodev.hoidleusermanagement.model.response.HoidleUserResponseDTO;
import pl.sekankodev.hoidleusermanagement.service.IUserService;

@RestController
@RequestMapping("/user/")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    @PostMapping("register")
    public ResponseEntity<Void> registerUser(HoidleUserRequestDTO user) {
        userService.createUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("update")
    public ResponseEntity<Void> updateUser(HoidleUserRequestDTO user) {
        userService.updateUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("delete")
    public ResponseEntity<Void> deleteUser(HoidleUserRequestDTO user) {
        userService.deleteUser(user);
        return new ResponseEntity<>(HttpStatus.GONE);
    }

    @PostMapping("login")
    public ResponseEntity<HoidleUserResponseDTO> logInUser(@RequestBody HoidleUserRequestDTO user){
        userService.logInUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
