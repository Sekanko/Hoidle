package pl.sekankodev.hoidledata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Hoi4Country {
    @Id
    // GeneratedValue will be used in the future
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<Continent> continents;

    @Enumerated(EnumType.STRING)
    private Ideology ideology;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<Faction> historicalFaction;

    private byte researchSlotsNumber;
    private boolean hasNationalFocusTree;
    private boolean hasAccessToTheSea;
    private boolean hasResearchedTrain;
}
