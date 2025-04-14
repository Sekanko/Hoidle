package pl.sekankodev.hoidlegamelogic.services;

import java.util.List;

public interface IServiceCatalog {
    IHoi4CountryService getHoi4CountryService();
    IHoidleDailyCountryService getHoidleDailyCountryService();
    IGameService getGameService();
}
