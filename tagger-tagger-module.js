(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tagger-tagger-module"],{

/***/ "+HF2":
/*!***********************************************!*\
  !*** ./src/app/tagger/draws/draws.service.ts ***!
  \***********************************************/
/*! exports provided: DrawsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawsService", function() { return DrawsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _draws_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./draws-class */ "XviM");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! export-to-csv */ "8j+T");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _imagebar_imagebar_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../imagebar/imagebar.service */ "pd+n");






class DrawsService {
    constructor(imageService) {
        this.imageService = imageService;
        this.clase = new _draws_class__WEBPACK_IMPORTED_MODULE_2__["Clase"]();
        //storedShapes guarda la ultima informacion de cada forma creada
        //antes de que sea reemplazada en la imagen activa
        this.storedShapes = [];
        this.clases = [];
        this.remover = true;
        this.activesShapes = [];
        this.shapeContainer = [];
        this.ver = true;
        this.id = 1;
        this.errorMessage = "";
        this.xPoints = [];
        this.yPoints = [];
        this.totalPoints = 0;
        this.create = false;
    }
    setPlusId(id) {
        this.id = (parseInt(id) + 1);
    }
    shapeEvent() {
        if (this.create) {
            let position = this.uptadeOri(event);
            this.setnCheckPoints(position[0], position[1]);
        }
    }
    uptadeOri(event) {
        if (event) {
            let doc = document.getElementById("draw_container_id");
            let x = Math.floor(event.clientX - doc.getBoundingClientRect().left);
            let y = Math.floor(event.clientY - doc.getBoundingClientRect().top);
            const position = [x, y];
            return position;
        }
    }
    toggleClassCreation() {
        this.create = !this.create;
        if (this.imageService.images.length > 0) {
            document.getElementById(this.imageService.img.name).click();
        }
    }
    checkClassname(name) {
        const regExp = /\s/;
        let bool = true;
        this.clases.forEach(element => {
            if (element.name === name) {
                bool = false;
                this.errorMessage = "El nombre " + name + " ya existe!";
            }
        });
        if (name.localeCompare("") === 0 || name.match(regExp) !== null) {
            bool = false;
            this.errorMessage = "El nombre no puede estar vacío o contener espacios!";
        }
        return bool;
    }
    crearClase(claseNueva) {
        this.clases.push(claseNueva);
        // this.clase=this.clases[this.clases.length-1];
    }
    deleteClase() {
        const index = this.clases.indexOf(this.clase);
        this.clases.splice(index, 1);
    }
    crearShape(imgName) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.clase.shape.localeCompare("box") === 0) {
                if (this.xPoints[0] < this.xPoints[1] && this.yPoints[0] < this.yPoints[1]) {
                    this.crearRect(imgName);
                }
                else if (this.xPoints[0] > this.xPoints[1] && this.yPoints[0] > this.yPoints[1]) {
                    const newx = this.xPoints[0];
                    const newy = this.yPoints[0];
                    this.xPoints[0] = this.xPoints[1];
                    this.yPoints[0] = this.yPoints[1];
                    this.xPoints[1] = newx;
                    this.yPoints[1] = newy;
                    this.crearRect(imgName);
                }
                else if (this.xPoints[0] > this.xPoints[1] && this.yPoints[0] < this.yPoints[1]) {
                    const newx = this.xPoints[0];
                    this.xPoints[0] = this.xPoints[1];
                    this.xPoints[1] = newx;
                    this.crearRect(imgName);
                }
                else if (this.xPoints[0] < this.xPoints[1] && this.yPoints[0] > this.yPoints[1]) {
                    const newy = this.yPoints[0];
                    this.yPoints[0] = this.yPoints[1];
                    this.yPoints[1] = newy;
                    this.crearRect(imgName);
                }
            }
            else if (this.clase.shape.localeCompare("line") === 0) {
                this.crearLine(imgName);
            }
            else if (this.clase.shape.localeCompare("arrow") === 0) {
                this.crearArrow(imgName);
            }
            else if (this.clase.shape.localeCompare("arrowc") === 0) {
                this.crearArrowc(imgName);
            }
        });
    }
    // Fija la clase activa y
    selectClase(clase) {
        this.clase = clase;
        this.xPoints = [];
        this.yPoints = [];
        if (this.clase.shape.localeCompare("box") === 0) {
            this.totalPoints = 2;
        }
        else if (this.clase.shape.localeCompare("line") === 0) {
            this.totalPoints = parseInt(this.clase.lines) + 1;
        }
        else if (this.clase.shape.localeCompare("arrow") === 0) {
            this.totalPoints = 1;
        }
        else if (this.clase.shape.localeCompare("arrowc") === 0) {
            this.totalPoints = 1;
        }
    }
    // recibe posicion de click y revisa si
    // se dibuja la forma
    setnCheckPoints(x, y) {
        this.yPoints.push(y);
        this.xPoints.push(x);
        if (this.yPoints.length === this.totalPoints) {
            this.crearShape(this.imageService.img.name).then(() => {
                this.yPoints = [];
                this.xPoints = [];
            });
        }
    }
    // crea una flecha para tipos de subclase
    // lito, geo o alt
    crearArrow(imgName) {
        let temporal = new _draws_class__WEBPACK_IMPORTED_MODULE_2__["ActiveShape"]();
        temporal.imgName = imgName;
        temporal.activo = true;
        temporal.shapeLine = [];
        temporal.color = this.clase.color;
        temporal.atribute = this.getAtributeData();
        temporal.shapeLine.push(this.myInteractive.line(0, 26.4, 0, -26.4));
        temporal.shapeLine.push(this.myInteractive.line(0.4, 25, 26.3, -1.3));
        temporal.shapeLine.push(this.myInteractive.line(0.4, -25, 26.3, 1.3));
        //temporal.shapeLine.push(this.myInteractive.line( 0,  0,  75,  0));
        //temporal.shapeLine.push(this.myInteractive.line( 75, 0,  50, -25));
        //temporal.shapeLine.push(this.myInteractive.line( 75, 0,  50,  25));
        let c1 = this.myInteractive.control(this.xPoints[0], this.yPoints[0]);
        temporal.shape = this.myInteractive.rectangle(c1.x, c1.y, 0, 0);
        temporal.shape.update = function () {
            this.x += c1.dx;
            this.y += c1.dy;
        };
        c1.constrainWithinBox(2, 2, 1398, this.myInteractive.height - 2);
        for (let index = 0; index < temporal.shapeLine.length; index++) {
            temporal.shapeLine[index].style.strokeWidth = "4px";
            temporal.shapeLine[index].style.stroke = this.clase.color;
            temporal.shapeLine[index].update = function () {
                this.x1 += c1.dx;
                this.x2 += c1.dx;
                this.y1 += c1.dy;
                this.y2 += c1.dy;
                if (c1.x === 2 || c1.y === 2) {
                    this.remove();
                    c1.remove();
                    temporal.activo = false;
                    temporal.shape.remove();
                }
            };
            temporal.shapeLine[index].x1 += this.xPoints[0];
            temporal.shapeLine[index].x2 += this.xPoints[0];
            temporal.shapeLine[index].y1 += this.yPoints[0];
            temporal.shapeLine[index].y2 += this.yPoints[0];
            temporal.shapeLine[index].addDependency(c1);
            temporal.shapeLine[index].update();
        }
        temporal.shapeType = this.clase.shape;
        temporal.clase = this.clase.name;
        this.activesShapes.push(temporal);
        if (this.create) {
            c1.remove();
        }
        // Mostrar datos de atributos
        const textData = this.splitAtributeDataService(temporal.atribute, ";");
        for (let index = 0; index < textData.length; index++) {
            let text = this.myInteractive.text(0, 0, (textData[index]));
            text.style.fill = "white";
            text.style.fontSize = "medium";
            text.update = function () {
                this.x = c1.x + 3;
                this.y = c1.y - 25 + (15 * (index + 1));
            };
            text.addDependency(c1);
            text.update();
        }
    }
    // crea una flecha para tipos de subclase
    // lito, geo o alt
    crearArrowc(imgName) {
        let temporal = new _draws_class__WEBPACK_IMPORTED_MODULE_2__["ActiveShape"]();
        temporal.imgName = imgName;
        temporal.activo = true;
        temporal.shapeLine = [];
        temporal.color = this.clase.color;
        temporal.atribute = this.getAtributeData();
        temporal.shapeLine.push(this.myInteractive.line(0, 26.4, 0, -26.4));
        temporal.shapeLine.push(this.myInteractive.line(-25.9, -1.3, 0, 25));
        temporal.shapeLine.push(this.myInteractive.line(-25.9, 1.3, 0, -25));
        //temporal.shapeLine.push(this.myInteractive.line( 0,  26.4, 0,  -26.4));
        //temporal.shapeLine.push(this.myInteractive.line( 0.4,  25, 26.3,  -1.3));
        //temporal.shapeLine.push(this.myInteractive.line( 0.4,  -25, 26.3, 1.3));
        let c1 = this.myInteractive.control(this.xPoints[0], this.yPoints[0]);
        temporal.shape = this.myInteractive.rectangle(c1.x, c1.y, 0, 0);
        temporal.shape.update = function () {
            this.x += c1.dx;
            this.y += c1.dy;
        };
        c1.constrainWithinBox(2, 2, 1398, this.myInteractive.height - 2);
        for (let index = 0; index < temporal.shapeLine.length; index++) {
            temporal.shapeLine[index].style.strokeWidth = "4px";
            temporal.shapeLine[index].style.stroke = this.clase.color;
            temporal.shapeLine[index].update = function () {
                this.x1 += c1.dx;
                this.x2 += c1.dx;
                this.y1 += c1.dy;
                this.y2 += c1.dy;
                if (c1.x === 2 || c1.y === 2) {
                    this.remove();
                    c1.remove();
                    temporal.activo = false;
                    temporal.shape.remove();
                }
            };
            temporal.shapeLine[index].x1 += this.xPoints[0];
            temporal.shapeLine[index].x2 += this.xPoints[0];
            temporal.shapeLine[index].y1 += this.yPoints[0];
            temporal.shapeLine[index].y2 += this.yPoints[0];
            temporal.shapeLine[index].addDependency(c1);
            temporal.shapeLine[index].update();
        }
        temporal.shapeType = this.clase.shape;
        temporal.clase = this.clase.name;
        this.activesShapes.push(temporal);
        if (this.create) {
            c1.remove();
        }
        // Mostrar datos de atributos
        const textData = this.splitAtributeDataService(temporal.atribute, ";");
        for (let index = 0; index < textData.length; index++) {
            let text = this.myInteractive.text(0, 0, (textData[index]));
            text.style.fill = "white";
            text.style.fontSize = "medium";
            text.update = function () {
                this.x = c1.x + 3;
                this.y = c1.y - 25 + (15 * (index + 1));
            };
            text.addDependency(c1);
            text.update();
        }
    }
    // crea forma a partir de una clase
    crearLine(imgName) {
        let temporal = new _draws_class__WEBPACK_IMPORTED_MODULE_2__["ActiveShape"]();
        temporal.imgName = imgName;
        temporal.activo = true;
        temporal.shapeLine = [];
        let controllers = [];
        let textcontainer = [];
        let linenumber = parseInt(this.clase.lines);
        temporal.lines = this.clase.lines;
        temporal.atribute = this.getAtributeData();
        // Create element for future management
        for (let index = 0; index < linenumber; index++) {
            temporal.shapeLine.push(this.myInteractive.line(0, 0, 0, 0));
            controllers.push(this.myInteractive.control(this.xPoints[index], this.yPoints[index]));
            if (index === (linenumber - 1)) {
                controllers.push(this.myInteractive.control(this.xPoints[index + 1], this.yPoints[index + 1]));
            }
        }
        for (let index = 0; index < controllers.length; index++) {
            controllers[index].constrainWithinBox(2, 2, 1398, this.myInteractive.height - 2);
        }
        // Mostrar atributos e id        
        const textData = this.splitAtributeDataService(temporal.atribute, ";");
        for (let index = 0; index < textData.length; index++) {
            // if(index===0){
            //     let id=this.id;
            //     textcontainer.push(this.myInteractive.text(0,0,"id:"+id.toString()));
            //     textcontainer[index].style.fill="white";
            //     textcontainer[index].style.fontSize="medium";
            //     textcontainer[index].update=function(){
            //         this.x=controllers[0].x+3;
            //         this.y=controllers[0].y+(15*(index+1));  
            //     }        
            //     textcontainer[index].addDependency(controllers[0]); 
            //     textcontainer[index].update();
            // }
            textcontainer.push(this.myInteractive.text(0, 0, (textData[index])));
            textcontainer[index].style.fill = "white";
            textcontainer[index].style.fontSize = "medium";
            textcontainer[index].update = function () {
                this.x = controllers[0].x + 3;
                this.y = controllers[0].y + (15 * (index + 1));
            };
            textcontainer[index].addDependency(controllers[0]);
            textcontainer[index].update();
        }
        // Assign the elements with their siblings
        for (let index = 0; index < linenumber; index++) {
            temporal.shapeLine[index].style.stroke = this.clase.color;
            temporal.shapeLine[index].style.strokeWidth = "3px";
            temporal.shapeLine[index].update = function () {
                this.x1 = controllers[index].x;
                this.x2 = controllers[index + 1].x;
                this.y1 = controllers[index].y;
                this.y2 = controllers[index + 1].y;
                if (Math.abs(controllers[index].x - controllers[index + 1].x) < 5 && Math.abs(controllers[index].y - controllers[index + 1].y) < 5) {
                    for (let index = 0; index < (linenumber + 1); index++) {
                        controllers[index].remove();
                    }
                    for (let index = 0; index < linenumber; index++) {
                        temporal.shapeLine[index].remove();
                    }
                    for (let index = 0; index < textcontainer.length; index++) {
                        textcontainer[index].remove();
                    }
                    temporal.activo = false;
                }
            };
            temporal.shapeLine[index].addDependency(controllers[index]);
            temporal.shapeLine[index].addDependency(controllers[index + 1]);
            temporal.shapeLine[index].update();
        }
        temporal.shapeType = this.clase.shape;
        temporal.color = this.clase.color;
        temporal.clase = this.clase.name;
        this.id += 1;
        this.activesShapes.push(temporal);
        //  Si esta en modo editar, se eliminan los controladores
        if (this.create) {
            for (let index = 0; index < controllers.length; index++) {
                controllers[index].remove();
            }
        }
    }
    crearRect(imgName) {
        let temporal = new _draws_class__WEBPACK_IMPORTED_MODULE_2__["ActiveShape"]();
        // let fixWidth:number=this.oriX+this.clase.width;
        // let fixHeight:number=this.oriY+this.clase.height;
        temporal.imgName = imgName;
        temporal.activo = true;
        temporal.shape = this.myInteractive.rectangle(0, 0, 0, (this.yPoints[1] - this.yPoints[0]));
        temporal.shape.classList.add('default');
        temporal.shape.style.fill = this.clase.color;
        temporal.shape.style.stroke = this.clase.color;
        temporal.color = this.clase.color;
        temporal.shape.style.strokeWidth = "2px";
        temporal.shape.style.fillOpacity = "0.4";
        temporal.shapeType = this.clase.shape;
        let c1 = this.myInteractive.control(this.xPoints[0], this.yPoints[0]);
        let c2 = this.myInteractive.control(this.xPoints[1], this.yPoints[1]);
        c1.constrainWithinBox(2, 2, 1398, this.myInteractive.height - 2);
        c2.constrainWithinBox(2, 2, 1398, this.myInteractive.height - 2);
        // let rect = this.myInteractive.rectangle(0,0,0,0)
        // rect.style.fill=this.clase.color;
        // rect.style.stroke=this.clase.color;
        // rect.style.fillOpacity="0.7";
        // rect.style.strokeWidth="2px";
        c2.update = function () {
            this.x += c1.dx;
            this.y += c1.dy;
        };
        temporal.atribute = this.getAtributeData();
        // Mostrar datos de atributos  
        const textData = this.splitAtributeDataService(temporal.atribute, ";");
        for (let index = 0; index < textData.length; index++) {
            let text = this.myInteractive.text(0, 0, (textData[index]));
            text.style.fill = "white";
            text.style.fontSize = "medium";
            text.update = function () {
                this.x = c1.x + 3;
                this.y = c1.y + (15 * (index + 1));
                if (c2.x < c1.x || c2.y < c1.y) {
                    this.remove();
                }
            };
            text.addDependency(c1);
            text.addDependency(c2);
            text.update();
        }
        c2.addDependency(c1);
        temporal.shape.update = function () {
            this.x = c1.x;
            this.y = c1.y;
            this.width = c2.x - c1.x;
            this.height = c2.y - c1.y;
            if (this.width < 0 || this.height < 0) {
                c1.remove();
                c2.remove();
                this.remove();
                temporal.activo = false;
            }
        };
        temporal.shape.update();
        temporal.shape.addDependency(c1);
        temporal.shape.addDependency(c2);
        temporal.clase = this.clase.name;
        this.id += 1;
        this.activesShapes.push(temporal);
        if (this.create) {
            c1.remove();
            c2.remove();
        }
    }
    getAtributeData() {
        let padre = document.getElementById("atribute_window");
        let atributeData = "";
        const padreLength = padre.children.length;
        for (let index = 0; index < padreLength; index += 2) {
            let nombreatrib = padre.children[index];
            let valoratrib = padre.children[index + 1];
            if ((index + 2) !== padreLength) {
                atributeData = atributeData + nombreatrib.textContent + valoratrib.value + ";";
            }
            else {
                atributeData = atributeData + nombreatrib.textContent + valoratrib.value;
            }
        }
        return atributeData;
    }
    crearFromData(shape) {
        let displayShape = "block";
        this.clases.forEach(element => {
            if (element.name.localeCompare(shape.clase) === 0) {
                if (!element.view) {
                    displayShape = "none";
                }
                if (shape.shapeType.localeCompare("box") === 0) {
                    this.crearRectFromData(shape.imgName, shape.shape.width, shape.shape.height, shape.shape.x, shape.shape.y, shape.color, shape.clase, shape.shapeType, shape.atribute, displayShape);
                }
                else if (shape.shapeType.localeCompare("line") === 0) {
                    this.crearLineFromData(shape.imgName, shape.shapeLine, shape.lines, shape.color, shape.clase, shape.shapeType, shape.atribute, displayShape);
                }
                else if (shape.shapeType.localeCompare("arrow") === 0) {
                    this.crearArrowFromData(shape.imgName, shape.shapeLine, shape.color, shape.clase, shape.shapeType, shape.atribute, displayShape, shape.shape.x, shape.shape.y);
                }
                else if (shape.shapeType.localeCompare("arrowc") === 0) {
                    this.crearArrowcFromData(shape.imgName, shape.shapeLine, shape.color, shape.clase, shape.shapeType, shape.atribute, displayShape, shape.shape.x, shape.shape.y);
                }
            }
        });
    }
    crearLineFromData(imgName, shapes, lines, color, clase, shapeType, atribute, displayShape) {
        // Shapes se usa para obtener coordenadas en x,y con
        // las que se crean los controladores
        let temporal = new _draws_class__WEBPACK_IMPORTED_MODULE_2__["ActiveShape"]();
        temporal.imgName = imgName;
        temporal.activo = true;
        temporal.shapeLine = [];
        temporal.lines = lines;
        let controllers = [];
        let textcontainer = [];
        let linenumber = parseInt(lines);
        // Create element for future management
        for (let index = 0; index < linenumber; index++) {
            temporal.shapeLine.push(this.myInteractive.line(0, 0, 0, 0));
            controllers.push(this.myInteractive.control(shapes[index].x1, shapes[index].y1));
            controllers[index].style.display = displayShape;
            if (index === (linenumber - 1)) {
                controllers.push(this.myInteractive.control(shapes[index].x2, shapes[index].y2));
                controllers[index + 1].style.display = displayShape;
            }
        }
        for (let index = 0; index < controllers.length; index++) {
            controllers[index].constrainWithinBox(2, 2, 1398, this.myInteractive.height - 2);
        }
        // Mostrar datos atributos
        temporal.atribute = atribute;
        const textData = this.splitAtributeDataService(temporal.atribute, ";");
        for (let index = 0; index < textData.length; index++) {
            textcontainer.push(this.myInteractive.text(0, 0, (textData[index])));
            textcontainer[index].style.fill = "white";
            textcontainer[index].style.fontSize = "medium";
            textcontainer[index].style.display = displayShape;
            textcontainer[index].update = function () {
                this.x = controllers[0].x + 3;
                this.y = controllers[0].y + (15 * (index + 1));
            };
            textcontainer[index].addDependency(controllers[0]);
            textcontainer[index].update();
        }
        // Assing the elements with their siblings
        for (let index = 0; index < linenumber; index++) {
            temporal.shapeLine[index].style.stroke = color;
            temporal.shapeLine[index].style.strokeWidth = "3px";
            temporal.shapeLine[index].style.display = displayShape;
            temporal.shapeLine[index].update = function () {
                this.x1 = controllers[index].x;
                this.x2 = controllers[index + 1].x;
                this.y1 = controllers[index].y;
                this.y2 = controllers[index + 1].y;
                // Condicion para eliminar la figura
                if (Math.abs(controllers[index].x - controllers[index + 1].x) < 5 && Math.abs(controllers[index].y - controllers[index + 1].y) < 5) {
                    for (let index = 0; index < (linenumber + 1); index++) {
                        controllers[index].remove();
                    }
                    for (let index = 0; index < linenumber; index++) {
                        temporal.shapeLine[index].remove();
                    }
                    for (let index = 0; index < textcontainer.length; index++) {
                        textcontainer[index].remove();
                    }
                    temporal.activo = false;
                }
            };
            temporal.shapeLine[index].addDependency(controllers[index]);
            temporal.shapeLine[index].addDependency(controllers[index + 1]);
            temporal.shapeLine[index].update();
        }
        temporal.shapeType = shapeType;
        temporal.color = color;
        temporal.clase = clase;
        this.activesShapes.push(temporal);
        if (this.create) {
            for (let index = 0; index < controllers.length; index++) {
                controllers[index].remove();
            }
        }
    }
    // crea una forma a partir de informacion almacenada
    crearRectFromData(imgName, width, height, x, y, color, clase, shapeType, atribute, displayShape) {
        let temporal = new _draws_class__WEBPACK_IMPORTED_MODULE_2__["ActiveShape"]();
        let fixWidth = x + width;
        let fixHeight = y + height;
        temporal.imgName = imgName;
        temporal.activo = true;
        temporal.shape = this.myInteractive.rectangle(0, 0, 0, 0);
        temporal.shape.classList.add('default');
        temporal.shape.style.fill = color;
        temporal.shape.style.stroke = color;
        temporal.color = color;
        temporal.shape.style.strokeWidth = "2px";
        temporal.shape.style.fillOpacity = "0.4";
        temporal.shape.style.display = displayShape;
        temporal.shapeType = shapeType;
        let c1 = this.myInteractive.control(x, y);
        let c2 = this.myInteractive.control(fixWidth, fixHeight);
        c1.constrainWithinBox(2, 2, 1398, this.myInteractive.height - 2);
        c2.constrainWithinBox(2, 2, 1398, this.myInteractive.height - 2);
        c1.style.display = displayShape;
        c2.style.display = displayShape;
        c2.update = function () {
            this.x += c1.dx;
            this.y += c1.dy;
        };
        // Mostrar datos de atributos
        temporal.atribute = atribute;
        const textData = this.splitAtributeDataService(temporal.atribute, ";");
        for (let index = 0; index < textData.length; index++) {
            let text = this.myInteractive.text(0, 0, (textData[index]));
            text.style.fill = "white";
            text.style.fontSize = "medium";
            text.style.display = displayShape;
            text.update = function () {
                this.x = c1.x + 3;
                this.y = c1.y + (15 * (index + 1));
                if (c2.x < c1.x || c2.y < c1.y) {
                    this.remove();
                }
            };
            text.addDependency(c1);
            text.addDependency(c2);
            text.update();
        }
        c2.addDependency(c1);
        temporal.shape.update = function () {
            this.x = c1.x;
            this.y = c1.y;
            this.width = c2.x - c1.x;
            this.height = c2.y - c1.y;
            if (this.width < 0 || this.height < 0) {
                c1.remove();
                c2.remove();
                this.remove();
                temporal.activo = false;
            }
        };
        temporal.shape.update();
        temporal.shape.addDependency(c1);
        temporal.shape.addDependency(c2);
        temporal.clase = clase;
        this.activesShapes.push(temporal);
        if (this.create) {
            c1.remove();
            c2.remove();
        }
    }
    crearArrowFromData(imgName, shapes, color, clase, shapeType, atribute, displayShape, x, y) {
        let temporal = new _draws_class__WEBPACK_IMPORTED_MODULE_2__["ActiveShape"]();
        temporal.imgName = imgName;
        temporal.activo = true;
        temporal.shapeLine = [];
        temporal.shapeType = shapeType;
        temporal.atribute = atribute;
        temporal.shapeLine.push(this.myInteractive.line(0, 26.4, 0, -26.4));
        temporal.shapeLine.push(this.myInteractive.line(0.4, 25, 26.3, -1.3));
        temporal.shapeLine.push(this.myInteractive.line(0.4, -25, 26.3, 1.3));
        //temporal.shapeLine.push(this.myInteractive.line( 0,  0,  75,  0));
        //temporal.shapeLine.push(this.myInteractive.line( 75, 0,  50, -25));
        //temporal.shapeLine.push(this.myInteractive.line( 75, 0,  50,  25));
        let c1 = this.myInteractive.control(x, y);
        temporal.shape = this.myInteractive.rectangle(x, y, 0, 0);
        temporal.shape.update = function () {
            this.x += c1.dx;
            this.y += c1.dy;
        };
        temporal.shape.addDependency(c1);
        temporal.shape.update();
        c1.constrainWithinBox(2, 2, 1398, this.myInteractive.height - 2);
        for (let index = 0; index < temporal.shapeLine.length; index++) {
            temporal.shapeLine[index].style.strokeWidth = "4px";
            temporal.shapeLine[index].style.stroke = color;
            temporal.shapeLine[index].update = function () {
                this.x1 += c1.dx;
                this.x2 += c1.dx;
                this.y1 += c1.dy;
                this.y2 += c1.dy;
                if (c1.x === 2 || c1.y === 2) {
                    this.remove();
                    c1.remove();
                    temporal.activo = false;
                    temporal.shape.remove();
                }
            };
            temporal.shapeLine[index].x1 += x;
            temporal.shapeLine[index].x2 += x;
            temporal.shapeLine[index].y1 += y;
            temporal.shapeLine[index].y2 += y;
            temporal.shapeLine[index].addDependency(c1);
            temporal.shapeLine[index].update();
            temporal.shapeLine[index].style.display = displayShape;
        }
        temporal.color = color;
        c1.style.display = displayShape;
        temporal.clase = clase;
        this.activesShapes.push(temporal);
        if (this.create) {
            c1.remove();
        }
        // Mostrar datos de atributos
        const textData = this.splitAtributeDataService(temporal.atribute, ";");
        for (let index = 0; index < textData.length; index++) {
            let text = this.myInteractive.text(0, 0, (textData[index]));
            text.style.fill = "white";
            text.style.fontSize = "medium";
            text.update = function () {
                this.x = c1.x + 3;
                this.y = c1.y - 25 + (15 * (index + 1));
            };
            text.addDependency(c1);
            text.update();
        }
    }
    crearArrowcFromData(imgName, shapes, color, clase, shapeType, atribute, displayShape, x, y) {
        let temporal = new _draws_class__WEBPACK_IMPORTED_MODULE_2__["ActiveShape"]();
        temporal.imgName = imgName;
        temporal.activo = true;
        temporal.shapeLine = [];
        temporal.shapeType = shapeType;
        temporal.atribute = atribute;
        temporal.shapeLine.push(this.myInteractive.line(0, 26.4, 0, -26.4));
        temporal.shapeLine.push(this.myInteractive.line(-25.9, -1.3, 0, 25));
        temporal.shapeLine.push(this.myInteractive.line(-25.9, 1.3, 0, -25));
        //temporal.shapeLine.push(this.myInteractive.line( 0,  26.4, 0,  -26.4));
        //temporal.shapeLine.push(this.myInteractive.line( 0.4,  25, 26.3,  -1.3));
        //temporal.shapeLine.push(this.myInteractive.line( 0.4,  -25, 26.3, 1.3));
        let c1 = this.myInteractive.control(x, y);
        temporal.shape = this.myInteractive.rectangle(x, y, 0, 0);
        temporal.shape.update = function () {
            this.x += c1.dx;
            this.y += c1.dy;
        };
        temporal.shape.addDependency(c1);
        temporal.shape.update();
        c1.constrainWithinBox(2, 2, 1398, this.myInteractive.height - 2);
        for (let index = 0; index < temporal.shapeLine.length; index++) {
            temporal.shapeLine[index].style.strokeWidth = "4px";
            temporal.shapeLine[index].style.stroke = color;
            temporal.shapeLine[index].update = function () {
                this.x1 += c1.dx;
                this.x2 += c1.dx;
                this.y1 += c1.dy;
                this.y2 += c1.dy;
                if (c1.x === 2 || c1.y === 2) {
                    this.remove();
                    c1.remove();
                    temporal.activo = false;
                    temporal.shape.remove();
                }
            };
            temporal.shapeLine[index].x1 += x;
            temporal.shapeLine[index].x2 += x;
            temporal.shapeLine[index].y1 += y;
            temporal.shapeLine[index].y2 += y;
            temporal.shapeLine[index].addDependency(c1);
            temporal.shapeLine[index].update();
            temporal.shapeLine[index].style.display = displayShape;
        }
        temporal.color = color;
        c1.style.display = displayShape;
        temporal.clase = clase;
        this.activesShapes.push(temporal);
        if (this.create) {
            c1.remove();
        }
        // Mostrar datos de atributos
        const textData = this.splitAtributeDataService(temporal.atribute, ";");
        for (let index = 0; index < textData.length; index++) {
            let text = this.myInteractive.text(0, 0, (textData[index]));
            text.style.fill = "white";
            text.style.fontSize = "medium";
            text.update = function () {
                this.x = c1.x + 3;
                this.y = c1.y - 25 + (15 * (index + 1));
            };
            text.addDependency(c1);
            text.update();
        }
    }
    removeImage(imgName) {
        let indexA = 0;
        let indexB = 0;
        let remove = false;
        this.shapeContainer.forEach(element => {
            if (!(element.imgName === imgName)) {
                indexA++;
            }
            else {
                indexB = indexA;
                remove = true;
            }
        });
        if (remove) {
            // console.log(this.shapeContainer[indexB]);
            this.shapeContainer.splice(indexB, 1);
        }
        this.activesShapes = [];
    }
    // Almacena los elementos de figuras de la imagen activa
    refreshContainer(imgName) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.shapeContainer.length > 0) {
                let indexA = 0;
                let indexB = 0;
                let remove = false;
                this.shapeContainer.forEach(element => {
                    if (!(element.imgName === imgName)) {
                        indexA++;
                    }
                    else {
                        indexB = indexA;
                        remove = true;
                    }
                });
                if (remove) {
                    // console.log(this.shapeContainer[indexB]);
                    this.shapeContainer.splice(indexB, 1);
                }
            }
            this.saveShapes(imgName, this.activesShapes).then(value => {
                this.shapeContainer.push(value);
            });
        });
    }
    createContainers(image) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let container = new _draws_class__WEBPACK_IMPORTED_MODULE_2__["ShapeContainer"]();
            container.imgName = image.name;
            container.height = image.height;
            container.width = image.width;
            container.shapeList = [];
            this.shapeContainer.push(container);
        });
    }
    saveShapes(imgName, shapes) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let container = new _draws_class__WEBPACK_IMPORTED_MODULE_2__["ShapeContainer"]();
            container.imgName = imgName;
            container.shapeList = [];
            container.width = this.imageService.complexImg.width;
            container.height = this.imageService.complexImg.height;
            this.activesShapes.forEach(element => {
                if (element.activo) {
                    container.shapeList.push(element);
                }
            });
            return container;
        });
    }
    clearActiveShapes() {
        this.activesShapes = [];
    }
    // Genera csv de salida de marcas
    exportData(imgName) {
        // Organizar datos
        this.refreshContainer(imgName).then(() => {
            let data = [];
            this.shapeContainer.forEach(element => {
                element.shapeList.forEach(elementoLista => {
                    let list = new _draws_class__WEBPACK_IMPORTED_MODULE_2__["exportableShape"]();
                    let factor = 1400 / parseInt(element.width);
                    list.imgName = elementoLista.imgName;
                    list.imgHeight = element.height;
                    list.imgWidth = element.width;
                    list.clase = elementoLista.clase;
                    list.shapetype = elementoLista.shapeType;
                    let atributeFormated = "";
                    console.log("intento separar");
                    console.log(elementoLista.atribute);
                    let temporalData = this.splitAtributeDataService(elementoLista.atribute, ";");
                    console.log("logrado");
                    for (let index = 0; index < temporalData.length; index++) {
                        let rawData = this.splitAtributeDataService(temporalData[index], ":");
                        if (rawData.length > 1) {
                            atributeFormated = atributeFormated + "\"" + rawData[0] + "\":\"" + rawData[1] + "\"";
                            if (index < temporalData.length - 1) {
                                atributeFormated = atributeFormated + ";";
                            }
                        }
                    }
                    list.atribute = "{" + atributeFormated + "}";
                    list.id = Math.random();
                    if (elementoLista.shapeType.localeCompare("box") === 0) {
                        list.oriX = Math.floor(parseInt(elementoLista.shape.x) / factor).toString();
                        list.oriY = Math.floor(parseInt(elementoLista.shape.y) / factor).toString();
                        list.width = Math.floor(parseInt(elementoLista.shape.width) / factor).toString();
                        list.height = Math.floor(parseInt(elementoLista.shape.height) / factor).toString();
                        list.color = elementoLista.color;
                        data.push(list);
                    }
                    else if (elementoLista.shapeType.localeCompare("line") === 0) {
                        const linenum = parseInt(elementoLista.lines);
                        list.oriX = "";
                        list.oriY = "";
                        for (let index = 0; index < linenum; index++) {
                            let x1 = Math.floor(parseInt(elementoLista.shapeLine[index].x1) / factor).toString();
                            let y1 = Math.floor(parseInt(elementoLista.shapeLine[index].y1) / factor).toString();
                            let x2 = Math.floor(parseInt(elementoLista.shapeLine[index].x2) / factor).toString();
                            let y2 = Math.floor(parseInt(elementoLista.shapeLine[index].y2) / factor).toString();
                            if (index === (linenum - 1)) {
                                list.oriX = list.oriX + x1 + "," + x2;
                                list.oriY = list.oriY + y1 + "," + y2;
                            }
                            else {
                                list.oriX = list.oriX + x1 + "," + x2 + ",";
                                list.oriY = list.oriY + y1 + "," + y2 + ",";
                            }
                        }
                        list.oriX = "\"" + list.oriX + "\"";
                        list.oriY = "\"" + list.oriY + "\"";
                        list.width = "";
                        list.height = "";
                        list.color = elementoLista.color;
                        data.push(list);
                    }
                    else if (elementoLista.shapeType.localeCompare("arrow") === 0) {
                        list.oriX = Math.floor(parseInt(elementoLista.shape.x) / factor).toString();
                        list.oriY = Math.floor(parseInt(elementoLista.shape.y) / factor).toString();
                        list.width = "0";
                        list.height = "0";
                        list.color = elementoLista.color;
                        data.push(list);
                    }
                    else if (elementoLista.shapeType.localeCompare("arrowc") === 0) {
                        list.oriX = Math.floor(parseInt(elementoLista.shape.x) / factor).toString();
                        list.oriY = Math.floor(parseInt(elementoLista.shape.y) / factor).toString();
                        list.width = "0";
                        list.height = "0";
                        list.color = elementoLista.color;
                        data.push(list);
                    }
                });
            });
            //Exportar datos
            let exportoptions = {
                fieldSeparator: ',',
                quoteStrings: '"',
                decimalSeparator: '',
                showLabels: true,
                useTextFile: false,
                useBom: true,
                useKeysAsHeaders: true,
            };
            const csvExport = new export_to_csv__WEBPACK_IMPORTED_MODULE_3__["ExportToCsv"](exportoptions);
            csvExport.generateCsv(data);
        });
    }
    // Separa string segun separador
    splitAtributeDataService(dataString, separator) {
        let data = dataString.split(separator);
        return data;
    }
    /*
    // Carga clases por defecto
    async defaulClases(){
        this.clases=[];
        const names=['L','LF','A','AF','MNZ','MNZF','OBS','OBSF','CAN','ROC','T','T2','C','M','MG','MM','MF','J','J3','V','V3']
        const showNames=['Litología','Litología (Fin)','Alteración','Alteración (Fin)','Mineralización','Mineralización (Fin)','Observación','Observación (Fin)','Escala','Eje Sondaje', 'Taco','Taco Falso','Canaleta Vacía','Molido','Molido Grueso','Molido Medio','Molido Fino','Fractura','Fractura (3 ptos.)','Vetilla','Vetilla (3 ptos.)']
        const tipes=['arrow','arrowc', 'arrow','arrowc', 'arrow','arrowc','arrow','arrowc','line','line', 'box','box','box','box','box','box','box','box','line','box','line']
        const lines=[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,2,0,2]
        const colors=['#FF0000','#FF0000','#FF8000','#FF8000','#FFFF00','#FFFF00','#FFFFFF','#FFFFFF','#FFFFFF','#000000','#000000','#C0C0C0','#FFFFFF','#0000FF','#800080','#FF00FF','#FFC0CB','#00FF00','#00FF00','#008000','#008000']
        const icons=["litologia.png","litologiaFin.png","alteracion.png","alteracionFin.png","mineralizacion.png","mineralizacionFin.png","observacion.png","observacionFin.png","escala.png","eje.png","taco.png","tacoFalso.png","canaletaVacia.png","molido.png","molidoGrueso.png","molidoMedio.png","molidoFino.png","fractura.png","fractura3ptos.png","vetilla.png","vetilla3ptos.png"]
        const upClas=['geologia', 'geologia', "geologia",'geologia', 'geologia', "geologia","geologia","geologia","base","base", "base","base","base","geo","geo","geo","geo","geo","geo","geo","geo"]
        for (let index = 0; index < names.length; index++) {
            let tempClass = new Clase();
            tempClass.showName=showNames[index];
            tempClass.name=names[index];
            tempClass.shape=tipes[index];
            tempClass.lines=lines[index].toString();
            tempClass.color=colors[index];
            tempClass.view=true;
            tempClass.icon=icons[index];
            tempClass.upClass=upClas[index]
            
            if(names[index]==="T" || names[index]==="L" || names[index]==="A" || names[index]==="MNZ" || names[index]==="OBS"){
                tempClass.atribute='p1:';
            }
            
            if(names[index]==="CAN"){
                tempClass.atribute='dist:';
            }
            if(names[index]==="T"){
                tempClass.atribute='prof:';
            }
            if(names[index]==="L"){
                tempClass.atribute='lit:';
            }
            if(names[index]==="A"){
                tempClass.atribute='alt:';
            }
            if(names[index]==="MNZ"){
                tempClass.atribute='min:';
            }
            if(names[index]==="OBS"){
                tempClass.atribute='obs:';
            }
            
            this.clases.push(tempClass)
        }
    }
    */
    // Carga clases por defecto
    defaulClases() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.clases = [];
            //const names=['L','LF','A','AF','MNZ','MNZF','OBS','OBSF','CAN','ROC','T','T2','C','M','MG','MM','MF','J','J3','V','V3']
            const names = ['CAN', 'ROC', 'J3', 'V3', 'M', 'MTV'];
            //const showNames=['Litología','Litología (Fin)','Alteración','Alteración (Fin)','Mineralización','Mineralización (Fin)','Observación','Observación (Fin)','Escala','Eje Sondaje', 'Taco','Taco Falso','Canaleta Vacía','Molido','Molido Grueso','Molido Medio','Molido Fino','Fractura','Fractura (3 ptos.)','Vetilla','Vetilla (3 ptos.)']
            const showNames = ['Escala', 'Eje Sondaje', 'Fractura', 'Vetilla', 'Molido', 'Molido (TV)'];
            //const tipes=['arrow','arrowc', 'arrow','arrowc', 'arrow','arrowc','arrow','arrowc','line','line', 'box','box','box','box','box','box','box','box','line','box','line']
            const tipes = ['line', 'line', 'line', 'line', 'box', 'box'];
            //const lines=[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,2,0,2]
            const lines = [1, 1, 2, 2, 0, 0];
            //const colors=['#FF0000','#FF0000','#FF8000','#FF8000','#FFFF00','#FFFF00','#FFFFFF','#FFFFFF','#FFFFFF','#000000','#000000','#C0C0C0','#FFFFFF','#0000FF','#800080','#FF00FF','#FFC0CB','#00FF00','#00FF00','#008000','#008000']
            const colors = ['#FFFFFF', '#000000', '#00FF00', 'FF8000', '0000FF', 'FF0000'];
            //const icons=["litologia.png","litologiaFin.png","alteracion.png","alteracionFin.png","mineralizacion.png","mineralizacionFin.png","observacion.png","observacionFin.png","escala.png","eje.png","taco.png","tacoFalso.png","canaletaVacia.png","molido.png","molidoGrueso.png","molidoMedio.png","molidoFino.png","fractura.png","fractura3ptos.png","vetilla.png","vetilla3ptos.png"]
            const icons = ["escala.png", "eje.png", "fractura3ptos.png", "vetilla3ptos.png", "molido.png", "molidoTV.png"];
            //const upClas=['geologia', 'geologia', "geologia",'geologia', 'geologia', "geologia","geologia","geologia","base","base", "base","base","base","geo","geo","geo","geo","geo","geo","geo","geo"]
            const upClas = ["base", "base", "geo", "geo", "geo", "geo"];
            for (let index = 0; index < names.length; index++) {
                let tempClass = new _draws_class__WEBPACK_IMPORTED_MODULE_2__["Clase"]();
                tempClass.showName = showNames[index];
                tempClass.name = names[index];
                tempClass.shape = tipes[index];
                tempClass.lines = lines[index].toString();
                tempClass.color = colors[index];
                tempClass.view = true;
                tempClass.icon = icons[index];
                tempClass.upClass = upClas[index];
                if (names[index] === "CAN") {
                    tempClass.atribute = 'dist:';
                }
                if (names[index] === "J3" || names[index] === "V3") {
                    tempClass.atribute = 'alfa:;beta:';
                }
                if (names[index] === "M") {
                    tempClass.atribute = 'id:';
                }
                if (names[index] === "MTV") {
                    tempClass.atribute = 'id:;frac:;obs:';
                }
                this.clases.push(tempClass);
            }
        });
    }
}
DrawsService.ɵfac = function DrawsService_Factory(t) { return new (t || DrawsService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_imagebar_imagebar_service__WEBPACK_IMPORTED_MODULE_4__["ImageAdderService"])); };
DrawsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: DrawsService, factory: DrawsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](DrawsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _imagebar_imagebar_service__WEBPACK_IMPORTED_MODULE_4__["ImageAdderService"] }]; }, null); })();


/***/ }),

/***/ "/GDF":
/*!**************************************************!*\
  !*** ./src/assets/source/elements/controller.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Controller; });
/* harmony import */ var _model_dependency_graph_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/dependency-graph.js */ "E8aT");

/**
* This controller manages the dependencies between elements.
*/
class Controller {
    /**
    * Constructs a controller
    */
    constructor() {
        this.dependencyGraph = new _model_dependency_graph_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.elements = new Map();
    }
    /**
    * Clears all the elements from this controller.
    */
    clear() {
        this.dependencyGraph = new _model_dependency_graph_js__WEBPACK_IMPORTED_MODULE_0__["default"](); // TODO: implement clear method
        this.elements.clear();
    }
    /**
    * Adds an element to this controller.
    */
    add(element) {
        this.dependencyGraph.add(element);
        this.elements.set(element.id, element);
    }
    /**
    * Removes an element from this controller.
    */
    remove(element) {
        this.dependencyGraph.remove(element);
        this.elements.delete(element.id);
    }
    /**
    * Returns the element corresponding to the unique string identifier
    */
    get(id) {
        return this.elements.get(id);
    }
    /**
    * Updates this element and all of its dependents
    */
    update(element) {
        let deps = this.dependencyGraph.getDependents(element);
        for (let d of deps) {
            d.update();
        }
    }
}
//# sourceMappingURL=controller.js.map

/***/ }),

/***/ "3DG2":
/*!*******************************************************!*\
  !*** ./src/assets/source/elements/input/hover-box.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HoverBox; });
/* harmony import */ var _svg_text_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svg/text.js */ "maoU");
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input.js */ "Ambf");


/**
* A button that when pressed fires an onclick event.
*/
class HoverBox extends _input_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(str) {
        super();
        this._xBound = null;
        this._yBound = null;
        // Create a text element
        this.label = new _svg_text_js__WEBPACK_IMPORTED_MODULE_0__["default"](0, 1, str);
        this.label.root.setAttribute('alignment-baseline', 'middle');
        this.label.root.style.textAnchor = 'middle';
        this.box = this.rectangle(0, -16, this.label.length * 2 + 16, 32);
        this.box.root.setAttribute('rx', '2px');
        this.box.fill = 'white';
        this.box.stroke = 'black';
        this.box.style.fillOpacity = '0.9';
        this.label.x = this.box.x + this.box.width / 2;
        this.appendChild(this.label);
        this._x = this.box.x;
        this._y = this.box.y;
        this.root.setAttribute('visibility', 'hidden');
    }
    set x(value) {
        if (this._xBound) {
            if (value >= this._xBound - this.box.width)
                value = this._xBound - this.box.width;
        }
        this._x = value;
        this.box.x = this._x;
        this.label.x = this.box.x + this.box.width / 2;
    }
    set y(value) {
        if (this._yBound) {
            if (value >= this._yBound - this.box.height)
                value = this._yBound - this.box.height;
            else if (value <= this.box.height)
                value = this.box.height;
        }
        this._y = value;
        this.box.y = this._y - 37;
        this.label.y = this.box.y + this.box.height / 2;
    }
    setBounds(x, y) {
        this._xBound = x;
        this._yBound = y;
    }
    setText(str) {
        this.label.contents = str;
        this.label.x = this.box.x + this.box.width / 2;
        this.label.y = this.box.y + this.box.height / 2;
        this.box.width = this.label.length * 2 + 16;
    }
    updatePosition(x, y) {
        this.x = x;
        this.y = y;
    }
    showHoverBox() {
        this.root.removeAttribute('visibility');
    }
    hideHoverBox() {
        this.root.setAttribute('visibility', 'hidden');
    }
}
//# sourceMappingURL=hover-box.js.map

/***/ }),

/***/ "4858":
/*!***************************************!*\
  !*** ./src/assets/source/util/svg.js ***!
  \***************************************/
/*! exports provided: parseSVG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseSVG", function() { return parseSVG; });
/**
* Parses and returns the SVG documented represented by the string argument.
*/
function parseSVG(svg) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(svg, 'image/svg+xml');
    return doc.documentElement;
}
//# sourceMappingURL=svg.js.map

/***/ }),

/***/ "4WwI":
/*!**************************************************!*\
  !*** ./src/assets/source/elements/graph/node.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Node; });
/* harmony import */ var _svg_ellipse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svg/ellipse.js */ "kGPW");
/* harmony import */ var _svg_group_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../svg/group.js */ "sFit");
/* harmony import */ var _svg_text_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../svg/text.js */ "maoU");



//Bostock had something about fitting text here, seems cool https://observablehq.com/@mbostock/fit-text-to-circle
/**
* A Node is a basic element with a position, radius, and text held within it.
*/
class Node extends _svg_group_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
    * Constructs a Node element at the position (x,y) with radius r containing the string text
    */
    constructor(cx, cy, rx, ry, text) {
        super();
        this.depth = 0;
        this._cx = cx;
        this._cy = cy;
        this._text = text;
        this._rx = rx;
        this._ry = ry;
        this.edges = new Set();
        this.nodeName = new _svg_text_js__WEBPACK_IMPORTED_MODULE_2__["default"](cx, cy, text);
        this.nodeName.style.textAnchor = "middle";
        this.nodeName.root.setAttribute("alignment-baseline", "middle");
        this.nodeEllipse = new _svg_ellipse_js__WEBPACK_IMPORTED_MODULE_0__["default"](cx, cy, rx, ry);
        this.nodeEllipse.fill = '#f8f8f8';
        this.children = [];
        this.parents = [];
        this.root.appendChild(this.nodeEllipse.root);
        this.root.appendChild(this.nodeName.root);
    }
    /**
    * Returns the number of edges coming out of this node.
    */
    edgeWeight() {
        return this.edges.size;
    }
    /**
    * Translates this node and all inner elements by x, y.
    */
    translate(x, y) {
        this.nodeEllipse.cx += x;
        this.nodeName.x += x;
        this._cx += x;
        this.nodeEllipse.cy += y;
        this.nodeName.y += y;
        this._cy += y;
    }
    /**
    * Getter for the cx of this node.
    */
    get cx() {
        return this._cx;
    }
    /**
    * Getter for cy of this node
    */
    get cy() {
        return this._cy;
    }
    set cx(cx) {
        this._cx = cx;
        this.nodeEllipse.cx = cx;
        this.nodeName.x = cx;
        this.edges.forEach(function (d) {
            d.redraw();
        });
    }
    /**
    * Getter for cy of this node
    */
    set cy(cy) {
        this._cy = cy;
        this.nodeEllipse.cy = cy;
        this.nodeName.y = cy;
        this.edges.forEach(function (d) {
            d.redraw();
        });
    }
    /**
    * Getter for rx of this node
    */
    get rx() {
        return this._rx;
    }
    /**
    * Getter for ry of this node
    */
    get ry() {
        return this._ry;
    }
    /**
    * Getter for the text of this node
    */
    get label() {
        return this._text;
    }
    /**
    * Setter for the text of this node
    */
    set label(text) {
        this.nodeName.contents = text;
        this._text = text;
    }
    /**
    * Setter for rx of this node
    */
    set rx(rx) {
        this._rx = rx;
        this.nodeEllipse.rx = rx;
    }
    /**
    * Setter for ry of this node
    */
    set ry(ry) {
        this._ry = ry;
        this.nodeEllipse.ry = ry;
    }
    /**
    * Adds an edge to this node.
    */
    addEdge(edge) {
        if (edge.nodeFrom == this) {
            this.children.push(edge.nodeTo);
        }
        else {
            this.depth = edge.nodeFrom.depth + 1;
            this.parents.push(edge.nodeFrom);
        }
        this.edges.add(edge);
    }
}
//# sourceMappingURL=node.js.map

/***/ }),

/***/ "5BLY":
/*!***************************************************!*\
  !*** ./src/assets/source/elements/interactive.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Interactive; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _util_file_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/file.js */ "l8YR");
/* harmony import */ var _util_svg_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/svg.js */ "4858");
/* harmony import */ var _input_input_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./input/input.js */ "Ambf");
/* harmony import */ var _svg_svg_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./svg/svg.js */ "GAEk");
/* harmony import */ var _svg_group_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./svg/group.js */ "sFit");
/* harmony import */ var _visual_icon_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./visual/icon.js */ "YAAk");
/* harmony import */ var _input_button_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./input/button.js */ "wZwl");
/* harmony import */ var _input_check_box_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./input/check-box.js */ "Piay");
/* harmony import */ var _input_control_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./input/control.js */ "kJ17");
/* harmony import */ var _input_control_circle_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./input/control-circle.js */ "LyDu");
/* harmony import */ var _input_radio_control_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./input/radio-control.js */ "6UAm");
/* harmony import */ var _input_dropdown_control_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./input/dropdown-control.js */ "wCCE");
/* harmony import */ var _input_scrubber_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./input/scrubber.js */ "QBIj");
/* harmony import */ var _input_slider_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./input/slider.js */ "8SZi");
/* harmony import */ var _input_hover_box_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./input/hover-box.js */ "3DG2");
/* harmony import */ var _elements_graph_node_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../elements/graph/node.js */ "4WwI");
/* harmony import */ var _elements_graph_edge_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../elements/graph/edge.js */ "5nZz");
/* harmony import */ var _elements_graph_graph_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../elements/graph/graph.js */ "IFU1");
/* harmony import */ var _elements_maps_map_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../elements/maps/map.js */ "PLVj");
/* harmony import */ var _elements_math_plot_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../elements/math/plot.js */ "tTcA");

// util


// basic elements



// visual elements

// input elements









// graph elements



// map elements

// math elements

/**
* This class exposes the high level functionality of our library. Elements can
* created and related together
*
* By default input elements are added to a SVG "controls" group and visual
* elements are added to the "background" group. This ensures that controls will
* alwaysbe focusable, despite the order in which elements are created.
*/
class Interactive extends _svg_svg_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
    /**
    * Constructs a new interactive object and appends it into the DOM. If the
    * provided argument is an HTMLElement appends the interactive within that
    * element. If the provided a value is a string, appends the interactive within
    * the HTML element with the corresponding ID. If no element is found throws an
    * error.
    */
    constructor(value, options = {}) {
        super();
        // If the user passes in a string identifier check to see if such an
        // element exists in the current document.
        if (typeof value == "string") {
            this.container = document.getElementById(value);
            if (this.container === null || this.container === undefined) {
                throw new Error(`There is no HTML element with the id: ${value}`);
            }
        }
        else {
            this.container = value;
        }
        // create and append the root svg element and group elements
        this.container.appendChild(this.root);
        this.root.classList.add('interactive');
        // Have to create and manually append because overridden append child will
        // throw an error.
        this.background = new _svg_group_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
        this.input = new _svg_group_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
        this.root.appendChild(this.background.root);
        this.root.appendChild(this.input.root);
        // default configuration options
        let defaultOptions = {
            originX: 0,
            originY: 0,
            width: 600,
            height: 300,
            border: false
        };
        // combine the default configuration with the user's configuration
        let config = Object.assign(Object.assign({}, defaultOptions), options);
        this._originX = config.originX;
        this._originY = config.originY;
        this._width = config.width;
        this._height = config.height;
        this.root.setAttribute('width', this._width.toString());
        this.root.setAttribute('height', this._height.toString());
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
        this.window = false;
        this.border = config.border;
        // prevent the default behavior of selecting text
        this.container.addEventListener('mousedown', function (event) {
            event.preventDefault();
        });
    }
    /**
    * Sets the width of this interactive area.
    */
    set width(value) {
        this._width = value;
        this.root.setAttribute('width', value.toString());
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
    }
    /**
    * Returns the width of this interactive area.
    */
    get width() {
        return this._width;
    }
    /**
    * Sets the height of this interactive area.
    */
    set height(value) {
        this._height = value;
        this.root.setAttribute('height', value.toString());
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
    }
    /**
    * Returns the height of this interactive area.
    */
    get height() {
        return this._height;
    }
    /**
    * Sets the x coordinate of the origin.
    */
    set originX(value) {
        this._originX = value;
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
    }
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originX() {
        return this._originX;
    }
    /**
    * Sets the y coordinate of the origin.
    */
    set originY(value) {
        this._originY = value;
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
    }
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originY() {
        return this._originY;
    }
    /**
    * If set to true, styles the interactive to float on top of the background.
    * This feature is good for interactives where elements can be dragged out of
    * the bounds of the container element.
    */
    set window(value) {
        if (value) {
            this.root.classList.add('window');
        }
        else {
            this.root.classList.remove('window');
        }
    }
    /**
    * If set to true, draws a minimal border around the interactive.
    */
    set border(value) {
        if (value) {
            this.root.classList.add('border');
        }
        else {
            this.root.classList.remove('border');
        }
    }
    /**
    * Returns the minimum x-coordinate of this interactive.
    */
    get minX() {
        return -this.originX;
    }
    /**
    * Returns the minimum y-coordinate of this interactive.
    */
    get minY() {
        return -this.originY;
    }
    /**
    * Returns the maximum x-coordinate of this interactive.
    */
    get maxX() {
        return this.minX + this._width;
    }
    /**
    * Returns the maximum y-coordinate of this interactive.
    */
    get maxY() {
        return this.minY + this._height;
    }
    /**
    * Appends the element within the interactive. If the element is an "input"
    * element, places the element in the input group so that visually the element
    * is always placed above other graphical elements.
    */
    appendChild(child) {
        if (child instanceof _input_input_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
            this.input.appendChild(child);
        }
        else {
            this.background.appendChild(child);
        }
        return child;
    }
    /**
    * Creates a nested interactive within this interactive
    */
    interactive(x, y, options = {}) {
        let obj = new Interactive(this.id, options);
        // TODO: standardize this
        obj.root.setAttribute('x', x.toString());
        obj.root.setAttribute('y', y.toString());
        return obj;
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    button(x, y, label) {
        return this.appendChild(new _input_button_js__WEBPACK_IMPORTED_MODULE_7__["default"](x, y, label));
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    checkBox(x, y, label, value) {
        return this.appendChild(new _input_check_box_js__WEBPACK_IMPORTED_MODULE_8__["default"](x, y, label, value));
    }
    /**
    * Creates an icon at the position (x,y) with the provided dimensions.
    */
    icon(x, y, width, height, name, options = {}) {
        let baseURL;
        if (options.baseURL === undefined) {
            baseURL = 'resources/icons/';
        }
        else {
            baseURL = options.baseURL;
        }
        // check to see if the symbols group has been initialized
        if (this.symbols === undefined) {
            this.symbols = new _svg_group_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
            this.root.appendChild(this.symbols.root);
            this.icons = new Set();
        }
        // create a new icon element
        let icon = new _visual_icon_js__WEBPACK_IMPORTED_MODULE_6__["default"](x, y, width, height);
        this.appendChild(icon);
        // check to see if we have loaded this icon before
        let id = `${this.id}-${name}`;
        if (!this.icons.has(id)) {
            // TODO: maybe we should only request one SVG file with that defines many
            // icon symbols. Then add the symbols as needed from, rather than have
            // many network requests for symbols. Or maybe the user could add the
            // symbols to their web page themselves.
            let temp = this;
            Object(_util_file_js__WEBPACK_IMPORTED_MODULE_1__["getURL"])(`${baseURL}${name}.svg`).then(function (response) {
                let symbolSVG = Object(_util_svg_js__WEBPACK_IMPORTED_MODULE_2__["parseSVG"])(response);
                let symbol = temp.symbols.symbol();
                symbol.root.id = id;
                symbol.viewBox = symbolSVG.getAttribute('viewBox');
                while (symbolSVG.childNodes.length > 0) {
                    symbol.root.appendChild(symbolSVG.childNodes[0]);
                }
                icon.href = `#${id}`;
            }).catch(function (error) {
                throw error;
            });
        }
        else {
            icon.href = `#${id}`;
        }
        this.icons.add(id);
        return icon;
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    radioControl(x, y, labels, index = 0) {
        return this.appendChild(new _input_radio_control_js__WEBPACK_IMPORTED_MODULE_11__["default"](x, y, labels, index));
    }
    /**
    * Creates a dropdown input at the position (x,y) within this interactive.
    */
    dropdownControl(x, y, optionLabels, defaultIndex) {
        return this.appendChild(new _input_dropdown_control_js__WEBPACK_IMPORTED_MODULE_12__["default"](x, y, optionLabels, defaultIndex));
    }
    /**
    * Creates a control point within this interactive at the position (x,y).
    */
    control(x, y) {
        return this.appendChild(new _input_control_js__WEBPACK_IMPORTED_MODULE_9__["default"](x, y));
    }
    /**
    * Creates a control point within this interactive at the position (x,y).
    */
    controlCircle(x, y) {
        return this.appendChild(new _input_control_circle_js__WEBPACK_IMPORTED_MODULE_10__["default"](x, y));
    }
    /**
    * Creates a plot within this interactive at the position (x,y).
    */
    plot(fn, options) {
        return this.appendChild(new _elements_math_plot_js__WEBPACK_IMPORTED_MODULE_20__["default"](fn, options));
    }
    /**
    * Creates a graph element within this interactive
    */
    graph(options) {
        return this.appendChild(new _elements_graph_graph_js__WEBPACK_IMPORTED_MODULE_18__["default"](options));
    }
    hoverBox(str) {
        return this.appendChild(new _input_hover_box_js__WEBPACK_IMPORTED_MODULE_15__["default"](str));
    }
    /**
    * Creates a graph element within this interactive
    */
    map(externalData, featureName = null, options = {}) {
        let map = new _elements_maps_map_js__WEBPACK_IMPORTED_MODULE_19__["default"](featureName, externalData, options);
        let ret = this.appendChild(map);
        let bbox = map.root.getBBox();
        map.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
        return ret;
    }
    /**
    * Creates a slider input within this interactive
    */
    slider(x, y, options) {
        return this.appendChild(new _input_slider_js__WEBPACK_IMPORTED_MODULE_14__["default"](x, y, options));
    }
    /**
    * Creates a scrubber with a play and pause button at the position (x,y).
    */
    scrubber(x, y, options) {
        return this.appendChild(new _input_scrubber_js__WEBPACK_IMPORTED_MODULE_13__["default"](x, y, options));
    }
    /**
    * Creates a node within this interactive.
    */
    node(x, y, rx, ry, contents) {
        return this.appendChild(new _elements_graph_node_js__WEBPACK_IMPORTED_MODULE_16__["default"](x, y, rx, ry, contents));
    }
    /**
    * Creates an edge connecting two nodes within this interactive.
    */
    edge(nodeFrom, nodeTo, directed) {
        return this.appendChild(new _elements_graph_edge_js__WEBPACK_IMPORTED_MODULE_17__["default"](nodeFrom, nodeTo, directed));
    }
    /**
    *
    */
    loadSVG(url) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let group = new _svg_group_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
            this.appendChild(group);
            Object(_util_file_js__WEBPACK_IMPORTED_MODULE_1__["getURL"])(url).then(function (response) {
                group.root.appendChild(Object(_util_svg_js__WEBPACK_IMPORTED_MODULE_2__["parseSVG"])(response));
            }).catch(function (error) {
                throw error;
            });
            return group;
        });
    }
}


/***/ }),

/***/ "5nZz":
/*!**************************************************!*\
  !*** ./src/assets/source/elements/graph/edge.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Edge; });
/* harmony import */ var _svg_line_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svg/line.js */ "rpg+");

//Make the function static and extend from Line
/**
* Creates a line connecting two edges, with an arrow if directed.
*/
class Edge extends _svg_line_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a line frmo the edge of the two circle elements.
    */
    constructor(nodeFrom, nodeTo, directed) {
        let arr = Edge.calculateLinePosition(nodeFrom, nodeTo);
        let arr2 = Edge.calculateLinePositionEllipse(nodeFrom, nodeTo);
        if (directed && !Number.isNaN(arr[0])) {
            super(arr[0], arr[1], arr[2], arr[3]);
        }
        else {
            super(nodeFrom.cx, nodeFrom.cy, nodeTo.cx, nodeTo.cy);
        }
        this.directed = directed;
        this.nodeFrom = nodeFrom;
        this.nodeTo = nodeTo;
    }
    redraw() {
        this.x1 = this.nodeFrom.cx;
        this.y1 = this.nodeFrom.cy;
        this.x2 = this.nodeTo.cx;
        this.y2 = this.nodeTo.cy;
    }
    /**
    * Function to find where the line connecting two circles should go. return an Array
    * containing [x1, y1, x2, y2] of the line.
    */
    static calculateLinePosition(nodeFrom, nodeTo) {
        let y1 = nodeFrom.nodeEllipse.cy;
        let y2 = nodeTo.nodeEllipse.cy;
        let x1 = nodeFrom.nodeEllipse.cx;
        let x2 = nodeTo.nodeEllipse.cx;
        let deltaY = y2 - y1;
        let deltaX = x2 - x1;
        let L = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
        let r1Lx = nodeFrom.nodeEllipse.rx / L * deltaX;
        let r1Ly = nodeFrom.nodeEllipse.rx / L * deltaY;
        let r2Lx = nodeTo.nodeEllipse.rx / L * deltaX;
        let r2Ly = nodeTo.nodeEllipse.rx / L * deltaY;
        let y1Prime = y1 + r1Ly;
        let y2Prime = y2 - r2Ly;
        let x1Prime = x1 + r1Lx;
        let x2Prime = x2 - r2Lx;
        return new Array(x1Prime, y1Prime, x2Prime, y2Prime);
    }
    static calculateLinePositionEllipse(nodeFrom, nodeTo) {
        let newX = nodeFrom.cx - nodeTo.cx;
        let newY = nodeFrom.cy - nodeTo.cy;
        let theta = Math.atan(newY / newX);
        // console.log(theta);
        let cosx1 = Math.cos(theta);
        let siny1 = Math.sin(theta);
        let r2 = (nodeTo.cx * nodeTo.cy) / Math.sqrt(Math.pow(nodeTo.cx, 2) * Math.pow(cosx1, 2) + Math.pow(nodeTo.cy, 2) * Math.pow(siny1, 2));
        let r1 = (nodeFrom.cx * nodeFrom.cy) / Math.sqrt(nodeFrom.cx * Math.pow(cosx1, 2) + nodeFrom.cy * Math.pow(siny1, 2));
        // let lineX1 = r1 * cosx1
        // console.log(r2);
        return new Array(r2 * cosx1, r2 * siny1);
    }
}
//# sourceMappingURL=edge.js.map

/***/ }),

/***/ "624d":
/*!***************************************************!*\
  !*** ./src/assets/source/elements/svg/element.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Element; });
/* harmony import */ var _base_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base-element.js */ "ZMU7");

/**
* This class defines the basic shape for all SVG elements within our library.
*/
class Element extends _base_element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    // TODO: tranform object/property?
    /**
    * Constructs the elements and adds it into the current controller.
    */
    constructor(root) {
        super();
        // store the root element and set the id attribute
        this.root = root;
        this.root.id = this.id;
        this.root.classList.add(this.constructor.name.toLowerCase());
        // make the root's style declaration available
        this.style = this.root.style;
        this.classList = this.root.classList;
    }
    /**
    * Sets the provided attribute with the value. WARNING: Elements are given
    * a unique id by default. Changing the id may have unintended consequences.
    * Similarily, the style and class attributes should be accessed through the
    * properties "style" and "classList".
    */
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
        return this;
    }
    /**
    * Returns the value associated with the attribute.
    */
    getAttribute(name) {
        return this.root.getAttribute(name);
    }
    /**
    * Appends the element as a child within this element.
    */
    appendChild(child) {
        this.root.appendChild(child.root);
        return child;
    }
    /**
    * Inserts the element before the first child within this element.
    */
    prependChild(child) {
        this.root.prepend(child.root);
        return child;
    }
    /**
    * Returns true if this element contains the argument element.
    */
    contains(element) {
        return this.root.contains(element.root);
    }
    /**
    * Removes this element from the DOM and from the Element controller.
    */
    remove() {
        _base_element_js__WEBPACK_IMPORTED_MODULE_0__["default"].controller.remove(this);
        this.root.remove();
    }
    /**
    * Removes all child elements from this element.
    */
    clear() {
        let child;
        while (child = this.root.firstChild) {
            _base_element_js__WEBPACK_IMPORTED_MODULE_0__["default"].controller.get(child.id).remove();
        }
    }
    /**
    * Returns the bounding box of this element. Note, this is different from the
    * getBoundingClientRect method since the bounding box is affected by the
    * current viewPort.
    *
    * If this element's root is not a SVGGraphics element as is the case for the
    * marker, title, and more element, then null is returned instead of a DOMRect.
    */
    getBoundingBox() {
        if (this.root instanceof SVGGraphicsElement) {
            return this.root.getBBox();
        }
        else {
            return null;
        }
    }
}
//# sourceMappingURL=element.js.map

/***/ }),

/***/ "6MbF":
/*!***************************************************!*\
  !*** ./src/app/tagger/navbar/navbar.component.ts ***!
  \***************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _home_home_home_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../home/home/home.service */ "TPIa");



class NavbarComponent {
    constructor(homeService) {
        this.homeService = homeService;
    }
    get user() {
        return this.homeService.user;
    }
    ngOnInit() {
    }
}
NavbarComponent.ɵfac = function NavbarComponent_Factory(t) { return new (t || NavbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_home_home_home_service__WEBPACK_IMPORTED_MODULE_1__["HomeService"])); };
NavbarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavbarComponent, selectors: [["app-navbar"]], decls: 4, vars: 1, consts: [["src", "/assets\\images\\logograiph.png", "alt", ""], [2, "float", "right"]], template: function NavbarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.user.username);
    } }, styles: ["ul[_ngcontent-%COMP%] {\r\n    list-style-type: none;\r\n    margin: 0;\r\n    padding: 0;\r\n    overflow:hidden;\r\n    background-color: var(--darkgray);\r\n    max-height: 5em;\r\n\r\n  }\r\n  img[_ngcontent-%COMP%] {\r\n    margin-left:0%;\r\n    margin-right:0%;\r\n    max-height: 4em;\r\n    max-width: auto;\r\n    float: left;\r\n    }\r\n  li[_ngcontent-%COMP%] {\r\n    float: left;\r\n    height: 100%;\r\n  }\r\n  li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .dropbtn[_ngcontent-%COMP%] {\r\n    display: inline-block;\r\n    color: white;\r\n    text-align: center;\r\n    padding: 1.25em;\r\n    text-decoration: none;\r\n    transition: linear 250ms;\r\n  }\r\n  li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .dropdown[_ngcontent-%COMP%]:hover   .dropbtn[_ngcontent-%COMP%] {\r\n    background-color: var(--gray);\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmJhci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0kscUJBQXFCO0lBQ3JCLFNBQVM7SUFDVCxVQUFVO0lBQ1YsZUFBZTtJQUNmLGlDQUFpQztJQUNqQyxlQUFlOztFQUVqQjtFQUNBO0lBQ0UsY0FBYztJQUNkLGVBQWU7SUFDZixlQUFlO0lBQ2YsZUFBZTtJQUNmLFdBQVc7SUFDWDtFQUVGO0lBQ0UsV0FBVztJQUNYLFlBQVk7RUFDZDtFQUVBO0lBQ0UscUJBQXFCO0lBQ3JCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQix3QkFBd0I7RUFDMUI7RUFFQTtJQUNFLDZCQUE2QjtFQUMvQiIsImZpbGUiOiJuYXZiYXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInVsIHtcclxuICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBvdmVyZmxvdzpoaWRkZW47XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrZ3JheSk7XHJcbiAgICBtYXgtaGVpZ2h0OiA1ZW07XHJcblxyXG4gIH1cclxuICBpbWcge1xyXG4gICAgbWFyZ2luLWxlZnQ6MCU7XHJcbiAgICBtYXJnaW4tcmlnaHQ6MCU7XHJcbiAgICBtYXgtaGVpZ2h0OiA0ZW07XHJcbiAgICBtYXgtd2lkdGg6IGF1dG87XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIH1cclxuICBcclxuICBsaSB7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICB9XHJcbiAgXHJcbiAgbGkgYSwgLmRyb3BidG4ge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMS4yNWVtO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgdHJhbnNpdGlvbjogbGluZWFyIDI1MG1zO1xyXG4gIH1cclxuICBcclxuICBsaSBhOmhvdmVyLCAuZHJvcGRvd246aG92ZXIgLmRyb3BidG4ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JheSk7XHJcbiAgfVxyXG4gIFxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavbarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-navbar',
                templateUrl: './navbar.component.html',
                styleUrls: ['./navbar.component.css']
            }]
    }], function () { return [{ type: _home_home_home_service__WEBPACK_IMPORTED_MODULE_1__["HomeService"] }]; }, null); })();


/***/ }),

/***/ "6UAm":
/*!***********************************************************!*\
  !*** ./src/assets/source/elements/input/radio-control.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RadioControl; });
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input.js */ "Ambf");
/* harmony import */ var _check_box_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./check-box.js */ "Piay");


/**
*  Radio Buttons with labels. Only one of the checkboxes will be checked at any given time.
*/
class RadioControl extends _input_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /*
    * labels: the labels for the radio buttons
    * x: x position of control
    * y: y position of the control
    * index: the starting button to be highlighted
    */
    constructor(x, y, labels, index = 0) {
        if (labels === undefined || labels.length == 0) {
            throw new Error('Labels must not be empty');
        }
        super();
        this.root.setAttribute("transform", `translate(${x},${y})`);
        this.index = index;
        let counter = 0;
        this.list = [];
        let rc = this;
        labels.forEach((element, i) => {
            let checkbox = new _check_box_js__WEBPACK_IMPORTED_MODULE_1__["default"](0, counter, element, false);
            if (i == index) {
                checkbox.value = true;
            }
            checkbox.box.root.setAttribute('rx', '8px');
            checkbox.box.root.onmousedown = function () {
                rc.handleMouseDown(i);
                checkbox.value = true;
                rc.index = i;
                rc.onchange();
            };
            this.root.appendChild(checkbox.root);
            this.list.push(checkbox);
            counter += 24;
        });
    }
    get value() {
        return this.list[this.index].label.contents;
    }
    /*
    * returns the text of the currently selected button
    */
    getCurrentValue() {
        return this.list[this.index].label;
    }
    /*
    * when a button is selected, deselect all others
    */
    handleMouseDown(index) {
        this.list.forEach(element => {
            element.value = false;
        });
    }
}
//# sourceMappingURL=radio-control.js.map

/***/ }),

/***/ "8SZi":
/*!****************************************************!*\
  !*** ./src/assets/source/elements/input/slider.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Slider; });
/* harmony import */ var _control_circle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./control-circle.js */ "LyDu");
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input.js */ "Ambf");


/**
* A horizontal slider is an object that allows for a control to be moved along
* a user- defined range. The slider has a minimum value and a maximum value
* which default to the range [0, 1].
*/
class Slider extends _input_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
    * Constructs the slider at the position (x,y). The leftmost edge of the line
    * is placed at this location.
    */
    constructor(x, y, options) {
        super();
        let width;
        let value;
        this.x = x;
        this.y = y;
        options.width ? width = options.width : width = 100;
        options.value ? value = options.value : value = 0;
        options.min ? this._min = options.min : this._min = 0;
        options.max ? this._max = options.max : this._max = 1;
        this._line = this.line(x, y, x + width, y);
        this._line.root.style.strokeWidth = '1.5';
        this._line.root.style.strokeLinecap = 'round';
        this._control = new _control_circle_js__WEBPACK_IMPORTED_MODULE_0__["default"](x + value, y);
        this._control.constrainWithinBox(x, y, x + width, y);
        this._control.point.r -= 1.5;
        this._control.handle.r -= 2;
        this._control.handle.style.strokeWidth = '2';
        this.appendChild(this._control);
        this.value = value;
        let slider = this;
        let fn = slider._control.onchange;
        slider._control.onchange = function () {
            fn();
            slider.onchange();
        };
    }
    /**
    * Returns the width of the display line
    */
    get width() {
        return this._line.x2 - this._line.x1;
    }
    /**
    * Sets the width of the display line
    */
    set width(width) {
        this._line.x2 = this._line.x1 + width;
        this._control.constrainWithinBox(this._line.x1, this._line.y1, this._line.x2, this._line.y2);
    }
    /**
    * Returns the value currently represented by this slider.
    */
    get value() {
        return (this._control.x - this._line.x1) / this.width * (this.range) + this._min;
    }
    /**
    * Sets the value currently represented by this slider.
    */
    set value(n) {
        this._control.x = this._line.x1 + (n - this._min) / this.range * (this.width);
    }
    set step(value) {
        let line = this._line;
        this._control.constrain = function (oldPosition, newPosition) {
            let x = newPosition.x;
            let y = newPosition.y;
            // constrain to line
            if (x < line.x1) {
                x = line.x1;
            }
            if (y < line.y1) {
                y = line.y1;
            }
            if (x > line.x2) {
                x = line.x2;
            }
            if (y > line.y2) {
                y = line.y2;
            }
            // constrain to step size
            x = Math.floor(x / 50) * 50;
            return { x: x, y: y };
        };
    }
    /**
    * Returns the minimum possible value of the range.
    */
    get min() {
        return this._min;
    }
    /**
    * Sets the minimum possible value of the range.
    */
    set min(value) {
        this._min = value;
    }
    /**
    * Returns the maximum possible value of the range.
    */
    get max() {
        return this._max;
    }
    /**
    * Returns the maximum possible value of the range.
    */
    set max(value) {
        this._max = value;
    }
    /**
    * Returns the length of the range represented by this slider.
    */
    get range() {
        return this.max - this.min;
    }
}
//# sourceMappingURL=slider.js.map

/***/ }),

/***/ "8j+T":
/*!***************************************************!*\
  !*** ./node_modules/export-to-csv/build/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./export-to-csv */ "Xljc"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "9ts+":
/*!************************************************!*\
  !*** ./src/app/tagger/imagebar/image-class.ts ***!
  \************************************************/
/*! exports provided: ImageClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageClass", function() { return ImageClass; });
class ImageClass {
}


/***/ }),

/***/ "AgtC":
/*!*****************************************************!*\
  !*** ./src/assets/source/elements/svg/rectangle.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rectangle; });
/* harmony import */ var _shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shape.js */ "kBcD");

/**
* A rectangle is a basic element with a position, width, and height. The
* position refers to the top left corner of the rectangle
*/
class Rectangle extends _shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(x, y, width, height) {
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttributeNS(null, 'x', x.toString());
        rect.setAttributeNS(null, 'y', y.toString());
        rect.setAttributeNS(null, 'width', width.toString());
        rect.setAttributeNS(null, 'height', height.toString());
        super(rect);
    }
    // comment inherited from base class
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
        return this;
    }
    // comment inherited from base class
    getAttribute(name) {
        return this.root.getAttribute(name);
    }
    /**
    * Returns the x position of the rectangle
    */
    get x() {
        return this.root.x.baseVal.value;
    }
    /**
    * Sets the x position of the rectangle
    */
    set x(n) {
        this.root.x.baseVal.value = n;
    }
    /**
    * Returns the y position of the rectangle
    */
    get y() {
        return this.root.y.baseVal.value;
    }
    /**
    * Sets the y position of the rectangle
    */
    set y(n) {
        this.root.y.baseVal.value = n;
    }
    /**
    * Returns the width of the rectangle
    */
    get width() {
        return this.root.width.baseVal.value;
    }
    /**
    * Sets the width of the rectangle
    */
    set width(n) {
        this.root.width.baseVal.value = n;
    }
    /**
    * Returns the height of the rectangle
    */
    get height() {
        return this.root.height.baseVal.value;
    }
    /**
    * Sets the height of the rectangle
    */
    set height(n) {
        this.root.height.baseVal.value = n;
    }
    /*
    * Translates the position of the rectangle to a new position from its current
    * position. TODO: this is inconsistent with other translate methods within
    * the elements. Probably best to conform to how SVG implements translate with
    * the transform attribute, and then implement a move method or something.
    */
    translate(x, y) {
        this.root.x.baseVal.value = this.root.x.baseVal.value + x;
        this.root.y.baseVal.value = this.root.y.baseVal.value + y;
    }
    /**
    * Returns the fill style of this rectangle
    */
    get fill() {
        return this.root.style.fill;
    }
    /**
    * Sets the fill style of this rectangle
    */
    set fill(s) {
        this.root.style.fill = s;
    }
    /**
    * Returns the stroke style of this rectangle
    */
    get stroke() {
        return this.root.style.stroke;
    }
    /**
    * Sets the stroke style of this rectangle
    */
    set stroke(s) {
        this.root.style.stroke = s;
    }
}


/***/ }),

/***/ "Ambf":
/*!***************************************************!*\
  !*** ./src/assets/source/elements/input/input.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Input; });
/* harmony import */ var _svg_group_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svg/group.js */ "sFit");

/**
* An object that takes in user input in the form of user events.
*/
class Input extends _svg_group_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a new input group.
    */
    constructor() {
        super();
        // set the default behavior of the onchange function
        let input = this;
        input._onchange = function () {
            input.updateDependents();
        };
    }
    /**
    * This function is called whenever the state of an input element changes. The
    * default behavior of this function is to update the dependents of this
    * element. WARNING: changing this function can have unintented side effects.
    */
    set onchange(func) {
        this._onchange = func;
    }
    get onchange() {
        return this._onchange;
    }
}
//# sourceMappingURL=input.js.map

/***/ }),

/***/ "B01R":
/*!**************************************************!*\
  !*** ./src/assets/source/elements/svg/circle.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Circle; });
/* harmony import */ var _shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shape.js */ "kBcD");

/**
* A circle is a basic geometric element with a position and radius.
*
* Geometric Properties:
*   - cx
*   - cy
*   - r
*/
class Circle extends _shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(cx, cy, r) {
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttributeNS(null, 'cx', cx.toString());
        circle.setAttributeNS(null, 'cy', cy.toString());
        circle.setAttributeNS(null, 'r', r.toString());
        super(circle);
    }
    /**
    * Returns the radius of this circle.
    */
    get r() {
        return this.root.r.baseVal.value;
    }
    /**
    * Sets the value of the radius of this circle.
    */
    set r(value) {
        this.root.r.baseVal.value = value;
    }
    /**
    * Returns the x position of the rectangle
    */
    get cx() {
        return this.root.cx.baseVal.value;
    }
    /**
    * Sets the x position of the rectangle
    */
    set cx(n) {
        this.root.cx.baseVal.value = n;
    }
    /**
    * Returns the y position of the rectangle
    */
    get cy() {
        return this.root.cy.baseVal.value;
    }
    /**
    * Sets the y position of the rectangle
    */
    set cy(n) {
        this.root.cy.baseVal.value = n;
    }
    getPath() {
        throw new Error("Method not implemented.");
    }
    /**
    * Translates the circle to a new position by changing the x and y attributes.
    */
    //TODO: Change
    translate(x, y) {
        this.root.cx.baseVal.value = this.root.cx.baseVal.value + x;
        this.root.cy.baseVal.value = this.root.cy.baseVal.value + y;
    }
    /**
    * Returns the fill style of this circle
    */
    get fill() {
        return this.root.style.fill;
    }
    /**
    * Sets the fill style of this circle
    */
    set fill(s) {
        this.root.style.fill = s;
    }
    /**
    * Returns the stroke style of this circle
    */
    get stroke() {
        return this.root.style.stroke;
    }
    /**
    * Sets the stroke style of this circle
    */
    set stroke(s) {
        this.root.style.stroke = s;
    }
}
//# sourceMappingURL=circle.js.map

/***/ }),

/***/ "B2gg":
/*!***********************************************!*\
  !*** ./src/assets/source/elements/svg/use.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Use; });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "624d");

class Use extends _element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y, width, height) {
        let element = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        element.setAttributeNS(null, 'x', x.toString());
        element.setAttributeNS(null, 'y', y.toString());
        element.setAttributeNS(null, 'width', width.toString());
        element.setAttributeNS(null, 'height', height.toString());
        super(element);
    }
    get href() {
        return this.root.href.baseVal;
    }
    set href(value) {
        this.root.href.baseVal = value;
    }
    /**
  * Returns the x position of the rectangle
  */
    get x() {
        return this.root.x.baseVal.value;
    }
    /**
    * Sets the x position of the rectangle
    */
    set x(n) {
        this.root.x.baseVal.value = n;
    }
    /**
    * Returns the y position of the rectangle
    */
    get y() {
        return this.root.y.baseVal.value;
    }
    /**
    * Sets the y position of the rectangle
    */
    set y(n) {
        this.root.y.baseVal.value = n;
    }
    /**
    * Returns the width of the rectangle
    */
    get width() {
        return this.root.width.baseVal.value;
    }
    /**
    * Sets the width of the rectangle
    */
    set width(n) {
        this.root.width.baseVal.value = n;
    }
    /**
    * Returns the height of the rectangle
    */
    get height() {
        return this.root.height.baseVal.value;
    }
    /**
    * Sets the height of the rectangle
    */
    set height(n) {
        this.root.height.baseVal.value = n;
    }
}
//# sourceMappingURL=use.js.map

/***/ }),

/***/ "CZHR":
/*!*****************************************************!*\
  !*** ./src/assets/source/elements/svg/clip-path.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClipPath; });
/* harmony import */ var _circle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./circle.js */ "B01R");
/* harmony import */ var _ellipse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ellipse.js */ "kGPW");
/* harmony import */ var _line_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./line.js */ "rpg+");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./path.js */ "Gl8z");
/* harmony import */ var _polygon_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./polygon.js */ "ldAV");
/* harmony import */ var _rectangle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rectangle.js */ "TU2K");
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./element.js */ "624d");
/* harmony import */ var _description_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./description.js */ "ET4v");
/* harmony import */ var _meta_data_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./meta-data.js */ "uE+z");
/* harmony import */ var _title_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./title.js */ "s2Zq");










class ClipPath extends _element_js__WEBPACK_IMPORTED_MODULE_6__["default"] {
    constructor() {
        let clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
        super(clipPath);
    }
    circle(cx, cy, r) {
        return this.appendChild(new _circle_js__WEBPACK_IMPORTED_MODULE_0__["default"](cx, cy, r));
    }
    ellipse(cx, cy, rx, ry) {
        return this.appendChild(new _ellipse_js__WEBPACK_IMPORTED_MODULE_1__["default"](cx, cy, rx, ry));
    }
    line(x1, y1, x2, y2) {
        return this.appendChild(new _line_js__WEBPACK_IMPORTED_MODULE_2__["default"](x1, y1, x2, y2));
    }
    path(d) {
        return this.appendChild(new _path_js__WEBPACK_IMPORTED_MODULE_3__["default"](d));
    }
    polygon(points) {
        return this.appendChild(new _polygon_js__WEBPACK_IMPORTED_MODULE_4__["default"](points));
    }
    rectangle(x, y, width, height) {
        return this.appendChild(new _rectangle_js__WEBPACK_IMPORTED_MODULE_5__["default"](x, y, width, height));
    }
    description() {
        return this.appendChild(new _description_js__WEBPACK_IMPORTED_MODULE_7__["default"]());
    }
    metadata() {
        return this.appendChild(new _meta_data_js__WEBPACK_IMPORTED_MODULE_8__["default"]());
    }
    title() {
        return this.appendChild(new _title_js__WEBPACK_IMPORTED_MODULE_9__["default"]());
    }
}
//# sourceMappingURL=clip-path.js.map

/***/ }),

/***/ "Dzuf":
/*!*****************************************!*\
  !*** ./src/app/tagger/tagger.module.ts ***!
  \*****************************************/
/*! exports provided: TaggerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaggerModule", function() { return TaggerModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _draws_draws_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./draws/draws.component */ "yjOQ");
/* harmony import */ var _imagebar_imagebar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./imagebar/imagebar.component */ "Qixj");
/* harmony import */ var _imports_imports_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./imports/imports.component */ "fOIt");
/* harmony import */ var _main_main_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./main/main.component */ "UIzP");
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sidebar/sidebar.component */ "HdEH");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./navbar/navbar.component */ "6MbF");
/* harmony import */ var _tagger_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tagger-routing.module */ "g9is");










class TaggerModule {
}
TaggerModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: TaggerModule });
TaggerModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function TaggerModule_Factory(t) { return new (t || TaggerModule)(); }, providers: [], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _tagger_routing_module__WEBPACK_IMPORTED_MODULE_8__["TaggerRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](TaggerModule, { declarations: [_draws_draws_component__WEBPACK_IMPORTED_MODULE_2__["DrawsComponent"],
        _imagebar_imagebar_component__WEBPACK_IMPORTED_MODULE_3__["ImagebarComponent"],
        _imports_imports_component__WEBPACK_IMPORTED_MODULE_4__["ImportsComponent"],
        _main_main_component__WEBPACK_IMPORTED_MODULE_5__["MainComponent"],
        _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_6__["SidebarComponent"],
        _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_7__["NavbarComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _tagger_routing_module__WEBPACK_IMPORTED_MODULE_8__["TaggerRoutingModule"]], exports: [_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_7__["NavbarComponent"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](TaggerModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                    _tagger_routing_module__WEBPACK_IMPORTED_MODULE_8__["TaggerRoutingModule"]
                ],
                exports: [
                    _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_7__["NavbarComponent"]
                ],
                declarations: [
                    _draws_draws_component__WEBPACK_IMPORTED_MODULE_2__["DrawsComponent"],
                    _imagebar_imagebar_component__WEBPACK_IMPORTED_MODULE_3__["ImagebarComponent"],
                    _imports_imports_component__WEBPACK_IMPORTED_MODULE_4__["ImportsComponent"],
                    _main_main_component__WEBPACK_IMPORTED_MODULE_5__["MainComponent"],
                    _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_6__["SidebarComponent"],
                    _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_7__["NavbarComponent"]
                ],
                providers: [],
            }]
    }], null, null); })();


/***/ }),

/***/ "E8aT":
/*!*****************************************************!*\
  !*** ./src/assets/source/model/dependency-graph.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DependencyGraph; });
/* harmony import */ var _linked_list_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linked-list.js */ "g5PK");

/**
A dependency graph models relationships between nodes. The graph is directed and asyclic, throwing a circular dependency exception if circular dependencies are added.
*/
class DependencyGraph {
    /**
    Constructs an empty dependency graph.
    */
    constructor() {
        this.relationships = new Map();
        this._size = 0;
    }
    /***
    Adds a node into the dependency graph. If the node already exists within the graph, does nothing.
    */
    add(node) {
        if (!this.contains(node)) {
            this.relationships.set(node, new Set());
            this._size++;
        }
    }
    /**
    Returns true if the node exists within the dependency graph.
    */
    contains(node) {
        return this.relationships.has(node);
    }
    /**
    Removes the node from the dependency graph. If the node does not exist does nothing.
    */
    remove(node) {
        if (this.relationships.delete(node)) {
            this._size--;
        }
    }
    /**
    Returns the number of vertices in the dependency graph.
    */
    size() {
        return this._size;
    }
    /**
    Adds a dependency between two nodes. If either of the nodes do not exist within the dependency graph, throws an exception.
    */
    addDependency(from, to) {
        // Make sure the nodes exist
        this.add(from);
        this.add(to);
        // Add the dependency
        this.relationships.get(from).add(to);
        // Check for circular dependencies
        this.traverse(from, from);
    }
    /**
    Traverses the graph structuring checking for circular dependecies. If a circular dependency is added, throws an error.
    */
    traverse(current, node, visited = new Set()) {
        // Mark this node as visited
        visited.add(current);
        // Recursively call this method on dependents of the argument node
        let dependents = this.getDependents(current, true);
        for (let d of dependents) {
            // Check if this dependency causes a circular dependency
            if (d == node) {
                throw new Error("circular dependency");
            }
            // Continue traversing un-explored nodes
            if (!visited.has(d)) {
                this.traverse(d, node, visited);
            }
        }
    }
    /**
    Returns true if a node has dependents.
    */
    hasDependents(node) {
        return this.contains(node) && this.relationships.get(node).size != 0;
    }
    /**
    * Returns the adjacent dependent nodes.
    */
    getAdjacentNodes(node) {
        return this.relationships.get(node);
    }
    /**
    * Returns an iterator to the dependents of the node.
    */
    getDependents(node, shallow = false) {
        // If the node does not exist return an empty iterable
        if (!this.relationships.has(node)) {
            return [];
        }
        // If shallow, return adjacent dependencies.
        if (shallow) {
            return this.relationships.get(node).keys();
        }
        else {
            // Get the dependents including the original node.
            let list = this.getTopologicalDependents(node);
            // Remove the starting node and return the dependents.
            list.remove();
            return list;
        }
    }
    /**
    * Returns a topological sort of this dependency
    */
    getTopologicalSort() {
        let list = new _linked_list_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        let visited = new Set();
        for (let node of this.getNodes()) {
            if (!visited.has(node)) {
                this.getTopologicalDependents(node, visited, list);
            }
        }
        return list;
    }
    /**
    Returns a list of the arguent node and all of its dependents in topological order.
    */
    getTopologicalDependents(node, visited = new Set(), list = new _linked_list_js__WEBPACK_IMPORTED_MODULE_0__["default"]()) {
        // Mark this node as visited
        visited.add(node);
        // Recursively call this method on dependents of the argument node
        let dependents = this.getDependents(node, true);
        for (let d of dependents) {
            if (!visited.has(d)) {
                this.getTopologicalDependents(d, visited, list);
            }
        }
        // Insert node to the front of iterator to retain Topological ordering
        list.insert(node);
        return list;
    }
    /**
    Returns the nodes within this dependency graph.
    */
    getNodes() {
        return this.relationships.keys();
    }
    /**
    Returns a string representation of this dependency graph.
    */
    toString() {
        // Build a string of dependencies in the form of from->to
        let result = "";
        for (let from of this.getNodes()) {
            for (let to of this.getDependents(from, true)) {
                result += from.toString() + '->' + to.toString() + '\n';
            }
        }
        return result;
    }
    /**
    Generates a DependenyGraph object from a string representation.
    */
    static Generate(str) {
        let graph = new DependencyGraph();
        // Prime the loop
        let start = 0;
        let index = str.indexOf('->', start);
        while (index > 0) {
            // Get the first part of the dependency
            let from = str.substring(start, index);
            // Get the second part of the dependency
            start = index + 1;
            index = str.indexOf('\n', index);
            let to = str.substring(start + 1, index);
            // Add the dependency to the graph
            graph.addDependency(from, to);
            // Get the next string if there is one
            start = index + 1;
            index = str.indexOf('->', start);
        }
        return graph;
    }
}
//# sourceMappingURL=dependency-graph.js.map

/***/ }),

/***/ "ENXh":
/*!**************************************************!*\
  !*** ./src/assets/source/elements/svg/symbol.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Symbol; });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "624d");

/**
* A symbol is a reusable graphic.
*/
class Symbol extends _element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        let symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
        super(symbol);
    }
    // geometric properties
    get x() {
        throw new Error('Not Implemented');
    }
    set x(value) {
        throw new Error('Not Implemented');
    }
    get y() {
        throw new Error('Not Implemented');
    }
    set y(value) {
        throw new Error('Not Implemented');
    }
    get width() {
        throw new Error('Not Implemented');
    }
    set width(value) {
        throw new Error('Not Implemented');
    }
    get height() {
        throw new Error('Not Implemented');
    }
    set height(value) {
        throw new Error('Not Implemented');
    }
    // attributes
    get preserveAspectRatio() {
        throw new Error('Not Implemented');
    }
    set preserveAspectRatio(value) {
        throw new Error('Not Implemented');
    }
    get viewBox() {
        return this.root.getAttribute('viewBox');
    }
    set viewBox(value) {
        this.root.setAttributeNS(null, 'viewBox', value);
    }
    get refX() {
        throw new Error('Not Implemented');
    }
    set refX(value) {
        throw new Error('Not Implemented');
    }
    get refY() {
        throw new Error('Not Implemented');
    }
    set refY(value) {
        throw new Error('Not Implemented');
    }
}
//# sourceMappingURL=symbol.js.map

/***/ }),

/***/ "ET4v":
/*!*******************************************************!*\
  !*** ./src/assets/source/elements/svg/description.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Description; });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "624d");

class Description extends _element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        let desc = document.createElementNS('http://www.w3.org/2000/svg', 'desc');
        super(desc);
    }
}
//# sourceMappingURL=description.js.map

/***/ }),

/***/ "GAEk":
/*!***********************************************!*\
  !*** ./src/assets/source/elements/svg/svg.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SVG; });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "624d");
/* harmony import */ var _circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./circle.js */ "B01R");
/* harmony import */ var _clip_path_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clip-path.js */ "CZHR");
/* harmony import */ var _definitions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./definitions.js */ "dLU0");
/* harmony import */ var _description_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./description.js */ "ET4v");
/* harmony import */ var _ellipse_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ellipse.js */ "kGPW");
/* harmony import */ var _group_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./group.js */ "sFit");
/* harmony import */ var _line_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./line.js */ "rpg+");
/* harmony import */ var _marker_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./marker.js */ "q70P");
/* harmony import */ var _meta_data_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./meta-data.js */ "uE+z");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./path.js */ "Gl8z");
/* harmony import */ var _polygon_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./polygon.js */ "ldAV");
/* harmony import */ var _rectangle_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./rectangle.js */ "TU2K");
/* harmony import */ var _symbol_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./symbol.js */ "ENXh");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./text.js */ "maoU");
/* harmony import */ var _title_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./title.js */ "s2Zq");
/* harmony import */ var _use_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./use.js */ "B2gg");
/* harmony import */ var _a_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./a.js */ "cyCt");
/* harmony import */ var _script_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./script.js */ "JbtM");



















/**
* This class represents a SVG element. There are four geometric properties x, y,
* width, and height. The (x,y) properties only affect nested SVG elements.
*/
class SVG extends _element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a svg element.
    */
    constructor(x, y, width, height) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        if (x) {
            svg.setAttributeNS(null, 'x', x.toString());
        }
        if (y) {
            svg.setAttributeNS(null, 'y', y.toString());
        }
        if (width) {
            svg.setAttributeNS(null, 'width', width.toString());
        }
        if (height) {
            svg.setAttributeNS(null, 'height', height.toString());
        }
        super(svg);
    }
    /**
    * Constructs and returns a SVG object within the DOM.  If the provided
    * argument is an HTMLElement appends the interactive within that element. If
    * the provided a value is a string, appends the interactive within the HTML
    * element with the corresponding ID. If no element is found throws an error.
    */
    static SVG(idOrElement, x, y, width, height) {
        // get the container element
        let container;
        if (typeof idOrElement == "string") {
            container = document.getElementById(idOrElement);
            if (container === null || container === undefined) {
                throw new Error(`There is no HTML element with the id: ${idOrElement}`);
            }
        }
        else {
            container = idOrElement;
        }
        // construct and append the svg
        let svg = new SVG(x, y, width, height);
        container.appendChild(svg.root);
        return svg;
    }
    /**
    * Return the width of this svg element.
    */
    get width() {
        // return this.root.width.baseVal.value;
        return parseInt(this.root.getAttribute('width'));
    }
    /**
    * Set the width of this svg element.
    */
    set width(value) {
        // this.root.width.baseVal.value = value;
        this.root.setAttributeNS(null, 'width', value.toString());
    }
    /**
    * Returns the height of this svg element.
    */
    get height() {
        // return this.root.height.baseVal.value;
        return parseInt(this.root.getAttribute('height'));
    }
    /**
    * Sets the height of this svg element to the provided value.
    */
    set height(value) {
        // this.root.height.baseVal.value = value;
        this.root.setAttributeNS(null, 'height', value.toString());
    }
    get x() {
        return this.root.x.baseVal.value;
    }
    set x(value) {
        this.root.x.baseVal.value = value;
    }
    get y() {
        return this.root.y.baseVal.value;
    }
    set y(value) {
        this.root.y.baseVal.value = value;
    }
    get viewBox() {
        return this.root.getAttribute('viewBox');
    }
    set viewBox(value) {
        this.root.setAttribute('viewBox', value);
    }
    setViewBox(x, y, width, height) {
        this.viewBox = `${x} ${y} ${width} ${height}`;
    }
    // comment inherited from base class
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
        return this;
    }
    // comment inherited from base class
    getAttribute(name) {
        return this.root.getAttribute(name);
    }
    // descriptive elements
    description() {
        return this.appendChild(new _description_js__WEBPACK_IMPORTED_MODULE_4__["default"]());
    }
    metadata() {
        return this.appendChild(new _meta_data_js__WEBPACK_IMPORTED_MODULE_9__["default"]());
    }
    title() {
        return this.appendChild(new _title_js__WEBPACK_IMPORTED_MODULE_15__["default"]());
    }
    // shape elements
    circle(cx, cy, r) {
        return this.appendChild(new _circle_js__WEBPACK_IMPORTED_MODULE_1__["default"](cx, cy, r));
    }
    ellipse(cx, cy, rx, ry) {
        return this.appendChild(new _ellipse_js__WEBPACK_IMPORTED_MODULE_5__["default"](cx, cy, rx, ry));
    }
    line(x1, y1, x2, y2) {
        return this.appendChild(new _line_js__WEBPACK_IMPORTED_MODULE_7__["default"](x1, y1, x2, y2));
    }
    path(d) {
        return this.appendChild(new _path_js__WEBPACK_IMPORTED_MODULE_10__["default"](d));
    }
    polygon(points) {
        return this.appendChild(new _polygon_js__WEBPACK_IMPORTED_MODULE_11__["default"](points));
    }
    rectangle(x, y, width, height) {
        return this.appendChild(new _rectangle_js__WEBPACK_IMPORTED_MODULE_12__["default"](x, y, width, height));
    }
    // structural elements
    defs() {
        return this.appendChild(new _definitions_js__WEBPACK_IMPORTED_MODULE_3__["default"]());
    }
    group() {
        return this.appendChild(new _group_js__WEBPACK_IMPORTED_MODULE_6__["default"]());
    }
    svg(x, y, width, height) {
        return this.appendChild(new SVG(x, y, width, height));
    }
    symbol() {
        return this.appendChild(new _symbol_js__WEBPACK_IMPORTED_MODULE_13__["default"]());
    }
    use(x, y, width, height) {
        return this.appendChild(new _use_js__WEBPACK_IMPORTED_MODULE_16__["default"](x, y, width, height));
    }
    // typography elements
    text(x, y, str) {
        return this.appendChild(new _text_js__WEBPACK_IMPORTED_MODULE_14__["default"](x, y, str));
    }
    // other elements
    /**
    * Constructs and appends an 'a' (link) element within this element.
    */
    a(href) {
        return this.appendChild(new _a_js__WEBPACK_IMPORTED_MODULE_17__["default"](href));
    }
    /**
    * Constructs and appends a 'clipPath' element within this element.
    */
    clipPath() {
        return this.appendChild(new _clip_path_js__WEBPACK_IMPORTED_MODULE_2__["default"]());
    }
    /**
    * Constructs and appends a 'marker' element within this element.
    */
    marker(refX, refY, width, height) {
        return this.appendChild(new _marker_js__WEBPACK_IMPORTED_MODULE_8__["default"](refX, refY, width, height));
    }
    /**
    * Constructs and appends a 'script' element within this element.
    */
    script() {
        return this.appendChild(new _script_js__WEBPACK_IMPORTED_MODULE_18__["default"]());
    }
}
//# sourceMappingURL=svg.js.map

/***/ }),

/***/ "Gl8z":
/*!************************************************!*\
  !*** ./src/assets/source/elements/svg/path.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Path; });
/* harmony import */ var _shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shape.js */ "kBcD");
/* harmony import */ var _circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./circle.js */ "B01R");
/* harmony import */ var _ellipse_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ellipse.js */ "kGPW");
/* harmony import */ var _line_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./line.js */ "rpg+");
/* harmony import */ var _rectangle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rectangle.js */ "TU2K");





/**
* A path element allows for the creation of complicated shapes and curves.
*/
class Path extends _shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Construct a new path element with a string of commands.
    */
    constructor(d) {
        // TODO: see comment above the type of the root
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        super(path);
    }
    /**
    * Returns the d attribute
    */
    get d() {
        return this.root.getAttribute('d');
    }
    /**
    * Sets the d attribute
    */
    set d(d) {
        this.root.setAttribute('d', d);
    }
    /**
    * Returns the path representation of the provided shape.
    */
    static getPath(shape) {
        throw Error('Not Implemented');
        if (this instanceof _circle_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
            throw Error('Not Implemented');
        }
        else if (this instanceof _ellipse_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            throw Error('Not Implemented');
        }
        else if (this instanceof _line_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
            throw Error('Not Implemented');
        }
        else if (this instanceof Path) {
            throw Error('Not Implemented');
        }
        else if (this instanceof _rectangle_js__WEBPACK_IMPORTED_MODULE_4__["default"]) {
            throw Error('Not Implemented');
        }
    }
}
//# sourceMappingURL=path.js.map

/***/ }),

/***/ "HdEH":
/*!*****************************************************!*\
  !*** ./src/app/tagger/sidebar/sidebar.component.ts ***!
  \*****************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _sidebar_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidebar.service */ "O8K7");
/* harmony import */ var _imagebar_imagebar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../imagebar/imagebar.component */ "Qixj");
/* harmony import */ var _draws_draws_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../draws/draws.component */ "yjOQ");
/* harmony import */ var _imports_imports_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../imports/imports.component */ "fOIt");






const _c0 = ".sidenav[_ngcontent-%COMP%] {\r\n    height: 100%;\r\n    width: 15%;\r\n    position: fixed;\r\n    z-index: 1;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: var(--darkgray);\r\n    \r\n    overflow-x: hidden;\r\n    \r\n    padding-top: 20px;\r\n    min-width: 15em;    \r\n}\r\n\r\n\r\n\r\n\r\n.sidenav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n    padding: 6px 8px 6px 16px;\r\n    text-decoration: none;\r\n    font-size: 25px;\r\n    color: var(--white);\r\n    display: block;\r\n    cursor: pointer;    \r\n    font-family:myFontMedium;\r\n    transition: linear 250ms;\r\n    \r\n    max-width: -webkit-fit-content;\r\n    \r\n    max-width: -moz-fit-content;\r\n    \r\n    max-width: fit-content;\r\n}\r\n\r\n\r\n\r\n\r\n.sidenav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\r\n    color: var(--lightgray);\r\n    background-color: var(--gray);\r\n}\r\n\r\n\r\n\r\n\r\n.sidenav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n    padding: 10px 10px 1px 20px;\r\n    text-decoration: none;\r\n    font-size: 15px;\r\n    color: var(--black);\r\n    display: block;\r\n    cursor: pointer;\r\n    transition: linear 250ms;\r\n    \r\n    font-family:myFont;\r\n}\r\n\r\n\r\n\r\n\r\n.sidenav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\r\n    color: var(--lightgray)\r\n}\r\n\r\n\r\n\r\n\r\n.switch[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    width: 4em;\r\n    height: 2em;\r\n    margin-left: 1em;\r\n    margin-top: 1.5em;\r\n  }\r\n\r\n\r\n\r\n\r\n.switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { \r\n    opacity: 0;\r\n    width: 0;\r\n    height: 0;\r\n  }\r\n\r\n\r\n\r\n\r\n.slider[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    cursor: pointer;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    background-color: var(--lightgray);\r\n    transition: .4s;\r\n  }\r\n\r\n\r\n\r\n\r\n.slider[_ngcontent-%COMP%]:before {\r\n    position: absolute;\r\n    content: \"\";\r\n    height: 2em;\r\n    width: 2em;\r\n    background-color: var(--white);\r\n    transition: .4s;\r\n  }\r\n\r\n\r\n\r\n\r\ninput[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%] {\r\n    background-color: var(--green);\r\n  }\r\n\r\n\r\n\r\n\r\ninput[_ngcontent-%COMP%]:focus    + .slider[_ngcontent-%COMP%] {\r\n    box-shadow: 0 0 1px var(--green);\r\n  }\r\n\r\n\r\n\r\n\r\ninput[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%]:before {\r\n    transform: translateX(2em);\r\n  }\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n.slider.round[_ngcontent-%COMP%] {\r\n    border-radius: 34px;\r\n  }\r\n\r\n\r\n\r\n\r\n.slider.round[_ngcontent-%COMP%]:before {\r\n    border-radius: 50%;\r\n  }\r\n\r\n\r\n\r\n\r\n.box[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\r\n    background-color:var(--gray);\r\n    color: var(--black);\r\n    padding: 12px;\r\n    width: -webkit-fit-content;\r\n    width: -moz-fit-content;\r\n    width: fit-content;\r\n    font-family: myFont;\r\n    box-shadow: var(--purple);\r\n    outline: none;\r\n    margin-left: 1em;\r\n    margin-top: 1em;\r\n    margin-bottom: 1em;\r\n    border-radius: 4px;\r\n    cursor: pointer;\r\n    border: none;\r\n    }\r\n\r\n\r\n\r\n\r\n.box[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:hover {\r\n      background-color: var(--orange);\r\n  }\r\n\r\n\r\n\r\n\r\n.text[_ngcontent-%COMP%]{\r\n    font-family: myFont;\r\n    color: var(--white);\r\n    margin-left: 1.5em;\r\n    margin-bottom: 0em;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZGViYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7SUFDWixVQUFVO0lBQ1YsZUFBZTtJQUNmLFVBQVU7SUFDVixNQUFNO0lBQ04sT0FBTztJQUNQLGlDQUFpQztJQUNqQyxVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLDhCQUE4QjtJQUM5QixpQkFBaUI7SUFDakIsZUFBZTtBQUNuQjs7Ozs7QUFLQTtJQUNJLHlCQUF5QjtJQUN6QixxQkFBcUI7SUFDckIsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixjQUFjO0lBQ2QsZUFBZTtJQUNmLHdCQUF3QjtJQUN4Qix3QkFBd0I7O0lBRXhCLDhCQUFzQjs7SUFBdEIsMkJBQXNCOztJQUF0QixzQkFBc0I7QUFDMUI7Ozs7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsNkJBQTZCO0FBQ2pDOzs7OztBQUVBO0lBQ0ksMkJBQTJCO0lBQzNCLHFCQUFxQjtJQUNyQixlQUFlO0lBQ2YsbUJBQW1CO0lBQ25CLGNBQWM7SUFDZCxlQUFlO0lBQ2Ysd0JBQXdCOztJQUV4QixrQkFBa0I7QUFDdEI7Ozs7O0FBRUE7SUFDSTtBQUNKOzs7OztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtFQUNuQjs7Ozs7QUFFQTtJQUNFLFVBQVU7SUFDVixRQUFRO0lBQ1IsU0FBUztFQUNYOzs7OztBQUVBO0lBQ0Usa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixNQUFNO0lBQ04sT0FBTztJQUNQLFFBQVE7SUFDUixTQUFTO0lBQ1Qsa0NBQWtDO0lBRWxDLGVBQWU7RUFDakI7Ozs7O0FBRUE7SUFDRSxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLFdBQVc7SUFDWCxVQUFVO0lBQ1YsOEJBQThCO0lBRTlCLGVBQWU7RUFDakI7Ozs7O0FBRUE7SUFDRSw4QkFBOEI7RUFDaEM7Ozs7O0FBRUE7SUFDRSxnQ0FBZ0M7RUFDbEM7Ozs7O0FBRUE7SUFHRSwwQkFBMEI7RUFDNUI7Ozs7O0FBRUEsb0JBQW9COzs7OztBQUNwQjtJQUNFLG1CQUFtQjtFQUNyQjs7Ozs7QUFFQTtJQUNFLGtCQUFrQjtFQUNwQjs7Ozs7QUFHQTtJQUNFLDRCQUE0QjtJQUM1QixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLDBCQUFrQjtJQUFsQix1QkFBa0I7SUFBbEIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsYUFBYTtJQUNiLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsWUFBWTtJQUNaOzs7OztBQUVGO01BQ0ksK0JBQStCO0VBQ25DOzs7OztBQUVBO0lBQ0UsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsa0JBQWtCO0VBQ3BCIiwiZmlsZSI6InNpZGViYXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zaWRlbmF2IHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxNSU7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmtncmF5KTtcclxuICAgIC8qIEJsYWNrICovXHJcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAvKiBEaXNhYmxlIGhvcml6b250YWwgc2Nyb2xsICovXHJcbiAgICBwYWRkaW5nLXRvcDogMjBweDtcclxuICAgIG1pbi13aWR0aDogMTVlbTsgICAgXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi5zaWRlbmF2IGEge1xyXG4gICAgcGFkZGluZzogNnB4IDhweCA2cHggMTZweDtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIGNvbG9yOiB2YXIoLS13aGl0ZSk7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGN1cnNvcjogcG9pbnRlcjsgICAgXHJcbiAgICBmb250LWZhbWlseTpteUZvbnRNZWRpdW07XHJcbiAgICB0cmFuc2l0aW9uOiBsaW5lYXIgMjUwbXM7XHJcbiAgICBcclxuICAgIG1heC13aWR0aDogZml0LWNvbnRlbnQ7XHJcbn1cclxuXHJcbi5zaWRlbmF2IGE6aG92ZXIge1xyXG4gICAgY29sb3I6IHZhcigtLWxpZ2h0Z3JheSk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmF5KTtcclxufVxyXG5cclxuLnNpZGVuYXYgbGkge1xyXG4gICAgcGFkZGluZzogMTBweCAxMHB4IDFweCAyMHB4O1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgY29sb3I6IHZhcigtLWJsYWNrKTtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgdHJhbnNpdGlvbjogbGluZWFyIDI1MG1zO1xyXG4gICAgXHJcbiAgICBmb250LWZhbWlseTpteUZvbnQ7XHJcbn1cclxuXHJcbi5zaWRlbmF2IGxpOmhvdmVyIHtcclxuICAgIGNvbG9yOiB2YXIoLS1saWdodGdyYXkpXHJcbn1cclxuXHJcbi5zd2l0Y2gge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgd2lkdGg6IDRlbTtcclxuICAgIGhlaWdodDogMmVtO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDFlbTtcclxuICAgIG1hcmdpbi10b3A6IDEuNWVtO1xyXG4gIH1cclxuICBcclxuICAuc3dpdGNoIGlucHV0IHsgXHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgd2lkdGg6IDA7XHJcbiAgICBoZWlnaHQ6IDA7XHJcbiAgfVxyXG4gIFxyXG4gIC5zbGlkZXIge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHRncmF5KTtcclxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogLjRzO1xyXG4gICAgdHJhbnNpdGlvbjogLjRzO1xyXG4gIH1cclxuICBcclxuICAuc2xpZGVyOmJlZm9yZSB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBjb250ZW50OiBcIlwiO1xyXG4gICAgaGVpZ2h0OiAyZW07XHJcbiAgICB3aWR0aDogMmVtO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2hpdGUpO1xyXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiAuNHM7XHJcbiAgICB0cmFuc2l0aW9uOiAuNHM7XHJcbiAgfVxyXG4gIFxyXG4gIGlucHV0OmNoZWNrZWQgKyAuc2xpZGVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyZWVuKTtcclxuICB9XHJcbiAgXHJcbiAgaW5wdXQ6Zm9jdXMgKyAuc2xpZGVyIHtcclxuICAgIGJveC1zaGFkb3c6IDAgMCAxcHggdmFyKC0tZ3JlZW4pO1xyXG4gIH1cclxuICBcclxuICBpbnB1dDpjaGVja2VkICsgLnNsaWRlcjpiZWZvcmUge1xyXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMmVtKTtcclxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMmVtKTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyZW0pO1xyXG4gIH1cclxuICBcclxuICAvKiBSb3VuZGVkIHNsaWRlcnMgKi9cclxuICAuc2xpZGVyLnJvdW5kIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDM0cHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5zbGlkZXIucm91bmQ6YmVmb3JlIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICB9XHJcblxyXG5cclxuICAuYm94IHNlbGVjdCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWdyYXkpO1xyXG4gICAgY29sb3I6IHZhcigtLWJsYWNrKTtcclxuICAgIHBhZGRpbmc6IDEycHg7XHJcbiAgICB3aWR0aDogZml0LWNvbnRlbnQ7XHJcbiAgICBmb250LWZhbWlseTogbXlGb250O1xyXG4gICAgYm94LXNoYWRvdzogdmFyKC0tcHVycGxlKTtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICBtYXJnaW4tbGVmdDogMWVtO1xyXG4gICAgbWFyZ2luLXRvcDogMWVtO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMWVtO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgLmJveCBzZWxlY3Q6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1vcmFuZ2UpO1xyXG4gIH1cclxuXHJcbiAgLnRleHR7XHJcbiAgICBmb250LWZhbWlseTogbXlGb250O1xyXG4gICAgY29sb3I6IHZhcigtLXdoaXRlKTtcclxuICAgIG1hcmdpbi1sZWZ0OiAxLjVlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IDBlbTtcclxuICB9XHJcblxyXG5cclxuXHJcbiJdfQ== */";
class SidebarComponent {
    constructor(sidebarService) {
        this.sidebarService = sidebarService;
    }
    ngOnInit() {
    }
    changeDisplay(id) {
        if (document.getElementById(id).style.display == "none") {
            document.getElementById(id).style.display = "block";
        }
        else {
            document.getElementById(id).style.display = "none";
        }
    }
    removezoom() {
        this.sidebarService.removeGlass();
    }
    magnifier(imgId) {
        this.sidebarService.magniGlass(imgId);
    }
    activate() {
        this.sidebarService.changeGlass();
    }
}
SidebarComponent.ɵfac = function SidebarComponent_Factory(t) { return new (t || SidebarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_sidebar_service__WEBPACK_IMPORTED_MODULE_1__["sidebarService"])); };
SidebarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SidebarComponent, selectors: [["app-sidebar"]], decls: 13, vars: 0, consts: [[1, "sidenav"], [2, "margin-top", "2em", 3, "click"], ["id", "images", 2, "display", "none"], [3, "click"], ["id", "clases", 2, "display", "none"], ["id", "import", 2, "display", "none"]], template: function SidebarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SidebarComponent_Template_a_click_1_listener() { return ctx.changeDisplay("images"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Im\u00E1genes");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-imagebar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SidebarComponent_Template_a_click_5_listener() { return ctx.changeDisplay("clases"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Etiquetas");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "app-draws");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SidebarComponent_Template_a_click_9_listener() { return ctx.changeDisplay("import"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Datos");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "app-imports");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_imagebar_imagebar_component__WEBPACK_IMPORTED_MODULE_2__["ImagebarComponent"], _draws_draws_component__WEBPACK_IMPORTED_MODULE_3__["DrawsComponent"], _imports_imports_component__WEBPACK_IMPORTED_MODULE_4__["ImportsComponent"]], styles: [_c0, _c0] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SidebarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-sidebar',
                templateUrl: './sidebar.component.html',
                styleUrls: ['./sidebar.component.css']
            }]
    }], function () { return [{ type: _sidebar_service__WEBPACK_IMPORTED_MODULE_1__["sidebarService"] }]; }, null); })();


/***/ }),

/***/ "IFU1":
/*!***************************************************!*\
  !*** ./src/assets/source/elements/graph/graph.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Graph; });
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node.js */ "4WwI");
/* harmony import */ var _edge_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edge.js */ "5nZz");
/* harmony import */ var _svg_group_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../svg/group.js */ "sFit");



class Graph extends _svg_group_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
    /**
    * Constructs a graph
    */
    constructor(options) {
        super();
        this.nodes = [];
        this.options = options;
        let defs = this.defs();
        defs.root.innerHTML = `<marker id="arrow" refX="10" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" style="fill:#333333;"></path></marker>`;
        this.appendChild(defs);
    }
    /**
    * Clears all nodes and all edges from the graph, removes them from the dom.
    */
    clear() {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].edges.forEach(function (item) {
                item.remove();
            });
            this.nodes[i].remove();
        }
        this.nodes = [];
    }
    /**
    * Adds a node at the given location with the given text. radius defaults to 20, 20
    */
    addNode(x, y, text, rx = 20, ry = 20) {
        let node = new _node_js__WEBPACK_IMPORTED_MODULE_0__["default"](x, y, rx, ry, text);
        this.root.appendChild(node.root);
        this.nodes.push(node);
        return node;
    }
    /**
    * Adds an edge without direction between the two given nodes.
    */
    addEdge(from, to) {
        let edge = new _edge_js__WEBPACK_IMPORTED_MODULE_1__["default"](from, to, this.options.directed);
        if (this.options.directed) {
            edge.root.setAttribute('marker-end', `url(#arrow)`);
        }
        this.root.prepend(edge.root);
        from.addEdge(edge);
        to.addEdge(edge);
        return edge;
    }
    /**
    * Getter for the list of all nodes inside this graph.
    */
    getNodes() {
        return this.nodes;
    }
    /**
    * Returns the size of this graph
    */
    size() {
        return this.nodes.length;
    }
    /**
    * The tidy algorithm. Assuming a tree for now, pass it the root.
    */
    tidy(root) {
        let orderedNodes = [];
        this.postTraverse(root, orderedNodes);
        let modMap = {};
        let centerMap = {};
        let min_dist = 100;
        for (let node of orderedNodes) {
            centerMap[node.id] = 0;
            node.cx = 0;
            if (node.children.length != 0) {
                node.children[0].cx == 0;
                for (let i = 1; i < node.children.length; i++) {
                    node.children[i].cx = node.children[i - 1].cx + min_dist;
                }
                centerMap[node.id] = (node.children[0].cx + node.children[node.children.length - 1].cx) / 2;
            }
        }
        // console.log(centerMap);
        for (let node of orderedNodes) {
            // console.log(node.label);
            //Set the top y value
            node.cy = node.depth * 75 + 50;
            let leftSiblings = (node.parents[0] != undefined && node.parents[0].children[0] !== node);
            // console.log(leftSiblings);
            // console.log(centeredValue);
            if (!leftSiblings) {
                node.cx = centerMap[node.id];
                modMap[node.id] = 0;
            }
            else {
                node.cx = node.parents[0].children[node.parents[0].children.indexOf(node) - 1].cx + min_dist;
                modMap[node.id] = node.cx - centerMap[node.id];
            }
        }
        this.shiftChildrenByMod(root, 0, modMap);
        modMap = this.clearModMap(modMap);
        //dealing with conflicts, twice.
        // modMap = this.fixConflicts(root, orderedNodes, modMap);
        modMap = this.fixConflicts(root, orderedNodes, modMap);
        this.fixOffScreen(root, modMap);
        root.cx = (root.children[0].cx + root.children[root.children.length - 1].cx) / 2;
    }
    fixOffScreen(root, modMap) {
        let leftList = {};
        leftList = this.leftContour(root, leftList);
        let maxShift = 0;
        for (let i in leftList) {
            if (leftList[i] < maxShift) {
                maxShift = leftList[i];
            }
        }
        root.cx += maxShift + 50;
        modMap[root.id] += maxShift + 50;
        this.shiftChildrenByMod(root, 0, modMap);
    }
    fixConflicts(root, orderedNodes, modMap) {
        let nodeShifted = false;
        for (let node of orderedNodes) {
            let leftSiblings = (node.parents[0] != undefined && node.parents[0].children[0] !== node);
            if (leftSiblings) {
                let currPos = -1;
                for (let i = 0; i < node.parents[0].children.length; i++) {
                    if (node.parents[0].children[i] === node) {
                        currPos = i;
                        break;
                    }
                }
                for (let i = currPos - 1; i >= 0; i--) {
                    if (node.parents[0].children[i] === node) {
                        break;
                    }
                    else {
                        // console.log(node);
                        let leftContList = {};
                        leftContList = this.leftContour(node, leftContList);
                        let rightContList = {};
                        rightContList = this.rightContour(node.parents[0].children[i], rightContList);
                        let shift = this.calculateShift(leftContList, rightContList);
                        if (shift != 0) {
                            nodeShifted = true;
                        }
                        // console.log(shift);
                        node.cx += shift;
                        modMap[node.id] += shift;
                        this.shiftChildrenByMod(root, 0, modMap);
                        modMap = this.clearModMap(modMap);
                        let nodePos = 0;
                        for (let j = i; j < node.parents[0].children.length; j++) {
                            if (node.parents[0].children[j] === node) {
                                nodePos = j;
                                break;
                            }
                        }
                        for (let j = i + 1; j < nodePos; j++) {
                            node.parents[0].children[j].cx += shift / (nodePos - i);
                            modMap[node.parents[0].children[j].id] += shift / (nodePos - i);
                        }
                    }
                }
            }
        }
        // if(nodeShifted){
        //   modMap = this.fixConflicts(root, orderedNodes, modMap)
        // }
        return modMap;
    }
    shiftChildrenByMod(node, mod, modMap) {
        node.cx += mod;
        for (let child of node.children) {
            this.shiftChildrenByMod(child, mod + modMap[node.id], modMap);
        }
    }
    clearModMap(modMap) {
        for (let i in modMap) {
            modMap[i] = 0;
        }
        return modMap;
    }
    calculateShift(leftList, rightList) {
        let biggestOverlap = 0;
        for (let depth in leftList) {
            if (rightList[depth] !== undefined && leftList[depth] - 100 < rightList[depth]) {
                biggestOverlap = Math.abs(leftList[depth] - 100 - rightList[depth]);
            }
        }
        return biggestOverlap;
    }
    leftContour(node, contourList) {
        // console.log(node.id);
        // console.log(node.depth);
        if ((contourList[node.depth] === undefined) || contourList[node.depth] > node.cx) {
            contourList[node.depth] = node.cx;
        }
        for (let child of node.children) {
            contourList = this.leftContour(child, contourList);
        }
        return contourList;
    }
    rightContour(node, contourList) {
        if ((contourList[node.depth] === undefined) || contourList[node.depth] < node.cx) {
            contourList[node.depth] = node.cx;
        }
        for (let child of node.children) {
            contourList = this.rightContour(child, contourList);
        }
        return contourList;
    }
    postTraverse(node, list) {
        if (!node) {
            console.log("ERROR: Node was null");
        }
        if (node.children.length > 0) {
            node.children.forEach(childNode => {
                this.postTraverse(childNode, list);
            });
        }
        list.push(node);
        return list;
    }
}
//# sourceMappingURL=graph.js.map

/***/ }),

/***/ "J5zx":
/*!**********************************************!*\
  !*** ./node_modules/bcryptjs/dist/bcrypt.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 Copyright (c) 2012 Nevins Bartolomeo <nevins.bartolomeo@gmail.com>
 Copyright (c) 2012 Shane Girish <shaneGirish@gmail.com>
 Copyright (c) 2014 Daniel Wirtz <dcode@dcode.io>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions
 are met:
 1. Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 3. The name of the author may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
 IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @license bcrypt.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/bcrypt.js for details
 */
(function(global, factory) {

    /* AMD */ if (true)
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    /* CommonJS */ else {}

}(this, function() {
    "use strict";

    /**
     * bcrypt namespace.
     * @type {Object.<string,*>}
     */
    var bcrypt = {};

    /**
     * The random implementation to use as a fallback.
     * @type {?function(number):!Array.<number>}
     * @inner
     */
    var randomFallback = null;

    /**
     * Generates cryptographically secure random bytes.
     * @function
     * @param {number} len Bytes length
     * @returns {!Array.<number>} Random bytes
     * @throws {Error} If no random implementation is available
     * @inner
     */
    function random(len) {
        /* node */ if ( true && module && module['exports'])
            try {
                return __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'crypto'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))['randomBytes'](len);
            } catch (e) {}
        /* WCA */ try {
            var a; (self['crypto']||self['msCrypto'])['getRandomValues'](a = new Uint32Array(len));
            return Array.prototype.slice.call(a);
        } catch (e) {}
        /* fallback */ if (!randomFallback)
            throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
        return randomFallback(len);
    }

    // Test if any secure randomness source is available
    var randomAvailable = false;
    try {
        random(1);
        randomAvailable = true;
    } catch (e) {}

    // Default fallback, if any
    randomFallback = null;
    /**
     * Sets the pseudo random number generator to use as a fallback if neither node's `crypto` module nor the Web Crypto
     *  API is available. Please note: It is highly important that the PRNG used is cryptographically secure and that it
     *  is seeded properly!
     * @param {?function(number):!Array.<number>} random Function taking the number of bytes to generate as its
     *  sole argument, returning the corresponding array of cryptographically secure random byte values.
     * @see http://nodejs.org/api/crypto.html
     * @see http://www.w3.org/TR/WebCryptoAPI/
     */
    bcrypt.setRandomFallback = function(random) {
        randomFallback = random;
    };

    /**
     * Synchronously generates a salt.
     * @param {number=} rounds Number of rounds to use, defaults to 10 if omitted
     * @param {number=} seed_length Not supported.
     * @returns {string} Resulting salt
     * @throws {Error} If a random fallback is required but not set
     * @expose
     */
    bcrypt.genSaltSync = function(rounds, seed_length) {
        rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
        if (typeof rounds !== 'number')
            throw Error("Illegal arguments: "+(typeof rounds)+", "+(typeof seed_length));
        if (rounds < 4)
            rounds = 4;
        else if (rounds > 31)
            rounds = 31;
        var salt = [];
        salt.push("$2a$");
        if (rounds < 10)
            salt.push("0");
        salt.push(rounds.toString());
        salt.push('$');
        salt.push(base64_encode(random(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN)); // May throw
        return salt.join('');
    };

    /**
     * Asynchronously generates a salt.
     * @param {(number|function(Error, string=))=} rounds Number of rounds to use, defaults to 10 if omitted
     * @param {(number|function(Error, string=))=} seed_length Not supported.
     * @param {function(Error, string=)=} callback Callback receiving the error, if any, and the resulting salt
     * @returns {!Promise} If `callback` has been omitted
     * @throws {Error} If `callback` is present but not a function
     * @expose
     */
    bcrypt.genSalt = function(rounds, seed_length, callback) {
        if (typeof seed_length === 'function')
            callback = seed_length,
            seed_length = undefined; // Not supported.
        if (typeof rounds === 'function')
            callback = rounds,
            rounds = undefined;
        if (typeof rounds === 'undefined')
            rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
        else if (typeof rounds !== 'number')
            throw Error("illegal arguments: "+(typeof rounds));

        function _async(callback) {
            nextTick(function() { // Pretty thin, but salting is fast enough
                try {
                    callback(null, bcrypt.genSaltSync(rounds));
                } catch (err) {
                    callback(err);
                }
            });
        }

        if (callback) {
            if (typeof callback !== 'function')
                throw Error("Illegal callback: "+typeof(callback));
            _async(callback);
        } else
            return new Promise(function(resolve, reject) {
                _async(function(err, res) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(res);
                });
            });
    };

    /**
     * Synchronously generates a hash for the given string.
     * @param {string} s String to hash
     * @param {(number|string)=} salt Salt length to generate or salt to use, default to 10
     * @returns {string} Resulting hash
     * @expose
     */
    bcrypt.hashSync = function(s, salt) {
        if (typeof salt === 'undefined')
            salt = GENSALT_DEFAULT_LOG2_ROUNDS;
        if (typeof salt === 'number')
            salt = bcrypt.genSaltSync(salt);
        if (typeof s !== 'string' || typeof salt !== 'string')
            throw Error("Illegal arguments: "+(typeof s)+', '+(typeof salt));
        return _hash(s, salt);
    };

    /**
     * Asynchronously generates a hash for the given string.
     * @param {string} s String to hash
     * @param {number|string} salt Salt length to generate or salt to use
     * @param {function(Error, string=)=} callback Callback receiving the error, if any, and the resulting hash
     * @param {function(number)=} progressCallback Callback successively called with the percentage of rounds completed
     *  (0.0 - 1.0), maximally once per `MAX_EXECUTION_TIME = 100` ms.
     * @returns {!Promise} If `callback` has been omitted
     * @throws {Error} If `callback` is present but not a function
     * @expose
     */
    bcrypt.hash = function(s, salt, callback, progressCallback) {

        function _async(callback) {
            if (typeof s === 'string' && typeof salt === 'number')
                bcrypt.genSalt(salt, function(err, salt) {
                    _hash(s, salt, callback, progressCallback);
                });
            else if (typeof s === 'string' && typeof salt === 'string')
                _hash(s, salt, callback, progressCallback);
            else
                nextTick(callback.bind(this, Error("Illegal arguments: "+(typeof s)+', '+(typeof salt))));
        }

        if (callback) {
            if (typeof callback !== 'function')
                throw Error("Illegal callback: "+typeof(callback));
            _async(callback);
        } else
            return new Promise(function(resolve, reject) {
                _async(function(err, res) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(res);
                });
            });
    };

    /**
     * Compares two strings of the same length in constant time.
     * @param {string} known Must be of the correct length
     * @param {string} unknown Must be the same length as `known`
     * @returns {boolean}
     * @inner
     */
    function safeStringCompare(known, unknown) {
        var right = 0,
            wrong = 0;
        for (var i=0, k=known.length; i<k; ++i) {
            if (known.charCodeAt(i) === unknown.charCodeAt(i))
                ++right;
            else
                ++wrong;
        }
        // Prevent removal of unused variables (never true, actually)
        if (right < 0)
            return false;
        return wrong === 0;
    }

    /**
     * Synchronously tests a string against a hash.
     * @param {string} s String to compare
     * @param {string} hash Hash to test against
     * @returns {boolean} true if matching, otherwise false
     * @throws {Error} If an argument is illegal
     * @expose
     */
    bcrypt.compareSync = function(s, hash) {
        if (typeof s !== "string" || typeof hash !== "string")
            throw Error("Illegal arguments: "+(typeof s)+', '+(typeof hash));
        if (hash.length !== 60)
            return false;
        return safeStringCompare(bcrypt.hashSync(s, hash.substr(0, hash.length-31)), hash);
    };

    /**
     * Asynchronously compares the given data against the given hash.
     * @param {string} s Data to compare
     * @param {string} hash Data to be compared to
     * @param {function(Error, boolean)=} callback Callback receiving the error, if any, otherwise the result
     * @param {function(number)=} progressCallback Callback successively called with the percentage of rounds completed
     *  (0.0 - 1.0), maximally once per `MAX_EXECUTION_TIME = 100` ms.
     * @returns {!Promise} If `callback` has been omitted
     * @throws {Error} If `callback` is present but not a function
     * @expose
     */
    bcrypt.compare = function(s, hash, callback, progressCallback) {

        function _async(callback) {
            if (typeof s !== "string" || typeof hash !== "string") {
                nextTick(callback.bind(this, Error("Illegal arguments: "+(typeof s)+', '+(typeof hash))));
                return;
            }
            if (hash.length !== 60) {
                nextTick(callback.bind(this, null, false));
                return;
            }
            bcrypt.hash(s, hash.substr(0, 29), function(err, comp) {
                if (err)
                    callback(err);
                else
                    callback(null, safeStringCompare(comp, hash));
            }, progressCallback);
        }

        if (callback) {
            if (typeof callback !== 'function')
                throw Error("Illegal callback: "+typeof(callback));
            _async(callback);
        } else
            return new Promise(function(resolve, reject) {
                _async(function(err, res) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(res);
                });
            });
    };

    /**
     * Gets the number of rounds used to encrypt the specified hash.
     * @param {string} hash Hash to extract the used number of rounds from
     * @returns {number} Number of rounds used
     * @throws {Error} If `hash` is not a string
     * @expose
     */
    bcrypt.getRounds = function(hash) {
        if (typeof hash !== "string")
            throw Error("Illegal arguments: "+(typeof hash));
        return parseInt(hash.split("$")[2], 10);
    };

    /**
     * Gets the salt portion from a hash. Does not validate the hash.
     * @param {string} hash Hash to extract the salt from
     * @returns {string} Extracted salt part
     * @throws {Error} If `hash` is not a string or otherwise invalid
     * @expose
     */
    bcrypt.getSalt = function(hash) {
        if (typeof hash !== 'string')
            throw Error("Illegal arguments: "+(typeof hash));
        if (hash.length !== 60)
            throw Error("Illegal hash length: "+hash.length+" != 60");
        return hash.substring(0, 29);
    };

    /**
     * Continues with the callback on the next tick.
     * @function
     * @param {function(...[*])} callback Callback to execute
     * @inner
     */
    var nextTick = typeof process !== 'undefined' && process && typeof process.nextTick === 'function'
        ? (typeof setImmediate === 'function' ? setImmediate : process.nextTick)
        : setTimeout;

    /**
     * Converts a JavaScript string to UTF8 bytes.
     * @param {string} str String
     * @returns {!Array.<number>} UTF8 bytes
     * @inner
     */
    function stringToBytes(str) {
        var out = [],
            i = 0;
        utfx.encodeUTF16toUTF8(function() {
            if (i >= str.length) return null;
            return str.charCodeAt(i++);
        }, function(b) {
            out.push(b);
        });
        return out;
    }

    // A base64 implementation for the bcrypt algorithm. This is partly non-standard.

    /**
     * bcrypt's own non-standard base64 dictionary.
     * @type {!Array.<string>}
     * @const
     * @inner
     **/
    var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split('');

    /**
     * @type {!Array.<number>}
     * @const
     * @inner
     **/
    var BASE64_INDEX = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0,
        1, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, -1, -1, -1, -1, -1, -1,
        -1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, -1, -1, -1, -1, -1, -1, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
        48, 49, 50, 51, 52, 53, -1, -1, -1, -1, -1];

    /**
     * @type {!function(...number):string}
     * @inner
     */
    var stringFromCharCode = String.fromCharCode;

    /**
     * Encodes a byte array to base64 with up to len bytes of input.
     * @param {!Array.<number>} b Byte array
     * @param {number} len Maximum input length
     * @returns {string}
     * @inner
     */
    function base64_encode(b, len) {
        var off = 0,
            rs = [],
            c1, c2;
        if (len <= 0 || len > b.length)
            throw Error("Illegal len: "+len);
        while (off < len) {
            c1 = b[off++] & 0xff;
            rs.push(BASE64_CODE[(c1 >> 2) & 0x3f]);
            c1 = (c1 & 0x03) << 4;
            if (off >= len) {
                rs.push(BASE64_CODE[c1 & 0x3f]);
                break;
            }
            c2 = b[off++] & 0xff;
            c1 |= (c2 >> 4) & 0x0f;
            rs.push(BASE64_CODE[c1 & 0x3f]);
            c1 = (c2 & 0x0f) << 2;
            if (off >= len) {
                rs.push(BASE64_CODE[c1 & 0x3f]);
                break;
            }
            c2 = b[off++] & 0xff;
            c1 |= (c2 >> 6) & 0x03;
            rs.push(BASE64_CODE[c1 & 0x3f]);
            rs.push(BASE64_CODE[c2 & 0x3f]);
        }
        return rs.join('');
    }

    /**
     * Decodes a base64 encoded string to up to len bytes of output.
     * @param {string} s String to decode
     * @param {number} len Maximum output length
     * @returns {!Array.<number>}
     * @inner
     */
    function base64_decode(s, len) {
        var off = 0,
            slen = s.length,
            olen = 0,
            rs = [],
            c1, c2, c3, c4, o, code;
        if (len <= 0)
            throw Error("Illegal len: "+len);
        while (off < slen - 1 && olen < len) {
            code = s.charCodeAt(off++);
            c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
            code = s.charCodeAt(off++);
            c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
            if (c1 == -1 || c2 == -1)
                break;
            o = (c1 << 2) >>> 0;
            o |= (c2 & 0x30) >> 4;
            rs.push(stringFromCharCode(o));
            if (++olen >= len || off >= slen)
                break;
            code = s.charCodeAt(off++);
            c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
            if (c3 == -1)
                break;
            o = ((c2 & 0x0f) << 4) >>> 0;
            o |= (c3 & 0x3c) >> 2;
            rs.push(stringFromCharCode(o));
            if (++olen >= len || off >= slen)
                break;
            code = s.charCodeAt(off++);
            c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
            o = ((c3 & 0x03) << 6) >>> 0;
            o |= c4;
            rs.push(stringFromCharCode(o));
            ++olen;
        }
        var res = [];
        for (off = 0; off<olen; off++)
            res.push(rs[off].charCodeAt(0));
        return res;
    }

    /**
     * utfx-embeddable (c) 2014 Daniel Wirtz <dcode@dcode.io>
     * Released under the Apache License, Version 2.0
     * see: https://github.com/dcodeIO/utfx for details
     */
    var utfx = function() {
        "use strict";

        /**
         * utfx namespace.
         * @inner
         * @type {!Object.<string,*>}
         */
        var utfx = {};

        /**
         * Maximum valid code point.
         * @type {number}
         * @const
         */
        utfx.MAX_CODEPOINT = 0x10FFFF;

        /**
         * Encodes UTF8 code points to UTF8 bytes.
         * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
         *  respectively `null` if there are no more code points left or a single numeric code point.
         * @param {!function(number)} dst Bytes destination as a function successively called with the next byte
         */
        utfx.encodeUTF8 = function(src, dst) {
            var cp = null;
            if (typeof src === 'number')
                cp = src,
                src = function() { return null; };
            while (cp !== null || (cp = src()) !== null) {
                if (cp < 0x80)
                    dst(cp&0x7F);
                else if (cp < 0x800)
                    dst(((cp>>6)&0x1F)|0xC0),
                    dst((cp&0x3F)|0x80);
                else if (cp < 0x10000)
                    dst(((cp>>12)&0x0F)|0xE0),
                    dst(((cp>>6)&0x3F)|0x80),
                    dst((cp&0x3F)|0x80);
                else
                    dst(((cp>>18)&0x07)|0xF0),
                    dst(((cp>>12)&0x3F)|0x80),
                    dst(((cp>>6)&0x3F)|0x80),
                    dst((cp&0x3F)|0x80);
                cp = null;
            }
        };

        /**
         * Decodes UTF8 bytes to UTF8 code points.
         * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
         *  are no more bytes left.
         * @param {!function(number)} dst Code points destination as a function successively called with each decoded code point.
         * @throws {RangeError} If a starting byte is invalid in UTF8
         * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the
         *  remaining bytes.
         */
        utfx.decodeUTF8 = function(src, dst) {
            var a, b, c, d, fail = function(b) {
                b = b.slice(0, b.indexOf(null));
                var err = Error(b.toString());
                err.name = "TruncatedError";
                err['bytes'] = b;
                throw err;
            };
            while ((a = src()) !== null) {
                if ((a&0x80) === 0)
                    dst(a);
                else if ((a&0xE0) === 0xC0)
                    ((b = src()) === null) && fail([a, b]),
                    dst(((a&0x1F)<<6) | (b&0x3F));
                else if ((a&0xF0) === 0xE0)
                    ((b=src()) === null || (c=src()) === null) && fail([a, b, c]),
                    dst(((a&0x0F)<<12) | ((b&0x3F)<<6) | (c&0x3F));
                else if ((a&0xF8) === 0xF0)
                    ((b=src()) === null || (c=src()) === null || (d=src()) === null) && fail([a, b, c ,d]),
                    dst(((a&0x07)<<18) | ((b&0x3F)<<12) | ((c&0x3F)<<6) | (d&0x3F));
                else throw RangeError("Illegal starting byte: "+a);
            }
        };

        /**
         * Converts UTF16 characters to UTF8 code points.
         * @param {!function():number|null} src Characters source as a function returning the next char code respectively
         *  `null` if there are no more characters left.
         * @param {!function(number)} dst Code points destination as a function successively called with each converted code
         *  point.
         */
        utfx.UTF16toUTF8 = function(src, dst) {
            var c1, c2 = null;
            while (true) {
                if ((c1 = c2 !== null ? c2 : src()) === null)
                    break;
                if (c1 >= 0xD800 && c1 <= 0xDFFF) {
                    if ((c2 = src()) !== null) {
                        if (c2 >= 0xDC00 && c2 <= 0xDFFF) {
                            dst((c1-0xD800)*0x400+c2-0xDC00+0x10000);
                            c2 = null; continue;
                        }
                    }
                }
                dst(c1);
            }
            if (c2 !== null) dst(c2);
        };

        /**
         * Converts UTF8 code points to UTF16 characters.
         * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
         *  respectively `null` if there are no more code points left or a single numeric code point.
         * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
         * @throws {RangeError} If a code point is out of range
         */
        utfx.UTF8toUTF16 = function(src, dst) {
            var cp = null;
            if (typeof src === 'number')
                cp = src, src = function() { return null; };
            while (cp !== null || (cp = src()) !== null) {
                if (cp <= 0xFFFF)
                    dst(cp);
                else
                    cp -= 0x10000,
                    dst((cp>>10)+0xD800),
                    dst((cp%0x400)+0xDC00);
                cp = null;
            }
        };

        /**
         * Converts and encodes UTF16 characters to UTF8 bytes.
         * @param {!function():number|null} src Characters source as a function returning the next char code respectively `null`
         *  if there are no more characters left.
         * @param {!function(number)} dst Bytes destination as a function successively called with the next byte.
         */
        utfx.encodeUTF16toUTF8 = function(src, dst) {
            utfx.UTF16toUTF8(src, function(cp) {
                utfx.encodeUTF8(cp, dst);
            });
        };

        /**
         * Decodes and converts UTF8 bytes to UTF16 characters.
         * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
         *  are no more bytes left.
         * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
         * @throws {RangeError} If a starting byte is invalid in UTF8
         * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the remaining bytes.
         */
        utfx.decodeUTF8toUTF16 = function(src, dst) {
            utfx.decodeUTF8(src, function(cp) {
                utfx.UTF8toUTF16(cp, dst);
            });
        };

        /**
         * Calculates the byte length of an UTF8 code point.
         * @param {number} cp UTF8 code point
         * @returns {number} Byte length
         */
        utfx.calculateCodePoint = function(cp) {
            return (cp < 0x80) ? 1 : (cp < 0x800) ? 2 : (cp < 0x10000) ? 3 : 4;
        };

        /**
         * Calculates the number of UTF8 bytes required to store UTF8 code points.
         * @param {(!function():number|null)} src Code points source as a function returning the next code point respectively
         *  `null` if there are no more code points left.
         * @returns {number} The number of UTF8 bytes required
         */
        utfx.calculateUTF8 = function(src) {
            var cp, l=0;
            while ((cp = src()) !== null)
                l += utfx.calculateCodePoint(cp);
            return l;
        };

        /**
         * Calculates the number of UTF8 code points respectively UTF8 bytes required to store UTF16 char codes.
         * @param {(!function():number|null)} src Characters source as a function returning the next char code respectively
         *  `null` if there are no more characters left.
         * @returns {!Array.<number>} The number of UTF8 code points at index 0 and the number of UTF8 bytes required at index 1.
         */
        utfx.calculateUTF16asUTF8 = function(src) {
            var n=0, l=0;
            utfx.UTF16toUTF8(src, function(cp) {
                ++n; l += utfx.calculateCodePoint(cp);
            });
            return [n,l];
        };

        return utfx;
    }();

    Date.now = Date.now || function() { return +new Date; };

    /**
     * @type {number}
     * @const
     * @inner
     */
    var BCRYPT_SALT_LEN = 16;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var GENSALT_DEFAULT_LOG2_ROUNDS = 10;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var BLOWFISH_NUM_ROUNDS = 16;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var MAX_EXECUTION_TIME = 100;

    /**
     * @type {Array.<number>}
     * @const
     * @inner
     */
    var P_ORIG = [
        0x243f6a88, 0x85a308d3, 0x13198a2e, 0x03707344, 0xa4093822,
        0x299f31d0, 0x082efa98, 0xec4e6c89, 0x452821e6, 0x38d01377,
        0xbe5466cf, 0x34e90c6c, 0xc0ac29b7, 0xc97c50dd, 0x3f84d5b5,
        0xb5470917, 0x9216d5d9, 0x8979fb1b
    ];

    /**
     * @type {Array.<number>}
     * @const
     * @inner
     */
    var S_ORIG = [
        0xd1310ba6, 0x98dfb5ac, 0x2ffd72db, 0xd01adfb7, 0xb8e1afed,
        0x6a267e96, 0xba7c9045, 0xf12c7f99, 0x24a19947, 0xb3916cf7,
        0x0801f2e2, 0x858efc16, 0x636920d8, 0x71574e69, 0xa458fea3,
        0xf4933d7e, 0x0d95748f, 0x728eb658, 0x718bcd58, 0x82154aee,
        0x7b54a41d, 0xc25a59b5, 0x9c30d539, 0x2af26013, 0xc5d1b023,
        0x286085f0, 0xca417918, 0xb8db38ef, 0x8e79dcb0, 0x603a180e,
        0x6c9e0e8b, 0xb01e8a3e, 0xd71577c1, 0xbd314b27, 0x78af2fda,
        0x55605c60, 0xe65525f3, 0xaa55ab94, 0x57489862, 0x63e81440,
        0x55ca396a, 0x2aab10b6, 0xb4cc5c34, 0x1141e8ce, 0xa15486af,
        0x7c72e993, 0xb3ee1411, 0x636fbc2a, 0x2ba9c55d, 0x741831f6,
        0xce5c3e16, 0x9b87931e, 0xafd6ba33, 0x6c24cf5c, 0x7a325381,
        0x28958677, 0x3b8f4898, 0x6b4bb9af, 0xc4bfe81b, 0x66282193,
        0x61d809cc, 0xfb21a991, 0x487cac60, 0x5dec8032, 0xef845d5d,
        0xe98575b1, 0xdc262302, 0xeb651b88, 0x23893e81, 0xd396acc5,
        0x0f6d6ff3, 0x83f44239, 0x2e0b4482, 0xa4842004, 0x69c8f04a,
        0x9e1f9b5e, 0x21c66842, 0xf6e96c9a, 0x670c9c61, 0xabd388f0,
        0x6a51a0d2, 0xd8542f68, 0x960fa728, 0xab5133a3, 0x6eef0b6c,
        0x137a3be4, 0xba3bf050, 0x7efb2a98, 0xa1f1651d, 0x39af0176,
        0x66ca593e, 0x82430e88, 0x8cee8619, 0x456f9fb4, 0x7d84a5c3,
        0x3b8b5ebe, 0xe06f75d8, 0x85c12073, 0x401a449f, 0x56c16aa6,
        0x4ed3aa62, 0x363f7706, 0x1bfedf72, 0x429b023d, 0x37d0d724,
        0xd00a1248, 0xdb0fead3, 0x49f1c09b, 0x075372c9, 0x80991b7b,
        0x25d479d8, 0xf6e8def7, 0xe3fe501a, 0xb6794c3b, 0x976ce0bd,
        0x04c006ba, 0xc1a94fb6, 0x409f60c4, 0x5e5c9ec2, 0x196a2463,
        0x68fb6faf, 0x3e6c53b5, 0x1339b2eb, 0x3b52ec6f, 0x6dfc511f,
        0x9b30952c, 0xcc814544, 0xaf5ebd09, 0xbee3d004, 0xde334afd,
        0x660f2807, 0x192e4bb3, 0xc0cba857, 0x45c8740f, 0xd20b5f39,
        0xb9d3fbdb, 0x5579c0bd, 0x1a60320a, 0xd6a100c6, 0x402c7279,
        0x679f25fe, 0xfb1fa3cc, 0x8ea5e9f8, 0xdb3222f8, 0x3c7516df,
        0xfd616b15, 0x2f501ec8, 0xad0552ab, 0x323db5fa, 0xfd238760,
        0x53317b48, 0x3e00df82, 0x9e5c57bb, 0xca6f8ca0, 0x1a87562e,
        0xdf1769db, 0xd542a8f6, 0x287effc3, 0xac6732c6, 0x8c4f5573,
        0x695b27b0, 0xbbca58c8, 0xe1ffa35d, 0xb8f011a0, 0x10fa3d98,
        0xfd2183b8, 0x4afcb56c, 0x2dd1d35b, 0x9a53e479, 0xb6f84565,
        0xd28e49bc, 0x4bfb9790, 0xe1ddf2da, 0xa4cb7e33, 0x62fb1341,
        0xcee4c6e8, 0xef20cada, 0x36774c01, 0xd07e9efe, 0x2bf11fb4,
        0x95dbda4d, 0xae909198, 0xeaad8e71, 0x6b93d5a0, 0xd08ed1d0,
        0xafc725e0, 0x8e3c5b2f, 0x8e7594b7, 0x8ff6e2fb, 0xf2122b64,
        0x8888b812, 0x900df01c, 0x4fad5ea0, 0x688fc31c, 0xd1cff191,
        0xb3a8c1ad, 0x2f2f2218, 0xbe0e1777, 0xea752dfe, 0x8b021fa1,
        0xe5a0cc0f, 0xb56f74e8, 0x18acf3d6, 0xce89e299, 0xb4a84fe0,
        0xfd13e0b7, 0x7cc43b81, 0xd2ada8d9, 0x165fa266, 0x80957705,
        0x93cc7314, 0x211a1477, 0xe6ad2065, 0x77b5fa86, 0xc75442f5,
        0xfb9d35cf, 0xebcdaf0c, 0x7b3e89a0, 0xd6411bd3, 0xae1e7e49,
        0x00250e2d, 0x2071b35e, 0x226800bb, 0x57b8e0af, 0x2464369b,
        0xf009b91e, 0x5563911d, 0x59dfa6aa, 0x78c14389, 0xd95a537f,
        0x207d5ba2, 0x02e5b9c5, 0x83260376, 0x6295cfa9, 0x11c81968,
        0x4e734a41, 0xb3472dca, 0x7b14a94a, 0x1b510052, 0x9a532915,
        0xd60f573f, 0xbc9bc6e4, 0x2b60a476, 0x81e67400, 0x08ba6fb5,
        0x571be91f, 0xf296ec6b, 0x2a0dd915, 0xb6636521, 0xe7b9f9b6,
        0xff34052e, 0xc5855664, 0x53b02d5d, 0xa99f8fa1, 0x08ba4799,
        0x6e85076a, 0x4b7a70e9, 0xb5b32944, 0xdb75092e, 0xc4192623,
        0xad6ea6b0, 0x49a7df7d, 0x9cee60b8, 0x8fedb266, 0xecaa8c71,
        0x699a17ff, 0x5664526c, 0xc2b19ee1, 0x193602a5, 0x75094c29,
        0xa0591340, 0xe4183a3e, 0x3f54989a, 0x5b429d65, 0x6b8fe4d6,
        0x99f73fd6, 0xa1d29c07, 0xefe830f5, 0x4d2d38e6, 0xf0255dc1,
        0x4cdd2086, 0x8470eb26, 0x6382e9c6, 0x021ecc5e, 0x09686b3f,
        0x3ebaefc9, 0x3c971814, 0x6b6a70a1, 0x687f3584, 0x52a0e286,
        0xb79c5305, 0xaa500737, 0x3e07841c, 0x7fdeae5c, 0x8e7d44ec,
        0x5716f2b8, 0xb03ada37, 0xf0500c0d, 0xf01c1f04, 0x0200b3ff,
        0xae0cf51a, 0x3cb574b2, 0x25837a58, 0xdc0921bd, 0xd19113f9,
        0x7ca92ff6, 0x94324773, 0x22f54701, 0x3ae5e581, 0x37c2dadc,
        0xc8b57634, 0x9af3dda7, 0xa9446146, 0x0fd0030e, 0xecc8c73e,
        0xa4751e41, 0xe238cd99, 0x3bea0e2f, 0x3280bba1, 0x183eb331,
        0x4e548b38, 0x4f6db908, 0x6f420d03, 0xf60a04bf, 0x2cb81290,
        0x24977c79, 0x5679b072, 0xbcaf89af, 0xde9a771f, 0xd9930810,
        0xb38bae12, 0xdccf3f2e, 0x5512721f, 0x2e6b7124, 0x501adde6,
        0x9f84cd87, 0x7a584718, 0x7408da17, 0xbc9f9abc, 0xe94b7d8c,
        0xec7aec3a, 0xdb851dfa, 0x63094366, 0xc464c3d2, 0xef1c1847,
        0x3215d908, 0xdd433b37, 0x24c2ba16, 0x12a14d43, 0x2a65c451,
        0x50940002, 0x133ae4dd, 0x71dff89e, 0x10314e55, 0x81ac77d6,
        0x5f11199b, 0x043556f1, 0xd7a3c76b, 0x3c11183b, 0x5924a509,
        0xf28fe6ed, 0x97f1fbfa, 0x9ebabf2c, 0x1e153c6e, 0x86e34570,
        0xeae96fb1, 0x860e5e0a, 0x5a3e2ab3, 0x771fe71c, 0x4e3d06fa,
        0x2965dcb9, 0x99e71d0f, 0x803e89d6, 0x5266c825, 0x2e4cc978,
        0x9c10b36a, 0xc6150eba, 0x94e2ea78, 0xa5fc3c53, 0x1e0a2df4,
        0xf2f74ea7, 0x361d2b3d, 0x1939260f, 0x19c27960, 0x5223a708,
        0xf71312b6, 0xebadfe6e, 0xeac31f66, 0xe3bc4595, 0xa67bc883,
        0xb17f37d1, 0x018cff28, 0xc332ddef, 0xbe6c5aa5, 0x65582185,
        0x68ab9802, 0xeecea50f, 0xdb2f953b, 0x2aef7dad, 0x5b6e2f84,
        0x1521b628, 0x29076170, 0xecdd4775, 0x619f1510, 0x13cca830,
        0xeb61bd96, 0x0334fe1e, 0xaa0363cf, 0xb5735c90, 0x4c70a239,
        0xd59e9e0b, 0xcbaade14, 0xeecc86bc, 0x60622ca7, 0x9cab5cab,
        0xb2f3846e, 0x648b1eaf, 0x19bdf0ca, 0xa02369b9, 0x655abb50,
        0x40685a32, 0x3c2ab4b3, 0x319ee9d5, 0xc021b8f7, 0x9b540b19,
        0x875fa099, 0x95f7997e, 0x623d7da8, 0xf837889a, 0x97e32d77,
        0x11ed935f, 0x16681281, 0x0e358829, 0xc7e61fd6, 0x96dedfa1,
        0x7858ba99, 0x57f584a5, 0x1b227263, 0x9b83c3ff, 0x1ac24696,
        0xcdb30aeb, 0x532e3054, 0x8fd948e4, 0x6dbc3128, 0x58ebf2ef,
        0x34c6ffea, 0xfe28ed61, 0xee7c3c73, 0x5d4a14d9, 0xe864b7e3,
        0x42105d14, 0x203e13e0, 0x45eee2b6, 0xa3aaabea, 0xdb6c4f15,
        0xfacb4fd0, 0xc742f442, 0xef6abbb5, 0x654f3b1d, 0x41cd2105,
        0xd81e799e, 0x86854dc7, 0xe44b476a, 0x3d816250, 0xcf62a1f2,
        0x5b8d2646, 0xfc8883a0, 0xc1c7b6a3, 0x7f1524c3, 0x69cb7492,
        0x47848a0b, 0x5692b285, 0x095bbf00, 0xad19489d, 0x1462b174,
        0x23820e00, 0x58428d2a, 0x0c55f5ea, 0x1dadf43e, 0x233f7061,
        0x3372f092, 0x8d937e41, 0xd65fecf1, 0x6c223bdb, 0x7cde3759,
        0xcbee7460, 0x4085f2a7, 0xce77326e, 0xa6078084, 0x19f8509e,
        0xe8efd855, 0x61d99735, 0xa969a7aa, 0xc50c06c2, 0x5a04abfc,
        0x800bcadc, 0x9e447a2e, 0xc3453484, 0xfdd56705, 0x0e1e9ec9,
        0xdb73dbd3, 0x105588cd, 0x675fda79, 0xe3674340, 0xc5c43465,
        0x713e38d8, 0x3d28f89e, 0xf16dff20, 0x153e21e7, 0x8fb03d4a,
        0xe6e39f2b, 0xdb83adf7, 0xe93d5a68, 0x948140f7, 0xf64c261c,
        0x94692934, 0x411520f7, 0x7602d4f7, 0xbcf46b2e, 0xd4a20068,
        0xd4082471, 0x3320f46a, 0x43b7d4b7, 0x500061af, 0x1e39f62e,
        0x97244546, 0x14214f74, 0xbf8b8840, 0x4d95fc1d, 0x96b591af,
        0x70f4ddd3, 0x66a02f45, 0xbfbc09ec, 0x03bd9785, 0x7fac6dd0,
        0x31cb8504, 0x96eb27b3, 0x55fd3941, 0xda2547e6, 0xabca0a9a,
        0x28507825, 0x530429f4, 0x0a2c86da, 0xe9b66dfb, 0x68dc1462,
        0xd7486900, 0x680ec0a4, 0x27a18dee, 0x4f3ffea2, 0xe887ad8c,
        0xb58ce006, 0x7af4d6b6, 0xaace1e7c, 0xd3375fec, 0xce78a399,
        0x406b2a42, 0x20fe9e35, 0xd9f385b9, 0xee39d7ab, 0x3b124e8b,
        0x1dc9faf7, 0x4b6d1856, 0x26a36631, 0xeae397b2, 0x3a6efa74,
        0xdd5b4332, 0x6841e7f7, 0xca7820fb, 0xfb0af54e, 0xd8feb397,
        0x454056ac, 0xba489527, 0x55533a3a, 0x20838d87, 0xfe6ba9b7,
        0xd096954b, 0x55a867bc, 0xa1159a58, 0xcca92963, 0x99e1db33,
        0xa62a4a56, 0x3f3125f9, 0x5ef47e1c, 0x9029317c, 0xfdf8e802,
        0x04272f70, 0x80bb155c, 0x05282ce3, 0x95c11548, 0xe4c66d22,
        0x48c1133f, 0xc70f86dc, 0x07f9c9ee, 0x41041f0f, 0x404779a4,
        0x5d886e17, 0x325f51eb, 0xd59bc0d1, 0xf2bcc18f, 0x41113564,
        0x257b7834, 0x602a9c60, 0xdff8e8a3, 0x1f636c1b, 0x0e12b4c2,
        0x02e1329e, 0xaf664fd1, 0xcad18115, 0x6b2395e0, 0x333e92e1,
        0x3b240b62, 0xeebeb922, 0x85b2a20e, 0xe6ba0d99, 0xde720c8c,
        0x2da2f728, 0xd0127845, 0x95b794fd, 0x647d0862, 0xe7ccf5f0,
        0x5449a36f, 0x877d48fa, 0xc39dfd27, 0xf33e8d1e, 0x0a476341,
        0x992eff74, 0x3a6f6eab, 0xf4f8fd37, 0xa812dc60, 0xa1ebddf8,
        0x991be14c, 0xdb6e6b0d, 0xc67b5510, 0x6d672c37, 0x2765d43b,
        0xdcd0e804, 0xf1290dc7, 0xcc00ffa3, 0xb5390f92, 0x690fed0b,
        0x667b9ffb, 0xcedb7d9c, 0xa091cf0b, 0xd9155ea3, 0xbb132f88,
        0x515bad24, 0x7b9479bf, 0x763bd6eb, 0x37392eb3, 0xcc115979,
        0x8026e297, 0xf42e312d, 0x6842ada7, 0xc66a2b3b, 0x12754ccc,
        0x782ef11c, 0x6a124237, 0xb79251e7, 0x06a1bbe6, 0x4bfb6350,
        0x1a6b1018, 0x11caedfa, 0x3d25bdd8, 0xe2e1c3c9, 0x44421659,
        0x0a121386, 0xd90cec6e, 0xd5abea2a, 0x64af674e, 0xda86a85f,
        0xbebfe988, 0x64e4c3fe, 0x9dbc8057, 0xf0f7c086, 0x60787bf8,
        0x6003604d, 0xd1fd8346, 0xf6381fb0, 0x7745ae04, 0xd736fccc,
        0x83426b33, 0xf01eab71, 0xb0804187, 0x3c005e5f, 0x77a057be,
        0xbde8ae24, 0x55464299, 0xbf582e61, 0x4e58f48f, 0xf2ddfda2,
        0xf474ef38, 0x8789bdc2, 0x5366f9c3, 0xc8b38e74, 0xb475f255,
        0x46fcd9b9, 0x7aeb2661, 0x8b1ddf84, 0x846a0e79, 0x915f95e2,
        0x466e598e, 0x20b45770, 0x8cd55591, 0xc902de4c, 0xb90bace1,
        0xbb8205d0, 0x11a86248, 0x7574a99e, 0xb77f19b6, 0xe0a9dc09,
        0x662d09a1, 0xc4324633, 0xe85a1f02, 0x09f0be8c, 0x4a99a025,
        0x1d6efe10, 0x1ab93d1d, 0x0ba5a4df, 0xa186f20f, 0x2868f169,
        0xdcb7da83, 0x573906fe, 0xa1e2ce9b, 0x4fcd7f52, 0x50115e01,
        0xa70683fa, 0xa002b5c4, 0x0de6d027, 0x9af88c27, 0x773f8641,
        0xc3604c06, 0x61a806b5, 0xf0177a28, 0xc0f586e0, 0x006058aa,
        0x30dc7d62, 0x11e69ed7, 0x2338ea63, 0x53c2dd94, 0xc2c21634,
        0xbbcbee56, 0x90bcb6de, 0xebfc7da1, 0xce591d76, 0x6f05e409,
        0x4b7c0188, 0x39720a3d, 0x7c927c24, 0x86e3725f, 0x724d9db9,
        0x1ac15bb4, 0xd39eb8fc, 0xed545578, 0x08fca5b5, 0xd83d7cd3,
        0x4dad0fc4, 0x1e50ef5e, 0xb161e6f8, 0xa28514d9, 0x6c51133c,
        0x6fd5c7e7, 0x56e14ec4, 0x362abfce, 0xddc6c837, 0xd79a3234,
        0x92638212, 0x670efa8e, 0x406000e0, 0x3a39ce37, 0xd3faf5cf,
        0xabc27737, 0x5ac52d1b, 0x5cb0679e, 0x4fa33742, 0xd3822740,
        0x99bc9bbe, 0xd5118e9d, 0xbf0f7315, 0xd62d1c7e, 0xc700c47b,
        0xb78c1b6b, 0x21a19045, 0xb26eb1be, 0x6a366eb4, 0x5748ab2f,
        0xbc946e79, 0xc6a376d2, 0x6549c2c8, 0x530ff8ee, 0x468dde7d,
        0xd5730a1d, 0x4cd04dc6, 0x2939bbdb, 0xa9ba4650, 0xac9526e8,
        0xbe5ee304, 0xa1fad5f0, 0x6a2d519a, 0x63ef8ce2, 0x9a86ee22,
        0xc089c2b8, 0x43242ef6, 0xa51e03aa, 0x9cf2d0a4, 0x83c061ba,
        0x9be96a4d, 0x8fe51550, 0xba645bd6, 0x2826a2f9, 0xa73a3ae1,
        0x4ba99586, 0xef5562e9, 0xc72fefd3, 0xf752f7da, 0x3f046f69,
        0x77fa0a59, 0x80e4a915, 0x87b08601, 0x9b09e6ad, 0x3b3ee593,
        0xe990fd5a, 0x9e34d797, 0x2cf0b7d9, 0x022b8b51, 0x96d5ac3a,
        0x017da67d, 0xd1cf3ed6, 0x7c7d2d28, 0x1f9f25cf, 0xadf2b89b,
        0x5ad6b472, 0x5a88f54c, 0xe029ac71, 0xe019a5e6, 0x47b0acfd,
        0xed93fa9b, 0xe8d3c48d, 0x283b57cc, 0xf8d56629, 0x79132e28,
        0x785f0191, 0xed756055, 0xf7960e44, 0xe3d35e8c, 0x15056dd4,
        0x88f46dba, 0x03a16125, 0x0564f0bd, 0xc3eb9e15, 0x3c9057a2,
        0x97271aec, 0xa93a072a, 0x1b3f6d9b, 0x1e6321f5, 0xf59c66fb,
        0x26dcf319, 0x7533d928, 0xb155fdf5, 0x03563482, 0x8aba3cbb,
        0x28517711, 0xc20ad9f8, 0xabcc5167, 0xccad925f, 0x4de81751,
        0x3830dc8e, 0x379d5862, 0x9320f991, 0xea7a90c2, 0xfb3e7bce,
        0x5121ce64, 0x774fbe32, 0xa8b6e37e, 0xc3293d46, 0x48de5369,
        0x6413e680, 0xa2ae0810, 0xdd6db224, 0x69852dfd, 0x09072166,
        0xb39a460a, 0x6445c0dd, 0x586cdecf, 0x1c20c8ae, 0x5bbef7dd,
        0x1b588d40, 0xccd2017f, 0x6bb4e3bb, 0xdda26a7e, 0x3a59ff45,
        0x3e350a44, 0xbcb4cdd5, 0x72eacea8, 0xfa6484bb, 0x8d6612ae,
        0xbf3c6f47, 0xd29be463, 0x542f5d9e, 0xaec2771b, 0xf64e6370,
        0x740e0d8d, 0xe75b1357, 0xf8721671, 0xaf537d5d, 0x4040cb08,
        0x4eb4e2cc, 0x34d2466a, 0x0115af84, 0xe1b00428, 0x95983a1d,
        0x06b89fb4, 0xce6ea048, 0x6f3f3b82, 0x3520ab82, 0x011a1d4b,
        0x277227f8, 0x611560b1, 0xe7933fdc, 0xbb3a792b, 0x344525bd,
        0xa08839e1, 0x51ce794b, 0x2f32c9b7, 0xa01fbac9, 0xe01cc87e,
        0xbcc7d1f6, 0xcf0111c3, 0xa1e8aac7, 0x1a908749, 0xd44fbd9a,
        0xd0dadecb, 0xd50ada38, 0x0339c32a, 0xc6913667, 0x8df9317c,
        0xe0b12b4f, 0xf79e59b7, 0x43f5bb3a, 0xf2d519ff, 0x27d9459c,
        0xbf97222c, 0x15e6fc2a, 0x0f91fc71, 0x9b941525, 0xfae59361,
        0xceb69ceb, 0xc2a86459, 0x12baa8d1, 0xb6c1075e, 0xe3056a0c,
        0x10d25065, 0xcb03a442, 0xe0ec6e0e, 0x1698db3b, 0x4c98a0be,
        0x3278e964, 0x9f1f9532, 0xe0d392df, 0xd3a0342b, 0x8971f21e,
        0x1b0a7441, 0x4ba3348c, 0xc5be7120, 0xc37632d8, 0xdf359f8d,
        0x9b992f2e, 0xe60b6f47, 0x0fe3f11d, 0xe54cda54, 0x1edad891,
        0xce6279cf, 0xcd3e7e6f, 0x1618b166, 0xfd2c1d05, 0x848fd2c5,
        0xf6fb2299, 0xf523f357, 0xa6327623, 0x93a83531, 0x56cccd02,
        0xacf08162, 0x5a75ebb5, 0x6e163697, 0x88d273cc, 0xde966292,
        0x81b949d0, 0x4c50901b, 0x71c65614, 0xe6c6c7bd, 0x327a140a,
        0x45e1d006, 0xc3f27b9a, 0xc9aa53fd, 0x62a80f00, 0xbb25bfe2,
        0x35bdd2f6, 0x71126905, 0xb2040222, 0xb6cbcf7c, 0xcd769c2b,
        0x53113ec0, 0x1640e3d3, 0x38abbd60, 0x2547adf0, 0xba38209c,
        0xf746ce76, 0x77afa1c5, 0x20756060, 0x85cbfe4e, 0x8ae88dd8,
        0x7aaaf9b0, 0x4cf9aa7e, 0x1948c25c, 0x02fb8a8c, 0x01c36ae4,
        0xd6ebe1f9, 0x90d4f869, 0xa65cdea0, 0x3f09252d, 0xc208e69f,
        0xb74e6132, 0xce77e25b, 0x578fdfe3, 0x3ac372e6
    ];

    /**
     * @type {Array.<number>}
     * @const
     * @inner
     */
    var C_ORIG = [
        0x4f727068, 0x65616e42, 0x65686f6c, 0x64657253, 0x63727944,
        0x6f756274
    ];

    /**
     * @param {Array.<number>} lr
     * @param {number} off
     * @param {Array.<number>} P
     * @param {Array.<number>} S
     * @returns {Array.<number>}
     * @inner
     */
    function _encipher(lr, off, P, S) { // This is our bottleneck: 1714/1905 ticks / 90% - see profile.txt
        var n,
            l = lr[off],
            r = lr[off + 1];

        l ^= P[0];

        /*
        for (var i=0, k=BLOWFISH_NUM_ROUNDS-2; i<=k;)
            // Feistel substitution on left word
            n  = S[l >>> 24],
            n += S[0x100 | ((l >> 16) & 0xff)],
            n ^= S[0x200 | ((l >> 8) & 0xff)],
            n += S[0x300 | (l & 0xff)],
            r ^= n ^ P[++i],
            // Feistel substitution on right word
            n  = S[r >>> 24],
            n += S[0x100 | ((r >> 16) & 0xff)],
            n ^= S[0x200 | ((r >> 8) & 0xff)],
            n += S[0x300 | (r & 0xff)],
            l ^= n ^ P[++i];
        */

        //The following is an unrolled version of the above loop.
        //Iteration 0
        n  = S[l >>> 24];
        n += S[0x100 | ((l >> 16) & 0xff)];
        n ^= S[0x200 | ((l >> 8) & 0xff)];
        n += S[0x300 | (l & 0xff)];
        r ^= n ^ P[1];
        n  = S[r >>> 24];
        n += S[0x100 | ((r >> 16) & 0xff)];
        n ^= S[0x200 | ((r >> 8) & 0xff)];
        n += S[0x300 | (r & 0xff)];
        l ^= n ^ P[2];
        //Iteration 1
        n  = S[l >>> 24];
        n += S[0x100 | ((l >> 16) & 0xff)];
        n ^= S[0x200 | ((l >> 8) & 0xff)];
        n += S[0x300 | (l & 0xff)];
        r ^= n ^ P[3];
        n  = S[r >>> 24];
        n += S[0x100 | ((r >> 16) & 0xff)];
        n ^= S[0x200 | ((r >> 8) & 0xff)];
        n += S[0x300 | (r & 0xff)];
        l ^= n ^ P[4];
        //Iteration 2
        n  = S[l >>> 24];
        n += S[0x100 | ((l >> 16) & 0xff)];
        n ^= S[0x200 | ((l >> 8) & 0xff)];
        n += S[0x300 | (l & 0xff)];
        r ^= n ^ P[5];
        n  = S[r >>> 24];
        n += S[0x100 | ((r >> 16) & 0xff)];
        n ^= S[0x200 | ((r >> 8) & 0xff)];
        n += S[0x300 | (r & 0xff)];
        l ^= n ^ P[6];
        //Iteration 3
        n  = S[l >>> 24];
        n += S[0x100 | ((l >> 16) & 0xff)];
        n ^= S[0x200 | ((l >> 8) & 0xff)];
        n += S[0x300 | (l & 0xff)];
        r ^= n ^ P[7];
        n  = S[r >>> 24];
        n += S[0x100 | ((r >> 16) & 0xff)];
        n ^= S[0x200 | ((r >> 8) & 0xff)];
        n += S[0x300 | (r & 0xff)];
        l ^= n ^ P[8];
        //Iteration 4
        n  = S[l >>> 24];
        n += S[0x100 | ((l >> 16) & 0xff)];
        n ^= S[0x200 | ((l >> 8) & 0xff)];
        n += S[0x300 | (l & 0xff)];
        r ^= n ^ P[9];
        n  = S[r >>> 24];
        n += S[0x100 | ((r >> 16) & 0xff)];
        n ^= S[0x200 | ((r >> 8) & 0xff)];
        n += S[0x300 | (r & 0xff)];
        l ^= n ^ P[10];
        //Iteration 5
        n  = S[l >>> 24];
        n += S[0x100 | ((l >> 16) & 0xff)];
        n ^= S[0x200 | ((l >> 8) & 0xff)];
        n += S[0x300 | (l & 0xff)];
        r ^= n ^ P[11];
        n  = S[r >>> 24];
        n += S[0x100 | ((r >> 16) & 0xff)];
        n ^= S[0x200 | ((r >> 8) & 0xff)];
        n += S[0x300 | (r & 0xff)];
        l ^= n ^ P[12];
        //Iteration 6
        n  = S[l >>> 24];
        n += S[0x100 | ((l >> 16) & 0xff)];
        n ^= S[0x200 | ((l >> 8) & 0xff)];
        n += S[0x300 | (l & 0xff)];
        r ^= n ^ P[13];
        n  = S[r >>> 24];
        n += S[0x100 | ((r >> 16) & 0xff)];
        n ^= S[0x200 | ((r >> 8) & 0xff)];
        n += S[0x300 | (r & 0xff)];
        l ^= n ^ P[14];
        //Iteration 7
        n  = S[l >>> 24];
        n += S[0x100 | ((l >> 16) & 0xff)];
        n ^= S[0x200 | ((l >> 8) & 0xff)];
        n += S[0x300 | (l & 0xff)];
        r ^= n ^ P[15];
        n  = S[r >>> 24];
        n += S[0x100 | ((r >> 16) & 0xff)];
        n ^= S[0x200 | ((r >> 8) & 0xff)];
        n += S[0x300 | (r & 0xff)];
        l ^= n ^ P[16];

        lr[off] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
        lr[off + 1] = l;
        return lr;
    }

    /**
     * @param {Array.<number>} data
     * @param {number} offp
     * @returns {{key: number, offp: number}}
     * @inner
     */
    function _streamtoword(data, offp) {
        for (var i = 0, word = 0; i < 4; ++i)
            word = (word << 8) | (data[offp] & 0xff),
            offp = (offp + 1) % data.length;
        return { key: word, offp: offp };
    }

    /**
     * @param {Array.<number>} key
     * @param {Array.<number>} P
     * @param {Array.<number>} S
     * @inner
     */
    function _key(key, P, S) {
        var offset = 0,
            lr = [0, 0],
            plen = P.length,
            slen = S.length,
            sw;
        for (var i = 0; i < plen; i++)
            sw = _streamtoword(key, offset),
            offset = sw.offp,
            P[i] = P[i] ^ sw.key;
        for (i = 0; i < plen; i += 2)
            lr = _encipher(lr, 0, P, S),
            P[i] = lr[0],
            P[i + 1] = lr[1];
        for (i = 0; i < slen; i += 2)
            lr = _encipher(lr, 0, P, S),
            S[i] = lr[0],
            S[i + 1] = lr[1];
    }

    /**
     * Expensive key schedule Blowfish.
     * @param {Array.<number>} data
     * @param {Array.<number>} key
     * @param {Array.<number>} P
     * @param {Array.<number>} S
     * @inner
     */
    function _ekskey(data, key, P, S) {
        var offp = 0,
            lr = [0, 0],
            plen = P.length,
            slen = S.length,
            sw;
        for (var i = 0; i < plen; i++)
            sw = _streamtoword(key, offp),
            offp = sw.offp,
            P[i] = P[i] ^ sw.key;
        offp = 0;
        for (i = 0; i < plen; i += 2)
            sw = _streamtoword(data, offp),
            offp = sw.offp,
            lr[0] ^= sw.key,
            sw = _streamtoword(data, offp),
            offp = sw.offp,
            lr[1] ^= sw.key,
            lr = _encipher(lr, 0, P, S),
            P[i] = lr[0],
            P[i + 1] = lr[1];
        for (i = 0; i < slen; i += 2)
            sw = _streamtoword(data, offp),
            offp = sw.offp,
            lr[0] ^= sw.key,
            sw = _streamtoword(data, offp),
            offp = sw.offp,
            lr[1] ^= sw.key,
            lr = _encipher(lr, 0, P, S),
            S[i] = lr[0],
            S[i + 1] = lr[1];
    }

    /**
     * Internaly crypts a string.
     * @param {Array.<number>} b Bytes to crypt
     * @param {Array.<number>} salt Salt bytes to use
     * @param {number} rounds Number of rounds
     * @param {function(Error, Array.<number>=)=} callback Callback receiving the error, if any, and the resulting bytes. If
     *  omitted, the operation will be performed synchronously.
     *  @param {function(number)=} progressCallback Callback called with the current progress
     * @returns {!Array.<number>|undefined} Resulting bytes if callback has been omitted, otherwise `undefined`
     * @inner
     */
    function _crypt(b, salt, rounds, callback, progressCallback) {
        var cdata = C_ORIG.slice(),
            clen = cdata.length,
            err;

        // Validate
        if (rounds < 4 || rounds > 31) {
            err = Error("Illegal number of rounds (4-31): "+rounds);
            if (callback) {
                nextTick(callback.bind(this, err));
                return;
            } else
                throw err;
        }
        if (salt.length !== BCRYPT_SALT_LEN) {
            err =Error("Illegal salt length: "+salt.length+" != "+BCRYPT_SALT_LEN);
            if (callback) {
                nextTick(callback.bind(this, err));
                return;
            } else
                throw err;
        }
        rounds = (1 << rounds) >>> 0;

        var P, S, i = 0, j;

        //Use typed arrays when available - huge speedup!
        if (Int32Array) {
            P = new Int32Array(P_ORIG);
            S = new Int32Array(S_ORIG);
        } else {
            P = P_ORIG.slice();
            S = S_ORIG.slice();
        }

        _ekskey(salt, b, P, S);

        /**
         * Calcualtes the next round.
         * @returns {Array.<number>|undefined} Resulting array if callback has been omitted, otherwise `undefined`
         * @inner
         */
        function next() {
            if (progressCallback)
                progressCallback(i / rounds);
            if (i < rounds) {
                var start = Date.now();
                for (; i < rounds;) {
                    i = i + 1;
                    _key(b, P, S);
                    _key(salt, P, S);
                    if (Date.now() - start > MAX_EXECUTION_TIME)
                        break;
                }
            } else {
                for (i = 0; i < 64; i++)
                    for (j = 0; j < (clen >> 1); j++)
                        _encipher(cdata, j << 1, P, S);
                var ret = [];
                for (i = 0; i < clen; i++)
                    ret.push(((cdata[i] >> 24) & 0xff) >>> 0),
                    ret.push(((cdata[i] >> 16) & 0xff) >>> 0),
                    ret.push(((cdata[i] >> 8) & 0xff) >>> 0),
                    ret.push((cdata[i] & 0xff) >>> 0);
                if (callback) {
                    callback(null, ret);
                    return;
                } else
                    return ret;
            }
            if (callback)
                nextTick(next);
        }

        // Async
        if (typeof callback !== 'undefined') {
            next();

            // Sync
        } else {
            var res;
            while (true)
                if (typeof(res = next()) !== 'undefined')
                    return res || [];
        }
    }

    /**
     * Internally hashes a string.
     * @param {string} s String to hash
     * @param {?string} salt Salt to use, actually never null
     * @param {function(Error, string=)=} callback Callback receiving the error, if any, and the resulting hash. If omitted,
     *  hashing is perormed synchronously.
     *  @param {function(number)=} progressCallback Callback called with the current progress
     * @returns {string|undefined} Resulting hash if callback has been omitted, otherwise `undefined`
     * @inner
     */
    function _hash(s, salt, callback, progressCallback) {
        var err;
        if (typeof s !== 'string' || typeof salt !== 'string') {
            err = Error("Invalid string / salt: Not a string");
            if (callback) {
                nextTick(callback.bind(this, err));
                return;
            }
            else
                throw err;
        }

        // Validate the salt
        var minor, offset;
        if (salt.charAt(0) !== '$' || salt.charAt(1) !== '2') {
            err = Error("Invalid salt version: "+salt.substring(0,2));
            if (callback) {
                nextTick(callback.bind(this, err));
                return;
            }
            else
                throw err;
        }
        if (salt.charAt(2) === '$')
            minor = String.fromCharCode(0),
            offset = 3;
        else {
            minor = salt.charAt(2);
            if ((minor !== 'a' && minor !== 'b' && minor !== 'y') || salt.charAt(3) !== '$') {
                err = Error("Invalid salt revision: "+salt.substring(2,4));
                if (callback) {
                    nextTick(callback.bind(this, err));
                    return;
                } else
                    throw err;
            }
            offset = 4;
        }

        // Extract number of rounds
        if (salt.charAt(offset + 2) > '$') {
            err = Error("Missing salt rounds");
            if (callback) {
                nextTick(callback.bind(this, err));
                return;
            } else
                throw err;
        }
        var r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10,
            r2 = parseInt(salt.substring(offset + 1, offset + 2), 10),
            rounds = r1 + r2,
            real_salt = salt.substring(offset + 3, offset + 25);
        s += minor >= 'a' ? "\x00" : "";

        var passwordb = stringToBytes(s),
            saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);

        /**
         * Finishes hashing.
         * @param {Array.<number>} bytes Byte array
         * @returns {string}
         * @inner
         */
        function finish(bytes) {
            var res = [];
            res.push("$2");
            if (minor >= 'a')
                res.push(minor);
            res.push("$");
            if (rounds < 10)
                res.push("0");
            res.push(rounds.toString());
            res.push("$");
            res.push(base64_encode(saltb, saltb.length));
            res.push(base64_encode(bytes, C_ORIG.length * 4 - 1));
            return res.join('');
        }

        // Sync
        if (typeof callback == 'undefined')
            return finish(_crypt(passwordb, saltb, rounds));

        // Async
        else {
            _crypt(passwordb, saltb, rounds, function(err, bytes) {
                if (err)
                    callback(err, null);
                else
                    callback(null, finish(bytes));
            }, progressCallback);
        }
    }

    /**
     * Encodes a byte array to base64 with up to len bytes of input, using the custom bcrypt alphabet.
     * @function
     * @param {!Array.<number>} b Byte array
     * @param {number} len Maximum input length
     * @returns {string}
     * @expose
     */
    bcrypt.encodeBase64 = base64_encode;

    /**
     * Decodes a base64 encoded string to up to len bytes of output, using the custom bcrypt alphabet.
     * @function
     * @param {string} s String to decode
     * @param {number} len Maximum output length
     * @returns {!Array.<number>}
     * @expose
     */
    bcrypt.decodeBase64 = base64_decode;

    return bcrypt;
}));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "JbtM":
/*!**************************************************!*\
  !*** ./src/assets/source/elements/svg/script.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Script; });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "624d");

class Script extends _element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a new sript element.
    */
    constructor() {
        let title = document.createElementNS('http://www.w3.org/2000/svg', 'script');
        super(title);
    }
    // comments inherited from base class
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
        return this;
    }
    // comments inherited from base class
    getAttribute(name) {
        return this.root.getAttribute(name);
    }
}
//# sourceMappingURL=script.js.map

/***/ }),

/***/ "LT1O":
/*!********************************************************************!*\
  !*** ./node_modules/ngx-papaparse/node_modules/tslib/tslib.es6.js ***!
  \********************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "LyDu":
/*!************************************************************!*\
  !*** ./src/assets/source/elements/input/control-circle.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ControlCircle; });
/* harmony import */ var _control_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./control.js */ "kJ17");

// A first pass implementation of a control circle. In the future, it seems to
// make sense for basic elements to be draggable. I think this would mean
// making a draggable interface or class that contains window event handlers.
// Another alternative would be moving some of that logic into the controller or
// interactive wrapper class.
class ControlCircle extends _control_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a control at the position (x,y)
    */
    constructor(x, y) {
        super(x, y);
        this.point.r = ControlCircle.circleRadius;
        this.handle.r = ControlCircle.circleRadius + .8;
        this.handle.style.strokeWidth = '2';
        // this.point.style.fill = 'lightblue';
        this.point.style.fill = this.handle.style.stroke;
    }
}
// Describes the size of the control handle and point
ControlCircle.circleRadius = 10;
//# sourceMappingURL=control-circle.js.map

/***/ }),

/***/ "NpuA":
/*!*************************************************!*\
  !*** ./node_modules/papaparse/papaparse.min.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* @license
Papa Parse
v5.3.0
https://github.com/mholt/PapaParse
License: MIT
*/
!function(e,t){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):undefined}(this,function s(){"use strict";var f="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==f?f:{};var n=!f.document&&!!f.postMessage,o=n&&/blob:/i.test((f.location||{}).protocol),a={},h=0,b={parse:function(e,t){var i=(t=t||{}).dynamicTyping||!1;U(i)&&(t.dynamicTypingFunction=i,i={});if(t.dynamicTyping=i,t.transform=!!U(t.transform)&&t.transform,t.worker&&b.WORKERS_SUPPORTED){var r=function(){if(!b.WORKERS_SUPPORTED)return!1;var e=(i=f.URL||f.webkitURL||null,r=s.toString(),b.BLOB_URL||(b.BLOB_URL=i.createObjectURL(new Blob(["(",r,")();"],{type:"text/javascript"})))),t=new f.Worker(e);var i,r;return t.onmessage=m,t.id=h++,a[t.id]=t}();return r.userStep=t.step,r.userChunk=t.chunk,r.userComplete=t.complete,r.userError=t.error,t.step=U(t.step),t.chunk=U(t.chunk),t.complete=U(t.complete),t.error=U(t.error),delete t.worker,void r.postMessage({input:e,config:t,workerId:r.id})}var n=null;b.NODE_STREAM_INPUT,"string"==typeof e?n=t.download?new l(t):new p(t):!0===e.readable&&U(e.read)&&U(e.on)?n=new g(t):(f.File&&e instanceof File||e instanceof Object)&&(n=new c(t));return n.stream(e)},unparse:function(e,t){var n=!1,m=!0,_=",",v="\r\n",s='"',a=s+s,i=!1,r=null,o=!1;!function(){if("object"!=typeof t)return;"string"!=typeof t.delimiter||b.BAD_DELIMITERS.filter(function(e){return-1!==t.delimiter.indexOf(e)}).length||(_=t.delimiter);("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(n=t.quotes);"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(i=t.skipEmptyLines);"string"==typeof t.newline&&(v=t.newline);"string"==typeof t.quoteChar&&(s=t.quoteChar);"boolean"==typeof t.header&&(m=t.header);if(Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");r=t.columns}void 0!==t.escapeChar&&(a=t.escapeChar+s);"boolean"==typeof t.escapeFormulae&&(o=t.escapeFormulae)}();var h=new RegExp(q(s),"g");"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return f(null,e,i);if("object"==typeof e[0])return f(r||u(e[0]),e,i)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:u(e.data[0])),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),f(e.fields||[],e.data||[],i);throw new Error("Unable to serialize unrecognized input");function u(e){if("object"!=typeof e)return[];var t=[];for(var i in e)t.push(i);return t}function f(e,t,i){var r="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=Array.isArray(e)&&0<e.length,s=!Array.isArray(t[0]);if(n&&m){for(var a=0;a<e.length;a++)0<a&&(r+=_),r+=y(e[a],a);0<t.length&&(r+=v)}for(var o=0;o<t.length;o++){var h=n?e.length:t[o].length,u=!1,f=n?0===Object.keys(t[o]).length:0===t[o].length;if(i&&!n&&(u="greedy"===i?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===i&&n){for(var d=[],l=0;l<h;l++){var c=s?e[l]:l;d.push(t[o][c])}u=""===d.join("").trim()}if(!u){for(var p=0;p<h;p++){0<p&&!f&&(r+=_);var g=n&&s?e[p]:p;r+=y(t[o][g],p)}o<t.length-1&&(!i||0<h&&!f)&&(r+=v)}}return r}function y(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);!0===o&&"string"==typeof e&&null!==e.match(/^[=+\-@].*$/)&&(e="'"+e);var i=e.toString().replace(h,a),r="boolean"==typeof n&&n||"function"==typeof n&&n(e,t)||Array.isArray(n)&&n[t]||function(e,t){for(var i=0;i<t.length;i++)if(-1<e.indexOf(t[i]))return!0;return!1}(i,b.BAD_DELIMITERS)||-1<i.indexOf(_)||" "===i.charAt(0)||" "===i.charAt(i.length-1);return r?s+i+s:i}}};if(b.RECORD_SEP=String.fromCharCode(30),b.UNIT_SEP=String.fromCharCode(31),b.BYTE_ORDER_MARK="\ufeff",b.BAD_DELIMITERS=["\r","\n",'"',b.BYTE_ORDER_MARK],b.WORKERS_SUPPORTED=!n&&!!f.Worker,b.NODE_STREAM_INPUT=1,b.LocalChunkSize=10485760,b.RemoteChunkSize=5242880,b.DefaultDelimiter=",",b.Parser=w,b.ParserHandle=i,b.NetworkStreamer=l,b.FileStreamer=c,b.StringStreamer=p,b.ReadableStreamStreamer=g,f.jQuery){var d=f.jQuery;d.fn.parse=function(o){var i=o.config||{},h=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&f.FileReader)||!this.files||0===this.files.length)return!0;for(var t=0;t<this.files.length;t++)h.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},i)})}),e(),this;function e(){if(0!==h.length){var e,t,i,r,n=h[0];if(U(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,i=n.inputElem,r=s.reason,void(U(o.error)&&o.error({name:e},t,i,r));if("skip"===s.action)return void u();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config))}else if("skip"===s)return void u()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){U(a)&&a(e,n.file,n.inputElem),u()},b.parse(n.file,n.instanceConfig)}else U(o.complete)&&o.complete()}function u(){h.splice(0,1),e()}}}function u(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=E(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new i(t),(this._handle.streamer=this)._config=t}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&U(this._config.beforeFirstChunk)){var i=this._config.beforeFirstChunk(e);void 0!==i&&(e=i)}this.isFirstChunk=!1,this._halted=!1;var r=this._partialLine+e;this._partialLine="";var n=this._handle.parse(r,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=n.meta.cursor;this._finished||(this._partialLine=r.substring(s-this._baseIndex),this._baseIndex=s),n&&n.data&&(this._rowCount+=n.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(o)f.postMessage({results:n,workerId:b.WORKER_ID,finished:a});else if(U(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);n=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!U(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}this._halted=!0},this._sendError=function(e){U(this._config.error)?this._config.error(e):o&&this._config.error&&f.postMessage({workerId:b.WORKER_ID,error:e,finished:!1})}}function l(e){var r;(e=e||{}).chunkSize||(e.chunkSize=b.RemoteChunkSize),u.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(r=new XMLHttpRequest,this._config.withCredentials&&(r.withCredentials=this._config.withCredentials),n||(r.onload=y(this._chunkLoaded,this),r.onerror=y(this._chunkError,this)),r.open(this._config.downloadRequestBody?"POST":"GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var t in e)r.setRequestHeader(t,e[t])}if(this._config.chunkSize){var i=this._start+this._config.chunkSize-1;r.setRequestHeader("Range","bytes="+this._start+"-"+i)}try{r.send(this._config.downloadRequestBody)}catch(e){this._chunkError(e.message)}n&&0===r.status&&this._chunkError()}},this._chunkLoaded=function(){4===r.readyState&&(r.status<200||400<=r.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:r.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range");if(null===t)return-1;return parseInt(t.substring(t.lastIndexOf("/")+1))}(r),this.parseChunk(r.responseText)))},this._chunkError=function(e){var t=r.statusText||e;this._sendError(new Error(t))}}function c(e){var r,n;(e=e||{}).chunkSize||(e.chunkSize=b.LocalChunkSize),u.call(this,e);var s="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,s?((r=new FileReader).onload=y(this._chunkLoaded,this),r.onerror=y(this._chunkError,this)):r=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var t=Math.min(this._start+this._config.chunkSize,this._input.size);e=n.call(e,this._start,t)}var i=r.readAsText(e,this._config.encoding);s||this._chunkLoaded({target:{result:i}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(r.error)}}function p(e){var i;u.call(this,e=e||{}),this.stream=function(e){return i=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,t=this._config.chunkSize;return t?(e=i.substring(0,t),i=i.substring(t)):(e=i,i=""),this._finished=!i,this.parseChunk(e)}}}function g(e){u.call(this,e=e||{});var t=[],i=!0,r=!1;this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){r&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):i=!0},this._streamData=y(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=y(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=y(function(){this._streamCleanUp(),r=!0,this._streamData("")},this),this._streamCleanUp=y(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function i(_){var a,o,h,r=Math.pow(2,53),n=-r,s=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)(e[-+]?\d+)?\s*$/,u=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,t=this,i=0,f=0,d=!1,e=!1,l=[],c={data:[],errors:[],meta:{}};if(U(_.step)){var p=_.step;_.step=function(e){if(c=e,m())g();else{if(g(),0===c.data.length)return;i+=e.data.length,_.preview&&i>_.preview?o.abort():(c.data=c.data[0],p(c,t))}}}function v(e){return"greedy"===_.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function g(){if(c&&h&&(k("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+b.DefaultDelimiter+"'"),h=!1),_.skipEmptyLines)for(var e=0;e<c.data.length;e++)v(c.data[e])&&c.data.splice(e--,1);return m()&&function(){if(!c)return;function e(e,t){U(_.transformHeader)&&(e=_.transformHeader(e,t)),l.push(e)}if(Array.isArray(c.data[0])){for(var t=0;m()&&t<c.data.length;t++)c.data[t].forEach(e);c.data.splice(0,1)}else c.data.forEach(e)}(),function(){if(!c||!_.header&&!_.dynamicTyping&&!_.transform)return c;function e(e,t){var i,r=_.header?{}:[];for(i=0;i<e.length;i++){var n=i,s=e[i];_.header&&(n=i>=l.length?"__parsed_extra":l[i]),_.transform&&(s=_.transform(s,n)),s=y(n,s),"__parsed_extra"===n?(r[n]=r[n]||[],r[n].push(s)):r[n]=s}return _.header&&(i>l.length?k("FieldMismatch","TooManyFields","Too many fields: expected "+l.length+" fields but parsed "+i,f+t):i<l.length&&k("FieldMismatch","TooFewFields","Too few fields: expected "+l.length+" fields but parsed "+i,f+t)),r}var t=1;!c.data.length||Array.isArray(c.data[0])?(c.data=c.data.map(e),t=c.data.length):c.data=e(c.data,0);_.header&&c.meta&&(c.meta.fields=l);return f+=t,c}()}function m(){return _.header&&0===l.length}function y(e,t){return i=e,_.dynamicTypingFunction&&void 0===_.dynamicTyping[i]&&(_.dynamicTyping[i]=_.dynamicTypingFunction(i)),!0===(_.dynamicTyping[i]||_.dynamicTyping)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&(function(e){if(s.test(e)){var t=parseFloat(e);if(n<t&&t<r)return!0}return!1}(t)?parseFloat(t):u.test(t)?new Date(t):""===t?null:t):t;var i}function k(e,t,i,r){var n={type:e,code:t,message:i};void 0!==r&&(n.row=r),c.errors.push(n)}this.parse=function(e,t,i){var r=_.quoteChar||'"';if(_.newline||(_.newline=function(e,t){e=e.substring(0,1048576);var i=new RegExp(q(t)+"([^]*?)"+q(t),"gm"),r=(e=e.replace(i,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<r[0].length;if(1===r.length||s)return"\n";for(var a=0,o=0;o<r.length;o++)"\n"===r[o][0]&&a++;return a>=r.length/2?"\r\n":"\r"}(e,r)),h=!1,_.delimiter)U(_.delimiter)&&(_.delimiter=_.delimiter(e),c.meta.delimiter=_.delimiter);else{var n=function(e,t,i,r,n){var s,a,o,h;n=n||[",","\t","|",";",b.RECORD_SEP,b.UNIT_SEP];for(var u=0;u<n.length;u++){var f=n[u],d=0,l=0,c=0;o=void 0;for(var p=new w({comments:r,delimiter:f,newline:t,preview:10}).parse(e),g=0;g<p.data.length;g++)if(i&&v(p.data[g]))c++;else{var m=p.data[g].length;l+=m,void 0!==o?0<m&&(d+=Math.abs(m-o),o=m):o=m}0<p.data.length&&(l/=p.data.length-c),(void 0===a||d<=a)&&(void 0===h||h<l)&&1.99<l&&(a=d,s=f,h=l)}return{successful:!!(_.delimiter=s),bestDelimiter:s}}(e,_.newline,_.skipEmptyLines,_.comments,_.delimitersToGuess);n.successful?_.delimiter=n.bestDelimiter:(h=!0,_.delimiter=b.DefaultDelimiter),c.meta.delimiter=_.delimiter}var s=E(_);return _.preview&&_.header&&s.preview++,a=e,o=new w(s),c=o.parse(a,t,i),g(),d?{meta:{paused:!0}}:c||{meta:{paused:!1}}},this.paused=function(){return d},this.pause=function(){d=!0,o.abort(),a=U(_.chunk)?"":a.substring(o.getCharIndex())},this.resume=function(){t.streamer._halted?(d=!1,t.streamer.parseChunk(a,!0)):setTimeout(t.resume,3)},this.aborted=function(){return e},this.abort=function(){e=!0,o.abort(),c.meta.aborted=!0,U(_.complete)&&_.complete(c),a=""}}function q(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function w(e){var O,D=(e=e||{}).delimiter,I=e.newline,T=e.comments,A=e.step,L=e.preview,F=e.fastMode,z=O=void 0===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(z=e.escapeChar),("string"!=typeof D||-1<b.BAD_DELIMITERS.indexOf(D))&&(D=","),T===D)throw new Error("Comment character same as delimiter");!0===T?T="#":("string"!=typeof T||-1<b.BAD_DELIMITERS.indexOf(T))&&(T=!1),"\n"!==I&&"\r"!==I&&"\r\n"!==I&&(I="\n");var M=0,j=!1;this.parse=function(a,t,i){if("string"!=typeof a)throw new Error("Input must be a string");var r=a.length,e=D.length,n=I.length,s=T.length,o=U(A),h=[],u=[],f=[],d=M=0;if(!a)return R();if(F||!1!==F&&-1===a.indexOf(O)){for(var l=a.split(I),c=0;c<l.length;c++){if(f=l[c],M+=f.length,c!==l.length-1)M+=I.length;else if(i)return R();if(!T||f.substring(0,s)!==T){if(o){if(h=[],b(f.split(D)),S(),j)return R()}else b(f.split(D));if(L&&L<=c)return h=h.slice(0,L),R(!0)}}return R()}for(var p=a.indexOf(D,M),g=a.indexOf(I,M),m=new RegExp(q(z)+q(O),"g"),_=a.indexOf(O,M);;)if(a[M]!==O)if(T&&0===f.length&&a.substring(M,M+s)===T){if(-1===g)return R();M=g+n,g=a.indexOf(I,M),p=a.indexOf(D,M)}else{if(-1!==p&&(p<g||-1===g)){if(!(p<_)){f.push(a.substring(M,p)),M=p+e,p=a.indexOf(D,M);continue}var v=x(p,_,g);if(v&&void 0!==v.nextDelim){p=v.nextDelim,_=v.quoteSearch,f.push(a.substring(M,p)),M=p+e,p=a.indexOf(D,M);continue}}if(-1===g)break;if(f.push(a.substring(M,g)),C(g+n),o&&(S(),j))return R();if(L&&h.length>=L)return R(!0)}else for(_=M,M++;;){if(-1===(_=a.indexOf(O,_+1)))return i||u.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:h.length,index:M}),E();if(_===r-1)return E(a.substring(M,_).replace(m,O));if(O!==z||a[_+1]!==z){if(O===z||0===_||a[_-1]!==z){-1!==p&&p<_+1&&(p=a.indexOf(D,_+1)),-1!==g&&g<_+1&&(g=a.indexOf(I,_+1));var y=w(-1===g?p:Math.min(p,g));if(a[_+1+y]===D){f.push(a.substring(M,_).replace(m,O)),a[M=_+1+y+e]!==O&&(_=a.indexOf(O,M)),p=a.indexOf(D,M),g=a.indexOf(I,M);break}var k=w(g);if(a.substring(_+1+k,_+1+k+n)===I){if(f.push(a.substring(M,_).replace(m,O)),C(_+1+k+n),p=a.indexOf(D,M),_=a.indexOf(O,M),o&&(S(),j))return R();if(L&&h.length>=L)return R(!0);break}u.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:h.length,index:M}),_++}}else _++}return E();function b(e){h.push(e),d=M}function w(e){var t=0;if(-1!==e){var i=a.substring(_+1,e);i&&""===i.trim()&&(t=i.length)}return t}function E(e){return i||(void 0===e&&(e=a.substring(M)),f.push(e),M=r,b(f),o&&S()),R()}function C(e){M=e,b(f),f=[],g=a.indexOf(I,M)}function R(e){return{data:h,errors:u,meta:{delimiter:D,linebreak:I,aborted:j,truncated:!!e,cursor:d+(t||0)}}}function S(){A(R()),h=[],u=[]}function x(e,t,i){var r={nextDelim:void 0,quoteSearch:void 0},n=a.indexOf(O,t+1);if(t<e&&e<n&&(n<i||-1===i)){var s=a.indexOf(D,n);if(-1===s)return r;n<s&&(n=a.indexOf(O,n+1)),r=x(s,n,i)}else r={nextDelim:e,quoteSearch:t};return r}},this.abort=function(){j=!0},this.getCharIndex=function(){return M}}function m(e){var t=e.data,i=a[t.workerId],r=!1;if(t.error)i.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){r=!0,_(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:v,resume:v};if(U(i.userStep)){for(var s=0;s<t.results.data.length&&(i.userStep({data:t.results.data[s],errors:t.results.errors,meta:t.results.meta},n),!r);s++);delete t.results}else U(i.userChunk)&&(i.userChunk(t.results,n,t.file),delete t.results)}t.finished&&!r&&_(t.workerId,t.results)}function _(e,t){var i=a[e];U(i.userComplete)&&i.userComplete(t),i.terminate(),delete a[e]}function v(){throw new Error("Not implemented.")}function E(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var i in e)t[i]=E(e[i]);return t}function y(e,t){return function(){e.apply(t,arguments)}}function U(e){return"function"==typeof e}return o&&(f.onmessage=function(e){var t=e.data;void 0===b.WORKER_ID&&t&&(b.WORKER_ID=t.workerId);if("string"==typeof t.input)f.postMessage({workerId:b.WORKER_ID,results:b.parse(t.input,t.config),finished:!0});else if(f.File&&t.input instanceof File||t.input instanceof Object){var i=b.parse(t.input,t.config);i&&f.postMessage({workerId:b.WORKER_ID,results:i,finished:!0})}}),(l.prototype=Object.create(u.prototype)).constructor=l,(c.prototype=Object.create(u.prototype)).constructor=c,(p.prototype=Object.create(p.prototype)).constructor=p,(g.prototype=Object.create(u.prototype)).constructor=g,b});

/***/ }),

/***/ "O8K7":
/*!***************************************************!*\
  !*** ./src/app/tagger/sidebar/sidebar.service.ts ***!
  \***************************************************/
/*! exports provided: sidebarService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sidebarService", function() { return sidebarService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class sidebarService {
    constructor() {
        this.zoom = 2;
        this.glassActive = false;
    }
    removeGlass() {
        let magni = document.getElementsByClassName("img-magnifier-glass");
        if (magni[0])
            magni[0].remove();
    }
    changeGlass() {
        this.glassActive = !this.glassActive;
        if (this.glassActive) {
            this.magniGlass("image");
        }
        else {
            this.removeGlass();
        }
    }
    setZoom(newValue) {
        this.zoom = newValue;
        this.removeGlass();
        this.magniGlass("image");
    }
    magniGlass(imgId) {
        let magni = document.getElementsByClassName("img-magnifier-glass");
        if (magni[0]) {
            return;
        }
        if (!this.glassActive) {
            return;
        }
        let w, h, bw;
        let zoom = this.zoom;
        const img = document.getElementById(imgId);
        const interactive = document.getElementById("my-interactive");
        let glass = document.createElement("div");
        glass.setAttribute("class", "img-magnifier-glass");
        interactive.parentElement.insertBefore(glass, interactive);
        // interactive.style.backgroundImage = "url('" + img.src + "')";
        glass.style.backgroundImage = "url('" + img.src + "')";
        glass.style.backgroundRepeat = "no-repeat";
        glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
        bw = 3;
        w = glass.offsetWidth / 2;
        h = glass.offsetHeight / 2;
        /*execute a function when someone moves the magnifier glass over the image:*/
        glass.addEventListener("mousemove", moveMagnifier);
        interactive.addEventListener("mousemove", moveMagnifier);
        /*and also for touch screens:*/
        glass.addEventListener("touchmove", moveMagnifier);
        interactive.addEventListener("touchmove", moveMagnifier);
        function moveMagnifier(e) {
            var pos, x, y;
            /*prevent any other actions that may occur when moving over the image*/
            e.preventDefault();
            /*get the cursor's x and y positions:*/
            pos = getCursorPos(e);
            x = pos.x;
            y = pos.y;
            /*prevent the magnifier glass from being positioned outside the image:*/
            if (x > img.width - (w / zoom)) {
                x = img.width - (w / zoom);
            }
            if (x < w / zoom) {
                x = w / zoom;
            }
            if (y > img.height - (h / zoom)) {
                y = img.height - (h / zoom);
            }
            if (y < h / zoom) {
                y = h / zoom;
            }
            /*set the position of the magnifier glass:*/
            glass.style.left = (x - w) + "px";
            glass.style.top = (y - h) + "px";
            /*display what the magnifier glass "sees":*/
            glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
        }
        function getCursorPos(e) {
            var a, x = 0, y = 0;
            e = e || window.event;
            /*get the x and y positions of the image:*/
            a = img.getBoundingClientRect();
            /*calculate the cursor's x and y coordinates, relative to the image:*/
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            /*consider any page scrolling:*/
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return { x: x, y: y };
        }
    }
}
sidebarService.ɵfac = function sidebarService_Factory(t) { return new (t || sidebarService)(); };
sidebarService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: sidebarService, factory: sidebarService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](sidebarService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "OMCq":
/*!**************************************************!*\
  !*** ./src/assets/source/elements/svg/t-span.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TSpan; });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "624d");

/**
* A tspan element is a text element that allows the user to change the style
* or position of the rendered text inside the tspan.
*/
class TSpan extends _element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a tspan element
    */
    constructor(str) {
        let tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.innerHTML = str;
        super(tspan);
    }
    /**
    * The text contents of this tspan element
    */
    get text() {
        return this.root.innerHTML;
    }
    /**
    * Sets the text contents of this tspan element to the provided string
    */
    set text(str) {
        this.root.innerHTML = str;
    }
    // comment inherited from base class
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
        return this;
    }
    // comment inherited from base class
    getAttribute(name) {
        return this.root.getAttribute(name);
    }
    /**
    * Creates a child tspan element.
    */
    tspan(str) {
        let tspan = new TSpan(str);
        this.root.appendChild(tspan.root);
        return tspan;
    }
}
//# sourceMappingURL=t-span.js.map

/***/ }),

/***/ "P6Fj":
/*!***************************************************************************!*\
  !*** ./node_modules/ngx-papaparse/__ivy_ngcc__/fesm2015/ngx-papaparse.js ***!
  \***************************************************************************/
/*! exports provided: Papa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Papa", function() { return Papa; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "LT1O");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var papaparse_papaparse_min_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! papaparse/papaparse.min.js */ "NpuA");
/* harmony import */ var papaparse_papaparse_min_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(papaparse_papaparse_min_js__WEBPACK_IMPORTED_MODULE_2__);





let Papa = class Papa {
    constructor() {
        this._papa = papaparse_papaparse_min_js__WEBPACK_IMPORTED_MODULE_2__;
    }
    /**
     * Parse CSV to an array
     */
    parse(csv, config) {
        return this._papa.parse(csv, config);
    }
    /**
     * Convert an array into CSV
     */
    unparse(data, config) {
        return this._papa.unparse(data, config);
    }
    /**
     * Set the size in bytes of each file chunk.
     * Used when streaming files obtained from the DOM that
     * exist on the local computer. Default 10 MB.
     */
    setLocalChunkSize(value) {
        this._papa.LocalChunkSize = value;
    }
    /**
     * Set the size in bytes of each remote file chunk.
     * Used when streaming remote files. Default 5 MB.
     */
    setRemoteChunkSize(value) {
        this._papa.RemoteChunkSize = value;
    }
    /**
     * Set the delimiter used when it is left unspecified and cannot be detected automatically. Default is comma.
     */
    setDefaultDelimiter(value) {
        this._papa.DefaultDelimiter = value;
    }
    /**
     * An array of characters that are not allowed as delimiters.
     */
    get badDelimiters() {
        return this._papa.BAD_DELIMITERS;
    }
    /**
     * The true delimiter. Invisible. ASCII code 30.
     * Should be doing the job we strangely rely upon commas and tabs for.
     */
    get recordSeparator() {
        return this._papa.RECORD_SEP;
    }
    /**
     * Also sometimes used as a delimiting character. ASCII code 31.
     */
    get unitSeparator() {
        return this._papa.UNIT_SEP;
    }
    /**
     * Whether or not the browser supports HTML5 Web Workers.
     * If false, worker: true will have no effect.
     */
    get workersSupported() {
        return this._papa.WORKERS_SUPPORTED;
    }
};
Papa.ɵfac = function Papa_Factory(t) { return new (t || Papa)(); };
Papa.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function Papa_Factory() { return new Papa(); }, token: Papa, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](Papa, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

/*
 * Public API Surface of papaparse
 */

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=ngx-papaparse.js.map

/***/ }),

/***/ "PLVj":
/*!************************************************!*\
  !*** ./src/assets/source/elements/maps/map.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GeoMap; });
/* harmony import */ var _svg_svg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svg/svg.js */ "GAEk");
/* harmony import */ var _svg_group_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../svg/group.js */ "sFit");


/**
* Map class for displaying geographic maps of the world and its different parts.
*/
class GeoMap extends _svg_svg_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /*
    * mapName: the name of the map you wish to render
    * width: width of the map
    * height: height of the map
    */
    constructor(featureName, externalData, options = {}) {
        super();
        let defaultOptions = {
            fill: "white",
            stroke: "black",
            strokeWidth: 0.5,
            nonScalingStroke: true
        };
        this.mapOptions = Object.assign(Object.assign({}, defaultOptions), options);
        this.featureName = featureName;
        this.externalJSON = externalData;
        this.featuresMap = new Map();
        this.draw(featureName);
    }
    /**
     * Renders the geo json onto the webpage.
     * @param name name of the feature you want to draw. If left blank will draw all features
     */
    draw(name) {
        this.clearPaths();
        if (name != "")
            this.featureName = name;
        else
            this.featureName = null;
        this.loadExternalJSON(name);
        this.featuresMap.forEach(element => {
            this.appendChild(element);
        });
        let bbox = this.root.getBBox();
        this.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
    }
    /**
     * remove the feature with the passed in name from the geo map
     * @param name the name of the feature you want to remove
     */
    removeFeature(name) {
        if (this.featuresMap.has(name)) {
            let c = this.featuresMap.get(name);
            c.remove();
            this.featuresMap.delete(name);
        }
    }
    /**
     * Clears the interactive of all Map paths.
     */
    clearPaths() {
        let t = this.root.getElementsByClassName('feature');
        while (t.length > 0) {
            t[0].remove();
        }
        this.featuresMap = new Map();
    }
    /**
     * Returns the path for the given feature name
     * @param name name of the feature you want the path for
     */
    getPathForFeatureName(name) {
        return this.featuresMap.get(name);
    }
    /**
     * Returns all of the paths for the current map.
     */
    getAllFeaturePaths() {
        return Array.from(this.featuresMap.values());
    }
    /**
     * Returns an Array HTML Elements that are all of the plotted features.
     */
    getHTMLFeatureElements() {
        return Array.from(this.root.children);
    }
    /**
     * sets the viewbox of the interactive to the specified feature
     */
    setViewBoxToFeature(name) {
        if (this.featuresMap.has(name)) {
            let bbox = this.featuresMap.get(name).root.getBBox();
            this.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
        }
    }
    /**
     * Resets the viewbox to the entire map
     */
    resetViewBox() {
        let bbox = this.root.getBBox();
        this.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
    }
    /**
     * Sets up a group for the passsed in feature name
     * @param name name of the feature
     */
    setupGroup(name) {
        let g = new _svg_group_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
        g.classList.remove("element");
        g.root.setAttribute("name", name);
        g.style.stroke = this.mapOptions.stroke;
        g.style.fill = this.mapOptions.fill;
        g.style.strokeWidth = this.mapOptions.strokeWidth.toString();
        g.classList.add("feature");
        return g;
    }
    /**
     * Plots JSON into SVG paths. If the name param is provided only features that match
     * those names will be plotted.
     * @param name the optional name of the features you want to plot
     */
    loadExternalJSON(name) {
        var json = this.externalJSON;
        var listOfNames = null;
        if (this.featureName != null)
            listOfNames = name.toLowerCase().split(',');
        var k = 0;
        var c = 0;
        var i = 1;
        try {
            for (let c = 0; c < json.features.length; c++) {
                for (let k = 0; k < json.features[c].geometry.coordinates.length; k++) {
                    let currentFeatureName = json.features[c].properties.name;
                    if (this.featureName != null) {
                        if (listOfNames != null && !listOfNames.includes(currentFeatureName.toLowerCase())) {
                            continue;
                        }
                        else {
                            if (!this.featuresMap.has(currentFeatureName)) {
                                let g = this.setupGroup(currentFeatureName);
                                this.featuresMap.set(currentFeatureName, g);
                            }
                        }
                    }
                    else {
                        if (!this.featuresMap.has(currentFeatureName)) {
                            let g = this.setupGroup(currentFeatureName);
                            this.featuresMap.set(currentFeatureName, g);
                        }
                    }
                    if (json.features[c].geometry.coordinates[k].length == 1) {
                        let path = this.featuresMap.get(currentFeatureName).path('M 0 0');
                        if (this.mapOptions.nonScalingStroke)
                            path.root.setAttribute("vector-effect", 'non-scaling-stroke');
                        let startX = json.features[c].geometry.coordinates[k][0][0][0];
                        let startY = json.features[c].geometry.coordinates[k][0][0][1];
                        path.d = `M ${startX} ${-1 * startY}  `;
                        for (i = 1; i < json.features[c].geometry.coordinates[k][0].length; i++) {
                            let x = json.features[c].geometry.coordinates[k][0][i][0];
                            let y = json.features[c].geometry.coordinates[k][0][i][1];
                            path.d += `L ${x} ${-1 * y} `;
                        }
                    }
                    else {
                        let path = this.featuresMap.get(currentFeatureName).path('M 0 0');
                        if (this.mapOptions.nonScalingStroke)
                            path.root.setAttribute("vector-effect", 'non-scaling-stroke');
                        let startX = json.features[c].geometry.coordinates[k][0][0];
                        let startY = json.features[c].geometry.coordinates[k][0][1];
                        path.d = `M ${startX} ${-1 * startY} `;
                        for (i = 1; i < json.features[c].geometry.coordinates[k].length; i++) {
                            let x = json.features[c].geometry.coordinates[k][i][0];
                            let y = json.features[c].geometry.coordinates[k][i][1];
                            path.d += `L ${x} ${-1 * y} `;
                        }
                    }
                }
            }
        }
        catch (e) {
            throw new Error('There was an error processing the provided GeoJSON: ' + e);
        }
    }
    /**
    * The default behavior is to update its dependents on change.
    */
    onchange() {
        this.updateDependents();
    }
}
//# sourceMappingURL=map.js.map

/***/ }),

/***/ "Piay":
/*!*******************************************************!*\
  !*** ./src/assets/source/elements/input/check-box.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CheckBox; });
/* harmony import */ var _svg_rectangle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svg/rectangle.js */ "TU2K");
/* harmony import */ var _svg_text_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../svg/text.js */ "maoU");
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input.js */ "Ambf");



/**
* A checkbox with an label. The can be checked, unchecked, and related to other
* elements.
*/
class CheckBox extends _input_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
    /**
    * Constructs a control at the position (x,y)
    */
    constructor(x, y, text, value) {
        super();
        /**
        * The state of the checkbox
        */
        this._value = false;
        this.root.setAttribute('transform', `translate(${x},${y})`);
        this.box = new _svg_rectangle_js__WEBPACK_IMPORTED_MODULE_0__["default"](-6.5, -6.5, 13, 13);
        this.box.root.setAttribute('rx', '2px');
        this.label = new _svg_text_js__WEBPACK_IMPORTED_MODULE_1__["default"](18, 1, text);
        this.label.root.setAttribute('alignment-baseline', 'middle');
        this.root.appendChild(this.box.root);
        this.root.appendChild(this.label.root);
        let temp = this;
        this.value = value;
        this.box.root.onmousedown = function () {
            temp.toggle();
        };
        this.addDependency(this.box);
    }
    /**
    * Sets the value to true and visually checks the box.
    */
    set value(value) {
        if (this._value = value) {
            this.box.style.fill = '#404040';
        }
        else {
            this.box.style.fill = '';
        }
        this.onchange();
    }
    /**
    * Returns true if the box is checked, false if it is not.
    */
    get value() {
        return this._value;
    }
    /**
    * Converts the current true/false state of the checkbox to a zero or one.
    */
    number() {
        return this.value ? 1 : 0;
    }
    /**
    * Toggles the state of this check box.
    */
    toggle() {
        this.value = !this.value;
    }
}
//# sourceMappingURL=check-box.js.map

/***/ }),

/***/ "QBIj":
/*!******************************************************!*\
  !*** ./src/assets/source/elements/input/scrubber.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Scrubber; });
/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider.js */ "8SZi");

/**
* A scubber element has
*/
class Scrubber extends _slider_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    // TODO: When the scrubber control is grabbed, active should be set to false and the animation cycle should be stopped.
    // TODO: Reset done variable when the control is changed
    // TODO: Show darker line of progress
    /**
    * Constructs a new scrubber element at the (x,y) position.
    */
    constructor(x, y, options) {
        let defaultOptions = {
            width: 486
        };
        // combine the default configuration with the user's configuration
        let config = Object.assign(Object.assign({}, defaultOptions), options);
        // make room for the play & pause button
        config.width = config.width - 80;
        super(x + 80, y, config);
        this.active = false;
        this.loop = false;
        this.done = false;
        let circleRadius = 16;
        let playCircle = this.circle(0, 0, circleRadius);
        playCircle.style.fill = '#eeeeee';
        playCircle.style.stroke = '#333333';
        playCircle.style.strokeWidth = '1px';
        let radius = 8;
        let playTriangle = this.path(` M ${radius} ${0}
                                  L ${radius * Math.cos(-2 * Math.PI / 3)} ${radius * Math.sin(-2 * Math.PI / 3)}
                                  L ${radius * Math.cos(-4 * Math.PI / 3)} ${radius * Math.sin(-4 * Math.PI / 3)}
                                  Z`);
        playTriangle.style.fill = '#333333';
        this.playButton = this.group();
        this.playButton.appendChild(playCircle);
        this.playButton.appendChild(playTriangle);
        this.playButton.setAttribute('transform', `translate( ${x}, ${y})`);
        let pauseCircle = this.circle(0, 0, circleRadius);
        pauseCircle.style.fill = '#eeeeee';
        pauseCircle.style.stroke = '#333333';
        pauseCircle.style.strokeWidth = '1px';
        // TODO: style the lines with rounded end points
        let pauseLines = this.path(` M ${-3.5} ${-5}
                                L ${-3.5} ${5}
                                M ${3.5} ${-5}
                                L ${3.5} ${5}`);
        pauseLines.style.stroke = '#333333';
        pauseLines.style.strokeWidth = '2';
        pauseLines.style.strokeLinecap = 'round';
        this.pauseButton = this.group();
        this.pauseButton.appendChild(pauseCircle);
        this.pauseButton.appendChild(pauseLines);
        this.pauseButton.setAttribute('transform', `translate( ${x + 42}, ${y})`);
        let scrubber = this;
        this.playButton.root.addEventListener('click', function () {
            scrubber.play();
        });
        this.pauseButton.root.addEventListener('click', function () {
            scrubber.pause();
        });
        let fn = this.onchange;
        this.onchange = function () {
            if (scrubber.value == scrubber.max) {
                scrubber.done = true;
            }
            else {
                scrubber.done = false;
            }
            fn();
        };
    }
    play() {
        if (!this.active) {
            let scrubber = this;
            scrubber.active = true;
            if (this.done) {
                this.value = this.min;
                this.done = false;
                // TODO: change this.done to true when the control is "scrubbed" to the end
            }
            let stepSize = .0025 * scrubber.range;
            let step = function (timestamp) {
                scrubber.value = (scrubber.value + stepSize);
                if (scrubber.value > scrubber.max && !scrubber.loop) {
                    scrubber.value = scrubber.max;
                    scrubber.pause();
                    // TODO: change play icon to reset icon
                    scrubber.done = true;
                    scrubber.onchange();
                }
                else {
                    scrubber.value = scrubber.value % scrubber.max;
                    scrubber.onchange();
                    scrubber.requestID = window.requestAnimationFrame(step);
                }
            };
            // start animating
            window.requestAnimationFrame(step);
        }
    }
    pause() {
        this.active = false;
        window.cancelAnimationFrame(this.requestID);
    }
}
//# sourceMappingURL=scrubber.js.map

/***/ }),

/***/ "Qixj":
/*!*******************************************************!*\
  !*** ./src/app/tagger/imagebar/imagebar.component.ts ***!
  \*******************************************************/
/*! exports provided: ImagebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImagebarComponent", function() { return ImagebarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _image_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image-class */ "9ts+");
/* harmony import */ var src_assets_source__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/assets/source */ "zns9");
/* harmony import */ var _imagebar_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./imagebar.service */ "pd+n");
/* harmony import */ var _draws_draws_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../draws/draws.service */ "+HF2");
/* harmony import */ var _sidebar_sidebar_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sidebar/sidebar.service */ "O8K7");
/* harmony import */ var ngx_papaparse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-papaparse */ "P6Fj");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");










function ImagebarComponent_span_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.message);
} }
function ImagebarComponent_li_20_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImagebarComponent_li_20_Template_li_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6); const item_r4 = ctx.$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r5.imageSelect(item_r4.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("id", item_r4.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("title", item_r4.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r4.name);
} }
class ImagebarComponent {
    constructor(imageService, drawsService, sidebarService, papa) {
        this.imageService = imageService;
        this.drawsService = drawsService;
        this.sidebarService = sidebarService;
        this.papa = papa;
        this.imgget = new _image_class__WEBPACK_IMPORTED_MODULE_2__["ImageClass"]();
    }
    ngOnInit() {
    }
    // Funcion para cargar una imagen desde
    // los archivos locales
    preview(files) {
        if (files.length === 0) {
            return;
        }
        this.drawsService.refreshContainer(this.imageService.img.name);
        this.drawsService.myInteractive.remove();
        this.drawsService.myInteractive = new src_assets_source__WEBPACK_IMPORTED_MODULE_3__["Interactive"]("my-interactive");
        this.drawsService.myInteractive.width = 1400;
        this.drawsService.clearActiveShapes();
        let mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }
        // single image
        if (files.length === 1) {
            this.loadFile(files[0]).then(() => {
                this.syncFunction(80 * files.length).then(() => {
                    this.sortList("imageheaderid").then(() => {
                        this.createImageContainer();
                        this.imageService.setBlank();
                        this.sortShort().then(() => {
                        });
                    });
                });
            });
        }
        // Multiple images
        else if (files.length > 1) {
            this.loadFiles(files).then(() => {
                this.syncFunction(80 * files.length).then(() => {
                    this.sortList("imageheaderid").then(() => {
                        this.createImageContainer();
                        this.imageService.setBlank();
                        this.sortShort().then(() => {
                            let first = document.getElementById("imageheaderid").firstChild;
                            first.click();
                        });
                    });
                });
            });
        }
    }
    createImageContainer() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.imageService.images.forEach(element => {
                let create = true;
                this.drawsService.shapeContainer.forEach(container => {
                    if (element.name.localeCompare(container.imgName) === 0) {
                        create = false;
                    }
                });
                if (create) {
                    this.drawsService.createContainers(element);
                }
            });
        });
    }
    loadFiles(files) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            for (let index = 0; index < files.length; index++) {
                yield this.loadFile(files[index]);
            }
        });
    }
    loadFile(file) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.checkImageName(file.name)) {
                let imgCapture = new _image_class__WEBPACK_IMPORTED_MODULE_2__["ImageClass"]();
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = event => {
                    imgCapture.name = file.name;
                    imgCapture.imgURL = reader.result;
                    this.imageService.addImage(imgCapture);
                    this.syncFunction(50).then(v => {
                        this.sidebarService.removeGlass();
                        let img = document.getElementById('image');
                        imgCapture.height = img.naturalHeight.toString();
                        imgCapture.width = img.naturalWidth.toString();
                        this.imageService.addComplex(imgCapture);
                        document.getElementById('image-box').style.marginTop = '-' + img.clientHeight.toString() + 'px';
                        this.drawsService.myInteractive.height = img.clientHeight;
                        this.sidebarService.magniGlass("image");
                        // Destacar imagen activa
                        const header = document.getElementById("imageheaderid");
                        const elements = header.getElementsByClassName("list");
                        this.syncFunction(50).then(v => {
                            for (var i = 0; i < elements.length; i++) {
                                elements[i].addEventListener("click", function () {
                                    let current = document.getElementsByClassName("imageActive");
                                    if (current.length > 0) {
                                        current[0].className = current[0].className.replace(" imageActive", "");
                                    }
                                    this.className += " imageActive";
                                });
                            }
                        });
                    });
                };
            }
        });
    }
    sortShort() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            var i, switching, shouldSwitch;
            switching = true;
            while (switching) {
                switching = false;
                for (i = 0; i < this.imageService.images.length - 1; i++) {
                    shouldSwitch = false;
                    let a = this.imageService.images[i].name;
                    let b = this.imageService.images[i + 1].name;
                    let comp = a.localeCompare(b);
                    if (comp === 1) {
                        shouldSwitch = true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    let a = this.imageService.images[i];
                    this.imageService.images[i] = this.imageService.images[i + 1];
                    this.imageService.images[i + 1] = a;
                    switching = true;
                }
            }
        });
    }
    sortList(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            var list, i, switching, shouldSwitch;
            list = document.getElementById(id);
            switching = true;
            /* Make a loop that will continue until
            no switching has been done: */
            let b = list.getElementsByTagName("li");
            while (switching) {
                // start by saying: no switching is done:
                switching = false;
                // Loop through all list-items:
                for (i = 0; i < (b.length - 1); i++) {
                    // start by saying there should be no switching:
                    shouldSwitch = false;
                    /* check if the next item should
                    switch place with the current item: */
                    let str1 = b[i].innerHTML.toLowerCase();
                    let str2 = b[i + 1].innerHTML.toLowerCase();
                    let comp = str1.localeCompare(str2);
                    if (comp === 1) {
                        /* if next item is alphabetically
                        lower than current item, mark as a switch
                        and break the loop: */
                        shouldSwitch = true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    /* If a switch has been marked, make the switch
                    and mark the switch as done: */
                    b[i].parentNode.insertBefore(b[i + 1], b[i]);
                    switching = true;
                }
            }
        });
    }
    checkImageName(imgName) {
        let result = true;
        this.imageService.images.forEach(element => {
            if (imgName.localeCompare(element.name) === 0) {
                result = false;
            }
        });
        return result;
    }
    resolveAfter2Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, x);
        });
    }
    syncFunction(x) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const a = yield this.resolveAfter2Seconds(x);
            const b = yield this.resolveAfter2Seconds(x);
            return x + a + b;
        });
    }
    //  Funcion para actualizar el valor actual de 
    // la imagen que se muestra por pantalla
    imageSelect(name) {
        this.drawsService.refreshContainer(this.imageService.img.name).then(() => {
            this.drawsService.myInteractive.remove();
            // Establece a element como imagen activa y actualiza el tamaño del canvas
            this.imageService.images.forEach(element => {
                if (element.name.localeCompare(name) === 0) {
                    this.imageService.setImage(element);
                    this.syncFunction(50).then(v => {
                        this.sidebarService.removeGlass();
                        let img = document.getElementById('image');
                        document.getElementById('image-box').style.marginTop = '-' + img.clientHeight.toString() + 'px';
                        this.drawsService.myInteractive.height = img.clientHeight;
                        this.sidebarService.magniGlass("image");
                    });
                }
            });
            // Establece a element como imagen compleja activa
            this.imageService.complexImages.forEach(element => {
                if (element.name.localeCompare(name) === 0) {
                    this.imageService.setComplex(element);
                }
            });
            this.drawsService.myInteractive = new src_assets_source__WEBPACK_IMPORTED_MODULE_3__["Interactive"]("my-interactive");
            this.drawsService.myInteractive.width = 1400;
            this.drawsService.myInteractive.window = false;
            let img = document.getElementById('image');
            document.getElementById('image-box').style.marginTop = '-' + img.clientHeight.toString() + 'px';
            this.drawsService.myInteractive.height = img.clientHeight;
            // cargar imagenes
            this.drawsService.clearActiveShapes();
            // busco la imagen en el container
            let indexA = 0;
            let indexB = 0;
            let found = false;
            this.drawsService.shapeContainer.forEach(element => {
                if (!(element.imgName === name)) {
                    indexA++;
                }
                else {
                    indexB = indexA;
                    found = true;
                }
            });
            //asigno valores a nuevo shape container
            if (found) {
                this.drawsService.shapeContainer[indexB].shapeList.forEach(element => {
                    this.drawsService.crearFromData(element);
                });
            }
        });
    }
    // Funcion para alternar la vista del recuadro de eliminar imagen
    changeDisplay(id1) {
        if (document.getElementById(id1).style.display == "none") {
            document.getElementById(id1).style.display = "block";
        }
        else {
            document.getElementById(id1).style.display = "none";
        }
    }
    // Funcion para eliminar una imagen seleccionada
    eliminar() {
        const indexA = this.imageService.images.indexOf(this.imageService.img);
        const indexB = this.imageService.complexImages.indexOf(this.imageService.complexImg);
        this.drawsService.removeImage(this.imageService.img.name);
        this.imageService.setBlank();
        this.imageService.removeImage(indexA);
        this.imageService.removeComplex(indexB);
        this.drawsService.myInteractive.remove();
        this.changeDisplay('alert1');
    }
    hideShowSection(id) {
        if (document.getElementById(id).style.display == "none") {
            document.getElementById(id).style.display = "block";
        }
        else {
            document.getElementById(id).style.display = "none";
        }
    }
}
ImagebarComponent.ɵfac = function ImagebarComponent_Factory(t) { return new (t || ImagebarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_imagebar_service__WEBPACK_IMPORTED_MODULE_4__["ImageAdderService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_draws_draws_service__WEBPACK_IMPORTED_MODULE_5__["DrawsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_sidebar_sidebar_service__WEBPACK_IMPORTED_MODULE_6__["sidebarService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_papaparse__WEBPACK_IMPORTED_MODULE_7__["Papa"])); };
ImagebarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ImagebarComponent, selectors: [["app-imagebar"]], decls: 36, vars: 3, consts: [["href", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtrustConstantResourceUrl"]("https://fonts.googleapis.com/icon?family=Material+Icons"), "rel", "stylesheet"], [1, "title", 3, "click"], ["id", "button-loads", 1, "button-container", 2, "display", "none"], ["id", "image-input", "type", "file", "accept", "image/*", "multiple", "", 1, "image_input", 3, "change"], ["files", ""], ["for", "image-input", "title", "Carga una o varias im\u00E1genes desde su dispositivo."], ["id", "folder-input", "type", "file", "accept", "image/*", "webkitdirectory", "", "multiple", "", 1, "image_input", 3, "change"], ["file", ""], ["for", "folder-input", "title", "Carga una o varias im\u00E1genes desde su dispositivo."], [4, "ngIf"], ["id", "image-show", 2, "display", "none"], [1, "imageContainer"], ["id", "imageheaderid"], ["class", "list", 3, "id", "title", "click", 4, "ngFor", "ngForOf"], [1, "button-container"], ["id", "btnEliminar", 1, "btn", 3, "click"], ["id", "image-show"], ["id", "alert1", 1, "alert", 2, "display", "none"], [1, "flexButtons"], [1, "material-icons", 3, "click"], ["id", "temporal-interactive", 2, "display", "none"], [1, "list", 3, "id", "title", "click"]], template: function ImagebarComponent_Template(rf, ctx) { if (rf & 1) {
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "link", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImagebarComponent_Template_p_click_2_listener() { return ctx.hideShowSection("button-loads"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Cargar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "input", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function ImagebarComponent_Template_input_change_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](6); return ctx.preview(_r0.files); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Im\u00E1genes");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "input", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function ImagebarComponent_Template_input_change_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](11); return ctx.preview(_r1.files); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "label", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Carpeta de Im\u00E1genes");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, ImagebarComponent_span_14_Template, 2, 1, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImagebarComponent_Template_p_click_15_listener() { return ctx.hideShowSection("image-show"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Im\u00E1genes cargadas");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "ul", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, ImagebarComponent_li_20_Template, 2, 3, "li", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImagebarComponent_Template_button_click_22_listener() { return ctx.changeDisplay("alert1"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Eliminar Imagen");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "Atenci\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImagebarComponent_Template_button_click_31_listener() { return ctx.eliminar(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32, " check ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImagebarComponent_Template_button_click_33_listener() { return ctx.changeDisplay("alert1"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](35, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.message);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.imageService.images);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u00A0\u00BFEst\u00E1 seguro que desea eliminar ", ctx.imageService.img.name, "? ");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"]], styles: ["ul[_ngcontent-%COMP%] {\r\n    list-style-type: none;\r\n    margin: 0;\r\n    padding: 0;\r\n  }\r\n\r\n.title[_ngcontent-%COMP%]{\r\n    padding-left: 10px;\r\n    color: var(--white);\r\n    font-family: myFont;\r\n    margin-right: auto;\r\n    margin-left: 1em;\r\n    margin-top: 0.5em;\r\n    cursor: pointer;\r\n    transition: 250ms ease-in;\r\n\r\n}\r\n\r\n.title[_ngcontent-%COMP%]:hover{\r\n    color: var(--lightgray);\r\n    background-color: var(--gray);\r\n}\r\n\r\n.imageContainer[_ngcontent-%COMP%] {\r\n    height: 150px;\r\n    background-color: var(--darkwhite);\r\n    border-color:var(--orange);\r\n    border-radius: 10%;\r\n    border-style: solid;\r\n    max-width: 180px;\r\n    display: block;\r\n    overflow-y: auto;    \r\n    margin-left: 1em;\r\n    margin-bottom: 1em;\r\n\r\n}\r\n\r\n.imageContainer[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{\r\n    color: var(--lightblack);    \r\n    font-size: small;\r\n    padding-left: 0px;\r\n    margin-left: 3px;    \r\n    font-family: myFont;\r\n\r\n}\r\n\r\n.imageContainer[_ngcontent-%COMP%]   .imageActive[_ngcontent-%COMP%], .list[_ngcontent-%COMP%]:hover{\r\n    color: var(--purple);\r\n    font-weight: 800;\r\n    cursor: pointer;    \r\n}\r\n\r\n.alert[_ngcontent-%COMP%]{\r\n    display: none;\r\n    background-color: var(--lightorange);\r\n    color: var(--black);\r\n    margin-left: 1em;\r\n    border-radius: 5%;\r\n    font-size: small;\r\n    margin-right: 1em;\r\n}\r\n\r\n.flexButtons[_ngcontent-%COMP%]{\r\n    display: flex; \r\n    border: solid var(--lightblack);   \r\n    width: -webkit-fit-content;   \r\n    width: -moz-fit-content;   \r\n    width: fit-content;\r\n    margin: 1em;\r\n}\r\n\r\n.flexButtons[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]{\r\n    border: none;\r\n    color: black;\r\n    background-color: var(--lightpink);\r\n    cursor: pointer;\r\n    transition: all 0.3s ease-out;\r\n    border: solid var(--darkwhite);\r\n}\r\n\r\n.flexButtons[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:hover{\r\n    background: var(--orange);\r\n}\r\n\r\n.btn[_ngcontent-%COMP%]{\r\n    background-color: var(--lightorange);       \r\n    padding: 1em;\r\n    border: solid var(--lightorange);\r\n    \r\n    transition: all 500ms ease;  \r\n    font-family: myFont;\r\n}\r\n\r\n.btn[_ngcontent-%COMP%]:hover {\r\n    background: var(--orange);\r\n    border-color: var(--orange);\r\n  }\r\n\r\n.button-container[_ngcontent-%COMP%]{\r\n    margin-left: 1em;\r\n}\r\n\r\n.export[_ngcontent-%COMP%]{\r\n    background-color: var(--lightgreen);\r\n    border-color: var(--lightgreen);\r\n    margin-left: 1em;\r\n}\r\n\r\n.export[_ngcontent-%COMP%]:hover{\r\n    background-color: var(--green);\r\n    border-color: var(--green);\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlYmFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0lBQ0kscUJBQXFCO0lBQ3JCLFNBQVM7SUFDVCxVQUFVO0VBQ1o7O0FBRUY7SUFDSSxrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YseUJBQXlCOztBQUU3Qjs7QUFDQTtJQUNJLHVCQUF1QjtJQUN2Qiw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isa0NBQWtDO0lBQ2xDLDBCQUEwQjtJQUMxQixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixrQkFBa0I7O0FBRXRCOztBQUNBO0lBQ0ksd0JBQXdCO0lBQ3hCLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLG1CQUFtQjs7QUFFdkI7O0FBRUE7SUFDSSxvQkFBb0I7SUFDcEIsZ0JBQWdCO0lBQ2hCLGVBQWU7QUFDbkI7O0FBR0E7SUFDSSxhQUFhO0lBQ2Isb0NBQW9DO0lBQ3BDLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsK0JBQStCO0lBQy9CLDBCQUFrQjtJQUFsQix1QkFBa0I7SUFBbEIsa0JBQWtCO0lBQ2xCLFdBQVc7QUFDZjs7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1osa0NBQWtDO0lBQ2xDLGVBQWU7SUFDZiw2QkFBNkI7SUFDN0IsOEJBQThCO0FBQ2xDOztBQUNBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUdBO0lBQ0ksb0NBQW9DO0lBQ3BDLFlBQVk7SUFDWixnQ0FBZ0M7SUFDaEMsd0JBQXdCO0lBQ3hCLDBCQUEwQjtJQUMxQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsMkJBQTJCO0VBQzdCOztBQUlGO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksbUNBQW1DO0lBQ25DLCtCQUErQjtJQUMvQixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSw4QkFBOEI7SUFDOUIsMEJBQTBCO0FBQzlCIiwiZmlsZSI6ImltYWdlYmFyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxudWwge1xyXG4gICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICB9XHJcblxyXG4udGl0bGV7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgICBjb2xvcjogdmFyKC0td2hpdGUpO1xyXG4gICAgZm9udC1mYW1pbHk6IG15Rm9udDtcclxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcclxuICAgIG1hcmdpbi1sZWZ0OiAxZW07XHJcbiAgICBtYXJnaW4tdG9wOiAwLjVlbTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHRyYW5zaXRpb246IDI1MG1zIGVhc2UtaW47XHJcblxyXG59XHJcbi50aXRsZTpob3ZlcntcclxuICAgIGNvbG9yOiB2YXIoLS1saWdodGdyYXkpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JheSk7XHJcbn1cclxuXHJcbi5pbWFnZUNvbnRhaW5lciB7XHJcbiAgICBoZWlnaHQ6IDE1MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFya3doaXRlKTtcclxuICAgIGJvcmRlci1jb2xvcjp2YXIoLS1vcmFuZ2UpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTAlO1xyXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICAgIG1heC13aWR0aDogMTgwcHg7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG92ZXJmbG93LXk6IGF1dG87ICAgIFxyXG4gICAgbWFyZ2luLWxlZnQ6IDFlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcclxuXHJcbn1cclxuLmltYWdlQ29udGFpbmVyIGxpe1xyXG4gICAgY29sb3I6IHZhcigtLWxpZ2h0YmxhY2spOyAgICBcclxuICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAzcHg7ICAgIFxyXG4gICAgZm9udC1mYW1pbHk6IG15Rm9udDtcclxuXHJcbn1cclxuXHJcbi5pbWFnZUNvbnRhaW5lciAuaW1hZ2VBY3RpdmUsIC5saXN0OmhvdmVye1xyXG4gICAgY29sb3I6IHZhcigtLXB1cnBsZSk7XHJcbiAgICBmb250LXdlaWdodDogODAwO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyOyAgICBcclxufVxyXG5cclxuXHJcbi5hbGVydHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodG9yYW5nZSk7XHJcbiAgICBjb2xvcjogdmFyKC0tYmxhY2spO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDFlbTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUlO1xyXG4gICAgZm9udC1zaXplOiBzbWFsbDtcclxuICAgIG1hcmdpbi1yaWdodDogMWVtO1xyXG59XHJcblxyXG4uZmxleEJ1dHRvbnN7XHJcbiAgICBkaXNwbGF5OiBmbGV4OyBcclxuICAgIGJvcmRlcjogc29saWQgdmFyKC0tbGlnaHRibGFjayk7ICAgXHJcbiAgICB3aWR0aDogZml0LWNvbnRlbnQ7XHJcbiAgICBtYXJnaW46IDFlbTtcclxufVxyXG5cclxuLmZsZXhCdXR0b25zID4qe1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHRwaW5rKTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2Utb3V0O1xyXG4gICAgYm9yZGVyOiBzb2xpZCB2YXIoLS1kYXJrd2hpdGUpO1xyXG59XHJcbi5mbGV4QnV0dG9ucyA+Kjpob3ZlcntcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLW9yYW5nZSk7XHJcbn1cclxuXHJcblxyXG4uYnRue1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHRvcmFuZ2UpOyAgICAgICBcclxuICAgIHBhZGRpbmc6IDFlbTtcclxuICAgIGJvcmRlcjogc29saWQgdmFyKC0tbGlnaHRvcmFuZ2UpO1xyXG4gICAgLyogYm9yZGVyLXJhZGl1czogMWVtOyAqL1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDUwMG1zIGVhc2U7ICBcclxuICAgIGZvbnQtZmFtaWx5OiBteUZvbnQ7XHJcbn1cclxuXHJcbi5idG46aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0tb3JhbmdlKTtcclxuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tb3JhbmdlKTtcclxuICB9XHJcblxyXG5cclxuXHJcbi5idXR0b24tY29udGFpbmVye1xyXG4gICAgbWFyZ2luLWxlZnQ6IDFlbTtcclxufVxyXG5cclxuLmV4cG9ydHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0Z3JlZW4pO1xyXG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1saWdodGdyZWVuKTtcclxuICAgIG1hcmdpbi1sZWZ0OiAxZW07XHJcbn1cclxuXHJcbi5leHBvcnQ6aG92ZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmVlbik7XHJcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWdyZWVuKTtcclxufVxyXG5cclxuXHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ImagebarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-imagebar',
                templateUrl: './imagebar.component.html',
                styleUrls: ['./imagebar.component.css']
            }]
    }], function () { return [{ type: _imagebar_service__WEBPACK_IMPORTED_MODULE_4__["ImageAdderService"] }, { type: _draws_draws_service__WEBPACK_IMPORTED_MODULE_5__["DrawsService"] }, { type: _sidebar_sidebar_service__WEBPACK_IMPORTED_MODULE_6__["sidebarService"] }, { type: ngx_papaparse__WEBPACK_IMPORTED_MODULE_7__["Papa"] }]; }, null); })();


/***/ }),

/***/ "Sf7V":
/*!*******************************************!*\
  !*** ./src/assets/source/util/save-as.js ***!
  \*******************************************/
/*! exports provided: saveAs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveAs", function() { return saveAs; });
/*
* FileSaver.js
* A saveAs() FileSaver implementation.
*
* By Eli Grey, http://eligrey.com
*
* License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
* source  : http://purl.eligrey.com/github/FileSaver.js
*/
function download(url, name, opts) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.onload = function () {
        saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function () {
        console.error('could not download file');
    };
    xhr.send();
}
function corsEnabled(url) {
    var xhr = new XMLHttpRequest();
    // use sync to avoid popup blocker
    xhr.open('HEAD', url, false);
    xhr.send();
    return xhr.status >= 200 && xhr.status <= 299;
}
// `a.click()` doesn't work for all browsers (#465)
function click(node) {
    try {
        node.dispatchEvent(new MouseEvent('click'));
    }
    catch (e) {
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
        node.dispatchEvent(evt);
    }
}
function saveAs(blob, name, opts) {
    var a = document.createElement('a');
    name = name || blob.name || 'download';
    a.download = name;
    a.rel = 'noopener'; // tabnabbing
    if (typeof blob === 'string') {
        // Support regular links
        a.href = blob;
        if (a.origin !== location.origin) {
            corsEnabled(a.href) ? download(blob, name, opts) : click(a);
        }
        else {
            click(a);
        }
    }
    else {
        // Support blobs
        a.href = URL.createObjectURL(blob);
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 4E4); // 40s
        setTimeout(function () { click(a); }, 0);
    }
}
//# sourceMappingURL=save-as.js.map

/***/ }),

/***/ "TPIa":
/*!*******************************************!*\
  !*** ./src/app/home/home/home.service.ts ***!
  \*******************************************/
/*! exports provided: HomeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeService", function() { return HomeService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "AytR");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bcryptjs */ "J5zx");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "tk/3");







class HomeService {
    constructor(http) {
        this.http = http;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl;
    }
    get user() {
        return Object.assign({}, this._user);
    }
    auth(mail) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const fromData = {
                id: "",
                username: "",
                password: "",
                mail: mail,
                type: 0
            };
            // const bcpass=this.bcrypt.hash(pass,10);
            // console.log(bcpass);
            const requestOptions = {
                method: "POST",
                body: fromData
            };
            return this.http.post(`${this.baseUrl}/login`, fromData)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(user => {
                this._user = user;
            }));
            // return fetch(`${this.baseUrl}/user/Diego`);
            //Autencticar user
            // 
        });
    }
    create(name, pass, mail, type) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const salt = bcryptjs__WEBPACK_IMPORTED_MODULE_4__["genSaltSync"](10);
            const passw = bcryptjs__WEBPACK_IMPORTED_MODULE_4__["hashSync"](pass, salt);
            const fromData = {
                id: '',
                username: name,
                password: passw,
                mail: mail,
                type: type
            };
            return this.http.post(`${this.baseUrl}/user`, fromData);
        });
    }
}
HomeService.ɵfac = function HomeService_Factory(t) { return new (t || HomeService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"])); };
HomeService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: HomeService, factory: HomeService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HomeService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "TU2K":
/*!*****************************************************!*\
  !*** ./src/assets/source/elements/svg/rectangle.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rectangle; });
/* harmony import */ var _shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shape.js */ "kBcD");

/**
* A rectangle is a basic element with a position, width, and height. The
* position refers to the top left corner of the rectangle
*/
class Rectangle extends _shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(x, y, width, height) {
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttributeNS(null, 'x', x.toString());
        rect.setAttributeNS(null, 'y', y.toString());
        rect.setAttributeNS(null, 'width', width.toString());
        rect.setAttributeNS(null, 'height', height.toString());
        super(rect);
    }
    // comment inherited from base class
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
        return this;
    }
    // comment inherited from base class
    getAttribute(name) {
        return this.root.getAttribute(name);
    }
    /**
    * Returns the x position of the rectangle
    */
    get x() {
        return this.root.x.baseVal.value;
    }
    /**
    * Sets the x position of the rectangle
    */
    set x(n) {
        this.root.x.baseVal.value = n;
    }
    /**
    * Returns the y position of the rectangle
    */
    get y() {
        return this.root.y.baseVal.value;
    }
    /**
    * Sets the y position of the rectangle
    */
    set y(n) {
        this.root.y.baseVal.value = n;
    }
    /**
    * Returns the width of the rectangle
    */
    get width() {
        return this.root.width.baseVal.value;
    }
    /**
    * Sets the width of the rectangle
    */
    set width(n) {
        this.root.width.baseVal.value = n;
    }
    /**
    * Returns the height of the rectangle
    */
    get height() {
        return this.root.height.baseVal.value;
    }
    /**
    * Sets the height of the rectangle
    */
    set height(n) {
        this.root.height.baseVal.value = n;
    }
    /*
    * Translates the position of the rectangle to a new position from its current
    * position. TODO: this is inconsistent with other translate methods within
    * the elements. Probably best to conform to how SVG implements translate with
    * the transform attribute, and then implement a move method or something.
    */
    translate(x, y) {
        this.root.x.baseVal.value = this.root.x.baseVal.value + x;
        this.root.y.baseVal.value = this.root.y.baseVal.value + y;
    }
    /**
    * Returns the fill style of this rectangle
    */
    get fill() {
        return this.root.style.fill;
    }
    /**
    * Sets the fill style of this rectangle
    */
    set fill(s) {
        this.root.style.fill = s;
    }
    /**
    * Returns the stroke style of this rectangle
    */
    get stroke() {
        return this.root.style.stroke;
    }
    /**
    * Sets the stroke style of this rectangle
    */
    set stroke(s) {
        this.root.style.stroke = s;
    }
}
//# sourceMappingURL=rectangle.js.map

/***/ }),

/***/ "UIzP":
/*!***********************************************!*\
  !*** ./src/app/tagger/main/main.component.ts ***!
  \***********************************************/
/*! exports provided: MainComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainComponent", function() { return MainComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_assets_source_elements_interactive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/assets/source/elements/interactive */ "5BLY");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _imagebar_imagebar_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../imagebar/imagebar.service */ "pd+n");
/* harmony import */ var _draws_draws_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../draws/draws.service */ "+HF2");
/* harmony import */ var _sidebar_sidebar_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sidebar/sidebar.service */ "O8K7");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../navbar/navbar.component */ "6MbF");
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../sidebar/sidebar.component */ "HdEH");










const _c0 = "@import url(https://fonts.googleapis.com/css?family=Varela+Round);\r\n@import url(https://fonts.googleapis.com/css?family=Finger+Paint);\r\n@import url(https://fonts.googleapis.com/css?family=Montserrat);\r\nbody[_ngcontent-%COMP%]{\r\n    min-height: -webkit-max-content;\r\n    min-height: max-content;\r\n    min-width: 100%;\r\n    \r\n}\r\n.container[_ngcontent-%COMP%]{\r\n    display:grid;\r\n    min-width: 100%;\r\n    padding: 0;\r\n}\r\n.even-columns[_ngcontent-%COMP%]{\r\n    display: flex;\r\n    grid-column-start: 1;\r\n    grid-column-end: 3;\r\n\r\n}\r\napp-navbar[_ngcontent-%COMP%]{\r\n    z-index: 10;\r\n    grid-column-start: 1;\r\n    grid-column-end: 3;\r\n    \r\n}\r\n.even-columns[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(1){\r\n    flex: 1 1 10%;\r\n    min-width: 15em;\r\n    max-width: 20em;\r\n    margin-right: -50px;\r\n    \r\n}\r\n.even-columns[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(2){\r\n    margin-left: 2em;\r\n    flex: 1 1 90%;\r\n    position: relative;\r\n    \r\n    \r\n}\r\nimg[_ngcontent-%COMP%] {\r\n    width: 1400px;\r\n}\r\n.drawBox[_ngcontent-%COMP%]{\r\n    position: relative;\r\n    z-index: 2;    \r\n    width: 1400px;\r\n    transform-origin:0% 0%;\r\n\r\n}\r\n.imageBox[_ngcontent-%COMP%]{\r\n    position: relative;\r\n    z-index: 1;\r\n    width: 1400px;    \r\n    transform-origin:0% 0%;\r\n    \r\n}\r\n.sideBar[_ngcontent-%COMP%]{\r\n    z-index: 3;\r\n}\r\n.draw-container[_ngcontent-%COMP%]{\r\n    margin-top: 2em;\r\n    margin-left: 5em;\r\n    transform-origin:0% 0%;\r\n    max-width: 1418px;\r\n    max-height: 800px;\r\n    width: 10px;\r\n}\r\n.img-magnifier-glass[_ngcontent-%COMP%] {\r\n    position: relative;    \r\n    z-index: 4;    \r\n    transform-origin:0% 0%;\r\n    border: 3px solid var(--orange);\r\n    border-radius: 1em;    \r\n    cursor: default;\r\n    \r\n    width: 100px;\r\n    height: 100px;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpRUFBaUU7QUFDakUsaUVBQWlFO0FBQ2pFLCtEQUErRDtBQUkvRDtJQUNJLCtCQUF1QjtJQUF2Qix1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLDZCQUE2QjtBQUNqQztBQUVBO0lBQ0ksWUFBWTtJQUNaLGVBQWU7SUFDZixVQUFVO0FBQ2Q7QUFFQTtJQUNJLGFBQWE7SUFDYixvQkFBb0I7SUFDcEIsa0JBQWtCOztBQUV0QjtBQUNBO0lBQ0ksV0FBVztJQUNYLG9CQUFvQjtJQUNwQixrQkFBa0I7O0FBRXRCO0FBQ0E7SUFDSSxhQUFhO0lBQ2IsZUFBZTtJQUNmLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsa0NBQWtDO0FBQ3RDO0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLGtCQUFrQjtJQUNsQiw0QkFBNEI7O0FBRWhDO0FBR0E7SUFDSSxhQUFhO0FBQ2pCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLGFBQWE7SUFDYixzQkFBc0I7O0FBRTFCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLGFBQWE7SUFDYixzQkFBc0I7O0FBRTFCO0FBRUE7SUFDSSxVQUFVO0FBQ2Q7QUFFQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsc0JBQXNCO0lBQ3RCLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsV0FBVztBQUNmO0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLHNCQUFzQjtJQUN0QiwrQkFBK0I7SUFDL0Isa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZix1Q0FBdUM7SUFDdkMsWUFBWTtJQUNaLGFBQWE7RUFDZiIsImZpbGUiOiJtYWluLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9VmFyZWxhK1JvdW5kKTtcclxuQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PUZpbmdlcitQYWludCk7XHJcbkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Nb250c2VycmF0KTtcclxuXHJcblxyXG5cclxuYm9keXtcclxuICAgIG1pbi1oZWlnaHQ6IG1heC1jb250ZW50O1xyXG4gICAgbWluLXdpZHRoOiAxMDAlO1xyXG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47ICovXHJcbn1cclxuXHJcbi5jb250YWluZXJ7XHJcbiAgICBkaXNwbGF5OmdyaWQ7XHJcbiAgICBtaW4td2lkdGg6IDEwMCU7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG59XHJcblxyXG4uZXZlbi1jb2x1bW5ze1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xyXG4gICAgZ3JpZC1jb2x1bW4tZW5kOiAzO1xyXG5cclxufVxyXG5hcHAtbmF2YmFye1xyXG4gICAgei1pbmRleDogMTA7XHJcbiAgICBncmlkLWNvbHVtbi1zdGFydDogMTtcclxuICAgIGdyaWQtY29sdW1uLWVuZDogMztcclxuICAgIFxyXG59XHJcbi5ldmVuLWNvbHVtbnM+KjpudGgtY2hpbGQoMSl7XHJcbiAgICBmbGV4OiAxIDEgMTAlO1xyXG4gICAgbWluLXdpZHRoOiAxNWVtO1xyXG4gICAgbWF4LXdpZHRoOiAyMGVtO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAtNTBweDtcclxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IGJsdWV2aW9sZXQ7ICovXHJcbn1cclxuXHJcbi5ldmVuLWNvbHVtbnM+KjpudGgtY2hpbGQoMil7XHJcbiAgICBtYXJnaW4tbGVmdDogMmVtO1xyXG4gICAgZmxleDogMSAxIDkwJTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IGJsdWU7ICovXHJcbiAgICBcclxufVxyXG5cclxuXHJcbmltZyB7XHJcbiAgICB3aWR0aDogMTQwMHB4O1xyXG59XHJcbi5kcmF3Qm94e1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgei1pbmRleDogMjsgICAgXHJcbiAgICB3aWR0aDogMTQwMHB4O1xyXG4gICAgdHJhbnNmb3JtLW9yaWdpbjowJSAwJTtcclxuXHJcbn1cclxuLmltYWdlQm94e1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgei1pbmRleDogMTtcclxuICAgIHdpZHRoOiAxNDAwcHg7ICAgIFxyXG4gICAgdHJhbnNmb3JtLW9yaWdpbjowJSAwJTtcclxuICAgIFxyXG59XHJcblxyXG4uc2lkZUJhcntcclxuICAgIHotaW5kZXg6IDM7XHJcbn1cclxuXHJcbi5kcmF3LWNvbnRhaW5lcntcclxuICAgIG1hcmdpbi10b3A6IDJlbTtcclxuICAgIG1hcmdpbi1sZWZ0OiA1ZW07XHJcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOjAlIDAlO1xyXG4gICAgbWF4LXdpZHRoOiAxNDE4cHg7XHJcbiAgICBtYXgtaGVpZ2h0OiA4MDBweDtcclxuICAgIHdpZHRoOiAxMHB4O1xyXG59XHJcblxyXG4uaW1nLW1hZ25pZmllci1nbGFzcyB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7ICAgIFxyXG4gICAgei1pbmRleDogNDsgICAgXHJcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOjAlIDAlO1xyXG4gICAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0tb3JhbmdlKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDFlbTsgICAgXHJcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XHJcbiAgICAvKlNldCB0aGUgc2l6ZSBvZiB0aGUgbWFnbmlmaWVyIGdsYXNzOiovXHJcbiAgICB3aWR0aDogMTAwcHg7XHJcbiAgICBoZWlnaHQ6IDEwMHB4O1xyXG4gIH1cclxuXHJcbiJdfQ== */";
class MainComponent {
    constructor(route, imageService, drawsService, sidebarService) {
        this.route = route;
        this.imageService = imageService;
        this.drawsService = drawsService;
        this.sidebarService = sidebarService;
    }
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.name = params['name'];
        });
        // Alerta al cerrar pestaña
        // window.onbeforeunload=function(e){
        //   if(e){
        //     e.returnValue="Seguro?"
        //   }
        //   return "desea salir?"
        // }
    }
    crearForma() {
        this.drawsService.crearShape(this.imageService.img.name);
    }
    handleKeyboardEvent(event) {
        if (event.key.localeCompare("Shift") === 0) {
            document.getElementById("toggle-class").click();
        }
        /*
       else if(event.key.localeCompare("l")===0){
         document.getElementById("toggle-glass").click();
       }
       else if(event.key.localeCompare("a")===0 && this.imageService.images.length>0){
         const imageIndex=this.imageService.images.indexOf(this.imageService.img)
         if(imageIndex===0){
           document.getElementById(this.imageService.images[this.imageService.images.length-1].name).click();
           // this.imageSelect(this.imageService.images[this.imageService.images.length-1].name)
         }
         else{
           document.getElementById(this.imageService.images[imageIndex-1].name).click();
           // this.imageSelect(this.imageService.images[imageIndex-1].name)
         }
       }
       
       else if(event.key.localeCompare("d")===0 && this.imageService.images.length>0){
         const imageIndex=this.imageService.images.indexOf(this.imageService.img)
         if(imageIndex===(this.imageService.images.length-1)){
           document.getElementById(this.imageService.images[0].name).click();
         }
         else{
           document.getElementById(this.imageService.images[imageIndex+1].name).click();
         }
       }
       */
    }
    imageSelect(name) {
        this.drawsService.refreshContainer(this.imageService.img.name).then(() => {
            this.drawsService.myInteractive.remove();
            // Establece a element como imagen activa y actualiza el tamaño del canvas
            this.imageService.images.forEach(element => {
                if (element.name.localeCompare(name) === 0) {
                    this.imageService.setImage(element);
                    this.syncFunction(50).then(v => {
                        this.sidebarService.removeGlass();
                        let img = document.getElementById('image');
                        document.getElementById('image-box').style.marginTop = '-' + img.clientHeight.toString() + 'px';
                        this.drawsService.myInteractive.height = img.clientHeight;
                        this.sidebarService.magniGlass("image");
                    });
                }
            });
            // Establece a element como imagen compleja activa
            this.imageService.complexImages.forEach(element => {
                if (element.name.localeCompare(name) === 0) {
                    this.imageService.setComplex(element);
                }
            });
            this.drawsService.myInteractive = new src_assets_source_elements_interactive__WEBPACK_IMPORTED_MODULE_2__["default"]("my-interactive");
            this.drawsService.myInteractive.width = 1400;
            this.drawsService.myInteractive.window = false;
            let img = document.getElementById('image');
            document.getElementById('image-box').style.marginTop = '-' + img.clientHeight.toString() + 'px';
            this.drawsService.myInteractive.height = img.clientHeight;
            // cargar imagenes
            this.drawsService.clearActiveShapes();
            // busco la imagen en el container
            let indexA = 0;
            let indexB = 0;
            let found = false;
            this.drawsService.shapeContainer.forEach(element => {
                if (!(element.imgName === name)) {
                    indexA++;
                }
                else {
                    indexB = indexA;
                    found = true;
                }
            });
            //asigno valores a nuevo shape container
            if (found) {
                this.drawsService.shapeContainer[indexB].shapeList.forEach(element => {
                    this.drawsService.crearFromData(element);
                });
            }
        });
    }
    resolveAfter2Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, x);
        });
    }
    syncFunction(x) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const a = yield this.resolveAfter2Seconds(x);
            const b = yield this.resolveAfter2Seconds(x);
            return x + a + b;
        });
    }
}
MainComponent.ɵfac = function MainComponent_Factory(t) { return new (t || MainComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_imagebar_imagebar_service__WEBPACK_IMPORTED_MODULE_4__["ImageAdderService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_draws_draws_service__WEBPACK_IMPORTED_MODULE_5__["DrawsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_sidebar_sidebar_service__WEBPACK_IMPORTED_MODULE_6__["sidebarService"])); };
MainComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MainComponent, selectors: [["app-main"]], hostBindings: function MainComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keydown", function MainComponent_keydown_HostBindingHandler($event) { return ctx.handleKeyboardEvent($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveWindow"]);
    } }, decls: 10, vars: 1, consts: [[1, "container"], [1, "even-columns"], ["id", "draw_container_id", 1, "draw-container", 3, "click"], ["id", "my-interactive", 1, "drawBox"], ["id", "image-box", 1, "imageBox"], ["id", "image", 3, "src"]], template: function MainComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "app-navbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "app-sidebar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MainComponent_Template_div_click_6_listener() { return ctx.drawsService.shapeEvent(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", ctx.imageService.img.imgURL, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    } }, directives: [_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_7__["NavbarComponent"], _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_8__["SidebarComponent"]], styles: [_c0, _c0] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MainComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-main',
                templateUrl: './main.component.html',
                styleUrls: ['./main.component.css']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }, { type: _imagebar_imagebar_service__WEBPACK_IMPORTED_MODULE_4__["ImageAdderService"] }, { type: _draws_draws_service__WEBPACK_IMPORTED_MODULE_5__["DrawsService"] }, { type: _sidebar_sidebar_service__WEBPACK_IMPORTED_MODULE_6__["sidebarService"] }]; }, { handleKeyboardEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"],
            args: ['window:keydown', ['$event']]
        }] }); })();


/***/ }),

/***/ "Xljc":
/*!***********************************************************!*\
  !*** ./node_modules/export-to-csv/build/export-to-csv.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CsvConfigConsts = (function () {
    function CsvConfigConsts() {
    }
    CsvConfigConsts.EOL = "\r\n";
    CsvConfigConsts.BOM = "\ufeff";
    CsvConfigConsts.DEFAULT_FIELD_SEPARATOR = ',';
    CsvConfigConsts.DEFAULT_DECIMAL_SEPARATOR = '.';
    CsvConfigConsts.DEFAULT_QUOTE = '"';
    CsvConfigConsts.DEFAULT_SHOW_TITLE = false;
    CsvConfigConsts.DEFAULT_TITLE = 'My Generated Report';
    CsvConfigConsts.DEFAULT_FILENAME = 'generated';
    CsvConfigConsts.DEFAULT_SHOW_LABELS = false;
    CsvConfigConsts.DEFAULT_USE_TEXT_FILE = false;
    CsvConfigConsts.DEFAULT_USE_BOM = true;
    CsvConfigConsts.DEFAULT_HEADER = [];
    CsvConfigConsts.DEFAULT_KEYS_AS_HEADERS = false;
    return CsvConfigConsts;
}());
exports.CsvConfigConsts = CsvConfigConsts;
exports.ConfigDefaults = {
    filename: CsvConfigConsts.DEFAULT_FILENAME,
    fieldSeparator: CsvConfigConsts.DEFAULT_FIELD_SEPARATOR,
    quoteStrings: CsvConfigConsts.DEFAULT_QUOTE,
    decimalSeparator: CsvConfigConsts.DEFAULT_DECIMAL_SEPARATOR,
    showLabels: CsvConfigConsts.DEFAULT_SHOW_LABELS,
    showTitle: CsvConfigConsts.DEFAULT_SHOW_TITLE,
    title: CsvConfigConsts.DEFAULT_TITLE,
    useTextFile: CsvConfigConsts.DEFAULT_USE_TEXT_FILE,
    useBom: CsvConfigConsts.DEFAULT_USE_BOM,
    headers: CsvConfigConsts.DEFAULT_HEADER,
    useKeysAsHeaders: CsvConfigConsts.DEFAULT_KEYS_AS_HEADERS,
};
var ExportToCsv = (function () {
    function ExportToCsv(options) {
        this._csv = "";
        var config = options || {};
        this._options = objectAssign({}, exports.ConfigDefaults, config);
        if (this._options.useKeysAsHeaders
            && this._options.headers
            && this._options.headers.length > 0) {
            console.warn('Option to use object keys as headers was set, but headers were still passed!');
        }
    }
    Object.defineProperty(ExportToCsv.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (options) {
            this._options = objectAssign({}, exports.ConfigDefaults, options);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generate and Download Csv
     */
    ExportToCsv.prototype.generateCsv = function (jsonData, shouldReturnCsv) {
        if (shouldReturnCsv === void 0) { shouldReturnCsv = false; }
        // Make sure to reset csv data on each run
        this._csv = '';
        this._parseData(jsonData);
        if (this._options.useBom) {
            this._csv += CsvConfigConsts.BOM;
        }
        if (this._options.showTitle) {
            this._csv += this._options.title + '\r\n\n';
        }
        this._getHeaders();
        this._getBody();
        if (this._csv == '') {
            console.log("Invalid data");
            return;
        }
        // When the consumer asks for the data, exit the function
        // by returning the CSV data built at this point
        if (shouldReturnCsv) {
            return this._csv;
        }
        // Create CSV blob to download if requesting in the browser and the
        // consumer doesn't set the shouldReturnCsv param
        var FileType = this._options.useTextFile ? 'plain' : 'csv';
        var fileExtension = this._options.useTextFile ? '.txt' : '.csv';
        var blob = new Blob([this._csv], { "type": "text/" + FileType + ";charset=utf8;" });
        if (navigator.msSaveBlob) {
            var filename = this._options.filename.replace(/ /g, "_") + fileExtension;
            navigator.msSaveBlob(blob, filename);
        }
        else {
            var attachmentType = this._options.useTextFile ? 'text' : 'csv';
            var uri = 'data:attachment/' + attachmentType + ';charset=utf-8,' + encodeURI(this._csv);
            var link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.setAttribute('visibility', 'hidden');
            link.download = this._options.filename.replace(/ /g, "_") + fileExtension;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    /**
     * Create Headers
     */
    ExportToCsv.prototype._getHeaders = function () {
        if (!this._options.showLabels && !this._options.useKeysAsHeaders) {
            return;
        }
        var useKeysAsHeaders = this._options.useKeysAsHeaders;
        var headers = useKeysAsHeaders ? Object.keys(this._data[0]) : this._options.headers;
        if (headers.length > 0) {
            var row = "";
            for (var keyPos = 0; keyPos < headers.length; keyPos++) {
                row += headers[keyPos] + this._options.fieldSeparator;
            }
            row = row.slice(0, -1);
            this._csv += row + CsvConfigConsts.EOL;
        }
    };
    /**
     * Create Body
     */
    ExportToCsv.prototype._getBody = function () {
        var keys = Object.keys(this._data[0]);
        for (var i = 0; i < this._data.length; i++) {
            var row = "";
            for (var keyPos = 0; keyPos < keys.length; keyPos++) {
                var key = keys[keyPos];
                row += this._formatData(this._data[i][key]) + this._options.fieldSeparator;
            }
            row = row.slice(0, -1);
            this._csv += row + CsvConfigConsts.EOL;
        }
    };
    /**
     * Format Data
     * @param {any} data
     */
    ExportToCsv.prototype._formatData = function (data) {
        if (this._options.decimalSeparator === 'locale' && this._isFloat(data)) {
            return data.toLocaleString();
        }
        if (this._options.decimalSeparator !== '.' && this._isFloat(data)) {
            return data.toString().replace('.', this._options.decimalSeparator);
        }
        if (typeof data === 'string') {
            data = data.replace(/"/g, '""');
            if (this._options.quoteStrings || data.indexOf(',') > -1 || data.indexOf('\n') > -1 || data.indexOf('\r') > -1) {
                data = this._options.quoteStrings + data + this._options.quoteStrings;
            }
            return data;
        }
        if (typeof data === 'boolean') {
            return data ? 'TRUE' : 'FALSE';
        }
        return data;
    };
    /**
     * Check if is Float
     * @param {any} input
     */
    ExportToCsv.prototype._isFloat = function (input) {
        return +input === input && (!isFinite(input) || Boolean(input % 1));
    };
    /**
     * Parse the collection given to it
     *
     * @private
     * @param {*} jsonData
     * @returns {any[]}
     * @memberof ExportToCsv
     */
    ExportToCsv.prototype._parseData = function (jsonData) {
        this._data = typeof jsonData != 'object' ? JSON.parse(jsonData) : jsonData;
        return this._data;
    };
    return ExportToCsv;
}());
exports.ExportToCsv = ExportToCsv;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
/**
 * Convet to Object
 * @param {any} val
 */
function toObject(val) {
    if (val === null || val === undefined) {
        throw new TypeError('Object.assign cannot be called with null or undefined');
    }
    return Object(val);
}
/**
 * Assign data  to new Object
 * @param {any}   target
 * @param {any[]} ...source
 */
function objectAssign(target) {
    var source = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        source[_i - 1] = arguments[_i];
    }
    var from;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
                to[key] = from[key];
            }
        }
        if (Object.getOwnPropertySymbols) {
            symbols = Object.getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
                if (propIsEnumerable.call(from, symbols[i])) {
                    to[symbols[i]] = from[symbols[i]];
                }
            }
        }
    }
    return to;
}
//# sourceMappingURL=export-to-csv.js.map

/***/ }),

/***/ "XviM":
/*!*********************************************!*\
  !*** ./src/app/tagger/draws/draws-class.ts ***!
  \*********************************************/
/*! exports provided: Clase, ActiveShape, altLine, exportableShape, ShapeContainer, Category */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Clase", function() { return Clase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActiveShape", function() { return ActiveShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "altLine", function() { return altLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportableShape", function() { return exportableShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShapeContainer", function() { return ShapeContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Category", function() { return Category; });
class Clase {
}
class ActiveShape {
}
class altLine {
}
class exportableShape {
}
class ShapeContainer {
}
class Category {
}


/***/ }),

/***/ "YAAk":
/*!***************************************************!*\
  !*** ./src/assets/source/elements/visual/icon.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Icon; });
/* harmony import */ var _svg_use_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svg/use.js */ "B2gg");

class Icon extends _svg_use_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Construct an icon element at the position (x,y) with the provided dimensions
    */
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.classList.add('icon');
    }
}
//# sourceMappingURL=icon.js.map

/***/ }),

/***/ "YuTi":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "ZGoK":
/*!************************************************!*\
  !*** ./src/assets/source/elements/svg/line.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Line; });
/* harmony import */ var _shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shape.js */ "kBcD");

/**
* A circle is a basic shape element with a start and end position.
*
* Geometric Properties:
*   - x1
*   - y1
*   - x2
*   - y2
*/
class Line extends _shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a line between the points (x1, y1) and (x2, y2)
    */
    constructor(x1, y1, x2, y2) {
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttributeNS(null, 'x1', x1.toString());
        line.setAttributeNS(null, 'y1', y1.toString());
        line.setAttributeNS(null, 'x2', x2.toString());
        line.setAttributeNS(null, 'y2', y2.toString());
        super(line);
    }
    /**
    * Returns the x position of the start position
    */
    get x1() {
        return this.root.x1.baseVal.value;
    }
    /**
    * Sets the x position of the start position
    */
    set x1(x1) {
        this.root.x1.baseVal.value = x1;
    }
    /**
    * Returns the y position of the start position
    */
    get y1() {
        return this.root.y1.baseVal.value;
    }
    /**
    * Sets the y position of the start position
    */
    set y1(y1) {
        this.root.y1.baseVal.value = y1;
    }
    /**
    * Returns the x position of the end position
    */
    get x2() {
        return this.root.x2.baseVal.value;
    }
    /**
    * Sets the x position of the end position
    */
    set x2(x2) {
        this.root.x2.baseVal.value = x2;
    }
    /**
    * Returns the y position of the end position
    */
    get y2() {
        return this.root.y2.baseVal.value;
    }
    /**
    * Sets the y position of the end position
    */
    set y2(y2) {
        this.root.y2.baseVal.value = y2;
    }
    /*
    * Translates the position of the line to a new position from its current
    * position. TODO: this is inconsistent with other translate methods within
    * the elements. Probably best to conform to how SVG implements translate with
    * the transform attribute, and then implement a move method or something.
    */
    translate(x, y) {
        this.root.x1.baseVal.value += x;
        this.root.y1.baseVal.value += y;
        this.root.x2.baseVal.value += x;
        this.root.y2.baseVal.value += y;
    }
    /**
    * Returns the fill style of this line
    */
    get fill() {
        return this.root.style.fill;
    }
    /**
    * Sets the fill style of this line
    */
    set fill(s) {
        this.root.style.fill = s;
    }
    /**
    * Returns the stroke style of this line
    */
    get stroke() {
        return this.root.style.stroke;
    }
    /**
    * Sets the stroke style of this line
    */
    set stroke(s) {
        this.root.style.stroke = s;
    }
}


/***/ }),

/***/ "ZMU7":
/*!****************************************************!*\
  !*** ./src/assets/source/elements/base-element.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseElement; });
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller.js */ "/GDF");

/**
* A basic element of the interactive ecosystem. Each element has an unique
* identifier, an update function to be defined by the user, and the ability to
* add dependencies on other elements.
*/
class BaseElement {
    /**
    * Constructs the elements and adds it into the current controller.
    */
    constructor() {
        // give this element an unique id
        this._id = `${this.constructor.name.toLowerCase()}-${BaseElement.count++}`;
        // add this element to the controller
        BaseElement.controller.add(this);
    }
    /**
    * Clears the static data structures holding elements and resets the count.
    */
    static clear(disable = false) {
        BaseElement.count = 0;
        BaseElement.controller.clear();
        BaseElement.disable = disable;
    }
    /**
    * Returns the unique generated identifier associated with this element.
    */
    get id() {
        return this._id;
    }
    /**
    * Removes this element from the DOM and from the Element controller.
    */
    remove() {
        BaseElement.controller.remove(this);
    }
    /**
    * Declares this element dependent on the provided element(s).
    */
    addDependency(...elements) {
        for (let element of elements) {
            BaseElement.controller.dependencyGraph.addDependency(element, this);
        }
    }
    /**
    * Updates all of the elements that depend on this element.
    */
    updateDependents() {
        BaseElement.controller.update(this);
    }
}
/**
* Allows for the events attatched to elements to be disabled.
*/
BaseElement.disable = false;
/**
* The controller manages the dependencies between elements. Every element
* is added to this controller upon creation.
*/
BaseElement.controller = new _controller_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
/**
* This number uniquely identifes elements
*/
BaseElement.count = 0;
//# sourceMappingURL=base-element.js.map

/***/ }),

/***/ "aDMQ":
/*!**************************************************!*\
  !*** ./src/assets/source/elements/math/point.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Point; });
/**
* A point has an x position and y position
*/
class Point {
}
//# sourceMappingURL=point.js.map

/***/ }),

/***/ "cyCt":
/*!*********************************************!*\
  !*** ./src/assets/source/elements/svg/a.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return A; });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "624d");

/**
* A hyper link element.
*/
class A extends _element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a link element with the provided href.
    */
    constructor(href) {
        let root = document.createElementNS('http://www.w3.org/2000/svg', 'a');
        root.setAttributeNS(null, 'href', href);
        super(root);
    }
    // comment inherited from base class
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
        return this;
    }
    // comment inherited from base class
    getAttribute(name) {
        return this.root.getAttribute(name);
    }
}
//# sourceMappingURL=a.js.map

/***/ }),

/***/ "dLU0":
/*!*******************************************************!*\
  !*** ./src/assets/source/elements/svg/definitions.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Definitions; });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "624d");

class Definitions extends _element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        super(defs);
    }
}
//# sourceMappingURL=definitions.js.map

/***/ }),

/***/ "fOIt":
/*!*****************************************************!*\
  !*** ./src/app/tagger/imports/imports.component.ts ***!
  \*****************************************************/
/*! exports provided: ImportsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportsComponent", function() { return ImportsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _draws_draws_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../draws/draws-class */ "XviM");
/* harmony import */ var _assets_source_elements_svg_line__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../assets/source/elements/svg/line */ "ZGoK");
/* harmony import */ var _assets_source_elements_svg_rectangle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../assets/source/elements/svg/rectangle */ "AgtC");
/* harmony import */ var _imagebar_imagebar_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../imagebar/imagebar.service */ "pd+n");
/* harmony import */ var _draws_draws_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../draws/draws.service */ "+HF2");
/* harmony import */ var _sidebar_sidebar_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sidebar/sidebar.service */ "O8K7");
/* harmony import */ var ngx_papaparse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-papaparse */ "P6Fj");










class ImportsComponent {
    constructor(imageService, drawsService, sidebarService, papa) {
        this.imageService = imageService;
        this.drawsService = drawsService;
        this.sidebarService = sidebarService;
        this.papa = papa;
    }
    ngOnInit() {
    }
    resolveAfter2Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, x);
        });
    }
    syncFunction(x) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const a = yield this.resolveAfter2Seconds(x);
            const b = yield this.resolveAfter2Seconds(x);
            return x + a + b;
        });
    }
    exportData() {
        let pass = false;
        this.drawsService.shapeContainer.forEach(element => {
            if (element.shapeList.length >= 1) {
                pass = true;
            }
        });
        if (this.drawsService.activesShapes.length >= 1 || pass) {
            this.drawsService.exportData(this.imageService.img.name);
        }
        else
            console.log("Nada que exportar");
    }
    loadCSV(files) {
        console.log(files);
        if (files.length === 0) {
            return;
        }
        const type = files[0].type;
        if (type.localeCompare("application/vnd.ms-excel") != 0) {
            return;
        }
        let csvData = [];
        let header = [];
        let counter = 0;
        this.papa.parse(files[0], {
            // header true->ignora el header del archivo
            header: false,
            step: function (results) {
                if (counter != 0) {
                    if (results.data != "") {
                        csvData.push(results.data);
                    }
                }
                else {
                    header.push(results.data);
                }
                counter++;
            }
        });
        this.syncFunction(500).then(v => {
            // recorrer el data para crear entradas 
            // en el shapecontainer
            this.createFrames(csvData).then(() => {
                // si la imagen activa es la que contiene datos, se dibujan directamente, sino
                // se almacenan en el shape container
                csvData.forEach(csvelement => {
                    if (!this.isEmpty(this.imageService.img)) {
                        // Revisa si la imagen cargada es la misma que esta contenida
                        if (this.imageService.img.name.localeCompare(csvelement[0]) === 0) {
                            this.loadFill(csvelement);
                        }
                        else {
                            this.loadEmpty(csvelement);
                        }
                    }
                    // Si no hay imagen activa
                    else {
                        this.loadEmpty(csvelement);
                    }
                });
            });
        });
    }
    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    loadEmpty(csvelement) {
        this.drawsService.shapeContainer.forEach(containerElement => {
            // si pertenece a la imagen, se crea el elemento
            if (csvelement[0].localeCompare(containerElement.imgName) === 0) {
                let temporal = new _draws_draws_class__WEBPACK_IMPORTED_MODULE_2__["ActiveShape"]();
                let factor = 1400 / (containerElement.width);
                temporal.imgName = csvelement[0];
                temporal.activo = true;
                temporal.clase = csvelement[3];
                temporal.shapeType = csvelement[4];
                let rawData = csvelement[5].replace("{", "");
                rawData = rawData.replace("}", "");
                rawData = rawData.replace(/\"/g, "");
                temporal.atribute = rawData;
                temporal.color = csvelement[11];
                temporal.shapeLine = [];
                if (temporal.shapeType.localeCompare("box") === 0) {
                    let x = Math.floor(factor * csvelement[7]);
                    let y = Math.floor(factor * csvelement[8]);
                    let width = Math.floor(factor * csvelement[9]);
                    let height = Math.floor(factor * csvelement[10]);
                    temporal.shape = new _assets_source_elements_svg_rectangle__WEBPACK_IMPORTED_MODULE_4__["default"](x, y, width, height);
                }
                else if (temporal.shapeType.localeCompare("line") === 0) {
                    let rawX = csvelement[7].replace(/\"/g, "");
                    let rawY = csvelement[8].replace(/\"/g, "");
                    let linesXPoints = this.drawsService.splitAtributeDataService(rawX, ",");
                    let linesYPoints = this.drawsService.splitAtributeDataService(rawY, ",");
                    let lineCounter = (linesXPoints.length / 2);
                    for (let index = 0; index < linesXPoints.length; index += 2) {
                        let x1 = Math.floor(parseInt(linesXPoints[index]) * factor);
                        let x2 = Math.floor(parseInt(linesXPoints[index + 1]) * factor);
                        let y1 = Math.floor(parseInt(linesYPoints[index]) * factor);
                        let y2 = Math.floor(parseInt(linesYPoints[index + 1]) * factor);
                        let tempLine = new _assets_source_elements_svg_line__WEBPACK_IMPORTED_MODULE_3__["default"](x1, y1, x2, y2);
                        temporal.shapeLine.push(tempLine);
                    }
                    // console.log(temporal.shapeLine);
                    temporal.lines = lineCounter.toString();
                }
                else if (temporal.shapeType.localeCompare("arrow") === 0) {
                    let x = Math.floor(factor * csvelement[7]);
                    let y = Math.floor(factor * csvelement[8]);
                    temporal.shape = new _assets_source_elements_svg_rectangle__WEBPACK_IMPORTED_MODULE_4__["default"](x, y, 0, 0);
                }
                containerElement.shapeList.push(temporal);
            }
        });
    }
    loadFill(csvelement) {
        let temporal = new _draws_draws_class__WEBPACK_IMPORTED_MODULE_2__["ActiveShape"]();
        let factor = 1400 / parseInt((this.imageService.complexImg.width));
        temporal.imgName = csvelement[0];
        temporal.activo = true;
        temporal.clase = csvelement[3];
        temporal.shapeType = csvelement[4];
        let rawData = csvelement[5].replace("{", "");
        rawData = rawData.replace("}", "");
        rawData = rawData.replace(/\"/g, "");
        temporal.atribute = rawData;
        temporal.color = csvelement[11];
        temporal.shapeLine = [];
        if (temporal.shapeType.localeCompare("box") === 0) {
            let x = Math.floor(factor * csvelement[7]);
            let y = Math.floor(factor * csvelement[8]);
            let width = Math.floor(factor * csvelement[9]);
            let height = Math.floor(factor * csvelement[10]);
            temporal.shape = new _assets_source_elements_svg_rectangle__WEBPACK_IMPORTED_MODULE_4__["default"](x, y, width, height);
        }
        else if (temporal.shapeType.localeCompare("line") === 0) {
            let rawX = csvelement[7].replace(/\"/g, "");
            let rawY = csvelement[8].replace(/\"/g, "");
            let linesXPoints = this.drawsService.splitAtributeDataService(rawX, ",");
            let linesYPoints = this.drawsService.splitAtributeDataService(rawY, ",");
            let lineCounter = (linesXPoints.length / 2);
            for (let index = 0; index < linesXPoints.length; index += 2) {
                let x1 = Math.floor(parseInt(linesXPoints[index]) * factor);
                let x2 = Math.floor(parseInt(linesXPoints[index + 1]) * factor);
                let y1 = Math.floor(parseInt(linesYPoints[index]) * factor);
                let y2 = Math.floor(parseInt(linesYPoints[index + 1]) * factor);
                let tempLine = new _assets_source_elements_svg_line__WEBPACK_IMPORTED_MODULE_3__["default"](x1, y1, x2, y2);
                temporal.shapeLine.push(tempLine);
            }
            // console.log(temporal.shapeLine);
            temporal.lines = lineCounter.toString();
        }
        else if (temporal.shapeType.localeCompare("arrow") === 0) {
            let x = Math.floor(factor * csvelement[7]);
            let y = Math.floor(factor * csvelement[8]);
            temporal.shape = new _assets_source_elements_svg_rectangle__WEBPACK_IMPORTED_MODULE_4__["default"](x, y, 0, 0);
            console.log(x, y);
        }
        this.drawsService.crearFromData(temporal);
    }
    createFrames(csvData) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            csvData.forEach(element => {
                let addImg = true;
                let addclas = true;
                this.drawsService.shapeContainer.forEach(containerElement => {
                    if (element[0].localeCompare(containerElement.imgName) === 0) {
                        addImg = false;
                    }
                });
                this.drawsService.clases.forEach(clasElement => {
                    if (element[3].localeCompare(clasElement.name) === 0) {
                        addclas = false;
                    }
                });
                if (addImg) {
                    let container = new _draws_draws_class__WEBPACK_IMPORTED_MODULE_2__["ShapeContainer"]();
                    container.imgName = element[0];
                    container.height = element[1];
                    container.width = element[2];
                    container.shapeList = [];
                    this.drawsService.shapeContainer.push(container);
                }
                if (addclas) {
                    let clase = new _draws_draws_class__WEBPACK_IMPORTED_MODULE_2__["Clase"]();
                    clase.name = element[3];
                    clase.shape = element[4];
                    clase.color = element[11];
                    let rawData = element[5].replace("{", "");
                    rawData = rawData.replace("}", "");
                    rawData = rawData.replace(/\"/g, "");
                    clase.atribute = rawData;
                    clase.view = true;
                    if (clase.shape.localeCompare("box") === 0) {
                        clase.width = 60;
                        clase.height = 60;
                    }
                    else {
                        let linesXPoints = element[7].replace(/\"/g, "");
                        linesXPoints = this.drawsService.splitAtributeDataService(linesXPoints, ",");
                        clase.lines = (linesXPoints.length / 2).toString();
                    }
                    this.drawsService.clases.push(clase);
                }
            });
        });
    }
}
ImportsComponent.ɵfac = function ImportsComponent_Factory(t) { return new (t || ImportsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_imagebar_imagebar_service__WEBPACK_IMPORTED_MODULE_5__["ImageAdderService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_draws_draws_service__WEBPACK_IMPORTED_MODULE_6__["DrawsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_sidebar_sidebar_service__WEBPACK_IMPORTED_MODULE_7__["sidebarService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_papaparse__WEBPACK_IMPORTED_MODULE_8__["Papa"])); };
ImportsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ImportsComponent, selectors: [["app-imports"]], decls: 8, vars: 0, consts: [["id", "button-exports", 1, "btn-container"], ["id", "csv-input", "accept", ".csv", "type", "file", 1, "image_input", 3, "change"], ["csv", ""], ["for", "csv-input", "title", "Importa un archivo .csv desde su dispositivo", 2, "margin-left", "1em", "margin-top", "0.5em"], ["title", "Exportar datos de clases en formato .csv", 1, "btn", "export", 3, "click"]], template: function ImportsComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "input", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function ImportsComponent_Template_input_change_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](2); return ctx.loadCSV(_r0.files); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Importar datos");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportsComponent_Template_button_click_6_listener() { return ctx.exportData(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Exportar datos");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, styles: [".button-container[_ngcontent-%COMP%]{\r\n    margin-left: 1em;\r\n}\r\n.btn[_ngcontent-%COMP%]{\r\n    background-color: var(--lightorange);       \r\n    padding: 1em;\r\n    border: solid var(--lightorange);\r\n    \r\n    transition: all 500ms ease;  \r\n    font-family: myFont;\r\n}\r\n.btn[_ngcontent-%COMP%]:hover {\r\n    background: var(--orange);\r\n    border-color: var(--orange);\r\n  }\r\n.export[_ngcontent-%COMP%]{\r\n    background-color: var(--lightgreen);\r\n    border-color: var(--lightgreen);\r\n    margin-left: 1em;\r\n}\r\n.export[_ngcontent-%COMP%]:hover{\r\n    background-color: var(--green);\r\n    border-color: var(--green);\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltcG9ydHMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGdCQUFnQjtBQUNwQjtBQUNBO0lBQ0ksb0NBQW9DO0lBQ3BDLFlBQVk7SUFDWixnQ0FBZ0M7SUFDaEMsd0JBQXdCO0lBQ3hCLDBCQUEwQjtJQUMxQixtQkFBbUI7QUFDdkI7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QiwyQkFBMkI7RUFDN0I7QUFFRjtJQUNJLG1DQUFtQztJQUNuQywrQkFBK0I7SUFDL0IsZ0JBQWdCO0FBQ3BCO0FBRUE7SUFDSSw4QkFBOEI7SUFDOUIsMEJBQTBCO0FBQzlCIiwiZmlsZSI6ImltcG9ydHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5idXR0b24tY29udGFpbmVye1xyXG4gICAgbWFyZ2luLWxlZnQ6IDFlbTtcclxufVxyXG4uYnRue1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHRvcmFuZ2UpOyAgICAgICBcclxuICAgIHBhZGRpbmc6IDFlbTtcclxuICAgIGJvcmRlcjogc29saWQgdmFyKC0tbGlnaHRvcmFuZ2UpO1xyXG4gICAgLyogYm9yZGVyLXJhZGl1czogMWVtOyAqL1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDUwMG1zIGVhc2U7ICBcclxuICAgIGZvbnQtZmFtaWx5OiBteUZvbnQ7XHJcbn1cclxuXHJcbi5idG46aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0tb3JhbmdlKTtcclxuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tb3JhbmdlKTtcclxuICB9XHJcblxyXG4uZXhwb3J0e1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHRncmVlbik7XHJcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWxpZ2h0Z3JlZW4pO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDFlbTtcclxufVxyXG5cclxuLmV4cG9ydDpob3ZlcntcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyZWVuKTtcclxuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tZ3JlZW4pO1xyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ImportsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-imports',
                templateUrl: './imports.component.html',
                styleUrls: ['./imports.component.css']
            }]
    }], function () { return [{ type: _imagebar_imagebar_service__WEBPACK_IMPORTED_MODULE_5__["ImageAdderService"] }, { type: _draws_draws_service__WEBPACK_IMPORTED_MODULE_6__["DrawsService"] }, { type: _sidebar_sidebar_service__WEBPACK_IMPORTED_MODULE_7__["sidebarService"] }, { type: ngx_papaparse__WEBPACK_IMPORTED_MODULE_8__["Papa"] }]; }, null); })();


/***/ }),

/***/ "g5PK":
/*!************************************************!*\
  !*** ./src/assets/source/model/linked-list.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LinkedList; });
/**
* A node class contains data and a recursive next point.
*/
class Node {
    /**
    Constructs a new node with the provided data and sets next to be null.
    */
    constructor(data) {
        this.data = data;
        this.next = null;
    }
    /**
    * Returns the string representation of the data.
    */
    toString() {
        return this.data.toString();
    }
}
/**
* A dynamic, singlely linked list.
*/
class LinkedList {
    /**
    Consstructs an empty linked list.
    */
    constructor() {
        this.head = null;
    }
    /**
    Inserts a node at the beginning of the list
    */
    insert(element) {
        if (this.head == null) {
            this.head = new Node(element);
        }
        else {
            let temp = this.head;
            this.head = new Node(element);
            this.head.next = temp;
        }
    }
    /**
    Returns the first element in the list, or null if the list is empty.
    */
    first() {
        if (this.head != null) {
            return this.head.data;
        }
        else {
            return null;
        }
    }
    /**
    Removes the first element in the list. Returns true if element was successfully removed, false otherwise.
    */
    remove() {
        if (this.head != null) {
            this.head = this.head.next;
            return true;
        }
        else {
            return false;
        }
    }
    /**
    * Prints out the string reprsentation of this linked list.
    */
    toString() {
        let current = this.head;
        let str = '';
        while (current != null) {
            str += current.toString() + ' ';
            current = current.next;
        }
        return str.substr(0, str.length - 1);
    }
    /**
    Returns an iterator over the elements in the list
    */
    [Symbol.iterator]() {
        let current = this.head;
        const iterator = {
            next() {
                if (current == null) {
                    return {
                        done: true,
                        value: undefined
                    };
                }
                else {
                    let data = current.data;
                    current = current.next;
                    return {
                        done: false,
                        value: data
                    };
                }
            }
        };
        return iterator;
    }
}
//# sourceMappingURL=linked-list.js.map

/***/ }),

/***/ "g9is":
/*!*************************************************!*\
  !*** ./src/app/tagger/tagger-routing.module.ts ***!
  \*************************************************/
/*! exports provided: TaggerRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaggerRoutingModule", function() { return TaggerRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _main_main_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main/main.component */ "UIzP");





const routes = [
    {
        path: '',
        component: _main_main_component__WEBPACK_IMPORTED_MODULE_2__["MainComponent"]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
class TaggerRoutingModule {
}
TaggerRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: TaggerRoutingModule });
TaggerRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function TaggerRoutingModule_Factory(t) { return new (t || TaggerRoutingModule)(); }, imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](TaggerRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TaggerRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
                ],
                exports: [
                    _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "kBcD":
/*!*************************************************!*\
  !*** ./src/assets/source/elements/svg/shape.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Shape; });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "624d");

/**
* A shape is a basic geometric element.
*/
class Shape extends _element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a shape element with the provided root.
    */
    constructor(root) {
        super(root);
    }
    // comment inherited from base class
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
        return this;
    }
    // comment inherited from base class
    getAttribute(name) {
        return this.root.getAttribute(name);
    }
    /**
    * Returns the location of the point on the path.
    */
    getPointAtLength(x) {
        return this.root.getPointAtLength(x);
    }
    /**
    * Returns the total length of this path.
    */
    getTotalLength() {
        return this.root.getTotalLength();
    }
    /**
    * Returns true if the point is contained within this shapes fill
    */
    isPointInFill(point) {
        return this.root.isPointInFill(point);
    }
    /**
    * Returns true if the point is contained within this shapes stroke
    */
    isPointInStroke(point) {
        return this.root.isPointInStroke(point);
    }
}
//# sourceMappingURL=shape.js.map

/***/ }),

/***/ "kGPW":
/*!***************************************************!*\
  !*** ./src/assets/source/elements/svg/ellipse.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ellipse; });
/* harmony import */ var _shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shape.js */ "kBcD");

/**
* An ellipse is a basic element with a position, x-radius, and y-radius
*
* Geometric Properties:
*   - cx
*   - cy
*   - rx
*   - ry
*/
class Ellipse extends _shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a ellipse element at the position (cx,cy) with a rx and ry radius.
    */
    constructor(cx, cy, rx, ry) {
        let ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        ellipse.setAttributeNS(null, 'cx', cx.toString());
        ellipse.setAttributeNS(null, 'cy', cy.toString());
        ellipse.setAttributeNS(null, 'rx', rx.toString());
        ellipse.setAttributeNS(null, 'ry', ry.toString());
        super(ellipse);
    }
    /**
    * Returns the x position of the rectangle
    */
    get cx() {
        return this.root.cx.baseVal.value;
    }
    /**
    * Sets the x position of the rectangle
    */
    set cx(n) {
        this.root.cx.baseVal.value = n;
    }
    /**
    * Returns the y position of the rectangle
    */
    get cy() {
        return this.root.cy.baseVal.value;
    }
    /**
    * Sets the y position of the rectangle
    */
    set cy(n) {
        this.root.cy.baseVal.value = n;
    }
    /**
    * Returns the width of the rectangle
    */
    get rx() {
        return this.root.rx.baseVal.value;
    }
    /**
    * Sets the width of the rectangle
    */
    set rx(n) {
        this.root.rx.baseVal.value = n;
    }
    /**
    * Returns the height of the rectangle
    */
    get ry() {
        return this.root.ry.baseVal.value;
    }
    /**
    * Sets the height of the rectangle
    */
    set ry(n) {
        this.root.ry.baseVal.value = n;
    }
    /**
    * Translates the ellipse to a new position by changing the x and y attributes.
    */
    translate(x, y) {
        this.root.cx.baseVal.value = this.root.cx.baseVal.value + x;
        this.root.cy.baseVal.value = this.root.cy.baseVal.value + y;
    }
    /**
    * Returns the fill style of this ellipse
    */
    get fill() {
        return this.root.style.fill;
    }
    /**
    * Sets the fill style of this ellipse
    */
    set fill(s) {
        this.root.style.fill = s;
    }
    /**
    * Returns the stroke style of this ellipse
    */
    get stroke() {
        return this.root.style.stroke;
    }
    /**
    * Sets the stroke style of this ellipse
    */
    set stroke(s) {
        this.root.style.stroke = s;
    }
}
//# sourceMappingURL=ellipse.js.map

/***/ }),

/***/ "kJ17":
/*!*****************************************************!*\
  !*** ./src/assets/source/elements/input/control.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Control; });
/* harmony import */ var _base_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base-element.js */ "ZMU7");
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input.js */ "Ambf");
/* harmony import */ var _svg_path_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../svg/path.js */ "Gl8z");
/* harmony import */ var _svg_circle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../svg/circle.js */ "B01R");
/* harmony import */ var _svg_rectangle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../svg/rectangle.js */ "TU2K");





/**
* A point has an x position and y position
*/
class Point {
}
/**
* A control point is a draggable two dimensional point.
*/
class Control extends _input_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
    * Constructs a control at the position (x,y)
    */
    constructor(x, y) {
        super();
        /**
        * Modifying the transform function allows for the control to be constrained
        * to a path or constrained to the region enclosed in a path.
        */
        this.constrain = function (_oldPosition, newPosition) {
            return newPosition;
        };
        // create the svg components
        this.point = this.circle(0, 0, Control.pointRadius);
        this.handle = this.circle(0, 0, Control.handleRadius);
        this.point.classList.add('point');
        this.handle.classList.add('handle');
        this.root.classList.add('control');
        // initialize instance variables
        this._x = x;
        this._y = y;
        this._dx = 0;
        this._dy = 0;
        this.update = () => { };
        // translate the control to its initial position
        this.translate(x, y);
        // register event handlers
        this.root.onmousedown = this.handleMouseDown.bind(this);
        this.handle.root.onmouseout = this.handleMouseOut.bind(this);
        this.handle.root.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        // initialize window event listeners only once
        if (!Control.initalized) {
            window.onmouseover = Control.handleMouseOver;
            window.onmousemove = Control.handleMouseMove;
            window.onmouseup = Control.handleInputEnd;
            window.addEventListener('touchend', Control.handleInputEnd, { passive: false });
            window.addEventListener('touchmove', Control.handleTouchMove, { passive: false });
            Control.initalized = true;
        }
    }
    /**
    * Handles when the user moves their mouse over the window. If there is an
    * active control, the control's position is updated.
    */
    static handleMouseMove(event) {
        if (Control.active != null) {
            Control.handleMoveTo(event.clientX, event.clientY);
            event.preventDefault();
        }
    }
    /**
    * Handles a touch move event. If there is an active control, the control's
    * position is updated.
    */
    static handleTouchMove(event) {
        if (Control.active != null) {
            Control.handleMoveTo(event.touches[0].clientX, event.touches[0].clientY);
            event.preventDefault();
        }
    }
    /**
    * Moves the active control to the new (x,y) position.
    */
    static handleMoveTo(clientX, clientY) {
        // let deltaX = clientX - Control.prevX;
        // let deltaY = clientY - Control.prevY;
        // Control.prevX = clientX;
        // Control.prevY = clientY;
        // let x = Control.active.x + deltaX;
        // let y = Control.active.y + deltaY;
        let x = clientX + Control.slopX;
        let y = clientY + Control.slopY;
        Control.active.translate(x, y);
    }
    // static handleMoveTo( clientX, clientY) {
    //
    //   let viewPort = Control.active.root.viewportElement;
    //   let viewBox = viewPort.getAttribute('viewBox');
    //
    //   let transform = viewPort.getAttribute('transform');
    //   let start = transform.indexOf(',');
    //   let end = transform.indexOf(')');
    //
    //   let yDirection = parseInt(transform.substr(start + 1, end - start));
    //   let width = parseInt(viewPort.getAttribute('width'));
    //   let height = parseInt(viewPort.getAttribute('height'));
    //   let viewBoxArray = viewBox.split(' ');
    //   // let originX = parseInt(viewBoxArray[0]);
    //   // let originY = parseInt(viewBoxArray[1]);
    //   let visibleWidth = parseInt(viewBoxArray[2]);
    //   let visibleHeight = parseInt(viewBoxArray[3]);
    //   let scaleX = width/visibleWidth;
    //   let scaleY = height/visibleHeight;
    //
    //   let deltaX = clientX - Control.prevX;
    //   let deltaY = clientY - Control.prevY;
    //   Control.prevX = clientX;
    //   Control.prevY = clientY;
    //   let x = Control.active.x + deltaX/scaleX;
    //   let y = Control.active.y + deltaY/scaleY*yDirection;
    //
    //   Control.active.translate( x, y);
    //   event.preventDefault();
    // }
    /**
    * Handles when a use mouses up over the window or ends their touch event.
    */
    static handleInputEnd(event) {
        if (Control.active != null) {
            // remove highlighting from the active control and set to null
            Control.active.handle.root.classList.remove('highlight');
            Control.active = null;
            // fire a mouseover event to highlight either: an interactive control,
            // the recently active control, or a different element entirely.
            // Currently, whichever element is highest in the DOM order will be the
            // target. In the future the most recently active Control could be
            // prioritized for user experience.
            if (event.type != "touchend") {
                event.target.dispatchEvent(new MouseEvent('mouseover', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                }));
            }
        }
    }
    /**
    * When a user mouses over a control, add the class "highlight" to the control
    * handle.
    */
    static handleMouseOver(event) {
        if (Control.active == null && !_base_element_js__WEBPACK_IMPORTED_MODULE_0__["default"].disable && event.target.tagName == 'circle') {
            event.target.classList.add('highlight');
        }
    }
    /**
    * When a user mouses out of a control handle and when there is no active
    * control, remove the "highlight" class from the event target.
    */
    handleMouseOut(event) {
        if (Control.active == null) {
            event.target.classList.remove('highlight');
        }
    }
    /**
    * Handle when a user mouses down over a Control's handle. Stores the error in
    * the user's click as well as stores which Control the user is clicking.
    */
    handleMouseDown(event) {
        if (!_base_element_js__WEBPACK_IMPORTED_MODULE_0__["default"].disable) {
            event.preventDefault();
            event.stopPropagation();
            Control.active = this;
            Control.slopX = Control.active.x - event.clientX;
            Control.slopY = Control.active.y - event.clientY;
            Control.prevX = event.clientX;
            Control.prevY = event.clientY;
        }
    }
    /**
    * Handle when a user touches over a Control's handle. Stores the error in
    * the user's input as well as stores which Control the user is clicking.
    */
    handleTouchStart(event) {
        if (!_base_element_js__WEBPACK_IMPORTED_MODULE_0__["default"].disable) {
            Control.active = this;
            Control.slopX = Control.active.x - event.touches[0].clientX;
            Control.slopY = Control.active.y - event.touches[0].clientY;
            event.preventDefault();
        }
    }
    /**
    * Moves the control to a new location
    */
    translate(x, y) {
        // call the internal transform function
        let point = this.constrain({ x: this.x, y: this.y }, { x: x, y: y });
        // update the instance data
        this._dx = point.x - this._x;
        this._dy = point.y - this._y;
        this._x = point.x;
        this._y = point.y;
        // transform the position of the contorl
        this.root.setAttribute('transform', `translate( ${this.x}, ${this.y})`);
        // call the onchange function
        this.onchange();
    }
    /**
    * Updates the x position of the control.
    */
    set x(x) {
        this._dx = x - this.x;
        this._x = x;
        this.root.setAttribute('transform', 'translate( ' + this.x + ', ' + this.y + ')');
    }
    /**
    * Updates the y position of the control.
    */
    set y(y) {
        this._dy = y - this.y;
        this._y = y;
        this.root.setAttribute('transform', 'translate( ' + this.x + ', ' + this.y + ')');
    }
    /**
    * Gets the x position of the control.
    */
    get x() {
        return this._x;
    }
    /**
    * Gets the y position of the control.
    */
    get y() {
        return this._y;
    }
    /**
    * Gets the change in x position of this control.
    */
    get dx() {
        return this._dx;
    }
    /**
    * Gets the change in y position of this control.
    */
    get dy() {
        return this._dy;
    }
    /**
    * Constrains the movement of this control point to the path of the provided
    * element.
    */
    constrainTo(element) {
        this.addDependency(element);
        if (element instanceof _svg_path_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            throw Error('not implemented');
        }
        else if (element instanceof _svg_circle_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
            this.constrain = function (_oldPosition, newPosition) {
                // Calculate the angle between the current coordinate and the origin
                let angle = Math.atan2(newPosition.y - element.cy, newPosition.x - element.cx);
                // Set the controls position to the vector in the direction of the angle
                // above and with the magnitude of the radius of the circle.
                let x = element.r * Math.cos(angle) + element.cx;
                let y = element.r * Math.sin(angle) + element.cy;
                // Return the new position
                return { x: x, y: y };
            };
        }
        else if (element instanceof _svg_rectangle_js__WEBPACK_IMPORTED_MODULE_4__["default"]) {
            this.constrain = function (_oldPosition, newPosition) {
                let x = newPosition.x;
                let y = newPosition.y;
                // min and max points
                let minX = element.x;
                let minY = element.y;
                let maxX = element.x + element.width;
                let maxY = element.y + element.height;
                let cx = element.x + element.width / 2;
                let cy = element.y + element.height / 2;
                if (y >= maxY && x >= maxX) {
                    y = maxY;
                    x = maxX;
                }
                else if (y <= minY && x <= minX) {
                    y = minY;
                    x = minY;
                }
                else if (y <= minY && x >= maxX) {
                    y = minY;
                    x = maxX;
                }
                else if (y >= maxY && x <= minX) {
                    y = maxY;
                    x = minX;
                }
                else if (x > minX && x < maxX) {
                    if (y > cy) {
                        y = maxY;
                    }
                    else {
                        y = minY;
                    }
                }
                else {
                    if (x > cx) {
                        x = maxX;
                    }
                    else {
                        x = minX;
                    }
                }
                //  else if ( y - cy < x - cx ) {
                //   y = minY;
                // } else if ( x - cx < y - cy ) {
                //   x = minX;
                // }
                //
                // if( x - cx >= y - cy) {
                //   x = maxX;
                // }
                // if( y - cy < x - cx) {
                //   y = minY;
                // }
                // if( x - cx < y - cy) {
                //   x = minX;
                // }
                // constrain
                // if( x < minX || (x > minX && x <= cx)) {x = minX;}
                // if( y < minY || (y > minY && y <= cy)) {y = minY;}
                // if( x > maxX || (x < maxX && x > cx)) {x = maxX;}
                // if( y > maxY || (y < maxY && y > cy)) {y = maxY;}
                return { x: x, y: y };
            };
        }
    }
    /**
    * Constrains the movement of this control point to the path of the provided
    * element.
    */
    constrainWithin(element) {
        this.addDependency(element);
        if (element instanceof _svg_path_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            throw Error('not implemented');
        }
        else if (element instanceof _svg_circle_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
            this.constrain = function (_oldPosition, newPosition) {
                // Contain the position within the circle
                if (Math.hypot(newPosition.y - element.cy, newPosition.x - element.cx) > element.r) {
                    // Calculate the angle between the current coordinate and the origin
                    let angle = Math.atan2(newPosition.y - element.cy, newPosition.x - element.cx);
                    let x = element.r * Math.cos(angle) + element.cx;
                    let y = element.r * Math.sin(angle) + element.cy;
                    return { x: x, y: y };
                }
                else {
                    return newPosition;
                }
            };
        }
        else if (element instanceof _svg_rectangle_js__WEBPACK_IMPORTED_MODULE_4__["default"]) {
            this.constrain = function (_oldPosition, newPosition) {
                let x = newPosition.x;
                let y = newPosition.y;
                // min and max points
                let x1 = element.x;
                let y1 = element.y;
                let x2 = element.x + element.width;
                let y2 = element.y + element.height;
                // constrain
                if (x < x1) {
                    x = x1;
                }
                if (y < y1) {
                    y = y1;
                }
                if (x > x2) {
                    x = x2;
                }
                if (y > y2) {
                    y = y2;
                }
                return { x: x, y: y };
            };
        }
    }
    /**
    * Constrains the control to follow the path of the circle specified by the
    * arguments. TODO: add a method to constrain the control to a path
    */
    constrainToCircle(cx, cy, r) {
        // set the constrain function
        this.constrain = function (_oldPosition, newPosition) {
            // Calculate the angle between the current coordinate and the origin
            let angle = Math.atan2(newPosition.y - cy, newPosition.x - cx);
            // Set the controls position to the vector in the direction of the angle
            // above and with the magnitude of the radius of the circle.
            let x = r * Math.cos(angle) + cx;
            let y = r * Math.sin(angle) + cy;
            // Return the new position
            return { x: x, y: y };
        };
    }
    /**
    * Constrains the control to the box defined by the points (x1, y1) and
    * (x2, y2). The first point defines the top-left corner of the box, the
    * second the bottom-right corner of the box.
    */
    constrainWithinBox(x1, y1, x2, y2) {
        this.constrain = function (_oldPosition, newPosition) {
            let x = newPosition.x;
            let y = newPosition.y;
            if (x < x1) {
                x = x1;
            }
            if (y < y1) {
                y = y1;
            }
            if (x > x2) {
                x = x2;
            }
            if (y > y2) {
                y = y2;
            }
            return { x: x, y: y };
        };
    }
    constrainWithinRange(minX, maxX) {
        this.constrain = function (_oldPosition, newPosition) {
            let x = newPosition.x;
            let y = newPosition.y;
            if (x < minX) {
                x = minX;
            }
            if (x > maxX) {
                x = maxX;
            }
            return { x: x, y: y };
        };
    }
    /**
    * Constrain this control to only move left and right along its current x
    * position.
    */
    constrainToX(minX = -Infinity, maxX = Infinity) {
        this.constrain = function (oldPosition, newPosition) {
            return { x: newPosition.x, y: oldPosition.y };
        };
    }
    /**
    * Constrain this control to only move up and down along its current y
    * position.
    */
    constrainToY() {
        this.constrain = function (oldPosition, newPosition) {
            return { x: oldPosition.x, y: newPosition.y };
        };
    }
}
// Describes the size of the control handle and point
Control.pointRadius = 4;
Control.handleRadius = 13;
// Keeps track of the active control and the error in the user's click
Control.active = null;
Control.slopX = 0;
Control.slopY = 0;
Control.prevX = 0;
Control.prevY = 0;
// Keep track of whether global event listeners have been initialized
Control.initalized = false;
//# sourceMappingURL=control.js.map

/***/ }),

/***/ "l8YR":
/*!****************************************!*\
  !*** ./src/assets/source/util/file.js ***!
  \****************************************/
/*! exports provided: parseName, getScriptName, download, saveSVG, getURL, getUrlParams, setUrlParams, loadScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseName", function() { return parseName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScriptName", function() { return getScriptName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "download", function() { return download; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveSVG", function() { return saveSVG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getURL", function() { return getURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUrlParams", function() { return getUrlParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUrlParams", function() { return setUrlParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadScript", function() { return loadScript; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _save_as_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./save-as.js */ "Sf7V");


/**
* Returns the filename portion of a file path.
*/
function parseName(path, trimExtension = true) {
    let start = path.lastIndexOf("/") + 1;
    let end = trimExtension ? path.lastIndexOf(".") : path.length;
    return path.substr(start, end - start);
}
/**
* Returns the current script name.
*/
function getScriptName(trimExtension = true) {
    // Variables
    let error = new Error();
    let source;
    let lastStackFrameRegex = new RegExp(/.+\/(.*?):\d+(:\d+)*$/);
    let currentStackFrameRegex = new RegExp(/getScriptName \(.+\/(.*):\d+:\d+\)/);
    // Get the script name
    let name;
    if ((source = lastStackFrameRegex.exec(error.stack.trim())) && source[1] != "") {
        name = source[1];
    }
    else if ((source = currentStackFrameRegex.exec(error.stack.trim()))) {
        name = source[1];
    }
    else if (name = parseName(error.stack.trim(), trimExtension)) {
        return name;
    }
    else {
        return error.message;
    }
    // Return name
    if (trimExtension) {
        let position = name.lastIndexOf(".");
        return name.substr(0, position);
    }
    else {
        return name;
    }
}
/**
* Downloads the current drawing as an svg file.
*/
function download(id, filename) {
    let svg = document.getElementById(id).firstChild;
    let styleSheet = null;
    for (let i = 0; i < document.styleSheets.length; i++) {
        // TODO: there is a better way to do this
        if (document.styleSheets[i].href != null && document.styleSheets[i].href.toLowerCase().includes("library.css")) {
            styleSheet = document.styleSheets[i];
            break;
        }
    }
    let style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.type = "text/css";
    let css = "";
    for (let i = 0; i < styleSheet.rules.length; i++) {
        let rule = styleSheet.rules[i];
        css += rule.cssText + "\n";
    }
    style.innerHTML = css;
    svg.appendChild(style);
    // best piece of code i have written in 2019
    saveSVG(filename, svg.outerHTML);
    style.remove();
}
function saveSVG(filename, data) {
    let blob = new Blob([data], { type: 'image/svg+xml' });
    Object(_save_as_js__WEBPACK_IMPORTED_MODULE_1__["saveAs"])(blob, filename, {});
}
/**
* Returns a promise containing the response object.
*/
function getURL(url) {
    // Return a new promise.
    return new Promise(function (resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function () {
            // This is called even on 404 etc so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };
        // Handle network errors
        req.onerror = function () {
            reject(Error("Network Error"));
        };
        // Make the request
        req.send();
    });
}
/**
* Gets the URL parameters of the current session.
*/
function getUrlParams(str) {
    let hashes = str.slice(str.indexOf('?') + 1).split('&');
    let params = new Map();
    for (let h of hashes) {
        let value = h.split('=');
        params.set(value[0], value[1]);
    }
    return params;
}
// TODO: this is unfinished
function setUrlParams(param, value) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search.slice(1));
    params.set(param, value);
    alert(url.href);
    // window.location.href = url.href;
    window.open(url.href);
}
/**
* Loads the interactive script at the provided url into the provided HTMLElement.
*/
function loadScript(url, element) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        const response = yield getURL(url);
        let div = document.createElement('div');
        div.id = parseName(url);
        let script = document.createElement('script');
        script.type = 'module';
        script.src = url;
        element.appendChild(div);
        element.appendChild(script);
        return response;
    });
}
//# sourceMappingURL=file.js.map

/***/ }),

/***/ "ldAV":
/*!***************************************************!*\
  !*** ./src/assets/source/elements/svg/polygon.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Polygon; });
/* harmony import */ var _shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shape.js */ "kBcD");

/**
* A polygon is a closed shape defined by a series of points.
*/
class Polygon extends _shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(points) {
        let polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttributeNS(null, 'points', points);
        super(polygon);
    }
    get points() {
        return this.root.getAttribute('points');
    }
}
//# sourceMappingURL=polygon.js.map

/***/ }),

/***/ "maoU":
/*!************************************************!*\
  !*** ./src/assets/source/elements/svg/text.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Text; });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "624d");
/* harmony import */ var _t_span_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./t-span.js */ "OMCq");


/**
* Text is a basic element containing string contents
*/
class Text extends _element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs text at the position (x,y) with the provided string
    */
    constructor(x, y, str = '') {
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttributeNS(null, 'x', x.toString());
        text.setAttributeNS(null, 'y', y.toString());
        if (str != undefined) {
            text.innerHTML = str;
        }
        super(text);
    }
    // comment inherited from base class
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
        return this;
    }
    // comment inherited from base class
    getAttribute(name) {
        return this.root.getAttribute(name);
    }
    /**
    * Sets the contents of this element
    */
    set contents(str) {
        this.root.innerHTML = str;
    }
    /**
    * Sets the contents of this element
    */
    get contents() {
        return this.root.innerHTML;
    }
    /**
    * Gets the x position of this element
    */
    get x() {
        return Number(this.root.getAttribute('x'));
    }
    /**
    * Gets the y position of this element
    */
    get y() {
        return Number(this.root.getAttribute('y'));
    }
    /**
    * Sets the x position of this element
    */
    set x(value) {
        this.root.setAttribute('x', value.toString());
    }
    /**
    * Sets the y position of this element
    */
    set y(value) {
        this.root.setAttribute('y', value.toString());
    }
    /**
    * Returns the length of the text
    */
    get length() {
        const context = document.createElement("canvas").getContext("2d");
        return context.measureText(this.root.innerHTML).width;
    }
    text(x, y, str) {
        let text = new Text(x, y, str);
        this.root.appendChild(text.root);
        return text;
    }
    tspan(text) {
        let tspan = new _t_span_js__WEBPACK_IMPORTED_MODULE_1__["default"](text);
        this.root.appendChild(tspan.root);
        return tspan;
    }
}
//# sourceMappingURL=text.js.map

/***/ }),

/***/ "mrSG":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArray", function() { return __spreadArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "pd+n":
/*!*****************************************************!*\
  !*** ./src/app/tagger/imagebar/imagebar.service.ts ***!
  \*****************************************************/
/*! exports provided: ImageAdderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageAdderService", function() { return ImageAdderService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _image_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-class */ "9ts+");



class ImageAdderService {
    // message:String="no hay mano compadre";
    // imageChange:Subject<String>=new Subject();
    constructor() {
        this.img = new _image_class__WEBPACK_IMPORTED_MODULE_1__["ImageClass"]();
        this.images = [];
        this.complexImg = new _image_class__WEBPACK_IMPORTED_MODULE_1__["ImageClass"]();
        this.complexImages = [];
        this.blank = new _image_class__WEBPACK_IMPORTED_MODULE_1__["ImageClass"]();
    }
    addImage(image) {
        this.images.push(image);
        this.img = this.images[this.images.length - 1];
    }
    addSingleImage(image) {
        this.images.push(image);
    }
    addComplex(image) {
        this.complexImages.push(image);
        this.complexImg = this.complexImages[this.complexImages.length - 1];
    }
    getImage() {
        return this.img;
    }
    getImages() {
        return this.images;
    }
    removeImage(i) {
        this.images.splice(i, 1);
    }
    removeComplex(i) {
        this.complexImages.splice(i, 1);
    }
    clearImages() {
        this.images = [];
    }
    setImage(image) {
        this.img = image;
    }
    setComplex(image) {
        this.complexImg = image;
    }
    setBlank() {
        this.img = this.blank;
    }
}
ImageAdderService.ɵfac = function ImageAdderService_Factory(t) { return new (t || ImageAdderService)(); };
ImageAdderService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ImageAdderService, factory: ImageAdderService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ImageAdderService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "q70P":
/*!**************************************************!*\
  !*** ./src/assets/source/elements/svg/marker.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Marker; });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "624d");
/* harmony import */ var _circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./circle.js */ "B01R");
/* harmony import */ var _definitions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./definitions.js */ "dLU0");
/* harmony import */ var _ellipse_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ellipse.js */ "kGPW");
/* harmony import */ var _group_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./group.js */ "sFit");
/* harmony import */ var _line_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./line.js */ "rpg+");
/* harmony import */ var _meta_data_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./meta-data.js */ "uE+z");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./path.js */ "Gl8z");
/* harmony import */ var _polygon_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./polygon.js */ "ldAV");
/* harmony import */ var _rectangle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./rectangle.js */ "TU2K");
/* harmony import */ var _symbol_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./symbol.js */ "ENXh");
/* harmony import */ var _svg_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./svg.js */ "GAEk");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./text.js */ "maoU");
/* harmony import */ var _title_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./title.js */ "s2Zq");
/* harmony import */ var _use_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./use.js */ "B2gg");
















/**
* A marker is a shape that can be repeatably drawn on a shape.
*/
class Marker extends _element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(refX, refY, width, height) {
        let element = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        element.setAttributeNS(null, 'refX', refX.toString());
        element.setAttributeNS(null, 'refY', refY.toString());
        element.setAttributeNS(null, 'markerWidth', width.toString());
        element.setAttributeNS(null, 'markerHeight', height.toString());
        super(element);
    }
    // comment inherited from base class
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
        return this;
    }
    // comment inherited from base class
    getAttribute(name) {
        return this.root.getAttribute(name);
    }
    get viewBox() {
        return this.getAttribute('viewBox');
    }
    set viewBox(value) {
        this.setAttribute('viewBox', value);
    }
    get refX() {
        return this.root.refX.baseVal.value;
    }
    set refX(value) {
        this.root.refX.baseVal.value = value;
    }
    get refY() {
        return this.root.refY.baseVal.value;
    }
    set refY(value) {
        this.root.refY.baseVal.value = value;
    }
    get width() {
        return this.root.markerWidth.baseVal.value;
    }
    set width(value) {
        this.root.markerWidth.baseVal.value = value;
    }
    get height() {
        return this.root.markerHeight.baseVal.value;
    }
    set height(value) {
        this.root.markerHeight.baseVal.value = value;
    }
    // Descriptive methods
    description() {
        return this.appendChild(new _definitions_js__WEBPACK_IMPORTED_MODULE_2__["default"]());
    }
    metadata() {
        return this.appendChild(new _meta_data_js__WEBPACK_IMPORTED_MODULE_6__["default"]());
    }
    title() {
        return this.appendChild(new _title_js__WEBPACK_IMPORTED_MODULE_13__["default"]());
    }
    // Structural methods
    defs() {
        return this.appendChild(new _definitions_js__WEBPACK_IMPORTED_MODULE_2__["default"]());
    }
    group() {
        return this.appendChild(new _group_js__WEBPACK_IMPORTED_MODULE_4__["default"]());
    }
    svg() {
        return this.appendChild(new _svg_js__WEBPACK_IMPORTED_MODULE_11__["default"]());
    }
    symbol() {
        return this.appendChild(new _symbol_js__WEBPACK_IMPORTED_MODULE_10__["default"]());
    }
    use(x, y, width, height) {
        return this.appendChild(new _use_js__WEBPACK_IMPORTED_MODULE_14__["default"](x, y, width, height));
    }
    // Shape methods
    circle(cx, cy, r) {
        return this.appendChild(new _circle_js__WEBPACK_IMPORTED_MODULE_1__["default"](cx, cy, r));
    }
    ellipse(cx, cy, rx, ry) {
        return this.appendChild(new _ellipse_js__WEBPACK_IMPORTED_MODULE_3__["default"](cx, cy, rx, ry));
    }
    line(x1, y1, x2, y2) {
        return this.appendChild(new _line_js__WEBPACK_IMPORTED_MODULE_5__["default"](x1, y1, x2, y2));
    }
    path(d) {
        return this.appendChild(new _path_js__WEBPACK_IMPORTED_MODULE_7__["default"](d));
    }
    polygon(points) {
        return this.appendChild(new _polygon_js__WEBPACK_IMPORTED_MODULE_8__["default"](points));
    }
    rectangle(x, y, width, height) {
        return this.appendChild(new _rectangle_js__WEBPACK_IMPORTED_MODULE_9__["default"](x, y, width, height));
    }
    // other methods
    text(x, y, str) {
        return this.appendChild(new _text_js__WEBPACK_IMPORTED_MODULE_12__["default"](x, y, str));
    }
}
//# sourceMappingURL=marker.js.map

/***/ }),

/***/ "rpg+":
/*!************************************************!*\
  !*** ./src/assets/source/elements/svg/line.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Line; });
/* harmony import */ var _shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shape.js */ "kBcD");

/**
* A circle is a basic shape element with a start and end position.
*
* Geometric Properties:
*   - x1
*   - y1
*   - x2
*   - y2
*/
class Line extends _shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a line between the points (x1, y1) and (x2, y2)
    */
    constructor(x1, y1, x2, y2) {
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttributeNS(null, 'x1', x1.toString());
        line.setAttributeNS(null, 'y1', y1.toString());
        line.setAttributeNS(null, 'x2', x2.toString());
        line.setAttributeNS(null, 'y2', y2.toString());
        super(line);
    }
    /**
    * Returns the x position of the start position
    */
    get x1() {
        return this.root.x1.baseVal.value;
    }
    /**
    * Sets the x position of the start position
    */
    set x1(x1) {
        this.root.x1.baseVal.value = x1;
    }
    /**
    * Returns the y position of the start position
    */
    get y1() {
        return this.root.y1.baseVal.value;
    }
    /**
    * Sets the y position of the start position
    */
    set y1(y1) {
        this.root.y1.baseVal.value = y1;
    }
    /**
    * Returns the x position of the end position
    */
    get x2() {
        return this.root.x2.baseVal.value;
    }
    /**
    * Sets the x position of the end position
    */
    set x2(x2) {
        this.root.x2.baseVal.value = x2;
    }
    /**
    * Returns the y position of the end position
    */
    get y2() {
        return this.root.y2.baseVal.value;
    }
    /**
    * Sets the y position of the end position
    */
    set y2(y2) {
        this.root.y2.baseVal.value = y2;
    }
    /*
    * Translates the position of the line to a new position from its current
    * position. TODO: this is inconsistent with other translate methods within
    * the elements. Probably best to conform to how SVG implements translate with
    * the transform attribute, and then implement a move method or something.
    */
    translate(x, y) {
        this.root.x1.baseVal.value += x;
        this.root.y1.baseVal.value += y;
        this.root.x2.baseVal.value += x;
        this.root.y2.baseVal.value += y;
    }
    /**
    * Returns the fill style of this line
    */
    get fill() {
        return this.root.style.fill;
    }
    /**
    * Sets the fill style of this line
    */
    set fill(s) {
        this.root.style.fill = s;
    }
    /**
    * Returns the stroke style of this line
    */
    get stroke() {
        return this.root.style.stroke;
    }
    /**
    * Sets the stroke style of this line
    */
    set stroke(s) {
        this.root.style.stroke = s;
    }
}
//# sourceMappingURL=line.js.map

/***/ }),

/***/ "s2Zq":
/*!*************************************************!*\
  !*** ./src/assets/source/elements/svg/title.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Title; });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "624d");

class Title extends _element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        let title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        super(title);
    }
}
//# sourceMappingURL=title.js.map

/***/ }),

/***/ "sFit":
/*!*************************************************!*\
  !*** ./src/assets/source/elements/svg/group.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Group; });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "624d");
/* harmony import */ var _a_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./a.js */ "cyCt");
/* harmony import */ var _circle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./circle.js */ "B01R");
/* harmony import */ var _clip_path_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clip-path.js */ "CZHR");
/* harmony import */ var _definitions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./definitions.js */ "dLU0");
/* harmony import */ var _ellipse_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ellipse.js */ "kGPW");
/* harmony import */ var _line_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./line.js */ "rpg+");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./path.js */ "Gl8z");
/* harmony import */ var _polygon_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./polygon.js */ "ldAV");
/* harmony import */ var _rectangle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./rectangle.js */ "TU2K");
/* harmony import */ var _symbol_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./symbol.js */ "ENXh");
/* harmony import */ var _svg_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./svg.js */ "GAEk");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./text.js */ "maoU");
/* harmony import */ var _title_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./title.js */ "s2Zq");
/* harmony import */ var _use_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./use.js */ "B2gg");
/* harmony import */ var _description_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./description.js */ "ET4v");
/* harmony import */ var _meta_data_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./meta-data.js */ "uE+z");

















/**
* A group is a structural element that allows for elements to be grouped
* together and have styles and transformations applied to the elements in the
* group.
*/
class Group extends _element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor() {
        let group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        super(group);
    }
    // comment inherited from base class
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
        return this;
    }
    // comment inherited from base class
    getAttribute(name) {
        return this.root.getAttribute(name);
    }
    // Descriptive methods
    description() {
        return this.appendChild(new _description_js__WEBPACK_IMPORTED_MODULE_15__["default"]());
    }
    metadata() {
        return this.appendChild(new _meta_data_js__WEBPACK_IMPORTED_MODULE_16__["default"]());
    }
    title() {
        return this.appendChild(new _title_js__WEBPACK_IMPORTED_MODULE_13__["default"]());
    }
    // Structural methods
    defs() {
        return this.appendChild(new _definitions_js__WEBPACK_IMPORTED_MODULE_4__["default"]());
    }
    group() {
        return this.appendChild(new Group());
    }
    svg(x, y, width, height) {
        return this.appendChild(new _svg_js__WEBPACK_IMPORTED_MODULE_11__["default"](x, y, width, height));
    }
    symbol() {
        return this.appendChild(new _symbol_js__WEBPACK_IMPORTED_MODULE_10__["default"]());
    }
    use(x, y, width, height) {
        return this.appendChild(new _use_js__WEBPACK_IMPORTED_MODULE_14__["default"](x, y, width, height));
    }
    // Shape methods
    circle(cx, cy, r) {
        return this.appendChild(new _circle_js__WEBPACK_IMPORTED_MODULE_2__["default"](cx, cy, r));
    }
    ellipse(cx, cy, rx, ry) {
        return this.appendChild(new _ellipse_js__WEBPACK_IMPORTED_MODULE_5__["default"](cx, cy, rx, ry));
    }
    line(x1, y1, x2, y2) {
        return this.appendChild(new _line_js__WEBPACK_IMPORTED_MODULE_6__["default"](x1, y1, x2, y2));
    }
    path(d) {
        return this.appendChild(new _path_js__WEBPACK_IMPORTED_MODULE_7__["default"](d));
    }
    polygon(points) {
        return this.appendChild(new _polygon_js__WEBPACK_IMPORTED_MODULE_8__["default"](points));
    }
    rectangle(x, y, width, height) {
        return this.appendChild(new _rectangle_js__WEBPACK_IMPORTED_MODULE_9__["default"](x, y, width, height));
    }
    // other methods
    /**
    * Constructs and appends a text element within this element.
    */
    text(x, y, str) {
        return this.appendChild(new _text_js__WEBPACK_IMPORTED_MODULE_12__["default"](x, y, str));
    }
    /**
    * Constructs and appends an 'a' (link) within this element.
    */
    a(href) {
        return this.appendChild(new _a_js__WEBPACK_IMPORTED_MODULE_1__["default"](href));
    }
    /**
    * Constructs and appends a clipPath within this element
    */
    clipPath() {
        return this.appendChild(new _clip_path_js__WEBPACK_IMPORTED_MODULE_3__["default"]());
    }
}
//# sourceMappingURL=group.js.map

/***/ }),

/***/ "tCQe":
/*!****************************************!*\
  !*** ./src/assets/source/util/math.js ***!
  \****************************************/
/*! exports provided: nextPrime, isPrime, PointWhereTwoLinesIntersect, trapezoidalWave */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nextPrime", function() { return nextPrime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPrime", function() { return isPrime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointWhereTwoLinesIntersect", function() { return PointWhereTwoLinesIntersect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trapezoidalWave", function() { return trapezoidalWave; });
/**
* Returns the next prime number after the given integer.
*/
function nextPrime(n) {
    if (!Number.isInteger(n)) {
        throw Error('Please pass an integer as a parameter');
    }
    // Search for the next prime until it is found
    while (!isPrime(++n)) {
    }
    return n;
}
/**
* Returns true if the number is prime, false otherwise.
*/
function isPrime(n) {
    if (!Number.isInteger(n) || n <= 1) {
        return false;
    }
    // Check if any of the numbers, up to the square root of the number, evenly
    // divide the number
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}
/**
* Returns the point where two lines intersect. The first line is defined by the
* points p1 and p2. The second line is defined by the points p3 and p4.
*/
function PointWhereTwoLinesIntersect(p1, p2, p3, p4) {
    let slope1 = (p2.y - p1.y) / (p2.x - p1.x);
    let slope2 = (p4.y - p3.y) / (p4.x - p3.x);
    let b1 = (p2.y - p2.x * slope1);
    let b2 = (p4.y - p4.x * slope2);
    let x = (b2 - b1) / (slope1 - slope2);
    let y;
    if (!isFinite(slope1)) {
        x = p1.x;
        y = p3.y + slope2 * (x - p3.x);
    }
    else if (!isFinite(slope2)) {
        x = p3.x;
        y = p1.y + slope1 * (x - p1.x);
    }
    else {
        y = p1.y + slope1 * (x - p1.x);
    }
    return { x: x, y: y };
}
/**
* This function generates a particular trapezoidal wave function. The wave starts
* at 0 and linearly increases to the amplitude of the wave in 1/6 the period. It
* stays at the amplitude for 1/3 the period, then decreases linearly to 0 in 1/6
* the period where it stays at 0 for the remaind period of 1/3.
*
* t - shifts the wave forwards or backwards (TODO: shifted too far right causes
* a bug where the waveform doesn't appear when it should)
* a - is the amplitude of the wave
* λ - is the period of the wave
*/
function trapezoidalWave(t, a = 1, λ = 1) {
    return (x) => {
        x = Math.abs(x);
        // normalize x to always be in the range from 0 to λ
        x = (x - t) % λ;
        if (x < 0) {
            return 0;
        }
        else if (x < λ * 1 / 6) {
            return a * 6 * x / λ;
        }
        else if (x <= λ * 1 / 2) {
            return a;
        }
        else if (x < λ * 2 / 3) {
            return a * 4 - a * 6 * x / λ;
        }
        else {
            return 0;
        }
    };
}
//# sourceMappingURL=math.js.map

/***/ }),

/***/ "tTcA":
/*!*************************************************!*\
  !*** ./src/assets/source/elements/math/plot.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Plot; });
/* harmony import */ var _svg_svg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svg/svg.js */ "GAEk");
/* harmony import */ var _svg_text_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../svg/text.js */ "maoU");


/**
* Returns the closest power of ten. TODO: replace this with an optimized
* function that remembers the last closest power of ten and first checks the
* adjacent powers of ten and then continues.
*/
function expTrunc(x) {
    // constants so don't have to count zeros
    const N06 = 1000000;
    const N05 = 100000;
    const N04 = 10000;
    const N03 = 1000;
    const N02 = 100;
    const N01 = 10;
    const N00 = 1;
    const N_1 = 0.1;
    const N_2 = 0.01;
    const N_3 = 0.001;
    const N_4 = 0.0001;
    const N_5 = 0.00001;
    const N_6 = 0.000001;
    if (x >= N06) {
        return N06;
    }
    else if (x >= N05) {
        return N05;
    }
    else if (x >= N04) {
        return N04;
    }
    else if (x >= N03) {
        return N03;
    }
    else if (x >= N02) {
        return N02;
    }
    else if (x >= N01) {
        return N01;
    }
    else if (x >= N00) {
        return N00;
    }
    else if (x >= N_1) {
        return N_1;
    }
    else if (x >= N_2) {
        return N_2;
    }
    else if (x >= N_3) {
        return N_3;
    }
    else if (x >= N_4) {
        return N_4;
    }
    else if (x >= N_5) {
        return N_5;
    }
    else if (x >= N_6) {
        return N_6;
    }
}
/**
* A plot of the graph of a function.
*/
class Plot extends _svg_svg_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
    * Constructs a new graph capable of displaying a function in the form of
    * x -> y. The user is able to drag, zoom-in, and zoom-out on the graph to
    * explore the shape and form of the function.
    */
    constructor(fn, options) {
        // default configuration options
        let defaultOptions = {
            x: 0,
            y: 0,
            width: 700,
            height: 400,
            margin: 50,
            scaleX: 1,
            scaleY: 1,
            grid: true,
            labels: true,
            border: true,
            zoomable: false,
            displayPoint: false,
            controls: false // experimental
        };
        // combine the default configuration with the user's configuration
        let config = Object.assign(Object.assign({}, defaultOptions), options);
        super(config.x, config.y, config.width, config.height);
        // event variables
        this.prevX = 0;
        this.prevY = 0;
        this.active = false;
        this._function = fn;
        // calculate the visible dimensions and top-left position of internal plot area coordinates
        this._width = config.width - 2 * config.margin;
        this._height = config.height - 2 * config.margin;
        this._x = -this._width / 2;
        this._y = -this._height / 2;
        // creates a transparent rectangle to capture all user events
        this.rect = this.rectangle(config.margin, config.margin, this._width, this._height);
        this.rect.style.fill = 'transparent';
        if (config.border) {
            this.rect.style.border = '1px solid #404040';
        }
        else {
            this.rect.style.stroke = 'none';
        }
        // create a clipping path rectangle to trim overflowing visual elements
        let clipPath = this.clipPath();
        clipPath.rectangle(0, 0, this._width, this._height);
        this.clipGroup = this.group();
        this.clipGroup.setAttribute('clip-path', `url(#${clipPath.id})`);
        this.clipGroup.setAttribute('transform', `translate(${config.margin}, ${config.margin})`);
        // default values
        this.viewPort = this.clipGroup.svg(0, 0, this._width, this._height);
        this.viewPort.setAttribute('preserveAspectRatio', 'none');
        // create a static group for non-size-scaling objects
        this.staticGroup = this.clipGroup.group();
        this.xAxis = this.staticGroup.line(-10000, 0, 10000, 0);
        this.yAxis = this.staticGroup.line(0, -10000, 0, 10000);
        this.staticGroup.circle(0, 0, 3).fill = '#404040';
        // initialize the scaling
        this.scaleX = config.scaleX;
        this.scaleY = config.scaleY;
        // calculate the visible dimensions and top-left position of internal coordinates
        this.visibleWidth = this._width / this.scaleX;
        this.visibleHeight = this._height / this.scaleY;
        this.internalX = -this.visibleWidth / 2;
        this.internalY = -this.visibleHeight / 2;
        this.fPath = this.staticGroup.path('');
        // this.fPath.root.setAttribute('vector-effect','non-scaling-stroke');
        this.fPath.setAttribute('transform', 'scale(1, -1)');
        this.setViewBox();
        if (config.originX != undefined && config.originY != undefined) {
            this.setOrigin(config.originX, config.originY);
        }
        // draw a grid of rectangles
        if (config.grid) {
            this.grid = this.viewPort.group();
            this.grid.classList.add('grid');
            this.grid.style.opacity = '.4';
            this.drawGrid();
        }
        // store a temp variable for registering events
        let graph = this;
        // Registers event listeners
        if (config.displayPoint === undefined || config.displayPoint) {
            // create a display circle for showing input and output
            this.displayCircle = this.staticGroup.circle(0, 0, 4);
            this.displayCircle.style.fill = 'cornflowerblue';
            this.displayCircle.setAttribute('transform', 'scale(1, -1)');
            this.xRect = this.rectangle(0, 0, 125, 40);
            this.yRect = this.rectangle(120, 0, 125, 40);
            this.xRect.root.style.fill = 'white';
            this.yRect.root.style.fill = 'white';
            this.xText = this.text(15, 20, 'x:0');
            this.xText.root.style.dominantBaseline = 'middle';
            this.xText.root.style.whiteSpace = 'pre';
            this.yText = this.text(125 + 15, 20, 'y:0');
            this.yText.root.style.dominantBaseline = 'middle';
            this.yText.root.style.whiteSpace = 'pre';
            this.root.addEventListener('mousemove', function (event) {
                graph.handleMouseMove(event);
            });
        }
        if (config.zoomable === undefined || config.zoomable) {
            this.root.addEventListener('mousedown', function (event) {
                graph.handleMouseDown(event);
            });
            this.root.addEventListener('mouseup', function (event) {
                graph.handleMouseUp(event);
            });
            this.root.addEventListener('mouseleave', function (event) {
                graph.handleMouseLeave(event);
            });
            this.root.addEventListener('mousewheel', function (event) {
                graph.handleMouseWheelEvent(event);
            }, { passive: false });
        }
        if (config.controls) {
            let zoomIn = this.rectangle(this._width - 48, 16, 30, 30);
            zoomIn.setAttribute('rx', '3');
            zoomIn.style.fill = '#f8f8f8';
            let zoomOut = this.rectangle(this._width - 48, 46, 30, 30);
            zoomOut.setAttribute('rx', '3');
            zoomOut.style.fill = '#f8f8f8';
            let fullscreen = this.circle(this._width - 32, this._height - 32, 16);
            fullscreen.style.fill = '#f8f8f8';
        }
        // draw the initial state of the graph
        this.draw();
        if (config.labels) {
            // draw the labels
            let group = this.group();
            group.style.fontFamily = 'KaTeX_Main';
            group.style.fontSize = '22px';
            // draw the title
            let title;
            if (config.title instanceof _svg_text_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
                title = group.appendChild(config.title);
                title.x = this.width / 2;
                title.y = 25;
            }
            else {
                title = group.text(this.width / 2, 25, config.title);
            }
            title.setAttribute('alignment-baseline', 'middle');
            title.setAttribute('text-anchor', 'middle');
            let xPoints = this.getXLabelPoints();
            let yPoints = this.getYLabelPoints();
            for (let p of xPoints) {
                let point = this.internalToAbsolute(p);
                let text = group.text(point.x + config.margin, config.margin + this._height + config.margin / 2, `${p.x.toFixed(1)}`);
                text.setAttribute('alignment-baseline', 'middle');
                text.setAttribute('text-anchor', 'middle');
            }
            for (let p of yPoints) {
                let point = this.internalToAbsolute(p);
                let text = group.text(point.x + config.margin / 2, point.y + config.margin, `${p.y.toFixed(1)}`);
                text.setAttribute('alignment-baseline', 'middle');
                text.setAttribute('text-anchor', 'middle');
            }
        }
    }
    /**
    * Sets the internal function to the provided function
    */
    set function(f) {
        this._function = f;
    }
    /**
    * Returns the internal function
    */
    get function() {
        return this._function;
    }
    get originX() {
        return -this._x;
    }
    get originY() {
        return -this._y;
    }
    /**
    * Updates the display circle based on its current cx position, also updates
    * the display text elements to represent the position of the display circle.
    */
    updateDisplayCircle() {
        // Set the initial display position
        if (this.displayCircle != undefined) {
            let cy = this.call(this.displayCircle.cx, false);
            if (isNaN(cy)) {
                this.displayCircle.cy = 0;
            }
            else if (isFinite(cy)) {
                this.displayCircle.cy = cy;
                this.xText.contents = this.format(this.displayCircle.cx / this.scaleX);
                this.yText.contents = this.format(this.displayCircle.cy / this.scaleY);
            }
            else {
                this.displayCircle.cy = this._height * 3;
                this.xText.contents = this.format(this.displayCircle.cx / this.scaleX);
                this.yText.contents = cy.toString();
            }
        }
    }
    /**
    * Returns the result of calling the internal function with the provided
    * function scaling both the input and the output.
    */
    call(x, trim = false) {
        // call and scale the function
        let y = this.scaleY * this._function(x / this.scaleX);
        // normalize big/small y values
        if (trim) {
            let margin = 8;
            let yMax = this._y + this._height + margin;
            let yMin = this._y - margin;
            if (-y > yMax) {
                y = -yMax;
            }
            if (-y < yMin) {
                y = -yMin;
            }
        }
        else {
            let yMin = this._y - this._height;
            let yMax = this._y + 2 * this._height;
            if (-y > yMax) {
                y = -yMax;
            }
            if (-y < yMin) {
                y = -yMin;
            }
        }
        return y;
    }
    /**
    * Formats the input number to be displayed within the graph.
    */
    format(n) {
        if (n > 10000 || n < -10000 || (n < .01 && n > -.01)) {
            return n.toExponential(2);
        }
        else {
            return n.toPrecision(4);
        }
    }
    /**
    * Draws the internal function over the interval [startX, endX]. The default
    * interval is [ minX - width, maxX + width ] so that when a user drags the
    * graph there is enough drawn so that a translate may be applied instead of
    * having to call draw again.
    */
    draw(startX = this._x - this._width, endX = this._x + 2 * this._width, trim = false) {
        this.setViewBox();
        this.updateDisplayCircle();
        // Start drawing the function
        let start = false;
        let x = startX;
        let y = this.call(x, false);
        let d = '';
        let prev;
        // If y is valid input start drawing
        if (!isNaN(y)) {
            d = `M ${x} ${y} `;
            prev = y;
            start = true;
        }
        // Loop through and draw coordiantes of the function path
        for (x += 1; x < endX; x += 1) {
            let y = this.call(x, trim);
            if (isNaN(y) || !isFinite(y)) {
                continue;
            }
            // check for vertical asymptotes or if we haven't started drawing
            else if (Math.abs(prev - y) >= this._height || !start) {
                d += `M ${x.toFixed(1)} ${y.toFixed(1)} `;
                start = true;
            }
            else {
                d += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
            }
            prev = y;
        }
        this.fPath.d = d;
        // Update the dependents if there are any
        this.updateDependents();
    }
    /**
    *
    */
    drawGrid() {
        // clear all the children
        this.grid.clear();
        // TODO: use a combination of these metrics below to calculate the spacing
        // between two grid lines. I am guessing the goal is to space grid lines
        // somewhere between 10 - 50 pixels in the actual coordinate system
        let pixelsX = 100 * this.visibleWidth / this._width;
        let pixelsY = 100 * this.visibleHeight / this._height;
        let spacingX = expTrunc(pixelsX);
        let spacingY = expTrunc(pixelsY);
        // TODO: use the static group for this?
        // let minX = this.internalX - this.visibleWidth;
        // let maxX = this.internalX + 2*this.visibleWidth;
        // let minY = this.internalY - this.visibleHeight;
        // let maxY = this.internalY + 2*this.visibleHeight;
        let minX = this.internalX;
        let maxX = this.internalX + this.visibleWidth;
        let minY = this.internalY;
        let maxY = this.internalY + this.visibleHeight;
        let x = spacingX * Math.floor(minX / spacingX);
        while (x < maxX) {
            this.grid.line(x, minY, x, maxY);
            x += spacingX;
        }
        let y = spacingY * Math.floor(maxY / spacingY);
        while (y > minY) {
            this.grid.line(minX, y, maxX, y);
            y -= spacingY;
        }
    }
    internalToAbsolute(point) {
        let x = point.x * this.scaleX + this.originX;
        let y = point.y * this.scaleY - this.originY;
        return { x: x, y: -y };
    }
    /**
    *
    */
    getXLabelPoints() {
        let labels = [];
        let pixelsX = 250 * this.visibleWidth / this._width;
        let spacingX = expTrunc(pixelsX);
        // TODO: use the static group for this?
        let minX = this.internalX;
        let maxX = this.internalX + this.visibleWidth;
        let minY = this.internalY;
        let x = spacingX * Math.ceil(minX / spacingX);
        while (x <= maxX) {
            labels.push({ x: x, y: minY });
            x += spacingX;
        }
        return labels;
    }
    /**
    *
    */
    getYLabelPoints() {
        let labels = [];
        let pixelsY = 250 * this.visibleHeight / this._height;
        let spacingY = expTrunc(pixelsY);
        // TODO: use the static group for this?
        let minX = this.internalX;
        let minY = this.internalY;
        let maxY = this.internalY + this.visibleHeight;
        let y = spacingY * Math.floor(maxY / spacingY);
        while (y >= minY) {
            labels.push({ x: minX, y: -y });
            y -= spacingY;
        }
        return labels;
    }
    /**
    * When a user mouses down over this graph a drag is active.
    */
    handleMouseDown(event) {
        this.active = true;
        this.prevX = event.clientX;
        this.prevY = event.clientY;
    }
    /**
    * Deactivates the current drag event.
    */
    handleMouseUp(_event) {
        this.active = false;
    }
    /**
    * When the user's mouse leaves the graph deactivates any concurrent drag.
    */
    handleMouseLeave(event) {
        this.handleMouseUp(event);
    }
    /**
    * Updates the position of the static group and sets the viewbox on the
    * viewPort element.
    */
    setViewBox() {
        this.staticGroup.setAttribute('transform', `translate(${-this._x}, ${-this._y})`);
        this.viewPort.setAttribute('viewBox', `${this.internalX} ${this.internalY} ${this.visibleWidth} ${this.visibleHeight}`);
    }
    /**
    * This moves the origin of the plot to the location (x,y) relative to the size
    * of the plot. For example, if the plot is 600 wide and 300 tall, placing the
    * origin at (100,100) move the origin to the point 100 units in the x
    * direction and 100 units in the y direction from the top left corner of the
    * plot.
    */
    setOrigin(x, y) {
        this._x = -x;
        this._y = -y;
        this.internalX = this._x / this.scaleX;
        this.internalY = this._y / this.scaleY;
        this.draw();
    }
    /**
    * Handle when a mouse moves over this graph. If a drag event is active then
    * translates the position of the graph to the new location.
    */
    handleMouseMove(event) {
        if (this.active) {
            let deltaX = event.clientX - this.prevX;
            let deltaY = event.clientY - this.prevY;
            this._x -= deltaX;
            this._y -= deltaY;
            this.internalX -= deltaX / this.scaleX;
            this.internalY -= deltaY / this.scaleY;
            this.prevX = event.clientX;
            this.prevY = event.clientY;
            this.draw();
        }
        else {
            let br = this.rect.root.getBoundingClientRect();
            if (this.displayCircle != undefined) {
                this.displayCircle.cx = event.clientX - br.left + this._x;
                this.updateDisplayCircle();
            }
        }
    }
    /**
    * Zooms in and out on this graph. TODO: There is some jarring wheel action
    * where an active wheel event on the page will stop dead when the mouse
    * goes over the graph. Also it seems as if the scroll has pre-existing
    * "momentum" that it can also affect the graph.
    */
    handleMouseWheelEvent(event) {
        event.preventDefault();
        let zoomIntensity = .02;
        let br = this.rect.root.getBoundingClientRect();
        let x = event.clientX - br.left;
        let y = event.clientY - br.top;
        let wheel = event.deltaY < 0 ? 1 : -1;
        let zoom = Math.exp(wheel * zoomIntensity);
        // transform the internal coordinate system
        let deltaX = x / (this.scaleX * zoom) - x / this.scaleX;
        let deltaY = y / (this.scaleY * zoom) - y / this.scaleY;
        this.internalX -= deltaX;
        this.internalY -= deltaY;
        this.scaleX *= zoom;
        this.scaleY *= zoom;
        this.visibleWidth = this._width / this.scaleX;
        this.visibleHeight = this._height / this.scaleY;
        // update the elements in the static (svg) coordinate system
        this._x = this.internalX * this.scaleX;
        this._y = this.internalY * this.scaleY;
        // update the position of the display circle
        if (this.displayCircle != undefined) {
            this.displayCircle.cx = event.clientX - br.left + this._x;
        }
        // redraw visual elements
        this.drawGrid();
        this.draw();
    }
    /**
    *
    */
    export() {
        let result = new _svg_svg_js__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0, this._width, this._height);
        let margin = 8;
        // trim axis
        this.xAxis.x1 = this._x;
        this.xAxis.x2 = this._x + this._width;
        this.yAxis.y1 = this._y;
        this.yAxis.y2 = this._y + this._height;
        // draw trimmed version
        this.draw(this._x - margin, this._x + this._width + margin, true);
        return result;
    }
}
//# sourceMappingURL=plot.js.map

/***/ }),

/***/ "uE+z":
/*!*****************************************************!*\
  !*** ./src/assets/source/elements/svg/meta-data.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MetaData; });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "624d");

class MetaData extends _element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        let metadata = document.createElementNS('http://www.w3.org/2000/svg', 'metadata');
        super(metadata);
    }
}
//# sourceMappingURL=meta-data.js.map

/***/ }),

/***/ "v8dO":
/*!***************************************************!*\
  !*** ./src/assets/source/elements/interactive.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Interactive; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _util_file_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/file.js */ "l8YR");
/* harmony import */ var _util_svg_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/svg.js */ "4858");
/* harmony import */ var _input_input_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./input/input.js */ "Ambf");
/* harmony import */ var _svg_svg_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./svg/svg.js */ "GAEk");
/* harmony import */ var _svg_group_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./svg/group.js */ "sFit");
/* harmony import */ var _visual_icon_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./visual/icon.js */ "YAAk");
/* harmony import */ var _input_button_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./input/button.js */ "wZwl");
/* harmony import */ var _input_check_box_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./input/check-box.js */ "Piay");
/* harmony import */ var _input_control_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./input/control.js */ "kJ17");
/* harmony import */ var _input_control_circle_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./input/control-circle.js */ "LyDu");
/* harmony import */ var _input_radio_control_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./input/radio-control.js */ "6UAm");
/* harmony import */ var _input_dropdown_control_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./input/dropdown-control.js */ "wCCE");
/* harmony import */ var _input_scrubber_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./input/scrubber.js */ "QBIj");
/* harmony import */ var _input_slider_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./input/slider.js */ "8SZi");
/* harmony import */ var _input_hover_box_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./input/hover-box.js */ "3DG2");
/* harmony import */ var _elements_graph_node_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../elements/graph/node.js */ "4WwI");
/* harmony import */ var _elements_graph_edge_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../elements/graph/edge.js */ "5nZz");
/* harmony import */ var _elements_graph_graph_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../elements/graph/graph.js */ "IFU1");
/* harmony import */ var _elements_maps_map_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../elements/maps/map.js */ "PLVj");
/* harmony import */ var _elements_math_plot_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../elements/math/plot.js */ "tTcA");

// util


// basic elements



// visual elements

// input elements









// graph elements



// map elements

// math elements

/**
* This class exposes the high level functionality of our library. Elements can
* created and related together
*
* By default input elements are added to a SVG "controls" group and visual
* elements are added to the "background" group. This ensures that controls will
* alwaysbe focusable, despite the order in which elements are created.
*/
class Interactive extends _svg_svg_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
    /**
    * Constructs a new interactive object and appends it into the DOM. If the
    * provided argument is an HTMLElement appends the interactive within that
    * element. If the provided a value is a string, appends the interactive within
    * the HTML element with the corresponding ID. If no element is found throws an
    * error.
    */
    constructor(value, options = {}) {
        super();
        // If the user passes in a string identifier check to see if such an
        // element exists in the current document.
        if (typeof value == "string") {
            this.container = document.getElementById(value);
            if (this.container === null || this.container === undefined) {
                throw new Error(`There is no HTML element with the id: ${value}`);
            }
        }
        else {
            this.container = value;
        }
        // create and append the root svg element and group elements
        this.container.appendChild(this.root);
        this.root.classList.add('interactive');
        // Have to create and manually append because overridden append child will
        // throw an error.
        this.background = new _svg_group_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
        this.input = new _svg_group_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
        this.root.appendChild(this.background.root);
        this.root.appendChild(this.input.root);
        // default configuration options
        let defaultOptions = {
            originX: 0,
            originY: 0,
            width: 600,
            height: 300,
            border: false
        };
        // combine the default configuration with the user's configuration
        let config = Object.assign(Object.assign({}, defaultOptions), options);
        this._originX = config.originX;
        this._originY = config.originY;
        this._width = config.width;
        this._height = config.height;
        this.root.setAttribute('width', this._width.toString());
        this.root.setAttribute('height', this._height.toString());
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
        this.window = false;
        this.border = config.border;
        // prevent the default behavior of selecting text
        this.container.addEventListener('mousedown', function (event) {
            event.preventDefault();
        });
    }
    /**
    * Sets the width of this interactive area.
    */
    set width(value) {
        this._width = value;
        this.root.setAttribute('width', value.toString());
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
    }
    /**
    * Returns the width of this interactive area.
    */
    get width() {
        return this._width;
    }
    /**
    * Sets the height of this interactive area.
    */
    set height(value) {
        this._height = value;
        this.root.setAttribute('height', value.toString());
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
    }
    /**
    * Returns the height of this interactive area.
    */
    get height() {
        return this._height;
    }
    /**
    * Sets the x coordinate of the origin.
    */
    set originX(value) {
        this._originX = value;
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
    }
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originX() {
        return this._originX;
    }
    /**
    * Sets the y coordinate of the origin.
    */
    set originY(value) {
        this._originY = value;
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
    }
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originY() {
        return this._originY;
    }
    /**
    * If set to true, styles the interactive to float on top of the background.
    * This feature is good for interactives where elements can be dragged out of
    * the bounds of the container element.
    */
    set window(value) {
        if (value) {
            this.root.classList.add('window');
        }
        else {
            this.root.classList.remove('window');
        }
    }
    /**
    * If set to true, draws a minimal border around the interactive.
    */
    set border(value) {
        if (value) {
            this.root.classList.add('border');
        }
        else {
            this.root.classList.remove('border');
        }
    }
    /**
    * Returns the minimum x-coordinate of this interactive.
    */
    get minX() {
        return -this.originX;
    }
    /**
    * Returns the minimum y-coordinate of this interactive.
    */
    get minY() {
        return -this.originY;
    }
    /**
    * Returns the maximum x-coordinate of this interactive.
    */
    get maxX() {
        return this.minX + this._width;
    }
    /**
    * Returns the maximum y-coordinate of this interactive.
    */
    get maxY() {
        return this.minY + this._height;
    }
    /**
    * Appends the element within the interactive. If the element is an "input"
    * element, places the element in the input group so that visually the element
    * is always placed above other graphical elements.
    */
    appendChild(child) {
        if (child instanceof _input_input_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
            this.input.appendChild(child);
        }
        else {
            this.background.appendChild(child);
        }
        return child;
    }
    /**
    * Creates a nested interactive within this interactive
    */
    interactive(x, y, options = {}) {
        let obj = new Interactive(this.id, options);
        // TODO: standardize this
        obj.root.setAttribute('x', x.toString());
        obj.root.setAttribute('y', y.toString());
        return obj;
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    button(x, y, label) {
        return this.appendChild(new _input_button_js__WEBPACK_IMPORTED_MODULE_7__["default"](x, y, label));
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    checkBox(x, y, label, value) {
        return this.appendChild(new _input_check_box_js__WEBPACK_IMPORTED_MODULE_8__["default"](x, y, label, value));
    }
    /**
    * Creates an icon at the position (x,y) with the provided dimensions.
    */
    icon(x, y, width, height, name, options = {}) {
        let baseURL;
        if (options.baseURL === undefined) {
            baseURL = 'resources/icons/';
        }
        else {
            baseURL = options.baseURL;
        }
        // check to see if the symbols group has been initialized
        if (this.symbols === undefined) {
            this.symbols = new _svg_group_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
            this.root.appendChild(this.symbols.root);
            this.icons = new Set();
        }
        // create a new icon element
        let icon = new _visual_icon_js__WEBPACK_IMPORTED_MODULE_6__["default"](x, y, width, height);
        this.appendChild(icon);
        // check to see if we have loaded this icon before
        let id = `${this.id}-${name}`;
        if (!this.icons.has(id)) {
            // TODO: maybe we should only request one SVG file with that defines many
            // icon symbols. Then add the symbols as needed from, rather than have
            // many network requests for symbols. Or maybe the user could add the
            // symbols to their web page themselves.
            let temp = this;
            Object(_util_file_js__WEBPACK_IMPORTED_MODULE_1__["getURL"])(`${baseURL}${name}.svg`).then(function (response) {
                let symbolSVG = Object(_util_svg_js__WEBPACK_IMPORTED_MODULE_2__["parseSVG"])(response);
                let symbol = temp.symbols.symbol();
                symbol.root.id = id;
                symbol.viewBox = symbolSVG.getAttribute('viewBox');
                while (symbolSVG.childNodes.length > 0) {
                    symbol.root.appendChild(symbolSVG.childNodes[0]);
                }
                icon.href = `#${id}`;
            }).catch(function (error) {
                throw error;
            });
        }
        else {
            icon.href = `#${id}`;
        }
        this.icons.add(id);
        return icon;
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    radioControl(x, y, labels, index = 0) {
        return this.appendChild(new _input_radio_control_js__WEBPACK_IMPORTED_MODULE_11__["default"](x, y, labels, index));
    }
    /**
    * Creates a dropdown input at the position (x,y) within this interactive.
    */
    dropdownControl(x, y, optionLabels, defaultIndex) {
        return this.appendChild(new _input_dropdown_control_js__WEBPACK_IMPORTED_MODULE_12__["default"](x, y, optionLabels, defaultIndex));
    }
    /**
    * Creates a control point within this interactive at the position (x,y).
    */
    control(x, y) {
        return this.appendChild(new _input_control_js__WEBPACK_IMPORTED_MODULE_9__["default"](x, y));
    }
    /**
    * Creates a control point within this interactive at the position (x,y).
    */
    controlCircle(x, y) {
        return this.appendChild(new _input_control_circle_js__WEBPACK_IMPORTED_MODULE_10__["default"](x, y));
    }
    /**
    * Creates a plot within this interactive at the position (x,y).
    */
    plot(fn, options) {
        return this.appendChild(new _elements_math_plot_js__WEBPACK_IMPORTED_MODULE_20__["default"](fn, options));
    }
    /**
    * Creates a graph element within this interactive
    */
    graph(options) {
        return this.appendChild(new _elements_graph_graph_js__WEBPACK_IMPORTED_MODULE_18__["default"](options));
    }
    hoverBox(str) {
        return this.appendChild(new _input_hover_box_js__WEBPACK_IMPORTED_MODULE_15__["default"](str));
    }
    /**
    * Creates a graph element within this interactive
    */
    map(externalData, featureName = null, options = {}) {
        let map = new _elements_maps_map_js__WEBPACK_IMPORTED_MODULE_19__["default"](featureName, externalData, options);
        let ret = this.appendChild(map);
        let bbox = map.root.getBBox();
        map.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
        return ret;
    }
    /**
    * Creates a slider input within this interactive
    */
    slider(x, y, options) {
        return this.appendChild(new _input_slider_js__WEBPACK_IMPORTED_MODULE_14__["default"](x, y, options));
    }
    /**
    * Creates a scrubber with a play and pause button at the position (x,y).
    */
    scrubber(x, y, options) {
        return this.appendChild(new _input_scrubber_js__WEBPACK_IMPORTED_MODULE_13__["default"](x, y, options));
    }
    /**
    * Creates a node within this interactive.
    */
    node(x, y, rx, ry, contents) {
        return this.appendChild(new _elements_graph_node_js__WEBPACK_IMPORTED_MODULE_16__["default"](x, y, rx, ry, contents));
    }
    /**
    * Creates an edge connecting two nodes within this interactive.
    */
    edge(nodeFrom, nodeTo, directed) {
        return this.appendChild(new _elements_graph_edge_js__WEBPACK_IMPORTED_MODULE_17__["default"](nodeFrom, nodeTo, directed));
    }
    /**
    *
    */
    loadSVG(url) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let group = new _svg_group_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
            this.appendChild(group);
            Object(_util_file_js__WEBPACK_IMPORTED_MODULE_1__["getURL"])(url).then(function (response) {
                group.root.appendChild(Object(_util_svg_js__WEBPACK_IMPORTED_MODULE_2__["parseSVG"])(response));
            }).catch(function (error) {
                throw error;
            });
            return group;
        });
    }
}
//# sourceMappingURL=interactive.js.map

/***/ }),

/***/ "wCCE":
/*!**************************************************************!*\
  !*** ./src/assets/source/elements/input/dropdown-control.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DropdownControl; });
/* harmony import */ var _svg_group_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svg/group.js */ "sFit");
/* harmony import */ var _svg_rectangle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../svg/rectangle.js */ "TU2K");
/* harmony import */ var _svg_text_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../svg/text.js */ "maoU");
/* harmony import */ var _svg_path_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../svg/path.js */ "Gl8z");
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./input.js */ "Ambf");





/**
*  Dropdown with menu item labels that can be selected.
*/
class DropdownControl extends _input_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
    /**
     * Constructs a dropdown control with given option labels at the given (x,y) position
     * and with the default selection as the label at the given default index.
     */
    constructor(x, y, optionLabels, defaultIndex) {
        if (optionLabels === undefined || optionLabels.length === 0) {
            throw new Error('Dropdown control must have at least one option');
        }
        if (defaultIndex < 0 || defaultIndex >= optionLabels.length) {
            throw new Error('Default index must be within bounds of option labels array.');
        }
        super();
        this.optionLabels = optionLabels;
        this.currentIndex = defaultIndex;
        this.expanded = false;
        this.textWidth = new _svg_text_js__WEBPACK_IMPORTED_MODULE_2__["default"](0, 0, this.getLongestString(optionLabels)).length;
        this.x = x;
        this.y = y;
        this.collapsedView = new _svg_group_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.collapsedView.setAttribute("transform", `translate(${this.x},${this.y})`);
        this.currSelection = new _svg_group_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.currSelection.root.classList.add('dropdown-control-curr-selection-box');
        this.currSelectionText = new _svg_text_js__WEBPACK_IMPORTED_MODULE_2__["default"](0, 1, this.optionLabels[this.currentIndex]);
        this.currSelectionText.root.setAttribute('alignment-baseline', 'middle');
        this.currSelectionText.style.textAnchor = 'middle';
        this.currSelectionBox = new _svg_rectangle_js__WEBPACK_IMPORTED_MODULE_1__["default"](0, -16, this.textWidth * 3 + 16, 32);
        this.currSelectionText.x = this.currSelectionBox.x + this.currSelectionBox.width / 2;
        this.currSelection.appendChild(this.currSelectionBox);
        this.currSelection.appendChild(this.currSelectionText);
        let dropdownButton = new _svg_group_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        dropdownButton.root.classList.add('dropdown-control-button');
        let buttonBox = new _svg_rectangle_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.textWidth * 3 + 16, -16, 32, 32);
        let radius = 8;
        let downArrow = new _svg_path_js__WEBPACK_IMPORTED_MODULE_3__["default"](` M ${radius + this.textWidth * 3 + 32} ${radius * Math.sin(-2 * Math.PI / 3) + 1}
                                 L ${radius * Math.cos(-2 * Math.PI / 3) + this.textWidth * 3 + 28} ${radius * Math.sin(-2 * Math.PI / 3) + 1}
                                 L ${(radius + this.textWidth * 3 + 32 + radius * Math.cos(-2 * Math.PI / 3) + this.textWidth * 3 + 28) / 2} ${radius * Math.sin(-4 * Math.PI / 3) + 1}
                                 Z`);
        downArrow.style.fill = '#333333';
        dropdownButton.appendChild(buttonBox);
        dropdownButton.appendChild(downArrow);
        let _this = this;
        dropdownButton.root.onmousedown = function () {
            if (!_this.expanded) {
                _this.updateExpandedView();
                _this.root.appendChild(_this.expandedView.root);
                _this.expanded = true;
            }
            else {
                _this.root.removeChild(_this.expandedView.root);
                _this.expanded = false;
            }
            _this.onchange();
        };
        this.collapsedView.appendChild(this.currSelection);
        this.collapsedView.appendChild(dropdownButton);
        this.root = this.collapsedView.root;
        this.root.id = this.id;
    }
    get value() {
        return this.optionLabels[this.currentIndex];
    }
    /**
    *  Updates the expanded view of menu options.
    */
    updateExpandedView() {
        this.expandedView = new _svg_group_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.collapsedView.setAttribute("transform", `translate(${this.x},${this.y})`);
        let currSelection = new _svg_group_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        currSelection.root.classList.add('dropdown-control-menu-option');
        let currSelectionText = new _svg_text_js__WEBPACK_IMPORTED_MODULE_2__["default"](0, 1, this.optionLabels[this.currentIndex]);
        currSelectionText.root.setAttribute('alignment-baseline', 'middle');
        currSelectionText.style.textAnchor = 'middle';
        let currSelectionBox = new _svg_rectangle_js__WEBPACK_IMPORTED_MODULE_1__["default"](0, -16, this.textWidth * 3 + 16, 32);
        currSelectionText.x = currSelectionBox.x + currSelectionBox.width / 2;
        currSelection.appendChild(currSelectionBox);
        currSelection.appendChild(currSelectionText);
        this.expandedView.appendChild(currSelection);
        let _this = this;
        let rectY = 32;
        this.optionLabels.forEach((label, i) => {
            if (i == this.currentIndex) {
                return;
            }
            let menuOption = new _svg_group_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
            menuOption.root.classList.add('dropdown-control-menu-option');
            let optionText = new _svg_text_js__WEBPACK_IMPORTED_MODULE_2__["default"](0, 1 + rectY, label);
            optionText.root.setAttribute('alignment-baseline', 'middle');
            optionText.style.textAnchor = 'middle';
            let optionBox = new _svg_rectangle_js__WEBPACK_IMPORTED_MODULE_1__["default"](0, -16 + rectY, this.textWidth * 3 + 16, 32);
            optionText.x = optionBox.x + optionBox.width / 2;
            menuOption.appendChild(optionBox);
            menuOption.appendChild(optionText);
            menuOption.root.onmousedown = function () {
                _this.root.removeChild(_this.expandedView.root);
                _this.expanded = false;
                _this.currentIndex = i;
                _this.currSelectionText.contents = label;
                _this.onchange();
            };
            this.expandedView.appendChild(menuOption);
            rectY += 32;
        });
    }
    /**
    * Returns the text of the current selection in from the dropdown menu.
    */
    getCurrentSelection() {
        return this.optionLabels[this.currentIndex];
    }
    /**
    * Returns the longest string in the given string array.
    */
    getLongestString(list) {
        if (list.length == 0) {
            return "";
        }
        let longest = list[0];
        for (let i = 1; i < list.length; i++) {
            if (list[i].length > longest.length) {
                longest = list[i];
            }
        }
        return longest;
    }
}
//# sourceMappingURL=dropdown-control.js.map

/***/ }),

/***/ "wZwl":
/*!****************************************************!*\
  !*** ./src/assets/source/elements/input/button.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Button; });
/* harmony import */ var _svg_text_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svg/text.js */ "maoU");
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input.js */ "Ambf");


/**
* A button that when pressed fires an onclick event.
*/
class Button extends _input_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
    * Constructs a button at the position (x,y)
    */
    constructor(x, y, str) {
        super();
        /**
        * The state of the checkbox
        */
        this._count = 0;
        this._x = x;
        this._y = y;
        this._active = false;
        this.root.setAttribute('transform', `translate(${x},${y})`);
        this.root.classList.add('button');
        // Create a text element
        this.label = new _svg_text_js__WEBPACK_IMPORTED_MODULE_0__["default"](0, 1, str);
        this.label.root.setAttribute('alignment-baseline', 'middle');
        this.label.root.style.textAnchor = 'middle';
        // TODO: why is this.text.root.textLength returning zero?
        this.box = this.rectangle(0, -16, this.label.length * 2 + 16, 32);
        this.box.root.setAttribute('rx', '2px');
        this.label.x = this.box.x + this.box.width / 2;
        this.appendChild(this.label);
        let temp = this;
        this.root.onmousedown = () => {
            temp.active = !this.active;
        };
        this.root.onmouseup = () => {
            temp.active = !this.active;
        };
    }
    /**
    * Returns the top left x position of this button.
    */
    get x() {
        return this._x;
    }
    /**
    * Sets the top left x position of this button.
    */
    set x(value) {
        this._x = value;
        this.root.setAttribute('transform', `translate(${this._x},${this._y})`);
    }
    /**
    * Returns the top left x position of this button.
    */
    get y() {
        return this._y;
    }
    /**
    * Sets the top left y position of this button.
    */
    set y(value) {
        this._y = value;
        this.root.setAttribute('transform', `translate(${this._x},${this._y})`);
    }
    /**
    * Returns how many times this button has been pressed. Count does not
    * increment until the button has been released.
    */
    get count() {
        return this._count;
    }
    /**
    * Returns true if the button is actively being pressed.
    */
    get active() {
        return this._active;
    }
    /**
    * Allows the user to synthetically "press" the button and put it into an
    * active state.
    */
    set active(value) {
        // if transitioning from an active to inactive state count the state change
        if (this.active && !value) {
            this._count++;
        }
        this._active = value;
        if (this._active) {
            this.box.style.fill = '#f8f8f8';
            this.box.style.stroke = '#333333';
            this.box.style.strokeWidth = '1px';
            this.label.style.fill = '#404040';
        }
        else {
            this.box.style.fill = '';
            this.label.style.fill = '';
        }
        this.onchange();
    }
    /**
    * Fires when the user clicks the left button on the button.
    */
    set onclick(handler) {
        this.root.onclick = handler;
        this.onchange();
    }
}
//# sourceMappingURL=button.js.map

/***/ }),

/***/ "yjOQ":
/*!*************************************************!*\
  !*** ./src/app/tagger/draws/draws.component.ts ***!
  \*************************************************/
/*! exports provided: DrawsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawsComponent", function() { return DrawsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_assets_source_elements_interactive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/assets/source/elements/interactive */ "5BLY");
/* harmony import */ var _draws_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./draws-class */ "XviM");
/* harmony import */ var _draws_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./draws.service */ "+HF2");
/* harmony import */ var _imagebar_imagebar_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../imagebar/imagebar.service */ "pd+n");
/* harmony import */ var _sidebar_sidebar_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sidebar/sidebar.service */ "O8K7");
/* harmony import */ var ngx_papaparse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-papaparse */ "P6Fj");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");










function DrawsComponent_div_16_div_4_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "input", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DrawsComponent_div_16_div_4_div_1_Template_input_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r9); const clase_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r7.toggleClassView(clase_r5.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "label", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DrawsComponent_div_16_div_4_div_1_Template_input_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r9); const clase_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit; const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r10.classSelector(clase_r5.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "label", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "img", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const clase_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](clase_r5.upClass);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("id", clase_r5.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("id", clase_r5.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](clase_r5.showName);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("src", "/assets/icons/", clase_r5.icon, "", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function DrawsComponent_div_16_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DrawsComponent_div_16_div_4_div_1_Template, 7, 7, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const clase_r5 = ctx.$implicit;
    const categoria_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", clase_r5.upClass === categoria_r3.upClass);
} }
function DrawsComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h5", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DrawsComponent_div_16_Template_h5_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r15); const categoria_r3 = ctx.$implicit; const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r14.changeActiveUpClass(categoria_r3.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, DrawsComponent_div_16_div_4_Template, 2, 1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const categoria_r3 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](categoria_r3.nombre);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("id", categoria_r3.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.draswService.clases);
} }
function DrawsComponent_div_36_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Se eliminar\u00E1 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, ". \u00BFDesea continuar? ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DrawsComponent_div_36_Template_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r16.confirmDelete("classDeleteid"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "check");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DrawsComponent_div_36_Template_button_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r17); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r18.cancelDelete("classDeleteid"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "clear");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.draswService.clase.name);
} }
class DrawsComponent {
    constructor(draswService, imageService, sidebarService, papa) {
        this.draswService = draswService;
        this.imageService = imageService;
        this.sidebarService = sidebarService;
        this.papa = papa;
        this.show = false;
        this.isHidden = false;
        this.categories = [];
    }
    // Crea una zona interactive
    // por defecto de 1400x300
    ngOnInit() {
        this.draswService.myInteractive = new src_assets_source_elements_interactive__WEBPACK_IMPORTED_MODULE_2__["default"]("my-interactive");
        this.draswService.myInteractive.width = 200;
        this.draswService.myInteractive.height = 200;
        let cont = document.getElementById("draw_container_id");
        cont.addEventListener("click", this.draswService.uptadeOri, false);
        this.color = "#844444";
        this.name = "";
        this.draswService.defaulClases()
            .then(c => {
            this.fillCategories();
        });
    }
    // Boton formulario crear clase
    mostrar(id) {
        let section = document.getElementById(id);
        section.style.display = "block";
        document.getElementById("class-creation").style.display = "block";
    }
    //Confirmar la creacion de nueva clase
    confirmCreation(id, shapeType) {
        let check = false;
        let checkField = false;
        let clase;
        if (shapeType.localeCompare("box") === 0) {
            this.width = document.getElementById("width");
            this.height = document.getElementById("height");
            this.name = document.getElementById("name");
            clase.name = this.name.value;
            clase.width = parseInt(this.width.value);
            clase.height = parseInt(this.height.value);
            clase.color = this.color;
            clase.shape = shapeType;
            clase.view = true;
            let formArea = document.getElementById("atributeForm");
            let atributeData = "";
            const formLength = formArea.children.length;
            check = this.draswService.checkClassname(clase.name);
            checkField = this.checkFieldNames(formArea, formLength);
            if (checkField && check) {
                for (let index = 0; index < formLength; index += 2) {
                    let formChildren = formArea.firstChild;
                    atributeData = atributeData + formChildren.value + ":";
                    formArea.removeChild(formArea.firstChild);
                    formChildren = formArea.firstChild;
                    if ((index + 2) !== formLength) {
                        atributeData = atributeData + formChildren.value + ";";
                    }
                    else {
                        atributeData = atributeData + formChildren.value;
                    }
                    formArea.removeChild(formArea.firstChild);
                }
                clase.atribute = atributeData;
            }
        }
        else if (shapeType.localeCompare("line") === 0) {
            this.name = document.getElementById("linename");
            const lines = document.getElementById("points");
            clase.lines = lines.value;
            clase.name = this.name.value;
            clase.color = this.color;
            clase.shape = shapeType;
            clase.view = true;
            let formArea = document.getElementById("atributeFormLine");
            let atributeData = "";
            const formLength = formArea.children.length;
            check = this.draswService.checkClassname(clase.name);
            checkField = this.checkFieldNames(formArea, formLength);
            if (checkField && check) {
                for (let index = 0; index < formLength; index += 2) {
                    let formChildren = formArea.firstChild;
                    atributeData = atributeData + formChildren.value + ":";
                    formArea.removeChild(formArea.firstChild);
                    formChildren = formArea.firstChild;
                    if ((index + 2) !== formLength) {
                        atributeData = atributeData + formChildren.value + ";";
                    }
                    else {
                        atributeData = atributeData + formChildren.value;
                    }
                    formArea.removeChild(formArea.firstChild);
                }
                clase.atribute = atributeData;
            }
        }
        // All right, let's reset the template
        if (checkField && check) {
            this.draswService.crearClase(clase);
            this.show1("class-creation", "line-creation", "boxselector", "lineselector");
            this.width = document.getElementById("width");
            this.height = document.getElementById("height");
            this.name = document.getElementById("name");
            this.width.value = 50;
            this.height.value = 50;
            this.color = "#844444";
            this.name.value = "";
            this.name = document.getElementById("linename");
            this.name.value = "";
            let section = document.getElementById(id);
            section.style.display = "none";
            document.getElementById("classNameAlertLine").style.display = "none";
            this.show = true;
            document.getElementById("shape-selector").style.display = "none";
            // List variation function
            // this.syncFunction(50).then(v=>{
            //   const header=document.getElementById("classheaderid");
            //   const elements=header.getElementsByClassName("lista");       
            //   for(var i =0;i<elements.length;i++){
            //     elements[i].addEventListener("click",function(){
            //       let current=document.getElementsByClassName("classActive");
            //       if(current.length>0){
            //         current[0].className=current[0].className.replace(" classActive","");
            //       }
            //       this.className+=" classActive";          
            //     })
            //   }
            // })
        }
        // Some error
        else {
            if (shapeType.localeCompare("line") === 0) {
                document.getElementById('classNameAlertLine').style.display = "block";
            }
            else {
                document.getElementById("classNameAlert").style.display = "block";
            }
        }
    }
    // cancelar creacion de clases
    cancelCreation(id) {
        this.show1("class-creation", "line-creation", "boxselector", "lineselector");
        this.width = document.getElementById("width");
        this.height = document.getElementById("height");
        this.name = document.getElementById("name");
        this.width.value = 50;
        this.height.value = 50;
        this.color = "#844444";
        this.name.value = "";
        this.name = document.getElementById("linename");
        this.name.value = "";
        let section = document.getElementById(id);
        section.style.display = "none";
        document.getElementById("classNameAlert").style.display = "none";
        document.getElementById("shape-selector").style.display = "none";
    }
    // obtiene los valores necesarios para 
    // crear una forma rectangular
    crearForma() {
        // this.draswService.crearShape(this.imageService.img.name);
    }
    // Funcion que crea una forma segun
    // las especificaciones del usuario
    mostrarDeleteAlert(id) {
        document.getElementById(id).style.display = "block";
        document.getElementById("shape-selector").style.display = "none";
        document.getElementById("class-creation").style.display = "none";
    }
    confirmDelete(id) {
        this.draswService.deleteClase();
        document.getElementById(id).style.display = "none";
    }
    cancelDelete(id) {
        document.getElementById(id).style.display = "none";
    }
    // Seleccion de clase
    classSelector(name) {
        // Asigna clase activa
        document.getElementById("class_cretion_container").style.display = "block";
        document.getElementById("shape-management").style.display = "block";
        // document.getElementById("class-edit-container").style.display="none";
        document.getElementById("shape-creator").className = "active-button";
        // document.getElementById("shape-editor").className="inactive-button";
        this.draswService.clases.forEach(element => {
            if (element.name === name) {
                this.draswService.selectClase(element);
            }
        });
        // Actualiza la vista de clase
        if (this.draswService.clase.atribute) { //Si contiene atributos
            let data = this.splitAtributeData(this.draswService.clase.atribute, ";");
            let padre = document.getElementById("atribute_window");
            const padreLength = padre.children.length;
            for (let index = 0; index < padreLength; index++) {
                padre.removeChild(padre.firstChild);
            }
            data.forEach(element => {
                // Nombre del atributo
                let text = this.splitAtributeData(element, ':');
                let namebar = this.createNameLabel(text[0]);
                // Valor del atributo
                let valuebar = this.createValueLabel(text[1]);
                padre.appendChild(namebar);
                padre.appendChild(valuebar);
            });
        }
        else { //Si no contiene atributos
            let padre = document.getElementById("atribute_window");
            const padreLength = padre.children.length;
            for (let index = 0; index < padreLength; index++) {
                padre.removeChild(padre.firstChild);
            }
        }
    }
    // Mostrar/Ocultar las opciones de creacion de formas
    show1(id1, id2, idactive, idinactive) {
        document.getElementById(idactive).className = "active-button";
        document.getElementById(idinactive).className = "inactive-button";
        document.getElementById(id1).style.display = "block";
        document.getElementById(id2).style.display = "none";
    }
    // Crea elementos para recibir datos extra
    // durante la creacion de clase
    addAtribute(id) {
        let namebar = this.createValueLabel("");
        let valuebar = this.createValueLabel("");
        let form = document.getElementById(id);
        form.appendChild(namebar);
        form.appendChild(valuebar);
    }
    removeAtribute(id) {
        let doc = document.getElementById(id);
        if (doc.lastChild) {
            doc.removeChild(doc.lastChild);
            doc.removeChild(doc.lastChild);
        }
    }
    checkFieldNames(formArea, formLength) {
        let bool = true;
        const regExp = /\s/;
        for (let index = 0; index < formLength; index += 2) {
            let formChildren = formArea.children[index];
            if (formChildren.value.localeCompare("") === 0 || formChildren.value.match(regExp) !== null) {
                bool = false;
                this.draswService.errorMessage = "El nombre del atributo no puede estar vacío o tener espacios.";
            }
        }
        return bool;
    }
    syncFunction(x) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const a = yield this.resolveAfter2Seconds(20);
            const b = yield this.resolveAfter2Seconds(30);
            return x + a + b;
        });
    }
    resolveAfter2Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 1);
        });
    }
    splitAtributeData(dataString, separator) {
        let data = dataString.split(separator);
        return data;
    }
    showEditForm(item) {
        if (item.atribute) {
            let data = this.splitAtributeData(item.atribute, ";");
            let padre = document.getElementById("shape-edit-container");
            const padreLength = padre.children.length;
            for (let index = 0; index < padreLength; index++) {
                padre.removeChild(padre.firstChild);
            }
            data.forEach(element => {
                let text = this.splitAtributeData(element, ":");
                let namebar = this.createNameLabel(text[0]);
                let valuebar = this.createValueLabel(text[1]);
                padre.appendChild(namebar);
                padre.appendChild(valuebar);
            });
            document.getElementById("uptade-btn").style.display = "block";
            this.temporalShape = item;
        }
        else {
            let padre = document.getElementById("shape-edit-container");
            const padreLength = padre.children.length;
            for (let index = 0; index < padreLength; index++) {
                padre.removeChild(padre.firstChild);
            }
            document.getElementById("uptade-btn").style.display = "none";
        }
        ;
    }
    updateShape(container) {
        let data = "";
        let source = document.getElementById(container);
        const sourcelength = source.children.length;
        for (let index = 0; index < sourcelength; index += 2) {
            let nombreatrib = source.children[index];
            let valoratrib = source.children[index + 1];
            if ((index + 2) !== sourcelength) {
                data = data + nombreatrib.textContent + valoratrib.value + ";";
            }
            else {
                data = data + nombreatrib.textContent + valoratrib.value;
            }
        }
        this.temporalShape.atribute = data;
    }
    createValueLabel(text) {
        let valuebar = document.createElement("textarea");
        valuebar.className = "atributebox";
        valuebar.style.border = "none";
        valuebar.style.resize = "none";
        valuebar.style.marginLeft = "1em";
        valuebar.style.marginBottom = "10px";
        valuebar.style.width = "5em";
        valuebar.style.height = "2.5em";
        valuebar.style.boxSizing = "border-box";
        valuebar.style.borderBottom = "solid var(--lightgreen)";
        valuebar.style.backgroundColor = "var(--darkgray)";
        valuebar.style.color = "var(--white)";
        valuebar.style.fontSize = "small";
        valuebar.style.transition = "all 500ms linear";
        valuebar.style.display = "inline-block";
        valuebar.placeholder = "Valor...";
        valuebar.value = text;
        return valuebar;
    }
    createNameLabel(text) {
        let namebar = document.createElement("p");
        namebar.className = "namebox";
        namebar.style.color = "var(--white)";
        namebar.style.marginLeft = "0.5em";
        namebar.style.paddingTop = "1em";
        namebar.style.width = "4em";
        namebar.style.height = "2.5em";
        namebar.style.fontSize = "smal";
        namebar.style.resize = "none";
        namebar.style.overflow = "hidden";
        namebar.style.display = "inline-block";
        namebar.title = text;
        namebar.style.textAlign = "right";
        namebar.textContent = text + ":";
        return namebar;
    }
    toggleClassView(className) {
        this.toggleValues(className).then(() => {
            this.refreshView(this.imageService.img.name);
        });
    }
    toggleValues(className) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.draswService.clases.forEach(element => {
                if (className.localeCompare(element.name) === 0) {
                    if (element.view) {
                        element.view = false;
                    }
                    else {
                        element.view = true;
                    }
                }
            });
            return;
        });
    }
    refreshView(name) {
        console.log("refresque tags");
        this.draswService.refreshContainer(name).then(() => {
            this.draswService.myInteractive.remove();
            // Establece a element como imagen activa y actualiza el tamaño del canvas
            this.imageService.images.forEach(element => {
                if (element.name.localeCompare(name) === 0) {
                    this.imageService.setImage(element);
                    this.syncFunction(50).then(v => {
                        this.sidebarService.removeGlass();
                        let img = document.getElementById('image');
                        document.getElementById('image-box').style.marginTop = '-' + img.clientHeight.toString() + 'px';
                        this.draswService.myInteractive.height = img.clientHeight;
                        this.sidebarService.magniGlass("image");
                    });
                }
            });
            // Establece a element como imagen compleja activa
            this.imageService.complexImages.forEach(element => {
                if (element.name === name) {
                    this.imageService.setComplex(element);
                }
            });
            this.draswService.myInteractive = new src_assets_source_elements_interactive__WEBPACK_IMPORTED_MODULE_2__["default"]("my-interactive");
            this.draswService.myInteractive.width = 1400;
            let img = document.getElementById('image');
            document.getElementById('image-box').style.marginTop = '-' + img.clientHeight.toString() + 'px';
            this.draswService.myInteractive.height = img.clientHeight;
            // cargar imagenes
            this.draswService.clearActiveShapes();
            // busco la imagen en el container
            let indexA = 0;
            let indexB = 0;
            let found = false;
            this.draswService.shapeContainer.forEach(element => {
                if (!(element.imgName === name)) {
                    indexA++;
                }
                else {
                    indexB = indexA;
                    found = true;
                }
            });
            //Se crean las formas que estn en el cotenedor
            // y que tienen activa su clase
            if (found) {
                this.draswService.shapeContainer[indexB].shapeList.forEach(element => {
                    this.draswService.crearFromData(element);
                });
            }
        });
    }
    // Load clases
    loadCsvClass(files) {
        if (files.length === 0) {
            return;
        }
        const type = files[0].type;
        if (type.localeCompare("application/vnd.ms-excel") != 0) {
            return;
        }
        this.importData(files).then(csvData => {
            this.syncFunction(50).then(v => {
                csvData.forEach(element => {
                    let clase = new _draws_class__WEBPACK_IMPORTED_MODULE_3__["Clase"]();
                    clase.name = element[0];
                    clase.shape = element[1];
                    clase.atribute = element[3];
                    clase.color = element[6];
                    clase.showName = element[7];
                    clase.view = true;
                    if (clase.shape.localeCompare("box") === 0) {
                        clase.width = parseInt(element[4]);
                        clase.height = parseInt(element[5]);
                    }
                    else if (clase.shape.localeCompare("line") === 0) {
                        clase.lines = element[2];
                    }
                    this.draswService.crearClase(clase);
                });
            });
        });
    }
    importData(files) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let csvData = [];
            let counter = 0;
            yield this.papa.parse(files[0], {
                // header true->ignora el header del archivo
                header: false,
                step: function (results) {
                    if (counter != 0) {
                        if (results.data != "") {
                            csvData.push(results.data);
                        }
                    }
                    else
                        counter++;
                }
            });
            return csvData;
        });
    }
    toggleCreate() {
        this.draswService.toggleClassCreation();
    }
    changeActiveUpClass(id) {
        const active = document.getElementById(id);
        const padre = active.parentElement;
        const abuelo = padre.parentElement;
        const hijos = abuelo.getElementsByTagName('div');
        const state = active.style.display;
        for (let index = 0; index < hijos.length; index++) {
            if (hijos[index].className === 'simpleContainer') {
                hijos[index].style.display = 'none';
            }
        }
        if (state === "block") {
            active.style.display = "none";
        }
        else {
            active.style.display = "block";
        }
    }
    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    fillCategories() {
        const id = ["idBase", "idGeo"];
        const nombre = ["Base", "Geotecnia"];
        const upClass = ["base", "geo"];
        //const id=["idBase","idGeo","idLito","idAlt","idMnz"];
        //const nombre=["BaseLine","Geotecnia","Litología","Alteración","Mineralización"];
        //const upClass=["base","geo","lito","alt","mnz"];
        for (let index = 0; index < id.length; index++) {
            const categoria = new _draws_class__WEBPACK_IMPORTED_MODULE_3__["Category"]();
            categoria.id = id[index];
            categoria.nombre = nombre[index];
            categoria.upClass = upClass[index];
            this.categories.push(categoria);
        }
    }
}
DrawsComponent.ɵfac = function DrawsComponent_Factory(t) { return new (t || DrawsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_draws_service__WEBPACK_IMPORTED_MODULE_4__["DrawsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_imagebar_imagebar_service__WEBPACK_IMPORTED_MODULE_5__["ImageAdderService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_sidebar_sidebar_service__WEBPACK_IMPORTED_MODULE_6__["sidebarService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_papaparse__WEBPACK_IMPORTED_MODULE_7__["Papa"])); };
DrawsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: DrawsComponent, selectors: [["app-draws"]], decls: 42, vars: 3, consts: [["rel", "stylesheet", "href", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtrustConstantResourceUrl"]("https://vectorjs.org/library.css")], ["href", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtrustConstantResourceUrl"]("https://fonts.googleapis.com/icon?family=Material+Icons"), "rel", "stylesheet"], [1, "container"], [1, "mainBlock"], [1, "block", 2, "text-align", "right"], [1, "block"], [1, "switch"], ["id", "toggle-class", "type", "checkbox", 3, "click"], [1, "slider", "round"], [1, "block", 2, "text-align", "left"], [1, "class-container"], [4, "ngFor", "ngForOf"], ["id", "shape-selector", 2, "display", "none"], ["id", "boxselector", 1, "active-button", 3, "click"], ["id", "lineselector", 1, "inactive-button", 3, "click"], [2, "display", "block"], ["id", "shape-management", 2, "display", "none"], ["id", "shape-creator", 1, "active-button", 3, "click"], ["id", "class_cretion_container", 1, "class_creation", 2, "display", "none"], [2, "text-align", "center", "overflow", "hidden"], ["id", "atribute_window"], [1, "btn-container", 2, "display", "none"], ["id", "csvClass-input", "accept", ".csv", "type", "file", 1, "image_input", 3, "change"], ["csvClass", ""], ["for", "csvClass-input", "title", "Importa un archivo .csv desde su dispositivo", 2, "margin-left", "1em", "margin-top", "0.5em"], ["class", "classDelete", "id", "classDeleteid", "style", "display: none;", 4, "ngIf"], [2, "display", "none"], ["id", "oriX"], ["id", "oriY"], [3, "click"], [1, "simpleContainer", 2, "display", "none", 3, "id"], [3, "class", 4, "ngIf"], ["type", "checkbox", "checked", "", 1, "eye", 3, "id", "click"], ["for", "c1"], ["type", "radio", "name", "radio", "value", "clase.name", 3, "id", "click"], [1, "class_name"], ["alt", "", 2, "float", "right", "max-height", "1em", "max-width", "1em", 3, "src"], ["id", "classDeleteid", 1, "classDelete", 2, "display", "none"], ["title", "Eliminar clase.", 1, "material-icons", 3, "click"], ["title", "Cancelar eliminaci\u00F3n.", 1, "material-icons", 3, "click"]], template: function DrawsComponent_Template(rf, ctx) { if (rf & 1) {
        const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "link", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "link", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, " Editar ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DrawsComponent_Template_input_click_9_listener() { return ctx.toggleCreate(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "\u00A0\u00A0Crear");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, DrawsComponent_div_16_Template, 5, 3, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DrawsComponent_Template_button_click_18_listener() { return ctx.show1("class-creation", "line-creation", "boxselector", "lineselector"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Box");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DrawsComponent_Template_button_click_20_listener() { return ctx.show1("line-creation", "class-creation", "lineselector", "boxselector"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "Line");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](23, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "button", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DrawsComponent_Template_button_click_25_listener() { return ctx.show1("class_cretion_container", "class-edit-container", "shape-creator", "shape-editor"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "Crear");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "h4", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](30, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "input", 22, 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function DrawsComponent_Template_input_change_32_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r19); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](33); return ctx.loadCsvClass(_r1.files); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "label", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](35, "Importar clases");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](36, DrawsComponent_div_36_Template, 10, 1, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "textarea", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](39, "100");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "textarea", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](41, "100");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.categories);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.draswService.clase.showName);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.show);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"]], styles: ["@font-face{\r\n    font-family: myFont;\r\n    src: url(/src/assets/font/AlrightSans-Medium-v3.otf);\r\n} \r\n  \r\n \r\n  \r\n.title[_ngcontent-%COMP%]{\r\n    font-family: myFont;\r\n    margin-left: 1em;\r\n    color: var(--white);\r\n} \r\n  \r\n.class-container[_ngcontent-%COMP%]{\r\n    margin-left: 1em;\r\n    margin-right: 0.4em;\r\n\r\n} \r\n  \r\n.classContainer[_ngcontent-%COMP%] {\r\n    height: 150px;\r\n    background-color: var(--darkwhite);\r\n    border-color:var(--orange);\r\n    border-radius: 10%;\r\n    border-style: solid;\r\n    max-width: 180px;\r\n    display: block;\r\n    overflow-y: auto;    \r\n    margin-left: 1em;\r\n    margin-bottom: 1em;\r\n} \r\n  \r\nul[_ngcontent-%COMP%] {\r\n    list-style-type: none;\r\n    margin: 0;\r\n    padding: 0;\r\n  } \r\n  \r\n.classContainer[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{\r\n    color: var(--lightblack);    \r\n    font-size: small;\r\n    padding-left: 0px;\r\n    margin-left: 3px;    \r\n    font-family: myFont;\r\n    \r\n} \r\n  \r\n.classContainer[_ngcontent-%COMP%]   .classActive[_ngcontent-%COMP%], .lista[_ngcontent-%COMP%]:hover{\r\n    color: var(--purple);\r\n    font-weight: 800;\r\n    cursor: pointer;    \r\n} \r\n  \r\n.btn[_ngcontent-%COMP%]{\r\n    background-color: var(--lightgreen);    \r\n    padding: 1em;\r\n    border: solid var(--lightgreen);\r\n    border-radius: 4px;\r\n    transition: all 500ms ease;  \r\n    font-family: myFont;\r\n    margin-bottom: 1em;\r\n} \r\n  \r\n.btn[_ngcontent-%COMP%]:hover{\r\n    background-color: var(--green);\r\n    border-color: var(--green);\r\n} \r\n  \r\n.shapecreate[_ngcontent-%COMP%]{\r\n    background-color: var(--lightgreen);    \r\n    padding: .5em;\r\n    border: solid var(--lightgreen);\r\n    border-radius: 4px;\r\n    transition: all 500ms ease;  \r\n    font-family: myFont;\r\n    margin-bottom: 1em;\r\n    width: 70%;\r\n    margin-left: 15%;\r\n} \r\n  \r\n.shapecreate[_ngcontent-%COMP%]:hover{\r\n    background-color: var(--green);\r\n    border-color: var(--green);\r\n} \r\n  \r\n.colorLabel[_ngcontent-%COMP%]{\r\n    font-size: medium;\r\n} \r\n  \r\n.delete[_ngcontent-%COMP%]{\r\n    background-color: var(--lightorange);    \r\n    border: solid var(--lightorange);\r\n} \r\n  \r\n.delete[_ngcontent-%COMP%]:hover{\r\n    background-color: var(--orange);\r\n    border-color: var(--orange);\r\n} \r\n  \r\n.small[_ngcontent-%COMP%]{\r\n    padding: .2em;\r\n} \r\n  \r\n.colorInput[_ngcontent-%COMP%]{\r\n    margin-left: 1em;\r\n    margin-bottom: 5px;\r\n    background-color:white;\r\n    border-style: solid;\r\n    border-radius: 10%;\r\n    border-color: lightgreen;\r\n    transition: all 250ms ease;\r\n    width: 50%;\r\n} \r\n  \r\n.colorInput[_ngcontent-%COMP%]:hover{\r\n    border-color: white;\r\n    cursor: pointer;\r\n} \r\n  \r\n.text[_ngcontent-%COMP%]{\r\n    border: none;\r\n    resize: none;\r\n    margin-left: 1em;\r\n    margin-bottom: 0.5em;\r\n    width: 5ch;\r\n    height: 4ch;\r\n    box-sizing: border-box;\r\n    font-size: small;\r\n    border-bottom: solid var(--lightgreen);\r\n    background-color: var(--darkgray);\r\n    color: var(--white);\r\n    transition: all 500ms linear;\r\n\r\n\r\n} \r\n  \r\n.text[_ngcontent-%COMP%]:hover{\r\n    background-color: var(--gray);\r\n} \r\n  \r\n.text[_ngcontent-%COMP%]:focus{\r\n    border: none;\r\n    border-bottom: solid var(--green);\r\n} \r\n  \r\n.name[_ngcontent-%COMP%]{\r\n    border: none;\r\n    resize: none;\r\n    width: 15ch;\r\n    height: 4ch;\r\n    margin-left: 1em;\r\n    box-sizing: border-box;\r\n    border-bottom: solid var(--lightgreen);\r\n    background-color: var(--darkgray);\r\n    color: var(--white);\r\n    transition: all 500ms linear;\r\n\r\n} \r\n  \r\n.name[_ngcontent-%COMP%]:hover{\r\n    background-color: var(--gray);\r\n} \r\n  \r\n.name[_ngcontent-%COMP%]:focus{\r\n    border: none;\r\n    border-bottom: solid var(--green);\r\n} \r\n  \r\n.nameLabel[_ngcontent-%COMP%]{\r\n    font-size: medium;\r\n} \r\n  \r\nlabel[_ngcontent-%COMP%]{\r\n    margin-left: 5px;\r\n} \r\n  \r\na[_ngcontent-%COMP%]{\r\n    position: absolute;\r\n} \r\n  \r\n \r\n  \r\n.material-icons[_ngcontent-%COMP%]{\r\n    background-color: var(--lightgreen);    \r\n    border: solid var(--lightgreen);\r\n    border-radius: 4px;\r\n    transition: all 500ms ease;  \r\n    margin-bottom: 1em;\r\n} \r\n  \r\n.material-icons[_ngcontent-%COMP%]:nth-child(1):hover{\r\n    background-color: var(--green);    \r\n    border: solid var(--green);\r\n} \r\n  \r\n.material-icons[_ngcontent-%COMP%]:nth-child(2):hover{\r\n    background-color: var(--orange);\r\n        \r\n    border: solid var(--orange);\r\n} \r\n  \r\n.alert[_ngcontent-%COMP%]{\r\n    width: auto;\r\n    height: auto;\r\n    border-radius: 15px;\r\n    border-style: solid;\r\n    border-color: white;\r\n    border-width: 2px;\r\n    background-color: red;\r\n    color: white;\r\n    margin: 5px;\r\n    padding: 5px;\r\n    font-size: small;\r\n} \r\n  \r\n.closebtn[_ngcontent-%COMP%] {\r\n    margin-left: 1em;\r\n    color: white;\r\n    font-weight: bold;\r\n    \r\n    font-size: 22px;\r\n    line-height: 20px;\r\n    cursor: pointer;\r\n    transition: 0.3s;\r\n  } \r\n  \r\n.closebtn[_ngcontent-%COMP%]:hover {\r\n    color: black;\r\n  } \r\n  \r\n.classDelete[_ngcontent-%COMP%]{      \r\n    width: auto;\r\n    height: auto;\r\n    border-radius: 15px;\r\n    border-style: solid;\r\n    border-color: var(--darkwhite);\r\n    border-width: 2px;\r\n    background-color: var(--lightorange);\r\n    color: var(--black);\r\n    padding: 5px;\r\n    margin: 5px;\r\n  } \r\n  \r\n.radio-inline[_ngcontent-%COMP%]{\r\n      margin-left: 1em;\r\n\r\n  } \r\n  \r\n.class_creation[_ngcontent-%COMP%]{\r\n    margin-left: 1em;\r\n    width: 80%;\r\n    border: solid var(--green);\r\n    background-color: var(--darkgray);\r\n    margin-bottom: 1em;\r\n    color: var(--white);\r\n    max-height: 20em;\r\n    overflow: auto;\r\n  } \r\n  \r\n.atribute[_ngcontent-%COMP%]:nth-child(1){    \r\n    margin-left: .5em;\r\n    margin-top: .1em;\r\n  } \r\n  \r\n.atribute[_ngcontent-%COMP%]:nth-child(2){    \r\n    margin-left: .5em;\r\n    margin-top: .1em;\r\n  } \r\n  \r\n.atributebox[_ngcontent-%COMP%]{\r\n    border: none;\r\n    resize: none;\r\n    margin-left: 1em;\r\n    margin-bottom: 10px;\r\n    width: 5em;\r\n    height: 2.5em;\r\n    box-sizing: border-box;  \r\n     border-bottom: solid var(--lightgreen);\r\n    background-color: var(--darkgray);\r\n    color: var(--white);\r\n    transition: all 500ms linear;\r\n\r\n} \r\n  \r\n.namebox[_ngcontent-%COMP%]{\r\n    border: none;\r\n    resize: none;\r\n    margin-left: 1em;\r\n    margin-bottom: 10px;\r\n    width: 5em;\r\n    height: 2.5em;    \r\n    font-size: small;\r\n    border-bottom: solid var(--lightgreen);\r\n    background-color: var(--darkgray);\r\n    color: var(--white);\r\n    transition: all 500ms linear;\r\n    \r\n} \r\n  \r\n.atributebox[_ngcontent-%COMP%]:hover{\r\n    border-color: green;\r\n} \r\n  \r\n.atributebox[_ngcontent-%COMP%]:focus{\r\n    border-color: green;\r\n} \r\n  \r\n.pointInput[_ngcontent-%COMP%]{\r\n    \r\n    border: none;\r\n    resize: none;\r\n    border-bottom: solid var(--lightgreen);\r\n    background-color: var(--darkgray);\r\n    \r\n    margin-left: 1em;\r\n    margin-bottom: 10px;\r\n    width: 3em;\r\n} \r\n  \r\n.pointInput[_ngcontent-%COMP%]:hover{\r\n    cursor:default;\r\n} \r\n  \r\n.btn-container[_ngcontent-%COMP%]{\r\n    margin-left: 1em;\r\n} \r\n  \r\n \r\n  \r\n.box[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\r\nbackground-color:var(--gray);\r\ncolor: var(--black);\r\npadding: 12px;\r\nwidth: 3.5em;\r\nfont-family: myFont;\r\nbox-shadow: var(--purple);\r\noutline: none;\r\nmargin-left: 30%;\r\nmargin-top: 1em;\r\nmargin-bottom: 1em;\r\nborder-radius: 4px;\r\ncursor: pointer;\r\nborder: none;\r\n} \r\n  \r\n.box[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:hover {\r\n    background-color: var(--orange);\r\n} \r\n  \r\n.image_input[_ngcontent-%COMP%]{\r\n    width: 0.1px;\r\n\theight: 0.1px;\r\n\topacity: 0;\r\n\toverflow: hidden;\r\n\tposition: absolute;\r\n\tz-index: -1;\r\n} \r\n  \r\n.image_input[_ngcontent-%COMP%] + label[_ngcontent-%COMP%]{\r\n    background-color: var(--lightgreen);    \r\n    \r\n    padding: 1em;\r\n    border: solid var(--lightgreen);\r\n    border-radius: 4px;\r\n    transition: all 500ms ease;  \r\n    font-family: myFont;\r\n} \r\n  \r\n.image_input[_ngcontent-%COMP%]    + label[_ngcontent-%COMP%]:hover {\r\n    background-color: var(--green);\r\n    border-color: var(--green);\r\n    cursor: pointer;\r\n} \r\n  \r\n.mainBlock[_ngcontent-%COMP%], .block[_ngcontent-%COMP%] {\r\n    box-sizing:        border-box;\r\n} \r\n  \r\n.mainBlock[_ngcontent-%COMP%]{\r\n    width: 100%;\r\n    height: 2em;\r\n} \r\n  \r\n.block[_ngcontent-%COMP%]{\r\n    height: 2em;\r\n    width: 31%;\r\n    max-width: 31%;\r\n    float: left;\r\n    margin: 0 1% 0 1%; \r\n    font-family: myFont;\r\n    color: var(--white);\r\n} \r\n  \r\n.switch[_ngcontent-%COMP%] {\r\n    position: relative;\r\n    width: 4em;\r\n    height: 2em;\r\n  } \r\n  \r\n.switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { \r\n    opacity: 0;\r\n    width: 0;\r\n    height: 0;\r\n  } \r\n  \r\n.slider[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    cursor: pointer;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    background-color: var(--lightgray);\r\n    transition: .4s;\r\n  } \r\n  \r\n.slider[_ngcontent-%COMP%]:before {\r\n    position: absolute;\r\n    content: \"\";\r\n    height: 2em;\r\n    width: 2em;\r\n    background-color: var(--white);\r\n    transition: .4s;\r\n  } \r\n  \r\ninput[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%] {\r\n    background-color: var(--green);\r\n  } \r\n  \r\ninput[_ngcontent-%COMP%]:focus    + .slider[_ngcontent-%COMP%] {\r\n    box-shadow: 0 0 1px var(--green);\r\n  } \r\n  \r\ninput[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%]:before {\r\n    transform: translateX(2em);\r\n  } \r\n  \r\n \r\n  \r\n.slider.round[_ngcontent-%COMP%] {\r\n    border-radius: 34px;\r\n  } \r\n  \r\n.slider.round[_ngcontent-%COMP%]:before {\r\n    border-radius: 50%;\r\n  } \r\n  \r\nh5[_ngcontent-%COMP%] {\r\n    margin-left: -0.5em;\r\n    text-decoration: none;\r\n    font-size: 20px;\r\n    color: var(--lightgray);\r\n    display: block;\r\n    cursor: pointer;    \r\n    font-family:myFontMedium;\r\n    transition: linear 250ms;\r\n    max-width: -webkit-fit-content;\r\n    max-width: -moz-fit-content;\r\n    max-width: fit-content;\r\n} \r\n  \r\nh5[_ngcontent-%COMP%]:hover {\r\n    color: var(--darkgray);\r\n    background-color: var(--gray);\r\n} \r\n  \r\nh4[_ngcontent-%COMP%] {\r\n    font-size: 1em;\r\n} \r\n  \r\n.class_name[_ngcontent-%COMP%]{\r\n    font-size:0.7em;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYXdzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxtQkFBbUI7SUFDbkIsb0RBQW9EO0FBQ3hEOztBQUVBLGNBQWM7O0FBRWQ7SUFDSSxtQkFBbUI7SUFDbkIsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtBQUN2Qjs7QUFDQTtJQUNJLGdCQUFnQjtJQUNoQixtQkFBbUI7O0FBRXZCOztBQUNBO0lBQ0ksYUFBYTtJQUNiLGtDQUFrQztJQUNsQywwQkFBMEI7SUFDMUIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsa0JBQWtCO0FBQ3RCOztBQUNBO0lBQ0kscUJBQXFCO0lBQ3JCLFNBQVM7SUFDVCxVQUFVO0VBQ1o7O0FBRUY7SUFDSSx3QkFBd0I7SUFDeEIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIsbUJBQW1COztBQUV2Qjs7QUFFQTtJQUNJLG9CQUFvQjtJQUNwQixnQkFBZ0I7SUFDaEIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLG1DQUFtQztJQUNuQyxZQUFZO0lBQ1osK0JBQStCO0lBQy9CLGtCQUFrQjtJQUNsQiwwQkFBMEI7SUFDMUIsbUJBQW1CO0lBQ25CLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLDhCQUE4QjtJQUM5QiwwQkFBMEI7QUFDOUI7O0FBRUE7SUFDSSxtQ0FBbUM7SUFDbkMsYUFBYTtJQUNiLCtCQUErQjtJQUMvQixrQkFBa0I7SUFDbEIsMEJBQTBCO0lBQzFCLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLDhCQUE4QjtJQUM5QiwwQkFBMEI7QUFDOUI7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxvQ0FBb0M7SUFDcEMsZ0NBQWdDO0FBQ3BDOztBQUNBO0lBQ0ksK0JBQStCO0lBQy9CLDJCQUEyQjtBQUMvQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBR0E7SUFDSSxnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLHdCQUF3QjtJQUN4QiwwQkFBMEI7SUFDMUIsVUFBVTtBQUNkOztBQUNBO0lBQ0ksbUJBQW1CO0lBQ25CLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIsVUFBVTtJQUNWLFdBQVc7SUFDWCxzQkFBc0I7SUFDdEIsZ0JBQWdCO0lBQ2hCLHNDQUFzQztJQUN0QyxpQ0FBaUM7SUFDakMsbUJBQW1CO0lBQ25CLDRCQUE0Qjs7O0FBR2hDOztBQUNBO0lBQ0ksNkJBQTZCO0FBQ2pDOztBQUNBO0lBQ0ksWUFBWTtJQUNaLGlDQUFpQztBQUNyQzs7QUFDQTtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1osV0FBVztJQUNYLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsc0JBQXNCO0lBQ3RCLHNDQUFzQztJQUN0QyxpQ0FBaUM7SUFDakMsbUJBQW1CO0lBQ25CLDRCQUE0Qjs7QUFFaEM7O0FBQ0E7SUFDSSw2QkFBNkI7QUFDakM7O0FBQ0E7SUFDSSxZQUFZO0lBQ1osaUNBQWlDO0FBQ3JDOztBQUNBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUNBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUNBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUNBLGtCQUFrQjs7QUFFbEI7SUFDSSxtQ0FBbUM7SUFDbkMsK0JBQStCO0lBQy9CLGtCQUFrQjtJQUNsQiwwQkFBMEI7SUFDMUIsa0JBQWtCO0FBQ3RCOztBQUNBO0lBQ0ksOEJBQThCO0lBQzlCLDBCQUEwQjtBQUM5Qjs7QUFDQTtJQUNJLCtCQUErQjs7SUFFL0IsMkJBQTJCO0FBQy9COztBQUNBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIscUJBQXFCO0lBQ3JCLFlBQVk7SUFDWixXQUFXO0lBQ1gsWUFBWTtJQUNaLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixnQkFBZ0I7RUFDbEI7O0FBRUE7SUFDRSxZQUFZO0VBQ2Q7O0FBQ0E7SUFDRSxXQUFXO0lBQ1gsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsOEJBQThCO0lBQzlCLGlCQUFpQjtJQUNqQixvQ0FBb0M7SUFDcEMsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixXQUFXO0VBQ2I7O0FBRUE7TUFDSSxnQkFBZ0I7O0VBRXBCOztBQUlBO0lBQ0UsZ0JBQWdCO0lBQ2hCLFVBQVU7SUFDViwwQkFBMEI7SUFDMUIsaUNBQWlDO0lBQ2pDLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsZ0JBQWdCO0lBQ2hCLGNBQWM7RUFDaEI7O0FBRUE7SUFDRSxpQkFBaUI7SUFDakIsZ0JBQWdCO0VBQ2xCOztBQUNBO0lBQ0UsaUJBQWlCO0lBQ2pCLGdCQUFnQjtFQUNsQjs7QUFFQTtJQUNFLFlBQVk7SUFDWixZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixVQUFVO0lBQ1YsYUFBYTtJQUNiLHNCQUFzQjtLQUNyQixzQ0FBc0M7SUFDdkMsaUNBQWlDO0lBQ2pDLG1CQUFtQjtJQUNuQiw0QkFBNEI7O0FBRWhDOztBQUVBO0lBQ0ksWUFBWTtJQUNaLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLFVBQVU7SUFDVixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLHNDQUFzQztJQUN0QyxpQ0FBaUM7SUFDakMsbUJBQW1CO0lBQ25CLDRCQUE0Qjs7QUFFaEM7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7O0lBRUksWUFBWTtJQUNaLFlBQVk7SUFDWixzQ0FBc0M7SUFDdEMsaUNBQWlDOztJQUVqQyxnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBR0E7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUEsbUJBQW1COztBQUduQjtBQUNBLDRCQUE0QjtBQUM1QixtQkFBbUI7QUFDbkIsYUFBYTtBQUNiLFlBQVk7QUFDWixtQkFBbUI7QUFDbkIseUJBQXlCO0FBQ3pCLGFBQWE7QUFDYixnQkFBZ0I7QUFDaEIsZUFBZTtBQUNmLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsZUFBZTtBQUNmLFlBQVk7QUFDWjs7QUFFQTtJQUNJLCtCQUErQjtBQUNuQzs7QUFFQTtJQUNJLFlBQVk7Q0FDZixhQUFhO0NBQ2IsVUFBVTtDQUNWLGdCQUFnQjtDQUNoQixrQkFBa0I7Q0FDbEIsV0FBVztBQUNaOztBQUVBO0lBQ0ksbUNBQW1DO0lBQ25DLHdCQUF3QjtJQUN4QixZQUFZO0lBQ1osK0JBQStCO0lBQy9CLGtCQUFrQjtJQUNsQiwwQkFBMEI7SUFDMUIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksOEJBQThCO0lBQzlCLDBCQUEwQjtJQUMxQixlQUFlO0FBQ25COztBQUNBO0lBR0ksNkJBQTZCO0FBQ2pDOztBQUNBO0lBQ0ksV0FBVztJQUNYLFdBQVc7QUFDZjs7QUFDQTtJQUNJLFdBQVc7SUFDWCxVQUFVO0lBQ1YsY0FBYztJQUNkLFdBQVc7SUFDWCxpQkFBaUI7SUFDakIsbUJBQW1CO0lBQ25CLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsV0FBVztFQUNiOztBQUVBO0lBQ0UsVUFBVTtJQUNWLFFBQVE7SUFDUixTQUFTO0VBQ1g7O0FBRUE7SUFDRSxrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLE1BQU07SUFDTixPQUFPO0lBQ1AsUUFBUTtJQUNSLFNBQVM7SUFDVCxrQ0FBa0M7SUFFbEMsZUFBZTtFQUNqQjs7QUFFQTtJQUNFLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsV0FBVztJQUNYLFVBQVU7SUFDViw4QkFBOEI7SUFFOUIsZUFBZTtFQUNqQjs7QUFFQTtJQUNFLDhCQUE4QjtFQUNoQzs7QUFFQTtJQUNFLGdDQUFnQztFQUNsQzs7QUFFQTtJQUdFLDBCQUEwQjtFQUM1Qjs7QUFFQSxvQkFBb0I7O0FBQ3BCO0lBQ0UsbUJBQW1CO0VBQ3JCOztBQUVBO0lBQ0Usa0JBQWtCO0VBQ3BCOztBQUVBO0lBQ0UsbUJBQW1CO0lBQ25CLHFCQUFxQjtJQUNyQixlQUFlO0lBQ2YsdUJBQXVCO0lBQ3ZCLGNBQWM7SUFDZCxlQUFlO0lBQ2Ysd0JBQXdCO0lBQ3hCLHdCQUF3QjtJQUN4Qiw4QkFBc0I7SUFBdEIsMkJBQXNCO0lBQXRCLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0Qiw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQiIsImZpbGUiOiJkcmF3cy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGZvbnQtZmFjZXtcclxuICAgIGZvbnQtZmFtaWx5OiBteUZvbnQ7XHJcbiAgICBzcmM6IHVybCgvc3JjL2Fzc2V0cy9mb250L0FscmlnaHRTYW5zLU1lZGl1bS12My5vdGYpO1xyXG59IFxyXG4gIFxyXG4vKiBteSBjc3MgLT4gKi9cclxuXHJcbi50aXRsZXtcclxuICAgIGZvbnQtZmFtaWx5OiBteUZvbnQ7XHJcbiAgICBtYXJnaW4tbGVmdDogMWVtO1xyXG4gICAgY29sb3I6IHZhcigtLXdoaXRlKTtcclxufVxyXG4uY2xhc3MtY29udGFpbmVye1xyXG4gICAgbWFyZ2luLWxlZnQ6IDFlbTtcclxuICAgIG1hcmdpbi1yaWdodDogMC40ZW07XHJcblxyXG59XHJcbi5jbGFzc0NvbnRhaW5lciB7XHJcbiAgICBoZWlnaHQ6IDE1MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFya3doaXRlKTtcclxuICAgIGJvcmRlci1jb2xvcjp2YXIoLS1vcmFuZ2UpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTAlO1xyXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICAgIG1heC13aWR0aDogMTgwcHg7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG92ZXJmbG93LXk6IGF1dG87ICAgIFxyXG4gICAgbWFyZ2luLWxlZnQ6IDFlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcclxufVxyXG51bCB7XHJcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gIH1cclxuXHJcbi5jbGFzc0NvbnRhaW5lciBsaXtcclxuICAgIGNvbG9yOiB2YXIoLS1saWdodGJsYWNrKTsgICAgXHJcbiAgICBmb250LXNpemU6IHNtYWxsO1xyXG4gICAgcGFkZGluZy1sZWZ0OiAwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogM3B4OyAgICBcclxuICAgIGZvbnQtZmFtaWx5OiBteUZvbnQ7XHJcbiAgICBcclxufVxyXG5cclxuLmNsYXNzQ29udGFpbmVyIC5jbGFzc0FjdGl2ZSwgLmxpc3RhOmhvdmVye1xyXG4gICAgY29sb3I6IHZhcigtLXB1cnBsZSk7XHJcbiAgICBmb250LXdlaWdodDogODAwO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyOyAgICBcclxufVxyXG5cclxuLmJ0bntcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0Z3JlZW4pOyAgICBcclxuICAgIHBhZGRpbmc6IDFlbTtcclxuICAgIGJvcmRlcjogc29saWQgdmFyKC0tbGlnaHRncmVlbik7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgNTAwbXMgZWFzZTsgIFxyXG4gICAgZm9udC1mYW1pbHk6IG15Rm9udDtcclxuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcclxufVxyXG5cclxuLmJ0bjpob3ZlcntcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyZWVuKTtcclxuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tZ3JlZW4pO1xyXG59XHJcblxyXG4uc2hhcGVjcmVhdGV7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodGdyZWVuKTsgICAgXHJcbiAgICBwYWRkaW5nOiAuNWVtO1xyXG4gICAgYm9yZGVyOiBzb2xpZCB2YXIoLS1saWdodGdyZWVuKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIHRyYW5zaXRpb246IGFsbCA1MDBtcyBlYXNlOyAgXHJcbiAgICBmb250LWZhbWlseTogbXlGb250O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMWVtO1xyXG4gICAgd2lkdGg6IDcwJTtcclxuICAgIG1hcmdpbi1sZWZ0OiAxNSU7XHJcbn1cclxuXHJcbi5zaGFwZWNyZWF0ZTpob3ZlcntcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyZWVuKTtcclxuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tZ3JlZW4pO1xyXG59XHJcblxyXG4uY29sb3JMYWJlbHtcclxuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xyXG59XHJcblxyXG4uZGVsZXRle1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHRvcmFuZ2UpOyAgICBcclxuICAgIGJvcmRlcjogc29saWQgdmFyKC0tbGlnaHRvcmFuZ2UpO1xyXG59XHJcbi5kZWxldGU6aG92ZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1vcmFuZ2UpO1xyXG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1vcmFuZ2UpO1xyXG59XHJcblxyXG4uc21hbGx7XHJcbiAgICBwYWRkaW5nOiAuMmVtO1xyXG59XHJcblxyXG5cclxuLmNvbG9ySW5wdXR7XHJcbiAgICBtYXJnaW4tbGVmdDogMWVtO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjp3aGl0ZTtcclxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMCU7XHJcbiAgICBib3JkZXItY29sb3I6IGxpZ2h0Z3JlZW47XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMjUwbXMgZWFzZTtcclxuICAgIHdpZHRoOiA1MCU7XHJcbn1cclxuLmNvbG9ySW5wdXQ6aG92ZXJ7XHJcbiAgICBib3JkZXItY29sb3I6IHdoaXRlO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4udGV4dHtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIHJlc2l6ZTogbm9uZTtcclxuICAgIG1hcmdpbi1sZWZ0OiAxZW07XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwLjVlbTtcclxuICAgIHdpZHRoOiA1Y2g7XHJcbiAgICBoZWlnaHQ6IDRjaDtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICBmb250LXNpemU6IHNtYWxsO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogc29saWQgdmFyKC0tbGlnaHRncmVlbik7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrZ3JheSk7XHJcbiAgICBjb2xvcjogdmFyKC0td2hpdGUpO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDUwMG1zIGxpbmVhcjtcclxuXHJcblxyXG59XHJcbi50ZXh0OmhvdmVye1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JheSk7XHJcbn1cclxuLnRleHQ6Zm9jdXN7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiBzb2xpZCB2YXIoLS1ncmVlbik7XHJcbn1cclxuLm5hbWV7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICByZXNpemU6IG5vbmU7XHJcbiAgICB3aWR0aDogMTVjaDtcclxuICAgIGhlaWdodDogNGNoO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDFlbTtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICBib3JkZXItYm90dG9tOiBzb2xpZCB2YXIoLS1saWdodGdyZWVuKTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmtncmF5KTtcclxuICAgIGNvbG9yOiB2YXIoLS13aGl0ZSk7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgNTAwbXMgbGluZWFyO1xyXG5cclxufVxyXG4ubmFtZTpob3ZlcntcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyYXkpO1xyXG59XHJcbi5uYW1lOmZvY3Vze1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogc29saWQgdmFyKC0tZ3JlZW4pO1xyXG59XHJcbi5uYW1lTGFiZWx7XHJcbiAgICBmb250LXNpemU6IG1lZGl1bTtcclxufVxyXG5sYWJlbHtcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbn1cclxuYXtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxufVxyXG4vKiBjbGFzcyBzZWN0aW9uICovXHJcblxyXG4ubWF0ZXJpYWwtaWNvbnN7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodGdyZWVuKTsgICAgXHJcbiAgICBib3JkZXI6IHNvbGlkIHZhcigtLWxpZ2h0Z3JlZW4pO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDUwMG1zIGVhc2U7ICBcclxuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcclxufVxyXG4ubWF0ZXJpYWwtaWNvbnM6bnRoLWNoaWxkKDEpOmhvdmVye1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JlZW4pOyAgICBcclxuICAgIGJvcmRlcjogc29saWQgdmFyKC0tZ3JlZW4pO1xyXG59XHJcbi5tYXRlcmlhbC1pY29uczpudGgtY2hpbGQoMik6aG92ZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1vcmFuZ2UpO1xyXG4gICAgICAgIFxyXG4gICAgYm9yZGVyOiBzb2xpZCB2YXIoLS1vcmFuZ2UpO1xyXG59XHJcbi5hbGVydHtcclxuICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTVweDtcclxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgICBib3JkZXItY29sb3I6IHdoaXRlO1xyXG4gICAgYm9yZGVyLXdpZHRoOiAycHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBtYXJnaW46IDVweDtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbn1cclxuXHJcbi5jbG9zZWJ0biB7XHJcbiAgICBtYXJnaW4tbGVmdDogMWVtO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAvKiBmbG9hdDogcmlnaHQ7ICovXHJcbiAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICBsaW5lLWhlaWdodDogMjBweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHRyYW5zaXRpb246IDAuM3M7XHJcbiAgfVxyXG4gIFxyXG4gIC5jbG9zZWJ0bjpob3ZlciB7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgfVxyXG4gIC5jbGFzc0RlbGV0ZXsgICAgICBcclxuICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTVweDtcclxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWRhcmt3aGl0ZSk7XHJcbiAgICBib3JkZXItd2lkdGg6IDJweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0b3JhbmdlKTtcclxuICAgIGNvbG9yOiB2YXIoLS1ibGFjayk7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBtYXJnaW46IDVweDtcclxuICB9XHJcblxyXG4gIC5yYWRpby1pbmxpbmV7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAxZW07XHJcblxyXG4gIH1cclxuXHJcblxyXG5cclxuICAuY2xhc3NfY3JlYXRpb257XHJcbiAgICBtYXJnaW4tbGVmdDogMWVtO1xyXG4gICAgd2lkdGg6IDgwJTtcclxuICAgIGJvcmRlcjogc29saWQgdmFyKC0tZ3JlZW4pO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFya2dyYXkpO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMWVtO1xyXG4gICAgY29sb3I6IHZhcigtLXdoaXRlKTtcclxuICAgIG1heC1oZWlnaHQ6IDIwZW07XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuICB9XHJcblxyXG4gIC5hdHJpYnV0ZTpudGgtY2hpbGQoMSl7ICAgIFxyXG4gICAgbWFyZ2luLWxlZnQ6IC41ZW07XHJcbiAgICBtYXJnaW4tdG9wOiAuMWVtO1xyXG4gIH1cclxuICAuYXRyaWJ1dGU6bnRoLWNoaWxkKDIpeyAgICBcclxuICAgIG1hcmdpbi1sZWZ0OiAuNWVtO1xyXG4gICAgbWFyZ2luLXRvcDogLjFlbTtcclxuICB9XHJcblxyXG4gIC5hdHJpYnV0ZWJveHtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIHJlc2l6ZTogbm9uZTtcclxuICAgIG1hcmdpbi1sZWZ0OiAxZW07XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgd2lkdGg6IDVlbTtcclxuICAgIGhlaWdodDogMi41ZW07XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAgXHJcbiAgICAgYm9yZGVyLWJvdHRvbTogc29saWQgdmFyKC0tbGlnaHRncmVlbik7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrZ3JheSk7XHJcbiAgICBjb2xvcjogdmFyKC0td2hpdGUpO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDUwMG1zIGxpbmVhcjtcclxuXHJcbn1cclxuXHJcbi5uYW1lYm94e1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgcmVzaXplOiBub25lO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDFlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICB3aWR0aDogNWVtO1xyXG4gICAgaGVpZ2h0OiAyLjVlbTsgICAgXHJcbiAgICBmb250LXNpemU6IHNtYWxsO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogc29saWQgdmFyKC0tbGlnaHRncmVlbik7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrZ3JheSk7XHJcbiAgICBjb2xvcjogdmFyKC0td2hpdGUpO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDUwMG1zIGxpbmVhcjtcclxuICAgIFxyXG59XHJcblxyXG4uYXRyaWJ1dGVib3g6aG92ZXJ7XHJcbiAgICBib3JkZXItY29sb3I6IGdyZWVuO1xyXG59XHJcblxyXG4uYXRyaWJ1dGVib3g6Zm9jdXN7XHJcbiAgICBib3JkZXItY29sb3I6IGdyZWVuO1xyXG59XHJcblxyXG4ucG9pbnRJbnB1dHtcclxuICAgIFxyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgcmVzaXplOiBub25lO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogc29saWQgdmFyKC0tbGlnaHRncmVlbik7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrZ3JheSk7XHJcbiAgICBcclxuICAgIG1hcmdpbi1sZWZ0OiAxZW07XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgd2lkdGg6IDNlbTtcclxufVxyXG5cclxuLnBvaW50SW5wdXQ6aG92ZXJ7XHJcbiAgICBjdXJzb3I6ZGVmYXVsdDtcclxufVxyXG5cclxuXHJcbi5idG4tY29udGFpbmVye1xyXG4gICAgbWFyZ2luLWxlZnQ6IDFlbTtcclxufVxyXG5cclxuLyogRHJvcGRvd24gU3R5bGUgKi9cclxuXHJcblxyXG4uYm94IHNlbGVjdCB7XHJcbmJhY2tncm91bmQtY29sb3I6dmFyKC0tZ3JheSk7XHJcbmNvbG9yOiB2YXIoLS1ibGFjayk7XHJcbnBhZGRpbmc6IDEycHg7XHJcbndpZHRoOiAzLjVlbTtcclxuZm9udC1mYW1pbHk6IG15Rm9udDtcclxuYm94LXNoYWRvdzogdmFyKC0tcHVycGxlKTtcclxub3V0bGluZTogbm9uZTtcclxubWFyZ2luLWxlZnQ6IDMwJTtcclxubWFyZ2luLXRvcDogMWVtO1xyXG5tYXJnaW4tYm90dG9tOiAxZW07XHJcbmJvcmRlci1yYWRpdXM6IDRweDtcclxuY3Vyc29yOiBwb2ludGVyO1xyXG5ib3JkZXI6IG5vbmU7XHJcbn1cclxuXHJcbi5ib3ggc2VsZWN0OmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW9yYW5nZSk7XHJcbn1cclxuXHJcbi5pbWFnZV9pbnB1dHtcclxuICAgIHdpZHRoOiAwLjFweDtcclxuXHRoZWlnaHQ6IDAuMXB4O1xyXG5cdG9wYWNpdHk6IDA7XHJcblx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0ei1pbmRleDogLTE7XHJcbn1cclxuXHJcbi5pbWFnZV9pbnB1dCtsYWJlbHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0Z3JlZW4pOyAgICBcclxuICAgIC8qIGJvcmRlci1yYWRpdXM6IDFlbTsgKi9cclxuICAgIHBhZGRpbmc6IDFlbTtcclxuICAgIGJvcmRlcjogc29saWQgdmFyKC0tbGlnaHRncmVlbik7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgNTAwbXMgZWFzZTsgIFxyXG4gICAgZm9udC1mYW1pbHk6IG15Rm9udDtcclxufVxyXG5cclxuLmltYWdlX2lucHV0ICsgbGFiZWw6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JlZW4pO1xyXG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1ncmVlbik7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuLm1haW5CbG9jaywgLmJsb2NrIHtcclxuICAgIC1tb3otYm94LXNpemluZzogICAgYm9yZGVyLWJveDtcclxuICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIGJveC1zaXppbmc6ICAgICAgICBib3JkZXItYm94O1xyXG59XHJcbi5tYWluQmxvY2t7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMmVtO1xyXG59XHJcbi5ibG9ja3tcclxuICAgIGhlaWdodDogMmVtO1xyXG4gICAgd2lkdGg6IDMxJTtcclxuICAgIG1heC13aWR0aDogMzElO1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICBtYXJnaW46IDAgMSUgMCAxJTsgXHJcbiAgICBmb250LWZhbWlseTogbXlGb250O1xyXG4gICAgY29sb3I6IHZhcigtLXdoaXRlKTtcclxufVxyXG5cclxuLnN3aXRjaCB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB3aWR0aDogNGVtO1xyXG4gICAgaGVpZ2h0OiAyZW07XHJcbiAgfVxyXG4gIFxyXG4gIC5zd2l0Y2ggaW5wdXQgeyBcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgICB3aWR0aDogMDtcclxuICAgIGhlaWdodDogMDtcclxuICB9XHJcbiAgXHJcbiAgLnNsaWRlciB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodGdyYXkpO1xyXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiAuNHM7XHJcbiAgICB0cmFuc2l0aW9uOiAuNHM7XHJcbiAgfVxyXG4gIFxyXG4gIC5zbGlkZXI6YmVmb3JlIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGNvbnRlbnQ6IFwiXCI7XHJcbiAgICBoZWlnaHQ6IDJlbTtcclxuICAgIHdpZHRoOiAyZW07XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13aGl0ZSk7XHJcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IC40cztcclxuICAgIHRyYW5zaXRpb246IC40cztcclxuICB9XHJcbiAgXHJcbiAgaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JlZW4pO1xyXG4gIH1cclxuICBcclxuICBpbnB1dDpmb2N1cyArIC5zbGlkZXIge1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDFweCB2YXIoLS1ncmVlbik7XHJcbiAgfVxyXG4gIFxyXG4gIGlucHV0OmNoZWNrZWQgKyAuc2xpZGVyOmJlZm9yZSB7XHJcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgyZW0pO1xyXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgyZW0pO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDJlbSk7XHJcbiAgfVxyXG4gIFxyXG4gIC8qIFJvdW5kZWQgc2xpZGVycyAqL1xyXG4gIC5zbGlkZXIucm91bmQge1xyXG4gICAgYm9yZGVyLXJhZGl1czogMzRweDtcclxuICB9XHJcbiAgXHJcbiAgLnNsaWRlci5yb3VuZDpiZWZvcmUge1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIH1cclxuXHJcbiAgaDUge1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0wLjVlbTtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIGNvbG9yOiB2YXIoLS1saWdodGdyYXkpO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7ICAgIFxyXG4gICAgZm9udC1mYW1pbHk6bXlGb250TWVkaXVtO1xyXG4gICAgdHJhbnNpdGlvbjogbGluZWFyIDI1MG1zO1xyXG4gICAgbWF4LXdpZHRoOiBmaXQtY29udGVudDtcclxufVxyXG5cclxuaDU6aG92ZXIge1xyXG4gICAgY29sb3I6IHZhcigtLWRhcmtncmF5KTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyYXkpO1xyXG59XHJcblxyXG5oNCB7XHJcbiAgICBmb250LXNpemU6IDFlbTtcclxufVxyXG5cclxuLmNsYXNzX25hbWV7XHJcbiAgICBmb250LXNpemU6MC43ZW07XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](DrawsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-draws',
                templateUrl: './draws.component.html',
                styleUrls: ['./draws.component.css']
            }]
    }], function () { return [{ type: _draws_service__WEBPACK_IMPORTED_MODULE_4__["DrawsService"] }, { type: _imagebar_imagebar_service__WEBPACK_IMPORTED_MODULE_5__["ImageAdderService"] }, { type: _sidebar_sidebar_service__WEBPACK_IMPORTED_MODULE_6__["sidebarService"] }, { type: ngx_papaparse__WEBPACK_IMPORTED_MODULE_7__["Papa"] }]; }, null); })();


/***/ }),

/***/ "zns9":
/*!************************************!*\
  !*** ./src/assets/source/index.ts ***!
  \************************************/
/*! exports provided: parseName, getScriptName, download, saveSVG, getURL, getUrlParams, setUrlParams, loadScript, nextPrime, isPrime, PointWhereTwoLinesIntersect, trapezoidalWave, Button, BaseElement, Circle, CheckBox, ClipPath, ControlCircle, Control, Definitions, Description, Element, Ellipse, Group, Input, Interactive, Line, Marker, Path, Plot, Point, Polygon, RadioControl, DropdownControl, Rectangle, Scrubber, Shape, Slider, SVG, Symbol, TSpan, Text, Use */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elements_base_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements/base-element.js */ "ZMU7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseElement", function() { return _elements_base_element_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _elements_svg_element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements/svg/element.js */ "624d");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return _elements_svg_element_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _elements_svg_circle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elements/svg/circle.js */ "B01R");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return _elements_svg_circle_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _elements_svg_clip_path_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./elements/svg/clip-path.js */ "CZHR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClipPath", function() { return _elements_svg_clip_path_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _elements_svg_definitions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./elements/svg/definitions.js */ "dLU0");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Definitions", function() { return _elements_svg_definitions_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _elements_svg_description_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./elements/svg/description.js */ "ET4v");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Description", function() { return _elements_svg_description_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _elements_svg_ellipse_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./elements/svg/ellipse.js */ "kGPW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Ellipse", function() { return _elements_svg_ellipse_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _elements_svg_group_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./elements/svg/group.js */ "sFit");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Group", function() { return _elements_svg_group_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _elements_svg_line_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./elements/svg/line.js */ "rpg+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return _elements_svg_line_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _elements_svg_marker_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./elements/svg/marker.js */ "q70P");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Marker", function() { return _elements_svg_marker_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _elements_svg_path_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./elements/svg/path.js */ "Gl8z");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Path", function() { return _elements_svg_path_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _elements_svg_polygon_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./elements/svg/polygon.js */ "ldAV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Polygon", function() { return _elements_svg_polygon_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _elements_svg_rectangle_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./elements/svg/rectangle.js */ "TU2K");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return _elements_svg_rectangle_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _elements_svg_svg_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./elements/svg/svg.js */ "GAEk");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SVG", function() { return _elements_svg_svg_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _elements_svg_shape_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./elements/svg/shape.js */ "kBcD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return _elements_svg_shape_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _elements_svg_symbol_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./elements/svg/symbol.js */ "ENXh");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Symbol", function() { return _elements_svg_symbol_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _elements_svg_t_span_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./elements/svg/t-span.js */ "OMCq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TSpan", function() { return _elements_svg_t_span_js__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _elements_svg_text_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./elements/svg/text.js */ "maoU");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return _elements_svg_text_js__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _elements_svg_use_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./elements/svg/use.js */ "B2gg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Use", function() { return _elements_svg_use_js__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _elements_input_button_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./elements/input/button.js */ "wZwl");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return _elements_input_button_js__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _elements_input_check_box_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./elements/input/check-box.js */ "Piay");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckBox", function() { return _elements_input_check_box_js__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _elements_input_control_circle_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./elements/input/control-circle.js */ "LyDu");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ControlCircle", function() { return _elements_input_control_circle_js__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _elements_input_control_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./elements/input/control.js */ "kJ17");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Control", function() { return _elements_input_control_js__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _elements_input_radio_control_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./elements/input/radio-control.js */ "6UAm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RadioControl", function() { return _elements_input_radio_control_js__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _elements_input_dropdown_control_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./elements/input/dropdown-control.js */ "wCCE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropdownControl", function() { return _elements_input_dropdown_control_js__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony import */ var _elements_input_scrubber_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./elements/input/scrubber.js */ "QBIj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Scrubber", function() { return _elements_input_scrubber_js__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony import */ var _elements_input_slider_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./elements/input/slider.js */ "8SZi");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Slider", function() { return _elements_input_slider_js__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony import */ var _elements_input_input_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./elements/input/input.js */ "Ambf");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return _elements_input_input_js__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony import */ var _elements_interactive_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./elements/interactive.js */ "v8dO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interactive", function() { return _elements_interactive_js__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony import */ var _elements_math_plot_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./elements/math/plot.js */ "tTcA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Plot", function() { return _elements_math_plot_js__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony import */ var _elements_math_point_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./elements/math/point.js */ "aDMQ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return _elements_math_point_js__WEBPACK_IMPORTED_MODULE_30__["default"]; });

/* harmony import */ var _util_file_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./util/file.js */ "l8YR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseName", function() { return _util_file_js__WEBPACK_IMPORTED_MODULE_31__["parseName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScriptName", function() { return _util_file_js__WEBPACK_IMPORTED_MODULE_31__["getScriptName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "download", function() { return _util_file_js__WEBPACK_IMPORTED_MODULE_31__["download"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "saveSVG", function() { return _util_file_js__WEBPACK_IMPORTED_MODULE_31__["saveSVG"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getURL", function() { return _util_file_js__WEBPACK_IMPORTED_MODULE_31__["getURL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getUrlParams", function() { return _util_file_js__WEBPACK_IMPORTED_MODULE_31__["getUrlParams"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setUrlParams", function() { return _util_file_js__WEBPACK_IMPORTED_MODULE_31__["setUrlParams"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadScript", function() { return _util_file_js__WEBPACK_IMPORTED_MODULE_31__["loadScript"]; });

/* harmony import */ var _util_math_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./util/math.js */ "tCQe");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nextPrime", function() { return _util_math_js__WEBPACK_IMPORTED_MODULE_32__["nextPrime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPrime", function() { return _util_math_js__WEBPACK_IMPORTED_MODULE_32__["isPrime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PointWhereTwoLinesIntersect", function() { return _util_math_js__WEBPACK_IMPORTED_MODULE_32__["PointWhereTwoLinesIntersect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "trapezoidalWave", function() { return _util_math_js__WEBPACK_IMPORTED_MODULE_32__["trapezoidalWave"]; });

// base element for everything

// base svg element

// svg objects

















// input objects









// complex objects



// export utility functions


// export objects



/***/ })

}]);
//# sourceMappingURL=tagger-tagger-module.js.map