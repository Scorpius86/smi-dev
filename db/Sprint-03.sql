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
  PRIMARY KEY (`idTipoInfra`)
);
