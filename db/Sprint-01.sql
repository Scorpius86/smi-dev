use smi_dev;

CREATE TABLE produccion (
	idProduccion INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idCultivo INT(6) NOT NULL,
    anio INT NOT NULL,
    produccion DECIMAL(18,3) NOT NULL,
    
    FOREIGN KEY fk_cultivo(idCultivo)
	REFERENCES cultivo(id)
	ON UPDATE CASCADE
	ON DELETE RESTRICT
)ENGINE=InnoDB;

INSERT INTO produccion (`idCultivo`,`anio`,`produccion`)
VALUES
	(1,2006,133),
    (1,2007,292),
    (1,2008,283),
    (1,2009,283),
    (1,2010,302),
    (1,2011,400),
    (1,2012,505),
    (1,2013,608),
    (1,2014,667),
    (1,2015,783),
    (1,2016,785),
    (1,2017,799);
    
INSERT INTO produccion (`idCultivo`,`anio`,`produccion`)
VALUES
	(2,2006,133),
    (2,2007,292),
    (2,2008,283),
    (2,2009,283),
    (2,2010,302),
    (2,2011,400),
    (2,2012,505),
    (2,2013,608),
    (2,2014,667),
    (2,2015,783),
    (2,2016,785),
    (2,2017,799);

INSERT INTO produccion (`idCultivo`,`anio`,`produccion`)
VALUES
	(3,2006,133),
    (3,2007,292),
    (3,2008,283),
    (3,2009,283),
    (3,2010,302),
    (3,2011,400),
    (3,2012,505),
    (3,2013,608),
    (3,2014,667),
    (3,2015,783),
    (3,2016,785),
    (3,2017,799);