package pl.sekankodev.hoidlegamelogic.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.sekankodev.hoidlegamelogic.modelDto.Colors;
import pl.sekankodev.hoidlegamelogic.modelDto.Hoi4CountryDTO;
import pl.sekankodev.hoidlegamelogic.modelDto.HoidleDailyCountryDTO;
import pl.sekankodev.hoidlegamelogic.services.IServiceCatalog;

import java.util.List;

@RestController
@RequestMapping("game/control/")
@RequiredArgsConstructor
public class GameController {
    private final IServiceCatalog serviceCatalog;

    @GetMapping("dayCountryOfTheDay")
    public HoidleDailyCountryDTO getCountryOfTheDay() {
        return serviceCatalog.getGameService().getOrSetTodaysCountry();
    }

    @PostMapping("guessed")
    public ResponseEntity<List<Colors>> guessResult(@RequestBody Hoi4CountryDTO guessedCountry) {

        var result = serviceCatalog.getGameService().guessResult(guessedCountry);
        return ResponseEntity.ok(result);
    }


}
