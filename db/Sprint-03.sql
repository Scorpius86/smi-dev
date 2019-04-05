use smi_dev;

##------------------------------------------- Agregar columna codigo -------------------------------------------------
ALTER TABLE seccion ADD COLUMN codigoSeccion char(36) NOT NULL;

##------------------------------------------- Agregar trigger para codigo autogenerado-------------------------------------------------
delimiter $$

CREATE
DEFINER=`root`@`localhost`
TRIGGER `seccionTrigger`
BEFORE INSERT ON `seccion`
FOR EACH ROW
BEGIN
	IF new.codigoSeccion IS NULL THEN
		SET NEW.`codigoSeccion` = UUID();
	END IF;
END
$$

##------------------------------------------- Actualizar codigoSeccion de los registros existentes-------------------------------------------------
DROP PROCEDURE IF EXISTS ROWPERROW;
DELIMITER ;;
CREATE PROCEDURE ROWPERROW()
BEGIN
DECLARE n INT DEFAULT 0;
DECLARE i INT DEFAULT 0;
DECLARE idSeccion INT DEFAULT 0;
SELECT COUNT(*) FROM seccion INTO n;
SET i=0;
WHILE i < n DO 
	SET idSeccion = (SELECT s.id FROM seccion s LIMIT i,1);
	UPDATE seccion SET codigoSeccion = UUID() WHERE id = idSeccion;
	SET i = i + 1;
END WHILE;
End;
;;

DELIMITER ;
CALL ROWPERROW();
DROP PROCEDURE IF EXISTS ROWPERROW;

##-------------------------------------------Agregar nueva seccion-------------------------------------------------
INSERT INTO `smi_dev`.`seccion` (`codigoSeccion`,`nombre`, `nombreIdioma`, `idTipoGeoData`, `menuCategoria`, `menuAccion`, `geoJsonData`, `geoJsonFile`, `logo`, `marker`, `color`, `fechaCrea`, `usuarioCrea`, `terminalCrea`, `fechaCambio`, `usuarioCambio`, `terminalCambio`, `activo`, `eliminado`, `created_at`, `updated_at`) 
VALUES ('ConteoMarcadores','Conteo de marcadores', 'Marker Count', '0', '1', '0', 'NULL', 'NULL', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAp0lEQVR4Ae2VAQbDQBAA5wF5TH4QANI+pS+4wAIQLUHzihTyguRl2yAqZK10yykyA8cxrMWSj5LbYslPFMzo6kxBmBHdOHKYioR8bNdAT7++2s1vogKbDjV8ATCYfx0GF9R0cELKlR0Niu1zUbFt2CFoQMkUmhDH6XhI8JD8ofho59bOreXbWiAkWOQPxUf7862lUCixow6FagweX2fu/sl29E+2z8kbELVgLlKagxQAAAAASUVORK5CYII=', '', '#BD2E9D', '2018-08-08 00:00:00', 'admin', 'local', '2018-10-23 13:46:10', 'admin', 'smi.alianzacacaoperu.org', '1', '0', '2018-10-05 12:20:31', '2018-10-23 13:46:10');

##------------------------------------------- Agregar columna idTipoInfra -------------------------------------------------
ALTER TABLE smi_dev.seccion ADD COLUMN idTipoInfra INT(11) NULL;

##------------------------------------------- Eliminar la seccion ConteoMarcadores ---------------------------------------- 
update smi_dev.seccion set activo=0 where id=69; 

##------------------------------------------- Crear tabla Tipo de Infraestructura -----------------------------------------
CREATE TABLE `tipo_infraestructura` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `eliminado` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
##-------------------------------------------- Insert en la tabla Tipo de Infraestructura ---------------------------------
INSERT INTO `smi_dev`.`tipo_infraestructura` (`id`, `descripcion`, `eliminado`) VALUES ('1', 'Áreas protegidas', '0');
INSERT INTO `smi_dev`.`tipo_infraestructura` (`id`, `descripcion`, `eliminado`) VALUES ('2', 'Concesiones', '0');
INSERT INTO `smi_dev`.`tipo_infraestructura` (`id`, `descripcion`, `eliminado`) VALUES ('3', 'Ciudades Principales', '0');
INSERT INTO `smi_dev`.`tipo_infraestructura` (`id`, `descripcion`, `eliminado`) VALUES ('4', 'Capitales', '0');
INSERT INTO `smi_dev`.`tipo_infraestructura` (`id`, `descripcion`, `eliminado`) VALUES ('5', 'Comunidades Cacao', '0');
INSERT INTO `smi_dev`.`tipo_infraestructura` (`id`, `descripcion`, `eliminado`) VALUES ('6', 'Agricultores cercanos', '0');
INSERT INTO `smi_dev`.`tipo_infraestructura` (`id`, `descripcion`, `eliminado`) VALUES ('7', 'Cooperativas', '0');
INSERT INTO `smi_dev`.`tipo_infraestructura` (`id`, `descripcion`, `eliminado`) VALUES ('8', 'Oficinas Alianza', '0');
INSERT INTO `smi_dev`.`tipo_infraestructura` (`id`, `descripcion`, `eliminado`) VALUES ('9', 'Socios Alianza', '0');
INSERT INTO `smi_dev`.`tipo_infraestructura` (`id`, `descripcion`, `eliminado`) VALUES ('10', 'Empresas', '0');
INSERT INTO `smi_dev`.`tipo_infraestructura` (`id`, `descripcion`, `eliminado`) VALUES ('11', 'Centros Investigación', '0');
INSERT INTO `smi_dev`.`tipo_infraestructura` (`id`, `descripcion`, `eliminado`) VALUES ('12', 'Agentes Tecnológicos', '0');
INSERT INTO `smi_dev`.`tipo_infraestructura` (`id`, `descripcion`, `eliminado`) VALUES ('13', 'Vías', '0');

##-------------------------------------------- Se actualizan las secciones con su tipo correspondiente --------------------

UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '1' WHERE (`id` = '9');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '1' WHERE (`id` = '10');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '1' WHERE (`id` = '11');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '1' WHERE (`id` = '14');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '12' WHERE (`id` = '49');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '6' WHERE (`id` = '67');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '6' WHERE (`id` = '68');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '6' WHERE (`id` = '36');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '1' WHERE (`id` = '16');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '1' WHERE (`id` = '19');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '4' WHERE (`id` = '30');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '4' WHERE (`id` = '31');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '4' WHERE (`id` = '32');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '11' WHERE (`id` = '45');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '3' WHERE (`id` = '29');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '5' WHERE (`id` = '34');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '2' WHERE (`id` = '15');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '2' WHERE (`id` = '17');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '2' WHERE (`id` = '18');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '7' WHERE (`id` = '39');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '10' WHERE (`id` = '44');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '10' WHERE (`id` = '46');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '10' WHERE (`id` = '47');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '8' WHERE (`id` = '40');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '9' WHERE (`id` = '42');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '13' WHERE (`id` = '53');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '13' WHERE (`id` = '54');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '13' WHERE (`id` = '55');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '13' WHERE (`id` = '56');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '13' WHERE (`id` = '57');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '13' WHERE (`id` = '58');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '13' WHERE (`id` = '65');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '13' WHERE (`id` = '66');
UPDATE `smi_dev`.`seccion` SET `idTipoInfra` = '2' WHERE (`id` = '20');
