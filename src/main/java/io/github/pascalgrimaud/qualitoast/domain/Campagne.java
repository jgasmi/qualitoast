package io.github.pascalgrimaud.qualitoast.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Campagne.
 */
@Entity
@Table(name = "campagne")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "campagne")
public class Campagne implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "version", nullable = false)
    private String version;

    @NotNull
    @Column(name = "datedebut", nullable = false)
    private LocalDate datedebut;

    @Column(name = "datefin")
    private LocalDate datefin;

    @Column(name = "commentaire")
    private String commentaire;

    @Min(value = 0)
    @Column(name = "bloquant")
    private Integer bloquant;

    @Min(value = 0)
    @Column(name = "majeur")
    private Integer majeur;

    @Min(value = 0)
    @Column(name = "mineur")
    private Integer mineur;

    @Min(value = 0)
    @Column(name = "evolution")
    private Integer evolution;

    @Column(name = "termine")
    private Boolean termine;

    @ManyToOne(optional = false)
    @NotNull
    private Application application;

    @ManyToOne(optional = false)
    @NotNull
    private TypeTest typetest;

    @ManyToOne(optional = false)
    @NotNull
    private Resultat resultat;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVersion() {
        return version;
    }

    public Campagne version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public LocalDate getDatedebut() {
        return datedebut;
    }

    public Campagne datedebut(LocalDate datedebut) {
        this.datedebut = datedebut;
        return this;
    }

    public void setDatedebut(LocalDate datedebut) {
        this.datedebut = datedebut;
    }

    public LocalDate getDatefin() {
        return datefin;
    }

    public Campagne datefin(LocalDate datefin) {
        this.datefin = datefin;
        return this;
    }

    public void setDatefin(LocalDate datefin) {
        this.datefin = datefin;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public Campagne commentaire(String commentaire) {
        this.commentaire = commentaire;
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public Integer getBloquant() {
        return bloquant;
    }

    public Campagne bloquant(Integer bloquant) {
        this.bloquant = bloquant;
        return this;
    }

    public void setBloquant(Integer bloquant) {
        this.bloquant = bloquant;
    }

    public Integer getMajeur() {
        return majeur;
    }

    public Campagne majeur(Integer majeur) {
        this.majeur = majeur;
        return this;
    }

    public void setMajeur(Integer majeur) {
        this.majeur = majeur;
    }

    public Integer getMineur() {
        return mineur;
    }

    public Campagne mineur(Integer mineur) {
        this.mineur = mineur;
        return this;
    }

    public void setMineur(Integer mineur) {
        this.mineur = mineur;
    }

    public Integer getEvolution() {
        return evolution;
    }

    public Campagne evolution(Integer evolution) {
        this.evolution = evolution;
        return this;
    }

    public void setEvolution(Integer evolution) {
        this.evolution = evolution;
    }

    public Boolean isTermine() {
        return termine;
    }

    public Campagne termine(Boolean termine) {
        this.termine = termine;
        return this;
    }

    public void setTermine(Boolean termine) {
        this.termine = termine;
    }

    public Application getApplication() {
        return application;
    }

    public Campagne application(Application application) {
        this.application = application;
        return this;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public TypeTest getTypetest() {
        return typetest;
    }

    public Campagne typetest(TypeTest typeTest) {
        this.typetest = typeTest;
        return this;
    }

    public void setTypetest(TypeTest typeTest) {
        this.typetest = typeTest;
    }

    public Resultat getResultat() {
        return resultat;
    }

    public Campagne resultat(Resultat resultat) {
        this.resultat = resultat;
        return this;
    }

    public void setResultat(Resultat resultat) {
        this.resultat = resultat;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Campagne campagne = (Campagne) o;
        if (campagne.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, campagne.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Campagne{" +
            "id=" + id +
            ", version='" + version + "'" +
            ", datedebut='" + datedebut + "'" +
            ", datefin='" + datefin + "'" +
            ", commentaire='" + commentaire + "'" +
            ", bloquant='" + bloquant + "'" +
            ", majeur='" + majeur + "'" +
            ", mineur='" + mineur + "'" +
            ", evolution='" + evolution + "'" +
            ", termine='" + termine + "'" +
            '}';
    }
}