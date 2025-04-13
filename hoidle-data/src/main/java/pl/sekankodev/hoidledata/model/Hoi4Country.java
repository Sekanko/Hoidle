package pl.sekankodev.hoidledata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Hoi4Country {
    @Id
    // GeneratedValue will be used in the future
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Enumerated(EnumType.STRING)
    private Continent continent;

    @Enumerated(EnumType.STRING)
    private Ideology ideology;

    @Enumerated(EnumType.STRING)
    private Faction historicalFaction;

    private byte researchSlotsNumber;
    private boolean hasNationalFocusTree;
    private boolean hasAccessToTheSea;
    private boolean hasResearchedTrain;
}
