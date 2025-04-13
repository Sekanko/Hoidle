package pl.sekankodev.hoidlegamelogic.modelDto;

import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;
import pl.sekankodev.hoidledata.model.Continent;
import pl.sekankodev.hoidledata.model.Faction;
import pl.sekankodev.hoidledata.model.Ideology;

import java.util.List;
@Data
@Accessors(chain = true)
public class Hoi4CountryDTO {
    private String name;
    private List<Continent> continents;
    private Ideology ideology;
    private List<Faction> historicalFaction;
    private byte researchSlotsNumber;
    private boolean hasNationalFocusTree;
    private boolean hasAccessToTheSea;
    private boolean hasResearchedTrain;
}
