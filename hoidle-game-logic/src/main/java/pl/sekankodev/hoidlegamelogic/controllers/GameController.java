package pl.sekankodev.hoidlegamelogic.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.sekankodev.hoidlegamelogic.modelDto.Hoi4CountryDTO;
import pl.sekankodev.hoidlegamelogic.modelDto.HoidleDailyCountryDTO;
import pl.sekankodev.hoidlegamelogic.services.IServiceCatalog;

@RestController
@RequestMapping("game/control/")
@RequiredArgsConstructor
public class GameController {
    private final IServiceCatalog serviceCatalog;

    @GetMapping("dayCountryOfTheDay")
    public HoidleDailyCountryDTO getCountryOfTheDay() {
        return serviceCatalog.getHoidleDailyCountryService().getOrSetTodaysCountry();
    }
}
