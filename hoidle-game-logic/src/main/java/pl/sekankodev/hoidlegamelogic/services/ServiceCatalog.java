package pl.sekankodev.hoidlegamelogic.services;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.sekankodev.hoidlegamelogic.modelDto.Hoi4CountryDTO;

import java.util.List;
@Service
@RequiredArgsConstructor
@Getter
public class ServiceCatalog implements IServiceCatalog {
    private final IHoi4CountryService hoi4CountryService;
    private final IHoidleDailyCountryService hoidleDailyCountryService;
    private final IGameService gameService;

}
