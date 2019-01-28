use smi_dev;

ALTER TABLE cultivo
	ADD COLUMN idTipoCultivo INT(6) UNSIGNED NOT NULL;    
    
UPDATE `cultivo` SET `idTipoCultivo` = '1' WHERE (`id` = '1');
UPDATE `cultivo` SET `idTipoCultivo` = '1' WHERE (`id` = '2');
UPDATE `cultivo` SET `idTipoCultivo` = '1' WHERE (`id` = '3');
UPDATE `cultivo` SET `idTipoCultivo` = '1' WHERE (`id` = '4');
UPDATE `cultivo` SET `idTipoCultivo` = '1' WHERE (`id` = '5');
UPDATE `cultivo` SET `idTipoCultivo` = '1' WHERE (`id` = '6');
UPDATE `cultivo` SET `idTipoCultivo` = '1' WHERE (`id` = '7');
UPDATE `cultivo` SET `idTipoCultivo` = '1' WHERE (`id` = '8');
UPDATE `cultivo` SET `idTipoCultivo` = '1' WHERE (`id` = '9');
UPDATE `cultivo` SET `idTipoCultivo` = '2' WHERE (`id` = '10');
UPDATE `cultivo` SET `idTipoCultivo` = '3' WHERE (`id` = '11');
UPDATE `cultivo` SET `idTipoCultivo` = '2' WHERE (`id` = '12');
UPDATE `cultivo` SET `idTipoCultivo` = '3' WHERE (`id` = '13');

CREATE TABLE tipo_cultivo (
	idTipoCultivo INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(250)
)ENGINE=InnoDB;

INSERT INTO `tipo_cultivo` (`nombre`) VALUES ('Cacao');
INSERT INTO `tipo_cultivo` (`nombre`) VALUES ('Platano');
INSERT INTO `tipo_cultivo` (`nombre`) VALUES ('Papaya');

ALTER TABLE cultivo
	ADD CONSTRAINT fk_cultivo_tipo_cultivo
	FOREIGN KEY (idTipoCultivo) 
	REFERENCES tipo_cultivo(idTipoCultivo)
	ON UPDATE CASCADE
	ON DELETE RESTRICT;

ALTER TABLE forecast 
	DROP COLUMN anio;


ALTER TABLE produccion 
	ADD COLUMN productividad DECIMAL (18,3) NOT NULL,
	ADD COLUMN area DECIMAL (18,3) NOT NULL;

#-----------------------------------Departamentos--------------------------------------------------------------------------
UPDATE produccion SET productividad = 500,area = 1000 WHERE idProduccion = 1;
UPDATE produccion SET productividad = 650,area = 1100 WHERE idProduccion = 2;
UPDATE produccion SET productividad = 700,area = 1200 WHERE idProduccion = 3;
UPDATE produccion SET productividad = 630,area = 1350 WHERE idProduccion = 4;
UPDATE produccion SET productividad = 650,area = 1400 WHERE idProduccion = 5;
UPDATE produccion SET productividad = 680,area = 1500 WHERE idProduccion = 6;
UPDATE produccion SET productividad = 750,area = 1600 WHERE idProduccion = 7;
UPDATE produccion SET productividad = 700,area = 1800 WHERE idProduccion = 8;
UPDATE produccion SET productividad = 729,area = 1900 WHERE idProduccion = 9;
UPDATE produccion SET productividad = 810,area = 2000 WHERE idProduccion = 10;
UPDATE produccion SET productividad = 800,area = 1980 WHERE idProduccion = 11;
UPDATE produccion SET productividad = 825,area = 2400 WHERE idProduccion = 12;

UPDATE produccion SET productividad = 500,area = 1000 WHERE idProduccion = 13;
UPDATE produccion SET productividad = 650,area = 1100 WHERE idProduccion = 14;
UPDATE produccion SET productividad = 700,area = 1200 WHERE idProduccion = 15;
UPDATE produccion SET productividad = 630,area = 1350 WHERE idProduccion = 16;
UPDATE produccion SET productividad = 650,area = 1400 WHERE idProduccion = 17;
UPDATE produccion SET productividad = 680,area = 1500 WHERE idProduccion = 18;
UPDATE produccion SET productividad = 750,area = 1600 WHERE idProduccion = 19;
UPDATE produccion SET productividad = 700,area = 1800 WHERE idProduccion = 20;
UPDATE produccion SET productividad = 729,area = 1900 WHERE idProduccion = 21;
UPDATE produccion SET productividad = 810,area = 2000 WHERE idProduccion = 22;
UPDATE produccion SET productividad = 800,area = 1980 WHERE idProduccion = 23;
UPDATE produccion SET productividad = 825,area = 2400 WHERE idProduccion = 24;

