package pl.sekankodev.hoidlegamelogic.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.sekankodev.hoidlegamelogic.modelDto.Hoi4CountryDTO;
import pl.sekankodev.hoidlegamelogic.services.IServiceCatalog;

import java.util.List;

@RestController
@RequestMapping("/data/")
@RequiredArgsConstructor
public class DataController {
    private final IServiceCatalog serviceCatalog;

    @GetMapping("allCountries")
    public List<Hoi4CountryDTO> getAllCountries() {
        return serviceCatalog.getHoi4CountryService().getHoi4Countries();
    }
}