UPDATE produccion SET productividad = 500,area = 1000 WHERE idProduccion = 25;
UPDATE produccion SET productividad = 650,area = 1100 WHERE idProduccion = 26;
UPDATE produccion SET productividad = 700,area = 1200 WHERE idProduccion = 27;
UPDATE produccion SET productividad = 630,area = 1350 WHERE idProduccion = 28;
UPDATE produccion SET productividad = 650,area = 1400 WHERE idProduccion = 29;
UPDATE produccion SET productividad = 680,area = 1500 WHERE idProduccion = 30;
UPDATE produccion SET productividad = 750,area = 1600 WHERE idProduccion = 31;
UPDATE produccion SET productividad = 700,area = 1800 WHERE idProduccion = 32;
UPDATE produccion SET productividad = 729,area = 1900 WHERE idProduccion = 33;
UPDATE produccion SET productividad = 810,area = 2000 WHERE idProduccion = 34;
UPDATE produccion SET productividad = 800,area = 1980 WHERE idProduccion = 35;
UPDATE produccion SET productividad = 825,area = 2400 WHERE idProduccion = 36;

#-----------------------------------Provincias--------------------------------------------------------------------------
UPDATE produccion SET productividad = 500,area = 1000 WHERE idProduccion = 37;
UPDATE produccion SET productividad = 650,area = 1100 WHERE idProduccion = 38;
UPDATE produccion SET productividad = 700,area = 1200 WHERE idProduccion = 39;
UPDATE produccion SET productividad = 630,area = 1350 WHERE idProduccion = 40;
UPDATE produccion SET productividad = 650,area = 1400 WHERE idProduccion = 41;
UPDATE produccion SET productividad = 680,area = 1500 WHERE idProduccion = 42;
UPDATE produccion SET productividad = 750,area = 1600 WHERE idProduccion = 43;
UPDATE produccion SET productividad = 700,area = 1800 WHERE idProduccion = 44;
UPDATE produccion SET productividad = 729,area = 1900 WHERE idProduccion = 45;
UPDATE produccion SET productividad = 810,area = 2000 WHERE idProduccion = 46;
UPDATE produccion SET productividad = 800,area = 1980 WHERE idProduccion = 47;
UPDATE produccion SET productividad = 825,area = 2400 WHERE idProduccion = 48;

UPDATE produccion SET productividad = 500,area = 1000 WHERE idProduccion = 49;
UPDATE produccion SET productividad = 650,area = 1100 WHERE idProduccion = 50;
UPDATE produccion SET productividad = 700,area = 1200 WHERE idProduccion = 51;
UPDATE produccion SET productividad = 630,area = 1350 WHERE idProduccion = 52;
UPDATE produccion SET productividad = 650,area = 1400 WHERE idProduccion = 53;
UPDATE produccion SET productividad = 680,area = 1500 WHERE idProduccion = 54;
UPDATE produccion SET productividad = 750,area = 1600 WHERE idProduccion = 55;
UPDATE produccion SET productividad = 700,area = 1800 WHERE idProduccion = 56;
UPDATE produccion SET productividad = 729,area = 1900 WHERE idProduccion = 57;
UPDATE produccion SET productividad = 810,area = 2000 WHERE idProduccion = 58;
UPDATE produccion SET productividad = 800,area = 1980 WHERE idProduccion = 59;
UPDATE produccion SET productividad = 825,area = 2400 WHERE idProduccion = 60;

UPDATE produccion SET productividad = 500,area = 1000 WHERE idProduccion = 61;
UPDATE produccion SET productividad = 650,area = 1100 WHERE idProduccion = 62;
UPDATE produccion SET productividad = 700,area = 1200 WHERE idProduccion = 63;
UPDATE produccion SET productividad = 630,area = 1350 WHERE idProduccion = 64;
UPDATE produccion SET productividad = 650,area = 1400 WHERE idProduccion = 65;
UPDATE produccion SET productividad = 680,area = 1500 WHERE idProduccion = 66;
UPDATE produccion SET productividad = 750,area = 1600 WHERE idProduccion = 67;
UPDATE produccion SET productividad = 700,area = 1800 WHERE idProduccion = 68;
UPDATE produccion SET productividad = 729,area = 1900 WHERE idProduccion = 69;
UPDATE produccion SET productividad = 810,area = 2000 WHERE idProduccion = 70;
UPDATE produccion SET productividad = 800,area = 1980 WHERE idProduccion = 71;
UPDATE produccion SET productividad = 825,area = 2400 WHERE idProduccion = 72;
#--------------------------------------Distritos-----------------------------------------------------------------------        
UPDATE produccion SET productividad = 500,area = 1000 WHERE idProduccion = 73;
UPDATE produccion SET productividad = 650,area = 1100 WHERE idProduccion = 74;
UPDATE produccion SET productividad = 700,area = 1200 WHERE idProduccion = 75;
UPDATE produccion SET productividad = 630,area = 1350 WHERE idProduccion = 76;
UPDATE produccion SET productividad = 650,area = 1400 WHERE idProduccion = 77;
UPDATE produccion SET productividad = 680,area = 1500 WHERE idProduccion = 78;
UPDATE produccion SET productividad = 750,area = 1600 WHERE idProduccion = 79;
UPDATE produccion SET productividad = 700,area = 1800 WHERE idProduccion = 80;
UPDATE produccion SET productividad = 729,area = 1900 WHERE idProduccion = 81;
UPDATE produccion SET productividad = 810,area = 2000 WHERE idProduccion = 82;
UPDATE produccion SET productividad = 800,area = 1980 WHERE idProduccion = 83;
UPDATE produccion SET productividad = 825,area = 2400 WHERE idProduccion = 84;

UPDATE produccion SET productividad = 500,area = 1000 WHERE idProduccion = 85;
UPDATE produccion SET productividad = 650,area = 1100 WHERE idProduccion = 86;
UPDATE produccion SET productividad = 700,area = 1200 WHERE idProduccion = 87;
UPDATE produccion SET productividad = 630,area = 1350 WHERE idProduccion = 88;
UPDATE produccion SET productividad = 650,area = 1400 WHERE idProduccion = 89;
UPDATE produccion SET productividad = 680,area = 1500 WHERE idProduccion = 90;
UPDATE produccion SET productividad = 750,area = 1600 WHERE idProduccion = 91;
UPDATE produccion SET productividad = 700,area = 1800 WHERE idProduccion = 92;
UPDATE produccion SET productividad = 729,area = 1900 WHERE idProduccion = 93;
UPDATE produccion SET productividad = 810,area = 2000 WHERE idProduccion = 94;
UPDATE produccion SET productividad = 800,area = 1980 WHERE idProduccion = 95;
UPDATE produccion SET productividad = 825,area = 2400 WHERE idProduccion = 96;

UPDATE produccion SET productividad = 500,area = 1000 WHERE idProduccion = 97;
UPDATE produccion SET productividad = 650,area = 1100 WHERE idProduccion = 98;
UPDATE produccion SET productividad = 700,area = 1200 WHERE idProduccion = 99;
UPDATE produccion SET productividad = 630,area = 1350 WHERE idProduccion = 100;
UPDATE produccion SET productividad = 650,area = 1400 WHERE idProduccion = 101;
UPDATE produccion SET productividad = 680,area = 1500 WHERE idProduccion = 102;
UPDATE produccion SET productividad = 750,area = 1600 WHERE idProduccion = 103;
UPDATE produccion SET productividad = 700,area = 1800 WHERE idProduccion = 104;
UPDATE produccion SET productividad = 729,area = 1900 WHERE idProduccion = 105;
UPDATE produccion SET productividad = 810,area = 2000 WHERE idProduccion = 106;
UPDATE produccion SET productividad = 800,area = 1980 WHERE idProduccion = 107;
UPDATE produccion SET productividad = 825,area = 2400 WHERE idProduccion = 108;
#--------------------------------------Distritos-----------------------------------------------------------------------        
    
INSERT INTO cultivo(`nombre`,`abreviatura`,`tasa`,`precio`,`idForecast`,`eliminado`)
VALUES
('Platano','Platano','2.30%','S/.7.40',1,0),
('Papaya','Papaya','2.30%','S/.7.40',1,0),
('Platano','Platano','2.30%','S/.7.40',2,0),
('Papaya','Papaya','2.30%','S/.7.40',2,0);